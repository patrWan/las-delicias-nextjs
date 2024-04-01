import { createClient } from "@libsql/client";
import { revalidatePath } from "next/cache";

const client = createClient({
    url: "file:C:/Users/patri/OneDrive/Escritorio/las-delicias.db",
});

export const getProducts = async () => {
    const result = await client.execute({
        sql: 'SELECT * FROM Product;',
        args: []
    });
    return result.rows;
}

export const addProduct = async (name, price) => {
    const result = await client.execute({
        sql: 'INSERT INTO Product (product_name, product_price, product_image) VALUES(?, ?, null);',
        args: [name, price]
    });
    return result.rows;
}

export const deleteProduct = async (productId) => {
    try {
        const result = await client.execute({
            sql: 'DELETE FROM Product WHERE Product.product_id = ?;',
            args: [productId]
        });
        return null;
    } catch (error) {
        return error;
    }

}

export const updateProduct = async (id, name, price) => {
    try {
        const result = await client.execute({
            sql: 'UPDATE Product SET product_name = ?, product_price = ? WHERE product_id = ?;',
            args: [name, price, id]
        });
        return null;
    } catch (error) {
        return error;
    }

}

export const getSales = async (date) => {
    const result = await client.execute({
        sql: 'SELECT * FROM Sale WHERE Sale.sale_date LIKE ? ORDER BY Sale.sale_date DESC;',
        args: ['%' + date + '%']
    });
    return result.rows;
}

export const getSalesByState = async (date, state) => {
    const result = await client.execute({
        sql: 'SELECT * FROM Sale WHERE Sale.sale_date LIKE ? AND Sale.sale_state = ? ORDER BY Sale.sale_date DESC;',
        args: ['%' + date + '%', state]
    });
    return result.rows;
}

export const addSale = async (date, total, state) => {
    const result = await client.execute({
        sql: 'INSERT INTO Sale (sale_date, sale_total, sale_state) VALUES (?, ?, ?);',
        args: [date, total, state]
    });



    return result.lastInsertRowid;
}

export const addDetail = async (product_id, sale_id, quantity, subtotal) => {
    const result = await client.execute({
        sql: 'INSERT INTO Detail (product_id, sale_id ,detail_quantity, detail_subtotal) VALUES (?, ?, ?, ?)',
        args: [product_id, sale_id, quantity, subtotal]
    });

    return result.rows;
}

export const getSaleDetail = async (sale_id) => {
    const result = await client.execute({
        sql: `SELECT Sale.sale_id, Product.product_name, Product.product_price, Detail.detail_quantity, Detail.detail_subtotal, Sale.sale_total, Sale.sale_state, Sale.sale_date 
                FROM Product, Sale, Detail
                WHERE Product.product_id = Detail.product_id AND Sale.sale_id = Detail.sale_id AND Sale.sale_id = ?`,
        args: [sale_id]
    });

    return result.rows;
}

export const deleteSale = async (sale_id) => {
    const result = await client.execute({
        sql: `DELETE FROM SALE WHERE Sale.sale_id = ?`,
        args: [sale_id]
    });

    return result.rows;
}

export const updateSaleState = async (id, state) => {
    try {
        const result = await client.execute({
            sql: 'UPDATE Sale SET sale_state = ? WHERE sale_id = ?;',
            args: [state, id]
        });
        return null;
    } catch (error) {
        return error;
    }

}

export const getTodaySales = async (date) => {
    const result = await client.execute({
        sql: `	SELECT SUM(Detail.detail_subtotal) AS 'total', COUNT(DISTINCT Sale.sale_id) AS 'cantidad_ventas'
        FROM Detail, Product, Sale
        WHERE Product.product_id = Detail.product_id AND Sale.sale_id = Detail.sale_id AND Sale.sale_date LIKE ?`,
        args: ['%' + date + '%']
    });

    return result.rows;
}

export const getProductSales = async (date) => {
    const result = await client.execute({
        sql: `SELECT Product.product_name,SUM( Detail.detail_quantity) AS 'cantidad', SUM(Detail.detail_subtotal) AS 'subtotal'  
        FROM Detail, Product, Sale
        WHERE Product.product_id = Detail.product_id  AND Sale.sale_id = Detail.sale_id
        AND Sale.sale_date LIKE ?
        GROUP BY Product.product_name;`,
        args: ['%' + date + '%']
    });

    return result.rows;
}

export const dynamic = "force-dynamic";

