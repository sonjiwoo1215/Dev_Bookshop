const ensureAuthorization = require('../auth'); //인증 모듈
const jwt = require('jsonwebtoken');
const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes'); // status code 모듈

const addLike = (req, res) => {

    const { book_id } = req.params.id; // book_id / url값으로 들어오는걸 자동으로 liked_book_id로 보지 않고 id로 보기 때문에 변경

    let authorization = ensureAuthorization(req,res);

    if(authorization instanceof jwt.TokenExpiredError){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message" : "로그인 세션이 만료되었습니다. 다시 로그인 하세요."
        })  
    }else if (authorization instanceof jwt.JsonWebTokenError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message" : "잘못된 토큰입니다."
        }) 
    }else{
        let sql = "INSERT INTO likes (user_id, liked_book_id) VALUES (?,?)";
        let values = [authorization.id, book_id];
        conn.query(sql, values,
            (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }
                res.status(StatusCodes.OK).json(results);
            })
    }

};

const removeLike = (req, res) => {
    const { book_id } = req.params.id;

    let authorization = ensureAuthorization(req,res);

    if(authorization instanceof jwt.TokenExpiredError){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message" : "로그인 세션이 만료되었습니다. 다시 로그인 하세요."
        })  
    }else if (authorization instanceof jwt.JsonWebTokenError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message" : "잘못된 토큰입니다."
        }) 
    }else{
        let sql = "DELETE FROM likes WHERE user_id = ? AND liked_book_id=?";
        let values = [authorization.id, book_id];
        conn.query(sql, values,
            (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }
                res.status(StatusCodes.OK).json(results);
            })
    }
};


module.exports = { addLike, removeLike };