"use client"

import Link from 'next/link';
import React, { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
const SignupPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [gender, setGender] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== passwordCheck) {
            alert("Passwords do not match.");
            return;
        }
        signIn('credentials', {email: "admin@example.com", password: "password123"})
        console.log('Signup attempt with:', { name, email, password, gender });
        alert(`Account creation attempt for: ${name}`);
    };
  const user = useSession()
  console.log(user.data?.user, "user")
    return (
        <div className="min-h-screen bg-white flex flex-col items-center pt-8 font-sans">
            {/* Amazon Logo */}
           <a href="#">
             <img 
                src="https://pngimg.com/uploads/amazon/amazon_PNG25.png" 
                alt="Amazon Logo" 
                className="h-8 mb-4 invert" 
            />
            </a>

            <div className="w-full max-w-sm">
                <div className="border border-gray-300 rounded-lg p-6">
                    <h1 className="text-3xl font-medium mb-4">Create account</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-bold mb-1">
                                Your name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="First and last name"
                                className="w-full px-3 py-1.5 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-1">Gender</label>
                            <div className="flex items-center space-x-4 mt-1">
                                <label className="inline-flex items-center">
                                    <input type="radio" className="h-4 w-4 accent-yellow-500" name="gender" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} />
                                    <span className="ml-2 text-sm">Male</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input type="radio" className="h-4 w-4 accent-yellow-500" name="gender" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} />
                                    <span className="ml-2 text-sm">Female</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input type="radio" className="h-4 w-4 accent-yellow-500" name="gender" value="other" checked={gender === 'other'} onChange={(e) => setGender(e.target.value)} />
                                    <span className="ml-2 text-sm">Other</span>
                                </label>
                            </div>
                            {/* <p className="text-xs text-gray-500 mt-1">Optional.</p> */}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-bold mb-1">
                                 email address
                            </label>
                            <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-1.5 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-bold mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="At least 6 characters"
                                className="w-full px-3 py-1.5 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                required
                                minLength={6}
                            />
                            <p className="text-xs mt-1 text-gray-600 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                Passwords must be at least 6 characters.
                            </p>
                        </div>
                         <div>
                            <label htmlFor="passwordCheck" className="block text-sm font-bold mb-1">
                                Re-enter password
                            </label>
                            <input
                                type="password"
                                id="passwordCheck"
                                value={passwordCheck}
                                onChange={(e) => setPasswordCheck(e.target.value)}
                                className="w-full px-3 py-1.5 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                required
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
                        By creating an account, you agree to Amazon's <a href="#" className="text-blue-600 hover:underline">Conditions of Use</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Notice</a>.
                    </p>

                    <div className="border-t border-gray-200 pt-4">
                        <p className="text-sm">
                            Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Sign in</Link>
                        </p>
                        <p className="text-sm mt-2">
                            Buying for work? <Link href="#" className="text-blue-600 hover:underline">Create a free business account</Link>
                        </p>
                    </div>

                </div>
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

export default SignupPage;