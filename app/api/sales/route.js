import {getSales, getSalesByState, addSale, addDetail} from '@/app/db/client';

export async function GET(req){
    
    const date = req.nextUrl.searchParams.get(['date']);
    const state = req.nextUrl.searchParams.get(['state']);

    if(state !== ''){

        const data = await getSalesByState(date, state);

        return Response.json(data);
    }
    
    const data = await getSales(date);

    return Response.json(data)
}

export async function POST(req){
    const data = await req.json();
    const result = await addSale(data.date, data.total, data.state);

    const id_sale = result.toString();
    data.products.map(product => {
        addDetail(product.id, id_sale, product.quantity, product.subtotal);
    });

    return Response.json({mes : ''})
}