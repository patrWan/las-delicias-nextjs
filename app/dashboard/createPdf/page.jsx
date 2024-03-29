
"use client";
import dynamic from "next/dynamic";
const PDFDownloadLink = dynamic(() => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink), {
    ssr: false,
    loading: () => <p>Loading...</p>,
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
        <div>
            <PDFDownloadLink document={<ResumePdf items={items}/>} fileName="somename.pdf">
                {({ loading }) => (loading ? "Loading document..." : <button className='border-2 bg-white border-teal-800/20 p-2 cursor-pointer text-teal-400 hover:text-teal-200'>Descargar</button>)}
            </PDFDownloadLink>
        </div>
    )
}