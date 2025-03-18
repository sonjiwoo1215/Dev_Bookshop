const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes'); // status code 모듈

const order = (req, res) => {
    const { items, delivery, totalQuantity, totalPrice, userId, firstBookTitle } = req.body;

    let delivery_id = 2;
    let order_id = 4;

    let sql = "INSERT INTO delivery (address, receiver, contact) VALUES (?,?,?)";
    // const delivery_id = SELECT max(id) FROM delivery;
    let values = [delivery.address, delivery.receiver, delivery.contact];
    // conn.query(sql, values,
    //     (err, results) => {
    //         if (err) {
    //             console.log(err);
    //             return res.status(StatusCodes.BAD_REQUEST).end();
    //         }
    //         delivery_id = results.insertId;
    //         res.status(StatusCodes.OK).json(results);
    //     })

    sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) 
            VALUES (?,?,?,?,?);`
    values = [firstBookTitle, totalQuantity, totalPrice, userId, delivery_id];
    // conn.query(sql, values,
    // (err, results) => {
    //     if (err) {
    //         console.log(err);
    //         return res.status(StatusCodes.BAD_REQUEST).end();
    //     }
    //     order_id = results.insertId;
    //     res.status(StatusCodes.OK).json(results);
    // })

    sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?;`

    values = [];
    items.forEach(item => {
        values.push([order_id, item.book_id, item.quantity]);
    });
    conn.query(sql, [values],
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            order_id = results.insertId;
            res.status(StatusCodes.OK).json(results);
        })
}

const getOrders = (req, res) => {
    res.json('');
}

const getOrderDetail = (req, res) => {
    res.json('');
}

module.exports = { order, getOrders, getOrderDetail };