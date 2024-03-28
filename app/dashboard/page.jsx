import { getTodaySales } from '@/app/db/client';
import { format } from 'date-fns';

import {BuildingStorefrontIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid'

export default async function DashboardPage() {

  const [{ total, cantidad_ventas }] = await getTodaySales(format(new Date(), "yyyy-MM-dd"));

  return (
    <>
      <div className='bg-white shadow-lg w-full flex flex-col p-2 h-auto rounded-md'>
        <div className='h-12 flex justify-between items-center'>
          <p className='text-lg font-bold text-blue-800'>Ventas de hoy</p>
          <button className='border-2 border-blue-800/20 p-2 cursor-pointer text-blue-800'>Exportar</button>
        </div>

        <div className='w-full bg-emerald-300/80 flex flex-col rounded-md h-48 shadow-sm items-center justify-center p-2 mt-8'>
          <CurrencyDollarIcon className='w-16 h-16 text-white bg-emerald-500 rounded-full p-2 my-2'/>
          <p className='text-4xl font-semibold text-teal-950'>${total}</p> 
          <p className='text-base font-bold text-teal-700/80'>Ventas Totales</p> 
        </div>

        <div className='w-full bg-amber-300/80 flex flex-col rounded-md h-48 shadow-sm items-center justify-center p-2 mt-8'>
          <BuildingStorefrontIcon className='w-16 h-16 text-white bg-amber-500 rounded-full p-2 my-2'/>
          <p className='text-4xl font-semibold text-orange-950'>{cantidad_ventas}</p> 
          <p className='text-base font-bold text-orange-950/80'>Cantidad de ventas</p> 
        </div>

      </div>

    </>
  )
}
