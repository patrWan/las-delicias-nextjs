import { getProductSales } from '@/app/db/client';

export async function GET(req) {
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();

    //月と日は0埋めを行う
    m = m < 10 ? "0" + m : m;
    d = d < 10 ? "0" + d : d;

    var date = y + "-" + m + "-" + d;

    const data = await getProductSales(date);

    return Response.json(data);

}