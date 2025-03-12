const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes'); // status code 모듈

const allCategory = (req, res) => {
    let sql = "SELECT * FROM category";
    conn.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        res.status(StatusCodes.OK).json(results);
    })
};

module.exports = { allCategory };