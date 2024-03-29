import SalesTable from '@/app/ui/sales/sales-table';
import Link from 'next/link';

export default function CustomersPage() {
    return (
        <div className='h-full flex flex-col bg-zinc-800 rounded-md p-2'>
            <p className='text-teal-400'>Dashboard / Sales Page</p>
            <Link 
                href='/dashboard/sales/new' 
                className='hover:bg-teal-400 hover:text-white bg-zinc-700 text-teal-400 font-bold p-4 mt-4 mb-5 md:w-80 rounded-md border-2 border-teal-500/20 text-center'
            > 
            Generar nueva venta
            </Link>
            <SalesTable/>
        </div>
    )
}

//VENTA
//Timestamp
//Products [{name, price, quantity, subtotal},{name, price, quantity, subtotal}]
//Total
