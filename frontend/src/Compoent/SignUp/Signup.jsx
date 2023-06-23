import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
const baseURL = 'http://localhost:2288/signup';
const Signup = () => {
    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(baseURL, { fname, lname, email, password }, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                console.log(response.data);
                // setfname('');
            })
            .catch(error => {
                console.log('Failed to register user:', error);
            });
    };
    return (
        <div>
            <Header />
            <section className="flex flex-col md:flex-row h-screen items-center">

                <div className=" container p-5 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
                    <img src={require('../../image/food.jpg')} alt="" className="w-full rounded-xl h-full object-cover" />
                </div>

                <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto  md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">

                    <div className="w-full h-100">
                        <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">SIGN UP WITH US</h1>
                        <form onSubmit={handleSubmit} className="mt-6">
                            <div>
                                <label className="block text-gray-700">First Name</label>
                                <input type="text" value={fname} onChange={e => setfname(e.target.value)} name="" placeholder="First Name" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required />
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700">Last Name</label>
                                <input type="text" value={lname} onChange={e => setlname(e.target.value)} name="" placeholder="Last Name" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required />
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700">Email</label>
                                <input type="email" name="" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Email" minLength="6" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required />
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700">Password</label>
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} name="" placeholder="Enter Password" minLength="6" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required />
                            </div>

                            <div className="text-right mt-2">
                                <a href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Forgot Password?</a>
                            </div>
                            <button type='submit' className="uppercase block p-4 text-lg rounded-lg bg-indigo-500 hover:bg-indigo-600 focus:outline-none">Submit</button>
                            <div className="px-4 pb-2 pt-4">
                                <Link to="/signin"><button button type="submit" className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg  px-4 py-3 mt-6">Sign Up</button></Link>
                            </div>
                        </form>
                        <hr className="my-6 border-gray-300 w-full" />
                        <p className="mt-8">Need an account? <a href="#" className="text-blue-500 hover:text-blue-700 font-semibold">Create an
                            account</a></p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Signup
