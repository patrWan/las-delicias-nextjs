import { getProducts, addProduct, deleteProduct } from '@/app/db/client';

export async function GET(){
    const data = await getProducts();

    return Response.json(data)
}

export async function POST(req){
    const data = await req.json();

    await addProduct(data.productName, data.productPrice);

    return Response.json({mes : ''})
}

export async function DELETE(req){
    const data = await req.json();
    try {
        const response = await deleteProduct(data);
        
        return Response.json(response); //error or null

    } catch (error) {
        console.log()
    }
}