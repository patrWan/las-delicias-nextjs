'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, UserGroupIcon, ShoppingBagIcon, BuildingStorefrontIcon, ShoppingCartIcon } from '@heroicons/react/24/solid'

const links = [
    { name: 'Inicio', href: '/dashboard', icon: <HomeIcon className=""/> },
    { name: 'Clientes', href: '/dashboard/customers', icon: <UserGroupIcon/> },
    { name: 'Productos', href: '/dashboard/products', icon: <ShoppingBagIcon/> },
    { name: 'Ventas', href: '/dashboard/sales', icon: <BuildingStorefrontIcon/>},
];

export default function SideBar() {
    const pathname = usePathname();
    return (
        <div className="flex flex-col w-36 bg-zinc-800 text-white">
            <p className="mb-2 p-2 bg-zinc-900">Las Delicias</p>
            {links.map(link => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={ `p-2 hover:bg-zinc-600 hover:text-white flex
                            ${pathname === link.href ? 'bg-zinc-600' : ''}
                            `}
                    ><p className="mr-2 h-6 w-6">{link.icon}</p> <p className="">{link.name}</p></Link>
                )
            })}

        </div>
    )
}
