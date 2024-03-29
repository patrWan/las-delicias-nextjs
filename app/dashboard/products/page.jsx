import ProductList from '@/app/ui/products/products-list';
import Link from 'next/link';

export default function ProductsPage() {
    return (
        <div className='bg-zinc-800 p-2 flex flex-col'>
            <p className='text-teal-500 font-bold'> Dashboard / Products Page</p>
            <ProductList/>
            <Link 
                href='/dashboard/products/new' 
                className='hover:bg-teal-400 hover:text-white bg-zinc-700 text-teal-400 font-bold mb-5 p-5 md:w-80 rounded-md border-2 border-teal-500/20 text-center'
            > 
                Registrar Producto
            </Link>

        </div>
    )
}