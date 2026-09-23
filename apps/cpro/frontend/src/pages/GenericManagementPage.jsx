import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Plus, X, Edit, Trash2 } from 'lucide-react';
import { call } from '../lib/frappe';

export default function GenericManagementPage() {
    const { route } = useParams();
    const location = useLocation();
    
    const [config, setConfig] = useState(null);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [linkOptions, setLinkOptions] = useState({});
    
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            try {
                // 1. Fetch config for this route
                const linksRes = await call.get('cpro.api.management.get_management_links');
                const linkConfig = (linksRes.message || []).find(l => l.route === route);
                
                if (!linkConfig) {
                    console.error("Configuration not found for route:", route);
                    setLoading(false);
                    return;
                }
                
                const fieldsConfig = typeof linkConfig.fields_config === 'string' 
                    ? JSON.parse(linkConfig.fields_config) 
                    : linkConfig.fields_config;
                
                linkConfig.parsedFields = fieldsConfig || [];
                setConfig(linkConfig);
                
                // 1.5 Fetch Link options
                const newLinkOptions = {};
                for (const field of linkConfig.parsedFields) {
                    if (field.type === 'Link' && field.options) {
                        try {
                            const res = await call.get('frappe.client.get_list', {
                                doctype: field.options,
                                fields: '["name"]',
                                limit_page_length: 1000
                            });
                            newLinkOptions[field.fieldname] = res.message ? res.message.map(r => r.name) : [];
                        } catch (err) {
                            console.error(`Error fetching options for ${field.fieldname}:`, err);
                        }
                    }
                }
                setLinkOptions(newLinkOptions);
                
                // 2. Fetch records
                const fieldNames = linkConfig.parsedFields.map(f => f.fieldname);
                const recordsRes = await call.get('cpro.api.management.get_dynamic_records', {
                    target_doctype: linkConfig.target_doctype,
                    fields: JSON.stringify(fieldNames)
                });
                
                setRecords(recordsRes.message || []);
            } catch (error) {
                console.error("Error fetching dynamic records:", error);
            } finally {
                setLoading(false);
            }
        };
        init();
    }, [route]);

    const handleOpenModal = (record = null) => {
        if (record) {
            setFormData(record);
            setIsEditing(true);
        } else {
            const defaultData = {};
            config?.parsedFields.forEach(f => {
                if (f.default !== undefined) {
                    defaultData[f.fieldname] = f.default;
                }
            });
            setFormData(defaultData);
            setIsEditing(false);
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await call.post('cpro.api.management.save_dynamic_record', {
                target_doctype: config.target_doctype,
                data: JSON.stringify(formData)
            });
            
            setIsModalOpen(false);
            // Refresh records
            const fieldNames = config.parsedFields.map(f => f.fieldname);
            const recordsRes = await call.get('cpro.api.management.get_dynamic_records', {
                target_doctype: config.target_doctype,
                fields: JSON.stringify(fieldNames)
            });
            setRecords(recordsRes.message || []);
        } catch (error) {
            console.error("Error saving record:", error);
            alert("حدث خطأ أثناء الحفظ");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (name) => {
        if (!window.confirm("هل أنت متأكد من حذف هذا السجل؟")) return;
        
        try {
            await call.post('cpro.api.management.delete_dynamic_record', {
                target_doctype: config.target_doctype,
                name: name
            });
            setRecords(prev => prev.filter(r => r.name !== name));
        } catch (error) {
            console.error("Error deleting record:", error);
            alert("حدث خطأ أثناء الحذف");
        }
    };

    if (loading) {
        return <div className="flex justify-center p-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E4038]"></div></div>;
    }

    if (!config) {
        return <div className="p-10 text-center text-[#8A7F6D]">الإعدادات غير متوفرة لهذا القسم.</div>;
    }

    const title = location.state?.title || config.title;

    return (
        <div className="space-y-6 w-full px-4 lg:px-8 mx-auto relative">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-[#16332B]">{title}</h1>
                <button 
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-[#1E4038] hover:bg-[#16332B] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    <span>إضافة جديد</span>
                </button>
            </div>

            <div className="bg-[#FFFDF8] rounded-lg border border-[#E6DCC5] shadow-sm overflow-hidden">
                <table className="w-full text-right text-sm">
                    <thead className="bg-transparent text-[#2B2620] font-semibold border-b border-[#E6DCC5]">
                        <tr>
                            {config.parsedFields.map(field => (
                                <th key={field.fieldname} className="py-3 px-4">{field.label}</th>
                            ))}
                            <th className="py-3 px-4 text-center w-24">التحكم</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E6DCC5] text-[#2B2620]">
                        {records.length === 0 ? (
                            <tr>
                                <td colSpan={config.parsedFields.length + 1} className="py-6 text-center text-[#8A7F6D]">لا يوجد بيانات</td>
                            </tr>
                        ) : (
                            records.map((record) => (
                                <tr key={record.name} className="hover:bg-transparent">
                                    {config.parsedFields.map(field => (
                                        <td key={field.fieldname} className="py-3 px-4">
                                            {field.type === 'Check' 
                                                ? (record[field.fieldname] ? 'نعم' : 'لا')
                                                : record[field.fieldname]
                                            }
                                        </td>
                                    ))}
                                    <td className="py-3 px-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button 
                                                onClick={() => handleOpenModal(record)}
                                                className="text-[#1E4038] hover:text-[#16332B] p-1"
                                                title="تعديل"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(record.name)}
                                                className="text-red-500 hover:text-red-700 p-1"
                                                title="حذف"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Form Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-[#FFFDF8] rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center p-5 border-b border-[#E6DCC5] bg-transparent">
                            <h3 className="font-bold text-lg text-[#16332B]">{isEditing ? 'تعديل' : 'إضافة جديد'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-[#8A7F6D] hover:text-[#2B2620]">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSave} className="flex flex-col">
                            <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
                                {config.parsedFields.map(field => (
                                    <div key={field.fieldname} className="flex flex-col gap-1">
                                        {field.type === 'Check' ? (
                                            <label className="flex items-center gap-2 font-semibold text-[#2B2620] cursor-pointer">
                                                <input 
                                                    type="checkbox"
                                                    checked={!!formData[field.fieldname]}
                                                    onChange={e => setFormData({...formData, [field.fieldname]: e.target.checked ? 1 : 0})}
                                                    className="w-4 h-4 text-[#1E4038] rounded"
                                                />
                                                {field.label}
                                            </label>
                                        ) : (
                                            <>
                                                <label className="font-semibold text-[#2B2620] text-sm">{field.label}</label>
                                                {field.type === 'Link' ? (
                                                    <>
                                                        <input 
                                                            type="text"
                                                            list={`${field.fieldname}-list`}
                                                            required={field.reqd}
                                                            value={formData[field.fieldname] || ''}
                                                            onChange={e => setFormData({...formData, [field.fieldname]: e.target.value})}
                                                            className="border border-[#E6DCC5] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1E4038] outline-none text-sm"
                                                        />
                                                        <datalist id={`${field.fieldname}-list`}>
                                                            {(linkOptions[field.fieldname] || []).map(opt => (
                                                                <option key={opt} value={opt} />
                                                            ))}
                                                        </datalist>
                                                    </>
                                                ) : (
                                                    <input 
                                                        type="text"
                                                        required={field.reqd}
                                                        value={formData[field.fieldname] || ''}
                                                        onChange={e => setFormData({...formData, [field.fieldname]: e.target.value})}
                                                        className="border border-[#E6DCC5] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1E4038] outline-none text-sm"
                                                    />
                                                )}
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                            
                            <div className="p-5 border-t border-[#E6DCC5] bg-transparent flex justify-end gap-3">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-sm font-semibold text-[#2B2620] bg-[#FFFDF8] border border-[#E6DCC5] rounded-lg hover:bg-transparent"
                                >
                                    إلغاء
                                </button>
                                <button 
                                    type="submit"
                                    disabled={saving}
                                    className="px-5 py-2 text-sm font-semibold text-white bg-[#1E4038] rounded-lg hover:bg-[#16332B] disabled:opacity-50"
                                >
                                    {saving ? 'جاري الحفظ...' : 'حفظ'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
