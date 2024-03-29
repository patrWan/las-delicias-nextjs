
'use client'
import { useEffect, useState } from "react";
import { format } from 'date-fns'

import { CheckIcon, MinusIcon } from '@heroicons/react/24/solid'

import DialogModal from "@/app/ui/dialog";


export default function SalesTable() {
    const [startDate, setStartDate] = useState('');
    //const [endDate, setEndDate] = useState('');
    const [sales, setSales] = useState([]);
    const [filterState, setFilterState] = useState('');

    const [saleId, setSaleId] = useState('');

    let [isOpen, setIsOpen] = useState(false)

    const total = sales.reduce((acc, x) => {
        return acc + x.sale_total
    }, 0);

    async function getSales(date, state = '') {
        console.log()
        fetch(`/api/sales?date=${date}&state=${state}`)
            .then(response => response.json())
            .then(data => setSales(data));

    }

    useEffect(() => {
        var now = new Date();
        var y = now.getFullYear();
        var m = now.getMonth() + 1;
        var d = now.getDate();

        m = m < 10 ? "0" + m : m;
        d = d < 10 ? "0" + d : d;

        var date = y + "-" + m + "-" + d;
        setStartDate(date);
        getSales(date);

    }, [])

    function handleDate(e) {

        setStartDate(e.target.value);

        setFilterState('');

        getSales(e.target.value);
    }

    function handleSelect(e) {
        const state = e.target.value;

        setFilterState(state)

        getSales(startDate, state)

    }

    function handleModal(saleId) {
        setSaleId(saleId);
        setIsOpen(!isOpen);

    }

    return (
        <div className="flex flex-col-reverse md:items-start md:flex-row">

            {sales.length != 0 ?
                <div className="w-full md:w-2/3 flex md:p-2 h-max md:justify-center ">
                    <table className="bg-slate-50 w-full md:w-2/3 border-2 shadow-md">
                        <thead className="border-b-2 bg-teal-600 text-white">
                            <tr>
                                <th scope="col" className="text-sm">ID de venta</th>
                                <th scope="col">Total</th>
                                <th scope="col">Estado</th>
                            </tr>
                        </thead>
                        <tbody >
                            {sales.map(sale => {
                                return (
                                    <tr className="border-b-2 border-purple-950 hover:bg-slate-200 cursor-pointer" key={sale.sale_id} onClick={() => handleModal(sale.sale_id)}>
                                        <th scope="row" className="text-xs md:text-base border-r-2 w-20">{sale.sale_id} </th>
                                        <td className="text-left p-2">
                                            <p>${sale.sale_total}</p>
                                        </td>
                                        <td className={`text-center flex justify-center items-center p-2`}>
                                            <p>{sale.sale_state ? <CheckIcon className="h-6 w-6 text-green-500" /> : <MinusIcon className="h-6 w-6 text-yellow-500" />}</p>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                        <tfoot className="">
                            <tr className="">
                                <th scope="row" colSpan="1" className="">TOTAL:</th>
                                <td className="text-left font-bold p-2"><p>${total}</p></td>
                            </tr>
                        </tfoot>
                    </table>

                </div> : <div className="w-full text-teal-500 flex p-2 h-max justify-center text-center">No se registran ventas ! </div>}

            <div className="bg-zinc-800 md:ml-6 p-4 border-2 flex flex-col w-full md:w-1/4  mb-5">
                <input type="date" onChange={handleDate} value={startDate} className="h-12 w-full md:h-8" />
                <select
                    className="border-2 mr-4 mt-4 mb-4 p-2 w-full"
                    value={filterState}
                    onChange={handleSelect}

                >
                    <option value="">Todos</option>
                    <option value="1">Pagados</option>
                    <option value="0">Pendientes</option>

                </select>
            </div>

            <DialogModal isOpen={isOpen} setIsOpen={setIsOpen} saleId={saleId} setSales={setSales} sales={sales} />
        </div>
    )
}
