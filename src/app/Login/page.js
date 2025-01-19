'use client';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Header from "../components/Header";

export default function LoginPage() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState(''); //State for the message
    const { login } = useAuth(); //Get login function from context
    
    const handleChange = (e) => {
        //Update form data on input change
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); //Prevent default form submit
    
        const { username, password } = formData; //Destructure form data
    
        //Check if any field is empty
        if (!username || !password) {
            setMessage('Please fill in all fields.');
            return;
        }
    
        try {
            //API request to login
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
    
            const data = await response.json(); //Parse response
    
            if (response.ok) {
                login(data); //Pass data to AuthContext
                setMessage('Login successful!');
                setTimeout(() => {
                    window.location.href = '/Dashboard'; //Redirect after 2 seconds
                }, 2000);
            } else {
                setMessage(data.message || 'Login failed.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setMessage('Server error. Please try again later.');
        }
    };
    
    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen p-6">
                <div
                    className="relative bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/Rahmen.svg')", //import frame
                        width: "400px",
                        height: "600px",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        paddingTop: "120px",
                    }}
                >
                    <h1 className="text-5xl font-trash-hand text-black mb-6">Login</h1> 
                    <form
                        onSubmit={handleSubmit}
                        className="px-6 pt-4 pb-6"
                        style={{
                            width: "70%",
                            height: "60%",
                        }}
                    >
                        <div className="mb-4 w-full">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2" //email/user label
                                htmlFor="username"
                            >
                                Email / Username 
                            </label>
                            <input
                                id="username"
                                type="text"
                                placeholder="Email / Username"
                                value={formData.username}
                                onChange={handleChange}
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-500"
                            />
                        </div>

                        <div className="mb-6 w-full">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="password" //password label 
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-500"
                            />
                        </div>

                        <div className="flex items-center justify-center w-full"> 
                            <button //login button
                                type="submit"
                                className="bg-[#A9D09A] hover:bg-[#90B883] text-white font-bold py-2 px-6 rounded focus:outline-none"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    <div className="mt-4">
                        <p className="text-sm text-gray-600"> {/*Register link, if user don`t have accounnt*/}
                            Don't have an account?{' '} 
                            <button
                                className="text-[#A9D09A] hover:underline font-bold"
                                onClick={() => window.location.href = '/Register'}
                            >
                                Register
                            </button>
                        </p>
                    </div>
                </div>

                {/*Display message below the form*/}
                {message && (
                    <div
                        className={`mt-6 px-6 py-3 text-center shadow-md max-w-xl ${message.includes('successful') ? 'bg-[#A9D09A] border border-black-300' : 'bg-red-100 text-red-800 border border-red-300'}`}
                    >
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}
