import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Header from '../Header/Header';

const Clothe = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [product, setProduct] = useState([]);

    const [categories, setCategories] = useState([]);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    let getCategories = async () => {
        axios.get('https://fakestoreapi.com/products/categories')
            .then(res => setCategories(res.data))
    }
    const fetchProductByCategory = async () => {
        axios.get(`https://fakestoreapi.com/products/category/${selectedOption}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };
    useEffect(() => {
        if (selectedOption) {
            fetchProductByCategory();
        } else {
            axios.get('https://fakestoreapi.com/products')
                .then(response => {
                    setProduct(response.data)
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [selectedOption]);

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div>
            <Header />
            <div className='flex items-center bg-indigo-100  w-full pt-5 min-h-screen'>

                <div className="container ml-auto mr-auto flex flex-wrap items-start">
                    <div>
                        <select className='-ml-32 w-52 h-10 rounded-2xl' id="mySelect" value={selectedOption} onChange={handleOptionChange}>
                            <option value="">select</option>
                            {

                                categories.map((_ele, i) => (
                                    <option value={_ele} key={i}>{_ele}</option>
                                ))
                            }
                        </select>
                    </div>
                    {product.map((_data, i) => (
                        <div key={i} className="w-full md:w-1/2 lg:w-1/4 pl-5 pr-5 mb-5 lg:pl-2 lg:pr-2">
                            <div className="bg-white rounded-lg m-h-64 p-2 transform hover:translate-y-2 hover:shadow-xl transition duration-300">
                                <figure className="mb-2">
                                    <img src={_data.image} alt={_data.title} className="h-64 ml-auto mr-auto" />
                                </figure>
                                <div className="rounded-lg p-4 bg-purple-700 flex flex-col overflow-hidden">
                                    <div>
                                        <h5 className="text-white text-2xl font-bold leading-none w-auto truncate">
                                            {_data.title}
                                        </h5>
                                        <span className="text-xs text-gray-400 leading-none w-56 truncate">{_data.description}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="text-lg text-white font-light">
                                            ${_data.price}
                                        </div>
                                    </div>
                                    <button className='bg-gray-300 h-10'>Add to cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Clothe
