'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteProduct, updateProduct } from '@/app/actions';

import toast from 'react-hot-toast';

import { PencilSquareIcon } from '@heroicons/react/24/solid'

export default function productList() {

  const router = useRouter();

  const [products, setProducts] = useState([]);

  const [productPrice, setProductPrice] = useState('');
  const [productId, setProductId] = useState('');

  const [res, setRes] = useState(null);

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
    } else {
      toast.error('Error ' + response.rawCode);
    }
  }

  async function editProduct(product) {
    let productUpdated = {
      id: product.product_id,
      name: product.product_name,
      price: productPrice,
    }

    const response = await updateProduct(productUpdated);

    const newProjects = products.map(p =>
      p.product_id == productUpdated.id
        ? { ...p, product_price: productUpdated.price }
        : p
    );


    setProducts(newProjects)

    toast.success('Precio cambiado! ');
    setProductId('')

  }

  function handlePrice(e, product) {
    setProductPrice(e.target.value);
    console.log(e.target.value + " " + product.product_price);
  }

  function handleFocus(e, product) {
    setProductId(product.product_id)
    setProductPrice(product.product_price)
    //console.log( e.target.value + " " + product.product_price);
    console.log('focus => ' + productId);
  }

  function handleFocusOut(e, product) {
    //e.target.value = product.product_price;
    
    //console.log( e.target.value + " " + product.product_price);
    console.log('focus out=> ');
  }

  useEffect(() => {
    fetchProducts();
  }, []);



  return (
    <div className='my-8'>
      <p className='text-teal-500/80 text-sm my-2'> Lista de productos</p>
      <div className='flex flex-col bg-white shadow-md p-2 rounded-md'>
        {products.map((product) => {
          return (
            <div className='flex p-2 w-full items-center' key={product.product_id}>
              <p
                className='w-20 cursor-pointer hover:bg-red-400 text-center'
                onClick={() => removeProduct(product.product_id)}
              >

                {product.product_id}
              </p>
              <p className='w-80'>{product.product_name}</p>
              <button onClick={() => editProduct(product)} disabled={productId === product.product_id ? false : true}>
                <PencilSquareIcon
                  className={`w-12 h-12 mx-2  ${productId === product.product_id ? 'text-yellow-500 hover:text-yellow-400' : 'text-gray-400'}`}
                  
                />
              </button>

              $
              <input
                className='font-bold w-16'
                type='number'
                defaultValue={product.product_price}
                onChange={(e) => handlePrice(e, product)}
                onFocus={(e) => handleFocus(e, product)}
                onBlur={(e) => handleFocusOut(e, product)}
              />
            </div>
          )

        })}
      </div>


    </div>
  )
}
