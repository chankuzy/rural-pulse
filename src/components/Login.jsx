import React, { useState } from 'react';
import { login } from '../data/AuthService';
import { LogIn, User, Lock } from 'lucide-react';

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const user = login(username, password);

        if (user) {
            onLoginSuccess();
        } else {
            setError('Invalid username or password. Try citizen/password or admin/password.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-secondary">
            <div className="bg-background p-8 rounded-xl shadow-2xl w-full max-w-sm">
                <h2 className="text-3xl font-bold text-center mb-6 text-primary flex items-center justify-center">
                    <LogIn className="w-6 h-6 mr-2" />
                    Sign In
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Username Input */}
                    <div className="relative">
                        <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Username (citizen or admin)"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-600 focus:ring-primary focus:border-primary transition duration-150"
                            required
                        />
                    </div>
                    {/* Password Input */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Password (password)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-600 rounded-lg focus:ring-primary focus:border-primary transition duration-150"
                            required
                        />
                    </div>
                    
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    
                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;