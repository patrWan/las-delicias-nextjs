
"use client";
import dynamic from "next/dynamic";
const PDFDownloadLink = dynamic(() => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink), {
    ssr: false,
    loading: () => <p className="text-teal-600 font-bold text-xl">Cargando Documento...</p>,
});

import ResumePdf from '@/app/components/resumePdf';
import { useEffect, useState } from "react";


export default function CreatePdf() {

    let [items, setItems] = useState([]);

    async function getSales(){
        await fetch(`/api/sales/products`)
                .then(response => response.json())
                .then(data => setItems(data));
    }

    useEffect(()=> {
        getSales();
    },[])
    
    return (
        <div className="flex bg-zinc-800 h-96 items-center justify-center rounded-lg">
            <PDFDownloadLink document={<ResumePdf items={items}/>} fileName="somename.pdf">
                {({ loading }) => (loading ? '': <button className='border-2 bg-zinc-700 border-teal-600/20 p-2 cursor-pointer text-teal-400 hover:text-teal-200 font-bold uppercase'>Descargar</button>)}
            </PDFDownloadLink>
        </div>
    )
}