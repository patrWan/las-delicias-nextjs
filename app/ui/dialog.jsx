'use client'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'

import { deleteSale } from '../actions'

import toast from 'react-hot-toast'

export default function MyModal({ isOpen, setIsOpen, saleId, sales, setSales }) {

    let [sale, setSale] = useState([]);

    function closeModal() {
        setIsOpen(false)
    }

    async function handleDelete() {
        

        const response = await deleteSale(sales, saleId);

        if(response === 200){
            const filter = sales.filter(sale => sale.sale_id !== saleId);
            setSales(filter)
            setIsOpen(false);
            toast.success('Se ha removido la venta ID: '+saleId, {icon: '😸👍',});
        }


    }

    async function getSalesDetail() {
        await fetch(`/api/sales/detail?id=${saleId}`)
            .then(response => response.json())
            .then(data => setSale(data));

    }

    useEffect(() => {

        if (isOpen == true) {
            getSalesDetail();
        }
    }, [isOpen])

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900 flex"
                                    >
                                        Venta ID N° : {sale.length != 0 ? <> {sale[0].sale_id}<p className='ml-10'>{sale[0].sale_state ? '|Pagado|' : '|Pendiente|'}</p></> : ''}

                                    </Dialog.Title>

                                    <div className="mt-2 flex flex-col">
                                        <p className="text-gray-500 mb-2">
                                            {sale.length != 0 ? 
                                            new Intl.DateTimeFormat('es-CL',{
                                                dateStyle: 'full',
                                                timeStyle : 'medium',
                                              }).format(new Date(sale[0].sale_date ))
                                            
                                            : ''}
                                        </p>

                                        <div className='flex flex-col border-b-2'>


                                            {sale.map(detail => {
                                                return (
                                                    <span className="flex flex-col p-2 w-full" key={detail.product_name} >

                                                        <p className="text-slate-500">{detail.detail_quantity} Und. x ${detail.product_price}</p>
                                                        <div className="flex justify-between w-full">

                                                            <p>{detail.product_name} </p>
                                                            <p>${detail.detail_subtotal}</p>
                                                        </div>

                                                    </span>

                                                )
                                            })}
                                        </div>
                                        <div className='w-96 mt-5'>
                                            <p className=" text-gray-500  font-bold mr-14">
                                                Total: ${sale.length != 0 ? sale[0].sale_total : ''}
                                            </p>
                                        </div>

                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Cerrar
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 ml-16"
                                            onClick={handleDelete}
                                        >
                                            Eliminar venta
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}