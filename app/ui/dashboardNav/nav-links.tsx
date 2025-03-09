'use client'
import { UserGroupIcon,
         HomeIcon,
         DocumentDuplicateIcon 
        }
         from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
const path = usePathname();
const links = [
    {
        name : 'accueil',
        href : '/dashboard',
        icon : HomeIcon,
    },
    {
        name : 'client',
        href : '/dashboard/customers',
        icon : UserGroupIcon,
    },
    {
        name : 'facture',
        href : '/dashboard/invoices',
        icon : DocumentDuplicateIcon,
    }
]

export default function NavLinks(){
    return(
    <>
    {
        links.map((item) =>{
            
            const Icon = item.icon;

            return(
                <Link 
                className={clsx
                    ('navLink flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                    {
                        'bg-sky-100 text-blue-600' : path === item.href,
                    }
                )}
                key={item.name}
                href={item.href}>
                <Icon style={{width:'26px'}}/>
                            {item.name}</Link>
                )
        })
    }
    </>

    )
}