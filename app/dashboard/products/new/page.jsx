'use client'

import { useState } from "react";
import { addProduct } from "@/app/actions";

export default function () {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');

    function handleProductName(e) {
        console.log(e.target.value)
        setProductName(e.target.value)
    }

    function handleProductPrice(e) {
        setProductPrice(e.target.value)
    }

    return (
        <div className="bg-zinc-800 text-center h-96 p-6">
            Registrar nuevo producto
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4 justify-center my-6">
                <input
                    type="text"
                    placeholder="Nombre Producto"
                    className="p-2"
                    onChange={handleProductName}
                    value={productName}
                    required
                />
                <input
                    type="number"
                    placeholder="Precio"
                    className="p-2"
                    onChange={handleProductPrice}
                    value={productPrice}
                    required
                />

                <button
                    className='hover:bg-teal-400 hover:text-white bg-zinc-700 text-teal-400 font-bold my-5 p-4 w-56 md:w-80 rounded-md border-2 border-teal-500/20 text-center'
                    onClick={() => addProduct(productName, productPrice)}
                >Agregar</button>
            </div>
        </div>
    )
}