'use client'

import { useState } from "react";

import Popup from "../popup";

import { TrashIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';
import { create } from "@/app/actions";
import { redirect } from "next/navigation";

export default function modalSale(props) {
    const { sale, total, setTotal, setSale, setSelectedProduct } = props;

    const [open, setOpen] = useState(false);
    const [paid, setPaid] = useState(true);
    const [date, setDate] = useState('1970/01/01');

    const [openPopUp, setOpenPopUp] = useState(false);
    const [result, setResult] = useState({});



    function removeProduct(productRemove) {
        const filter = sale.filter(product => product.name !== productRemove.name);
        setTotal(total - productRemove.subtotal);
        setSale(filter);
        toast.success('Se ha removido ' + productRemove.quantity + " " + productRemove.name, { icon: '😸👍', });
    }


    function handleModal() {
        setOpen(!open);
        setDate(new Date())
    }

    function handleSelect() {
        setPaid(!paid);
    }

    function confirmSale() {
        setResult(true);

        setOpen(!open);
        toast.success('Venta registrada con exito');

        setSale([]);
        setSelectedProduct('');
        setTotal(0);

        
        create(total, paid, sale);
        

    }

    return (
        <div>
            <Popup openPopUp={openPopUp} setOpenPopUp={setOpenPopUp} result={result} />

            <div
                className={''/*`w-screen h-full fixed z-10 left-0 top-0 overflow-auto transition-colors ${open ? 'visible bg-black/80' : 'invisible'}`*/}
            >

                <div className={`bg-slate-50 md:mx-auto flex flex-col `}>
                    <div className="flex flex-col items-center">
                        <div className="mt-2 w-full">
                            <div className="flex justify-between bg-black text-white text-sm uppercase w-full p-2">
                                <p>Producto</p>
                                <p>Subtotal</p>
                            </div>
                            {sale.map(product => (
                                <div className="flex items-center justify-center" key={product.name}>
                                    <TrashIcon className="w-8 h-8 text-red-600 hover:text-red-400 cursor-pointer" onClick={() => removeProduct(product)} />
                                    <span className="flex flex-col p-2 w-full" >

                                        <p className="text-slate-500">{product.quantity} Und. x ${product.price}</p>
                                        <div className="flex justify-between w-full">

                                            <p>{product.name} </p>
                                            <p>${product.subtotal}</p>
                                        </div>

                                    </span>
                                </div>

                            ))}
                            <div className="p-2 border-2 border-green-400 h-12 mt-2">
                                <p className="float-right">Total a pagar: <span className="text-xl font-bold">${total}</span></p>
                            </div>
                            <div className="my-2">
                                <select name="state" id="state" className="w-full p-2 border-2 border-teal-900 bg-teal-950 text-white" onChange={handleSelect}>
                                    <option value="true">Pagado</option>
                                    <option value="false">Pendiente</option>
                                </select>
                            </div>
                            <div>
                                <button
                                    className={`text-slate-200 p-2 mt-2 w-full ${sale.length == 0 ? 'bg-teal-400' : 'bg-teal-600 hover:bg-teal-400 hover:text-white'}`}
                                    onClick={confirmSale}
                                    disabled={sale.length == 0 ? true : false}
                                >Confirmar venta </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}
