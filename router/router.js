var mysql = require("mysql");
var url = require('url');
var ID = 0;
var MaxNumber = 195;
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1014',
    database : 'piao',
    query_cache_type: 'off'
});

exports.showput = function(req,res,next){
    res.render("login");
};

exports.doput = function(req,res,next){
    var url = req.query.url;
    var name = req.query.name;
    var number = req.query.number;

    var  sql_number = 'SELECT * FROM ticket where number= '+ number;
    // var reg = /^[\d]{10}$/;
    if(name == ""){
        res.redirect("/");
        return;
    }
    if(number < 2010000000 || number > 2018000000)
    {
        res.redirect("/");
        return;
    }
    // if(!reg.test(number)){
    //     res.redirect("/");
    //     return;
    // }

    connection.query(sql_number, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        if (result[0] != undefined) {
            if(name == result[0].name){
                res.redirect("/show" + "/" + result[0].number);
                return;
            }
            else{
                res.send("信息错误");
                return;
            }
        }
        var addSql = 'INSERT INTO ticket(name,number,ID) VALUES(?,?,?)';
        ID = parseInt(ID + 1);
        var addSqlParams = [name, number, ID];
        if (ID > MaxNumber) {
            res.send("人数已报满");
            return;
        }

        connection.query(addSql, addSqlParams, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            } else {
                res.redirect("/show" + "/" + number);
            }
        });
    });
};


exports.show = function(req,res,next){
    var number = req.params["number"];
    var sql_number = 'SELECT * FROM ticket where number= '+ number;
//查
    connection.query(sql_number,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        res.render("ticket",{
            info : result
        })
    });
};