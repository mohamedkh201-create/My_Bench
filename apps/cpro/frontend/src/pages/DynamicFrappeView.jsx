import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Plus, X, Edit, Trash2 } from 'lucide-react';
import { call } from '../lib/frappe';

export default function DynamicFrappeView() {
    const { doctypeName } = useParams();
    const navigate = useNavigate();
    
    const [meta, setMeta] = useState(null);
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
                // 1. Fetch meta
                const metaRes = await call.get('cpro.api.management.get_doctype_meta', { doctype: doctypeName });
                const config = metaRes.message;
                
                if (!config) {
                    console.error("Meta not found for:", doctypeName);
                    setLoading(false);
                    return;
                }
                
                // Only show fields that have in_list_view in the table, but all fields in the form (max 15 fields to not crash)
                config.listFields = config.fields.filter(f => f.in_list_view).slice(0, 8);
                if (config.listFields.length === 0) {
                    config.listFields = config.fields.slice(0, 4);
                }
                setMeta(config);
                
                // 1.5 Fetch Link options
                const newLinkOptions = {};
                for (const field of config.fields) {
                    if (field.type === 'Link' && field.options) {
                        try {
                            const res = await call.get('frappe.client.get_list', {
                                doctype: field.options,
                                fields: '["name"]',
                                limit_page_length: 500
                            });
                            newLinkOptions[field.fieldname] = res.message ? res.message.map(r => r.name) : [];
                        } catch (err) {
                            console.error(`Error fetching options for ${field.fieldname}:`, err);
                        }
                    }
                }
                setLinkOptions(newLinkOptions);
                
                // 2. Fetch records
                const fieldNames = config.listFields.map(f => f.fieldname);
                // Also need to fetch fields we need for editing (all of them)
                const allFieldNames = config.fields.map(f => f.fieldname);
                
                const recordsRes = await call.get('cpro.api.management.get_dynamic_records', {
                    target_doctype: doctypeName,
                    fields: JSON.stringify(allFieldNames)
                });
                
                setRecords(recordsRes.message || []);
            } catch (error) {
                console.error("Error fetching dynamic records:", error);
            } finally {
                setLoading(false);
            }
        };
        init();
    }, [doctypeName]);

    const handleOpenModal = (record = null) => {
        if (record) {
            setFormData(record);
            setIsEditing(true);
        } else {
            const defaultData = {};
            meta?.fields.forEach(f => {
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
                target_doctype: doctypeName,
                data: JSON.stringify(formData)
            });
            
            setIsModalOpen(false);
            // Refresh records
            const allFieldNames = meta.fields.map(f => f.fieldname);
            const recordsRes = await call.get('cpro.api.management.get_dynamic_records', {
                target_doctype: doctypeName,
                fields: JSON.stringify(allFieldNames)
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
                target_doctype: doctypeName,
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

    if (!meta) {
        return <div className="p-10 text-center text-[#8A7F6D]">الإعدادات غير متوفرة لهذا القسم.</div>;
    }

    return (
        <div className="space-y-6 w-full px-4 lg:px-8 mx-auto relative">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate('/app/doctypes')} className="text-[#8A7F6D] hover:text-[#1E4038] transition-colors">
                    <ArrowRight className="w-5 h-5" />
                </button>
                <div className="flex justify-between items-center w-full">
                    <h1 className="text-2xl font-bold text-[#16332B]">{meta.name}</h1>
                    <button 
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 bg-[#1E4038] hover:bg-[#16332B] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span>إضافة جديد</span>
                    </button>
                </div>
            </div>

            <div className="bg-[#FFFDF8] rounded-lg border border-[#E6DCC5] shadow-sm overflow-x-auto">
                <table className="w-full text-right text-sm">
                    <thead className="bg-[#F3EFE7] text-[#2B2620] font-semibold border-b border-[#E6DCC5]">
                        <tr>
                            {meta.listFields.map(field => (
                                <th key={field.fieldname} className="py-3 px-4">{field.label}</th>
                            ))}
                            <th className="py-3 px-4 text-center w-24">التحكم</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E6DCC5] text-[#2B2620]">
                        {records.length === 0 ? (
                            <tr>
                                <td colSpan={meta.listFields.length + 1} className="py-6 text-center text-[#8A7F6D]">لا يوجد بيانات</td>
                            </tr>
                        ) : (
                            records.map((record) => (
                                <tr key={record.name} className="hover:bg-transparent">
                                    {meta.listFields.map(field => (
                                        <td key={field.fieldname} className="py-3 px-4 max-w-[200px] truncate" title={record[field.fieldname]}>
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
                    <div className="bg-[#FFFDF8] rounded-xl shadow-xl w-full max-w-2xl mx-4 overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center p-5 border-b border-[#E6DCC5] bg-transparent">
                            <h3 className="font-bold text-lg text-[#16332B]">{isEditing ? 'تعديل' : 'إضافة جديد'} ({meta.name})</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-[#8A7F6D] hover:text-[#2B2620]">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSave} className="flex flex-col">
                            <div className="p-5 overflow-y-auto max-h-[65vh]">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {meta.fields.map(field => (
                                        <div key={field.fieldname} className={`flex flex-col gap-1 ${field.type === 'Text' || field.type === 'Small Text' ? 'md:col-span-2' : ''}`}>
                                            {field.type === 'Check' ? (
                                                <label className="flex items-center gap-2 font-semibold text-[#2B2620] cursor-pointer mt-6">
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
                                                                list={`${field.fieldname}-list-dyn`}
                                                                required={field.reqd}
                                                                value={formData[field.fieldname] || ''}
                                                                onChange={e => setFormData({...formData, [field.fieldname]: e.target.value})}
                                                                className="border border-[#E6DCC5] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1E4038] outline-none text-sm"
                                                            />
                                                            <datalist id={`${field.fieldname}-list-dyn`}>
                                                                {(linkOptions[field.fieldname] || []).map(opt => (
                                                                    <option key={opt} value={opt} />
                                                                ))}
                                                            </datalist>
                                                        </>
                                                    ) : field.type === 'Select' ? (
                                                        <select
                                                            required={field.reqd}
                                                            value={formData[field.fieldname] || ''}
                                                            onChange={e => setFormData({...formData, [field.fieldname]: e.target.value})}
                                                            className="border border-[#E6DCC5] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1E4038] outline-none text-sm"
                                                        >
                                                            <option value=""></option>
                                                            {(field.options || '').split('\n').map(opt => opt.trim()).filter(Boolean).map(opt => (
                                                                <option key={opt} value={opt}>{opt}</option>
                                                            ))}
                                                        </select>
                                                    ) : field.type === 'Text' || field.type === 'Small Text' ? (
                                                        <textarea
                                                            required={field.reqd}
                                                            value={formData[field.fieldname] || ''}
                                                            onChange={e => setFormData({...formData, [field.fieldname]: e.target.value})}
                                                            className="border border-[#E6DCC5] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1E4038] outline-none text-sm h-24 resize-none"
                                                        />
                                                    ) : (
                                                        <input 
                                                            type={field.type === 'Date' ? 'date' : field.type === 'Int' || field.type === 'Float' || field.type === 'Currency' ? 'number' : 'text'}
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
                            </div>
                            
                            <div className="p-5 border-t border-[#E6DCC5] bg-[#F3EFE7] flex justify-end gap-3 mt-auto">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-sm font-semibold text-[#2B2620] bg-white border border-[#E6DCC5] rounded-lg hover:bg-gray-50"
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
