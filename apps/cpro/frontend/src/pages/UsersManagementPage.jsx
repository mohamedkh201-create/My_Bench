/**
 * ============================================================================
 * Page: UsersManagementPage.jsx
 * ============================================================================
 * الوصف:
 * صفحة إدارة المستخدمين والأدوار والفروع في CPRO.
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { UserPlus, Shield, Mail, X, Check } from 'lucide-react';
import { call } from '../lib/frappe';

export default function UsersManagementPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [accessDenied, setAccessDenied] = useState(false);
    
    // Edit Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [allRoles, setAllRoles] = useState([]);
    const [userRoles, setUserRoles] = useState([]);
    const [savingRoles, setSavingRoles] = useState(false);
    
    // Add User Modal states
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [savingNewUser, setSavingNewUser] = useState(false);
    const [newUserForm, setNewUserForm] = useState({
        first_name: '',
        email: '',
        password: ''
    });

    const fetchUsers = async () => {
        setLoading(true);
        setAccessDenied(false);
        try {
            const res = await call.get('cpro.api.users.get_users');
            if (res.message) {
                setUsers(res.message);
            }
        } catch (error) {
            console.error("خطأ في جلب المستخدمين:", error);
            if (error.exc_type === "PermissionError" || error.message?.includes("لا تمتلك صلاحيه") || error.status === 403) {
                setAccessDenied(true);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // ----------------------------------------------------
    // Edit Roles Logic
    // ----------------------------------------------------
    const handleEditClick = async (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
        setAllRoles([]);
        setUserRoles([]);
        
        try {
            const [rolesRes, userRolesRes] = await Promise.all([
                call.get('cpro.api.users.get_roles'),
                call.get('cpro.api.users.get_user_roles', { user_email: user.email })
            ]);
            
            if (rolesRes.message) setAllRoles(rolesRes.message);
            if (userRolesRes.message) setUserRoles(userRolesRes.message);
        } catch (error) {
            console.error("خطأ في جلب الصلاحيات:", error);
        }
    };

    const toggleRole = (roleName) => {
        setUserRoles(prev => 
            prev.includes(roleName) 
                ? prev.filter(r => r !== roleName)
                : [...prev, roleName]
        );
    };

    const handleSaveRoles = async () => {
        if (!selectedUser) return;
        
        setSavingRoles(true);
        try {
            await call.post('cpro.api.users.update_user_roles', {
                user_email: selectedUser.email,
                roles: JSON.stringify(userRoles)
            });
            setIsModalOpen(false);
            fetchUsers(); // Refresh table
        } catch (error) {
            console.error("خطأ في تحديث الصلاحيات:", error);
            alert("حدث خطأ أثناء حفظ الصلاحيات");
        } finally {
            setSavingRoles(false);
        }
    };

    // ----------------------------------------------------
    // Add User Logic
    // ----------------------------------------------------
    const handleOpenAddModal = async () => {
        setNewUserForm({ first_name: '', email: '', password: '' });
        setUserRoles([]);
        setAllRoles([]);
        setIsAddModalOpen(true);
        
        try {
            const rolesRes = await call.get('cpro.api.users.get_roles');
            if (rolesRes.message) setAllRoles(rolesRes.message);
        } catch (error) {
            console.error("خطأ في جلب الصلاحيات:", error);
        }
    };

    const handleSaveNewUser = async (e) => {
        e.preventDefault();
        setSavingNewUser(true);
        try {
            await call.post('cpro.api.users.create_user', {
                email: newUserForm.email,
                first_name: newUserForm.first_name,
                password: newUserForm.password,
                roles: JSON.stringify(userRoles)
            });
            setIsAddModalOpen(false);
            fetchUsers(); // Refresh table
        } catch (error) {
            console.error("خطأ في إضافة المستخدم:", error);
            alert(error.message || "حدث خطأ أثناء إضافة المستخدم");
        } finally {
            setSavingNewUser(false);
        }
    };

    if (accessDenied) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] space-y-4">
                <div className="bg-red-50 text-red-500 p-6 rounded-full">
                    <Shield className="w-16 h-16" />
                </div>
                <h2 className="text-2xl font-bold text-[#16332B]">عذراً، الوصول مقيد</h2>
                <p className="text-[#8A7F6D]">أنت لا تمتلك صلاحية لفتح هذه الصفحة. هذه الصفحة مخصصة للمدير (System Manager) فقط.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 w-full px-4 lg:px-8 mx-auto relative">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-[#16332B]">المستخدمين</h1>
                <button 
                    onClick={handleOpenAddModal}
                    className="flex items-center gap-2 bg-[#1E4038] hover:bg-[#16332B] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                    <UserPlus className="w-4 h-4" />
                    <span>إضافة مستخدم جديد</span>
                </button>
            </div>

            <div className="bg-[#FFFDF8] rounded-lg border border-[#E6DCC5] shadow-sm overflow-hidden">
                <table className="w-full text-right text-sm">
                    <thead className="bg-transparent text-[#2B2620] font-semibold border-b border-[#E6DCC5]">
                        <tr>
                            <th className="py-3 px-4">الاسم</th>
                            <th className="py-3 px-4">البريد الإلكتروني</th>
                            <th className="py-3 px-4">الدور الوظيفي</th>
                            <th className="py-3 px-4">الفرع</th>
                            <th className="py-3 px-4 text-center">التحكم</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-[#8A7F6D]">
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="py-10 text-center">
                                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#1E4038]"></div>
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="py-6 text-center text-[#8A7F6D]">لا يوجد مستخدمين</td>
                            </tr>
                        ) : (
                            users.map((u) => (
                                <tr key={u.id} className="hover:bg-transparent">
                                    <td className="py-3 px-4 font-bold text-[#16332B]">{u.name}</td>
                                    <td className="py-3 px-4 flex items-center gap-2 text-[#8A7F6D]">
                                        <Mail className="w-3.5 h-3.5" />
                                        <span>{u.email}</span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className="inline-flex items-center gap-1 bg-[#F3EBDA] text-[#16332B] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                            <Shield className="w-3 h-3" />
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">{u.branch}</td>
                                    <td className="py-3 px-4 text-center">
                                        <button 
                                            onClick={() => handleEditClick(u)}
                                            className="text-xs text-[#1E4038] font-semibold hover:underline bg-[#F3EBDA] px-3 py-1 rounded-full hover:bg-[#E6DCC5] transition-colors"
                                        >
                                            تعديل
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Edit User Roles Modal */}
            {isModalOpen && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-[#FFFDF8] rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="flex justify-between items-center p-5 border-b border-[#E6DCC5] bg-transparent">
                            <h3 className="font-bold text-lg text-[#16332B]">تعديل صلاحيات: {selectedUser.name}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-[#8A7F6D] bg-[#FFFDF8] p-1 rounded-full shadow-sm">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-5 overflow-y-auto flex-1">
                            <p className="text-sm text-[#8A7F6D] mb-4">اختر الصلاحيات (Roles) التي ترغب بإسنادها لهذا المستخدم:</p>
                            {allRoles.length === 0 ? (
                                <div className="py-8 flex justify-center">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#1E4038]"></div>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {allRoles.map(role => {
                                        const isSelected = userRoles.includes(role);
                                        return (
                                            <label 
                                                key={role} 
                                                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${isSelected ? 'border-[#1E4038] bg-[#F3EBDA]' : 'border-[#E6DCC5] hover:bg-transparent'}`}
                                            >
                                                <span className={`font-semibold text-sm ${isSelected ? 'text-[#16332B]' : 'text-[#2B2620]'}`}>
                                                    {role}
                                                </span>
                                                <div className={`w-5 h-5 rounded flex items-center justify-center border ${isSelected ? 'bg-[#1E4038] border-[#1E4038]' : 'bg-[#FFFDF8] border-[#E6DCC5]'}`}>
                                                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                                                </div>
                                                <input 
                                                    type="checkbox" 
                                                    className="hidden" 
                                                    checked={isSelected}
                                                    onChange={() => toggleRole(role)}
                                                />
                                            </label>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        <div className="p-5 border-t border-[#E6DCC5] bg-transparent flex justify-end gap-3">
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-sm font-semibold text-[#8A7F6D] bg-[#FFFDF8] border border-[#E6DCC5] rounded-lg hover:bg-transparent"
                            >
                                إلغاء
                            </button>
                            <button 
                                onClick={handleSaveRoles}
                                disabled={savingRoles || allRoles.length === 0}
                                className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-[#1E4038] rounded-lg hover:bg-[#16332B] disabled:opacity-50"
                            >
                                {savingRoles ? 'جاري الحفظ...' : 'حفظ الصلاحيات'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add User Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-[#FFFDF8] rounded-xl shadow-xl w-full max-w-lg mx-4 overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="flex justify-between items-center p-5 border-b border-[#E6DCC5] bg-transparent">
                            <h3 className="font-bold text-lg text-[#16332B]">إضافة مستخدم جديد</h3>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-[#8A7F6D] bg-[#FFFDF8] p-1 rounded-full shadow-sm">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSaveNewUser} className="flex flex-col flex-1 overflow-hidden">
                            <div className="p-5 overflow-y-auto space-y-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-[#2B2620]">الاسم الأول *</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={newUserForm.first_name}
                                        onChange={e => setNewUserForm({...newUserForm, first_name: e.target.value})}
                                        className="w-full border border-[#E6DCC5] rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1E4038] outline-none"
                                        placeholder="محمد"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-[#2B2620]">البريد الإلكتروني *</label>
                                    <input 
                                        type="email" 
                                        required
                                        value={newUserForm.email}
                                        onChange={e => setNewUserForm({...newUserForm, email: e.target.value})}
                                        className="w-full border border-[#E6DCC5] rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1E4038] outline-none text-left"
                                        dir="ltr"
                                        placeholder="user@example.com"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-[#2B2620]">كلمة المرور *</label>
                                    <input 
                                        type="password" 
                                        required
                                        value={newUserForm.password}
                                        onChange={e => setNewUserForm({...newUserForm, password: e.target.value})}
                                        className="w-full border border-[#E6DCC5] rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1E4038] outline-none text-left"
                                        dir="ltr"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div className="pt-4 border-t border-[#E6DCC5]">
                                    <p className="text-sm font-semibold text-[#2B2620] mb-2">تعيين الصلاحيات (اختياري)</p>
                                    {allRoles.length === 0 ? (
                                        <p className="text-xs text-[#8A7F6D]">جاري تحميل الصلاحيات...</p>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-2">
                                            {allRoles.map(role => {
                                                const isSelected = userRoles.includes(role);
                                                return (
                                                    <label 
                                                        key={role} 
                                                        className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-colors ${isSelected ? 'border-[#1E4038] bg-[#F3EBDA]' : 'border-[#E6DCC5] hover:bg-transparent'}`}
                                                    >
                                                        <span className={`font-semibold text-xs ${isSelected ? 'text-[#16332B]' : 'text-[#2B2620]'}`}>
                                                            {role}
                                                        </span>
                                                        <input 
                                                            type="checkbox" 
                                                            className="hidden" 
                                                            checked={isSelected}
                                                            onChange={() => toggleRole(role)}
                                                        />
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="p-5 border-t border-[#E6DCC5] bg-transparent flex justify-end gap-3 mt-auto">
                                <button 
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2 text-sm font-semibold text-[#8A7F6D] bg-[#FFFDF8] border border-[#E6DCC5] rounded-lg hover:bg-transparent"
                                >
                                    إلغاء
                                </button>
                                <button 
                                    type="submit"
                                    disabled={savingNewUser}
                                    className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-[#1E4038] rounded-lg hover:bg-[#16332B] disabled:opacity-50"
                                >
                                    {savingNewUser ? 'جاري الإضافة...' : 'إضافة المستخدم'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}