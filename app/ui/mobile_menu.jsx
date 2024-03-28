import { Fragment } from 'react'
import { Menu } from '@headlessui/react'

import Link from "next/link";
import { usePathname } from "next/navigation";

import { HomeIcon, UserGroupIcon, ShoppingBagIcon, BuildingStorefrontIcon, ShoppingCartIcon } from '@heroicons/react/24/solid'

const links = [
    { name: 'Inicio', href: '/dashboard', icon: <HomeIcon className=""/> },
    { name: 'Clientes', href: '/dashboard/customers', icon: <UserGroupIcon/> },
    { name: 'Productos', href: '/dashboard/products', icon: <ShoppingBagIcon/> },
    { name: 'Ventas', href: '/dashboard/sales', icon: <BuildingStorefrontIcon/>},
];

export default function MyDropdown() {
    return (
        <Menu as="div" className=" w-full h-10 fixed inline-block text-left bg-zinc-800 text-white z-5">
            <Menu.Button className="p-2">Menu</Menu.Button>
            <Menu.Items className="flex flex-col">
                {links.map((link) => (
                    /* Use the `active` state to conditionally style the active item. */
                    <Menu.Item key={link.href} as={Fragment} className="bg-zinc-800 p-4 text-white">
                        {({ active }) => (
                            <Link
                                href={link.href}
                                className={`flex ${active ? 'bg-blue-500 text-white' : 'bg-white text-white'
                                    }`}
                            >
                                <p className="mr-2 h-6 w-6">{link.icon}</p> <p className="">{link.name}</p>
                            </Link>
                        )}
                    </Menu.Item>
                ))}
            </Menu.Items>
        </Menu>
    )
}