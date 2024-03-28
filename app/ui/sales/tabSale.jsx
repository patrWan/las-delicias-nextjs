import { Tab } from '@headlessui/react'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'

export default function Tabs({ children }) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  return (
    <Tab.Group>
      <Tab.List className="w-full flex space-x-1 rounded-xl bg-blue-600 p-1 my-2">
        <Tab className={({ selected }) =>
          classNames(
            'w-full rounded-lg py-2.5 text-sm font-medium leading-5 flex justify-center items-center',
            'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
            selected
              ? 'bg-white text-blue-700 shadow'
              : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
          )
        }>
          Agregar Productos

        </Tab>
        <Tab className={({ selected }) =>
          classNames(
            'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
            'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
            selected
              ? 'bg-white text-blue-700 shadow'
              : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
          )
        }>
          Registrar Venta

        </Tab>
      </Tab.List>
      <Tab.Panels >
        {children}
      </Tab.Panels>
    </Tab.Group>
  )
}