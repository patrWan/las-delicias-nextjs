import { getProducts } from '@/app/db/client';

export async function GET(){
    const data = await getProducts();

    return Response.json(data)
}