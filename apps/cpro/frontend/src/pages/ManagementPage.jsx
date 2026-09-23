/**
 * ============================================================================
 * Page: ManagementPage.jsx
 * ============================================================================
 * الوصف:
 * الصفحة الرئيسية لقسم الإدارة.
 * تعرض اختصارات سريعة لإعدادات مناطق التوصيل، طرق الدفع، الضرائب، وغيرها بشكل ديناميكي.
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { call } from '../lib/frappe';

export default function ManagementPage() {
    const navigate = useNavigate();
    const [dynamicOptions, setDynamicOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Hardcoded special pages that shouldn't be overridden
    const staticOptions = [
        { title: 'المستخدمين', path: '/management/users', icon: 'Users' },
        { title: 'الأسباب', path: '/management/reasons', highlight: true, icon: 'HelpCircle' },
    ];

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const res = await call.get('cpro.api.management.get_management_links');
                if (res.message) {
                    setDynamicOptions(res.message);
                }
            } catch (error) {
                console.error("Error fetching dynamic links:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLinks();
    }, []);

    const renderIcon = (iconName) => {
        const IconComponent = Icons[iconName] || Icons.Settings;
        return <IconComponent className="w-6 h-6 mb-2 text-[#1E4038]" />;
    };

    const allOptions = [
        ...staticOptions,
        ...dynamicOptions.map(link => ({
            title: link.title,
            path: `/management/dynamic/${link.route}`,
            icon: link.icon || 'FileText',
            isDynamic: true
        }))
    ];

    return (
        <div className="w-full px-4 lg:px-8 space-y-6">
            <div className="flex justify-start items-center">
                <h2 className="text-2xl lg:text-3xl font-black text-[#16332B]">إدارة</h2>
            </div>

            {loading ? (
                <div className="flex justify-center p-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E4038]"></div>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {allOptions.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => navigate(item.path, { state: { title: item.title } })}
                            className={`h-32 bg-[#FFFDF8] rounded-2xl shadow-sm flex flex-col items-center justify-center p-4 text-[#2B2620] font-black text-sm transition-all hover:shadow-md hover:bg-[#F3EBDA] ${
                                item.highlight ? 'ring-2 ring-[#8C6A2C]' : 'border border-[#E6DCC5]'
                            }`}
                        >
                            {renderIcon(item.icon)}
                            <span className="mt-2">{item.title}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}