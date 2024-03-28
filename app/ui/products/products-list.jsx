import {getProducts} from '@/app/db/client';

export default async function productList() {
  
  const products = await getProducts();

  return (
    <div>
      Lista de productos
      <div className='flex flex-col bg-white shadow-md p-2 rounded-md'> 
        {products.map((product) => {
          return (
            <div className='flex justify-between p-4'>
              <p>{product.product_name}</p>
              <p className='font-bold'>${product.product_price}</p>
            </div>
          )
          
        })}
      </div>


    </div>
  )
}
