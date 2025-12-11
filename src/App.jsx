import React, { useState, useEffect } from 'react';
import { isAuthenticated, getCurrentUser, logout } from './data/AuthService';
import { getAllIssues } from './data/IssueService';
import Login from './components/Login';
import Dashboard from './components/Dashboard'; // Placeholder for the main view
import { LogOut, BookOpenText } from 'lucide-react';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
    const [user, setUser] = useState(getCurrentUser());
    const [issues, setIssues] = useState([]);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setUser(getCurrentUser());
        loadIssues();
    };

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
        setUser(null);
        setIssues([]);
    };

    const loadIssues = () => {
        setIssues(getAllIssues());
    };

    useEffect(() => {
        if (isLoggedIn) {
            loadIssues();
        }
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        return <Login onLoginSuccess={handleLoginSuccess} />;
    }

    return (
        <div className="min-h-screen bg-secondary font-sans">
            {/* Header / Nav Bar */}
            <header className="bg-background shadow-md">
                <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
                    <h1 className="text-xl sm:text-2xl font-extrabold text-primary flex items-center">
                        <BookOpenText className="w-6 h-6 mr-2 text-primary" />
                        Rural Pulse
                    </h1>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600 hidden sm:inline">
                            Welcome, <span className="font-semibold">{user.name}</span>
                        </span>
                        <button
                            onClick={handleLogout}
                            className="flex items-center text-sm py-2 px-3 bg-secondary rounded-lg text-gray-700 hover:bg-gray-200 transition duration-150"
                        >
                            <LogOut className="w-4 h-4 mr-1" />
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                {/* Dashboard will contain the tabs for reporting and viewing */}
                <Dashboard 
                    issues={issues} 
                    loadIssues={loadIssues} 
                    isAdmin={user.role === 'admin'} 
                />
            </main>
        </div>
    );
}

export default App;