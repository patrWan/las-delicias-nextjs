'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function create(total, paid, sale) {
    const body = {
        date: new Date(),
        total,
        state: paid,
        products: sale,
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };

    try {
        await fetch('http://localhost:3000/api/sales', requestOptions)
            .then(response => {
                if (response.status == 200) {
                    console.log('ok')
                    revalidatePath('/dashboard');
                    
                } else {
                    alert(response.status);
                    setResult(false);

                    setOpenPopUp(!openPopUp);
                }
            })
    } catch (error) {
        alert(error);
    }

    
}

export async function deleteSale(sales, saleId){
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saleId)
    };

    let res;
    await fetch(`http://localhost:3000/api/sales/detail`,requestOptions)
        .then(response => {
                console.log(response.status)
                revalidatePath('/dashboard');
                res = response.status;
        });
    return res;
}