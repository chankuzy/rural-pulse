const USER_KEY = 'CURRENT_USER';
const USERS_DB = {
    'citizen': { username: 'citizen', password: 'password', role: 'citizen', name: 'Nuhu Abdullahi' },
    'admin': { username: 'admin', password: 'password', role: 'admin', name: 'Admin' }
};

export const login = (username, password) => {
    const user = USERS_DB[username];
    if (user && user.password === password) {
        // Store user session in localStorage
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        return user;
    }
    return null;
};

export const logout = () => {
    localStorage.removeItem(USER_KEY);
};

export const getCurrentUser = () => {
    const userJson = localStorage.getItem(USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
};

export const isAuthenticated = () => {
    return !!getCurrentUser();
};

export const isAdmin = () => {
    const user = getCurrentUser();
    return user && user.role === 'admin';
};