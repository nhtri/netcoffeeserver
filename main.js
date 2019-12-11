var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');
const { Pool } = require('pg')

//MySQL connection
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'network'
// });


var connectionString = 
'postgres://shoizafidgsclk:5aa84844e16bc84b3b49e67a16e339957d289abafdcdf3ad3f48d1c2b4b2cccf@ec2-174-129-255-35.compute-1.amazonaws.com:5432/d7fu349nrp13qh'

app.use(cors());

// connection.connect(function (err) {
//     if (err) throw err
//     console.log('You are now connected...')
// })

const pool = new Pool({connectionString})
  
module.exports = { pool }

//Body-parser configuration
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

//Create node.js Server
// var server = app.listen(3000, "127.0.0.1", function () {

//     var host = server.address().address
//     var port = server.address().port

//     console.log("Example app listening at http://%s:%s", host, port)

// });

var server = app.listen(process.env.PORT || 5000)

//rest api to get all results
app.get('/wifi', function (req, res) {
    console.log(req);
	 res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    pool.query('select * from wifi', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

app.get('/wifi/old', function (req, res) {
    console.log(req);
	 res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    pool.query('select `MaWiFi`, `SDTSim`, `MaSim`, `NgayThue`, `NgayTra`, `ThangDongCuoc`, `GiaCuoc`, `Facebook`, `TrangThai`, `DiaChi`, `Hoten`, `ghichu` from wifi where `TrangThai`=0', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

//rest api to get a single employee data
app.get('/wifi/:MaWiFi', function (req, res) {
    pool.query('SELECT * FROM `wifi` WHERE `MaWiFi`=?', [req.params.MaWiFi], function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

//rest api to create a new record into mysql database
app.post('/wifi/', function (req, res) {
   var postData  = req.body;
   res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    pool.query('INSERT INTO `wifi` SET ?', postData, function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});


//rest api to update record into mysql database
app.put('/wifi/', function (req, res) {
    pool.query('UPDATE `wifi` SET `SDTSim`=?,`NgayThue`=?,`NgayTra`=?,`GiaCuoc`=? where `MaWiFi`=?', [req.body.SDTSim,req.body.NgayThue,req.body.NgayTra,req.body.GiaCuoc,req.body.MaWiFi], function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });

 //rest api to authen
app.get('/admin', function (req, res) {
    console.log(req);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    pool.query('select * from admin', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});


