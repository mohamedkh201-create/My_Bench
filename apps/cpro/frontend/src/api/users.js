// src/api/users.js

// 1️⃣ جلب قائمة جميع المستخدمين من فرابي
export async function fetchFrappeUsers() {
    try {
        const response = await fetch(
            '/api/resource/User?fields=["name","email","first_name","last_name","enabled","user_type"]&order_by=creation desc'
        );
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

// 2️⃣ جلب الأدوار (Roles) المتاحة في النظام
export async function fetchFrappeRoles() {
    try {
        const response = await fetch(
            '/api/resource/Role?fields=["name"]&filters=[["disabled","=",0]]'
        );
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching roles:', error);
        return [];
    }
}

// 3️⃣ جلب تفاصيل مستخدم محدد
export async function fetchUserDetail(email) {
    try {
        const response = await fetch(`/api/resource/User/${email}`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching user detail:', error);
        return null;
    }
}

// 4️⃣ إنشاء مستخدم جديد في فرابي وتعيين أدواؤه (Roles)
export async function createFrappeUser(userData) {
    try {
        const response = await fetch('/api/resource/User', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                email: userData.email,
                first_name: userData.first_name,
                last_name: userData.last_name || '',
                send_welcome_email: 0,
                new_password: userData.password,
                roles: userData.roles.map((role) => ({ role: role })),
            }),
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.exception || 'فشل إنشاء المستخدم');
        }

        const data = await response.json();
        return { success: true, data: data.data };
    } catch (error) {
        console.error('Error creating user:', error);
        return { success: false, error: error.message };
    }
}

// 5️⃣ تحديث حالة المستخدم (تفعيل / تعطيل)
export async function updateUserStatus(email, enabled) {
    try {
        const response = await fetch(`/api/resource/User/${email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ enabled: enabled ? 1 : 0 }),
        });

        if (!response.ok) throw new Error('فشل تحديث حالة المستخدم');

        const data = await response.json();
        return { success: true, data: data.data };
    } catch (error) {
        console.error('Error updating user status:', error);
        return { success: false, error: error.message };
    }
}