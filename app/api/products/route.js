import { getProducts, addProduct } from '@/app/db/client';

export async function GET(){
    const data = await getProducts();

    return Response.json(data)
}

export async function POST(req){
    const data = await req.json();

    await addProduct(data.productName, data.productPrice);

    return Response.json({mes : ''})
}