import {getSaleDetail, deleteSale, updateSaleState} from '@/app/db/client';

export async function GET(req){
    
    const date = req.nextUrl.searchParams.get(['id']);
    const state = req.nextUrl.searchParams.get(['state']);

    if(state == ''){

        const data = await getSaleDetail(date, state);

        return Response.json(data);
    }
    
    const data = await getSaleDetail(date);

    return Response.json(data)
}

export async function PUT(req){
    const data = await req.json();
    updateSaleState(data.id, data.state);
    
    return Response.json({mes : ''});
}

export async function DELETE(req){
    const data = await req.json();

    deleteSale(data)
    
    return Response.json({mes : ''});
}

const dynamic = 'force-dynamic'