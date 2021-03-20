var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
const { Pool } = require('pg')

/* CROS middleware */
app.use(function(req, res, next) {
  // Mọi domain
  res.header("Access-Control-Allow-Origin", "*");
 
  // Domain nhất định
  // res.header("Access-Control-Allow-Origin", "https://freetuts.net");
 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var connectionString =
    'postgres://shoizafidgsclk:5aa84844e16bc84b3b49e67a16e339957d289abafdcdf3ad3f48d1c2b4b2cccf@ec2-174-129-255-35.compute-1.amazonaws.com:5432/d7fu349nrp13qh'


const pool = new Pool({ connectionString })

module.exports = { pool }

//Body-parser configuration
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));



var server = app.listen(process.env.PORT || 5000)

//rest api to get all results
app.get('/wifi', function (req, res) {
    console.log(req);
    pool.query('select * from wifi', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

//rest api to get all results congtacvien
app.get('/congtacvien', function (req, res) {
    console.log(req);
    pool.query('select * from congtacvien', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

//rest api to get all account results
app.get('/account', function (req, res) {
    console.log(req);
    pool.query('select * from account', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

app.get('/wifi/old', function (req, res) {
    console.log(req);
    pool.query('select * from wifi where trangthai=false', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

//rest api to create a new record into mysql database
app.post('/wifi/', function (req, res) {
    var postData = req.body;
    pool.query('INSERT INTO wifi VALUES ($1, $2, $3, $4, $5,$6, $7, $8, $9, $10, $11, $12,$13,$14,$15,$16,$17)', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});


//rest api to create a new record into mysql database
app.post('/congtacvien/', function (req, res) {
    var postData = req.body;
    pool.query('INSERT INTO congtacvien VALUES ($1, $2, $3, $4)', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

//rest api to create a new account record into mysql database
app.post('/account/', function (req, res) {
    var postData = req.body;
    pool.query('INSERT INTO account VALUES ($1, $2, $3, $4, $5,$6, $7, $8, $9, $10, $11, $12,$13,$14,$15,$16,$17)', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

//rest api to delete a record in mysql database
app.delete('/wifi/:mawifi', function (req, res) {
    pool.query('DELETE FROM wifi WHERE mawifi = $1', [req.params.mawifi], function (error, results) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

//rest api to delete congtacvien a record in mysql database
app.delete('/congtacvien/:hoten', function (req, res) {
    pool.query('DELETE FROM congtacvien WHERE hoten = $1', [req.params.hoten], function (error, results) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});


//rest api to update record into mysql database
app.put('/wifi/', function (req, res) {
    var postData = req.body;
    pool.query('UPDATE wifi SET ngaythue=($1),ngaytra=($2),thangdongcuoc=($3),giacuoc=($4),facebook=($5),trangthai=($6),diachi=($7),hoten=($8),ghichu=($9),sdtsim=($10),masim=($11),trangthai_kh=($12),namdongcuoc=($13),thanhtoan=($14),congtacvien=($15),trangthaiwifi=($16) where mawifi=($17)', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

//rest api to update record into mysql database
app.put('/wificongtacvien/', function (req, res) {
    var postData = req.body;
     pool.query('UPDATE wifi SET congtacvien=($1) where mawifi=($2)', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

app.put('/wifitamngung/', function (req, res) {
    var postData = req.body;
    pool.query('UPDATE wifi SET trangthai_kh=($1) where mawifi=($2)', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

//rest api to update record into mysql database
app.put('/wifithanhtoan/', function (req, res) {
    var postData = req.body;
    pool.query('UPDATE wifi SET thanhtoan=($1) where mawifi=($2)', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

//rest api to update record into mysql database
app.put('/account/', function (req, res) {
    var postData = req.body;
    pool.query('UPDATE account SET trangthai_kh=($1) where mawifi=($2)', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

//rest api to update record into mysql database
app.put('/congtacvien/', function (req, res) {
    var postData = req.body;
    pool.query('UPDATE congtacvien SET facebook=($1),sdt=($2),diachi=($3) where hoten=($4)', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});

//rest api to authen
app.get('/admin', function (req, res) {
    console.log(req);
    pool.query('select username,password from admin', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.rows));
    });
});


