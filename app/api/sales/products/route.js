import { getProductSales } from '@/app/db/client';

export async function GET() {
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    
    var time = now.getHours() + ":" + now.getMinutes() + ":" +now.getSeconds();

    //月と日は0埋めを行う
    m = m < 10 ? "0" + m : m;
    d = d < 10 ? "0" + d : d;

    var date = y + "-" + m + "-" + d;

    console.log(date);
    const data = await getProductSales(date);

    
/*
    const intl = new Intl.DateTimeFormat('es-CL',{
        dateStyle: 'medium',
        timeStyle : 'medium',
      }).format(new Date(date));
    console.log('date format => '+intl);
*/

    return Response.json(data);

}