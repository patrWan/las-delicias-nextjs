'use client'
import { useEffect, useState } from 'react';

import { deleteProduct } from '@/app/actions';

import toast from 'react-hot-toast';

export default function productList() {

  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    await fetch(`http://localhost:3000/api/products`)
      .then(response => response.json())
      .then(data => setProducts(data));
  }

  async function removeProduct(product_id) {
    const response = await deleteProduct(product_id);

    console.log(response)
    
    if (response == null) {
      const filter = products.filter(product => product.product_id !== product_id);
      setProducts(filter);
      toast.success('Producto removido! ' + { icon: '😸👍', });
    }else{
      toast.error('Error ' + response.rawCode);
    }




  }

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <div className='my-8'>
      <p className='text-teal-500/80 text-sm my-2'> Lista de productos</p>
      <div className='flex flex-col bg-white shadow-md p-2 rounded-md'>
        {products.map((product) => {
          return (
            <div className='flex p-2 w-full' key={product.product_id}>
              <p
                className='w-20 cursor-pointer hover:bg-red-400 text-center'
                onClick={() => removeProduct(product.product_id)}
              >

                {product.product_id}
              </p>
              <p className='w-80'>{product.product_name}</p>
              <p className='font-bold'>${product.product_price}</p>
            </div>
          )

        })}
      </div>


    </div>
  )
}
