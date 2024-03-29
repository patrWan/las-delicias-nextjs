'use client'
import { useEffect, useState } from 'react';

import ModalSale from '@/app/ui/sales/modalSale';
import Tabs from '@/app/ui/sales/tabSale';
import { Tab } from '@headlessui/react'

import { ShoppingCartIcon } from '@heroicons/react/24/solid'

import toast from 'react-hot-toast'

export default function newSale() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState(1);

    const [sale, setSale] = useState([]);

    const [total, setTotal] = useState(0);



    useEffect(() => {
        async function getproducts() {
            fetch(`/api/products`)
                .then(response => response.json())
                .then(data => setProducts(data));

        }
        getproducts();
    }, []);

    function handleChange(e) {
        if (e.target.value === '') {
            setSelectedProduct('');
        } else {
            setSelectedProduct(JSON.parse(e.target.value));
        }

    }

    function handleQuantity(e) {
        setQuantity(e.target.value)
    }

    function addProduct() {
        const product = {
            id: selectedProduct.product_id,
            name: selectedProduct.product_name,
            price: selectedProduct.product_price,
            quantity: quantity,
            subtotal: selectedProduct.product_price * quantity,
        }

        if (sale.some(x => x.name === product.name)) {
            toast.error('Producto ya ha sido agregado',{icon:'😿'});
        } else {
            setSale([...sale, product]);
            setTotal(total + product.subtotal);
            setQuantity(1)
            setSelectedProduct('')
            toast.success('Se han añadido '+product.quantity+" "+product.name, {icon: '😸👍',});

        }

    }

    

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div className="w-full md:w-1/2 bg-zinc-800 p-2 rounded-md shadow-xl border-2 border-teal-500">
            <Tabs className="w-full max-w-md px-2 py-8 sm:px-0">
                <Tab.Panel className={classNames(
                    'rounded-xl bg-white p-3', 'ring-teal/60 ring-offset-2 ring-offset-teal-400 focus:outline-none focus:ring-2', 'flex justify-center'
                )}>
                    <div className="flex flex-col p-4 md:w-1/2 items">
                        <div className='flex flex-col md:flex-row'>
                            <select
                                className="border-2 mr-4 mt-4 mb-4 p-2 w-full md:w-60"
                                onChange={handleChange}

                            >
                                <option value="">Seleccione un producto</option>
                                {products.map(product => (
                                    <option
                                        key={product.product_id}
                                        value={JSON.stringify(product)}

                                    >
                                        {product.product_name}
                                    </option>
                                ))}

                            </select>
                            <div className='flex md:flex-col'>
                                <p className='font-semibold'>Subtotal:  {selectedProduct ? '$' + selectedProduct.product_price * quantity : ''}</p>
                            </div>

                        </div>

                        <div className='flex flex-col'>
                            <input
                                type="number"
                                placeholder="Cantidad"
                                className="border-2 mr-4 mt-4 mb-4 p-2 w-full md:w-60"
                                onChange={handleQuantity}
                                value={quantity}
                                min="1"

                            />
                            <button
                                className={`p-2 rounded-sm text-white uppercase font-semibold flex justify-center items-center  ${selectedProduct === '' ? 'bg-blue-200' : 'bg-blue-700 hover:bg-blue-500'}`}
                                onClick={addProduct}
                                disabled={selectedProduct === '' ? 'disabled' : ''}
                            >
                                {<ShoppingCartIcon className='h-8 w-8 mr-2'/>}
                                Agregar
                            </button>
                        </div>
                    </div>
                </Tab.Panel>
                <Tab.Panel className={classNames(
                    'rounded-xl bg-white p-3',
                    'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                )}>
                    <ModalSale sale={sale} total={total} setSale={setSale} setSelectedProduct={setSelectedProduct} setTotal={setTotal} />
                </Tab.Panel>
            </Tabs>
            
        </div>
    )
}