import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    const navigate = useNavigate();
    const button = document.querySelector('#menu-button');
    const menu = document.querySelector('#menu');
    const [isSignedIn, setIsSignedIn] = useState(localStorage.getItem('token'));
    const handleLogout = async () => {
        try {
            const response = await axios.get('http://localhost:2288/logout');
            console.log(response.data);
            localStorage.clear()
            navigate('/signin');
        } catch (error) {
            console.error('Logout error:', error.response.data);
        }
    };
    return (
        <div>
            <header>
                <nav
                    className="flex flex-wrap items-center justify-between w-full py-4 md:py-0 h-20 px-4  text-lg text-gray-700  bg-gray-100">
                    <div>
                    </div>

                    <div className="hidden w-full md:flex md:items-center md:w-auto" id="menu">
                        <ul
                            className=" pt-4 text-base text-gray-700 md:flex md:justify-between  md:pt-0">
                            <li>
                                <a className="md:p-4 py-2 block hover:text-purple-400" href="#"><Link to="/">Home</Link></a>
                            </li>
                            <li>
                                <a className="md:p-4 py-2 block hover:text-purple-400" href="#">Food zone</a>
                            </li>
                            <li>
                                <a className="md:p-4 py-2 block hover:text-purple-400" href="#"><Link to='/clothe'>Cothing Zone</Link></a>
                            </li>
                            <li>
                                <a className="md:p-4 py-2 block hover:text-purple-400" href="#">Paymnet</a>
                            </li>
                            <li>
                                <a className="md:p-4 py-2 block hover:text-purple-400" href="#">Customers</a>
                            </li>
                            <li>
                                <a className="md:p-4 py-2 block hover:text-purple-400" href="#">Coffee Shop</a>
                            </li>
                            {!isSignedIn && (
                                <>
                                    <li>
                                        <a className="md:p-4 py-2 block hover:text-purple-400 text-purple-500" href="#">
                                            <Link to="/signup">Sign Up</Link>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="md:p-4 py-2 block hover:text-purple-400 text-purple-500" href="#">
                                            <Link to="/signin">Sign In</Link>
                                        </a>
                                    </li>
                                </>
                            )}
                            {isSignedIn && (
                                <li>
                                    <a onClick={handleLogout} className="md:p-4 py-2 block hover:text-purple-400 text-purple-500" href="#">
                                        LogOut
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Header
