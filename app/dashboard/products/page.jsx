import ProductList from '@/app/ui/products/products-list';

export default function ProductsPage() {
    return (
        <div className='bg-zinc-800 p-2'>
            <p className='text-teal-500 font-bold'> Dashboard / Products Page</p>
            <ProductList/>

        </div>
    )
}