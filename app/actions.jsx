'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function create(total, paid, sale) {
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();

    //月と日は0埋めを行う
    m = m < 10 ? "0" + m : m;
    d = d < 10 ? "0" + d : d;

    var time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

    var date = y + "-" + m + "-" + d + " " + time;

    const body = {
        date,
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
                    revalidatePath('/dashboard');

                } else {
                    alert(response.status);
                    setResult(false);

                    setOpenPopUp(!openPopUp);
                }
            })
    } catch (error) {
        console.log(error);
    } finally {
        redirect('/dashboard/sales');
    }


}

export async function deleteSale(sales, saleId) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saleId)
    };

    let res;
    await fetch(`http://localhost:3000/api/sales/detail`, requestOptions)
        .then(response => {
            revalidatePath('/dashboard');
            res = response.status;
        });
    return res;
}

export async function addProduct(productName, productPrice) {
    const body = {
        productName,
        productPrice
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };

    try {
        await fetch('http://localhost:3000/api/products', requestOptions).then(response => {
            if (response.status == 200) {

            } else {
                alert(response.status);
            }
        })
    } catch (error) {
        console.log(error)
    } finally {
        redirect('/dashboard/products');
    }



}

export async function deleteProduct(productId) {

    let response;

    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productId)
    };
    try {
        await fetch(`http://localhost:3000/api/products`, requestOptions)
        .then(response => response.json())
        .then(data => {
            revalidatePath('/dashboard/products');
            response = data;
           
        });
    } catch (error) {
        return error;
        
    }finally {
        revalidatePath('/dashboard/products');
        return response;
    }
    
}   

export async function updateProduct(productUpdated) {

    let response;

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productUpdated)
    };
    try {
        await fetch(`http://localhost:3000/api/products`, requestOptions)
        .then(response => response.json())
        .then(data => {
            response = data;
           
        });
    } catch (error) {
        return error;
        
    }finally {
        return response;
    }
    
}   



