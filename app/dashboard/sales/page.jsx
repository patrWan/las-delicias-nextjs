import SalesTable from '@/app/ui/sales/sales-table';
import Link from 'next/link';

export default function CustomersPage() {
    return (
        <div className='h-full flex flex-col'>
            <p>Dashboard / Sales Page</p>
            <Link 
                href='/dashboard/sales/new' 
                className='hover:bg-indigo-400 hover:text-white bg-indigo-700 text-white font-bold p-4 mt-4 mb-5 md:w-80'
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
