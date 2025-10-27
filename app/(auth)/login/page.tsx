"use client"
import Link from 'next/link';
import React, { useState } from 'react';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login attempt with:', email);
        alert(`Login attempt with: ${email}`);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center pt-8 font-sans">
            {/* Amazon Logo */}
            <Link href="/">
             <img 
                src="https://pngimg.com/uploads/amazon/amazon_PNG25.png" 
                alt="Amazon Logo" 
                className="h-8 mb-4 invert" 
            />
            </Link>
           

            <div className="w-full max-w-sm">
                <div className="border border-gray-300 rounded-lg p-6">
                    <h1 className="text-3xl font-medium mb-4">Sign in</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-bold mb-1">
                                Email or mobile phone number
                            </label>
                            <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-1.5 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-sm text-black py-2 rounded-lg shadow-md transition duration-200"
                        >
                            Continue
                        </button>
                    </form>
                    <p className="text-xs my-4">
                        By continuing, you agree to Amazon's <a href="#" className="text-blue-600 hover:underline">Conditions of Use</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Notice</a>.
                    </p>
                    <details>
                        <summary className="text-blue-600 hover:underline text-sm cursor-pointer list-none">
                           <span className="inline-block border-l-4 border-t-4 border-b-4 border-transparent border-l-gray-600 h-0 w-0 transform -rotate-45 -translate-y-px mr-1"></span>
                           Need help?
                        </summary>
                         <ul className="text-sm mt-2 ml-4 list-disc list-inside">
                            <li><a href="#" className="text-blue-600 hover:underline">Forgot your password?</a></li>
                            <li><a href="#" className="text-blue-600 hover:underline">Other issues with Sign-In</a></li>
                        </ul>
                    </details>
                </div>
                
                <div className="flex items-center my-4">
                    <div className="grow border-t border-gray-300"></div>
                    <span className="shrink mx-4 text-xs text-gray-500">New to Amazon?</span>
                    <div className="grow border-t border-gray-300"></div>
                </div>

                <Link 
                    href="/sign-up"
                    className="w-full block text-center bg-gray-100 hover:bg-gray-200 border border-gray-400 text-sm text-black py-2 rounded-lg shadow-sm transition duration-200"
                >
                    Create your Amazon account
                </Link>
            </div>

            <div className="w-full max-w-5xl mx-auto mt-8">
                <div className="border-t border-gray-200"></div>
                <div className="flex justify-center space-x-8 py-4 text-xs text-blue-600">
                    <a href="#" className="hover:underline">Conditions of Use</a>
                    <a href="#" className="hover:underline">Privacy Notice</a>
                    <a href="#" className="hover:underline">Help</a>
                </div>
                <p className="text-center text-xs text-gray-500 pb-8">
                    © 1996-2024, Amazon.com, Inc. or its affiliates
                </p>
            </div>
        </div>
    );
};

export default LoginPage;