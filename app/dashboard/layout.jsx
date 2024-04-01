'use client'
import SideBar from "@/app/ui/side-bar";
import MenuMobile from "@/app/ui/mobile_menu";
import toast, { Toaster } from 'react-hot-toast';


export default function ({ children }) {
    return (
        <div className="bg-slate-50 flex h-screen flex-col md:flex-row md:overflow-hidden">
            <Toaster toastOptions={{
                success: {
                    style: {
                        border: '1px solid #10DA00',
                        padding: '16px',
                        color: '#713200',
                    },
                },
                error: {
                    style: {
                        border: '1px solid #DA4F00 ',
                        padding: '16px',
                        color: '#713200',

                    },
                },

            }} />
            <div className="hidden md:flex">
                <SideBar />
            </div>
            <div className="md:hidden mb-10">
                <MenuMobile />
            </div>


            <div className="w-full min-h-full bg-teal-600">
                <div className="bg-repeat w-full h-full text-primary-100 heropattern-overlappinghexagons-teal-900" >
                    <div className="flex-grow p-4 md:overflow-y-auto md:p-12">
                        {children}
                    </div>
                </div>
            </div>
        </div >
    )
}