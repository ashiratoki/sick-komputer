const express = require('express');
const exRouter = require('./router/katalog')//import module yang sudah diexport dari katalog.js
const app = express();


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static("public"));
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));


//Mengkoneksikan database dengan mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/expressuts');

// var multer = require('multer');

// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });

// var upload = multer({ storage: storage });

//Image

// const fs = require('fs');
// const path = require('path');
// require('dotenv/config');

// var multer = require('multer');

// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });


// var upload = multer({ storage: storage });

//END


//Tambahkan pesan jika koneksi ke database berhasil
const db = mongoose.connection

db.on('error', function () {
    console.log('Koneksi gagal')
})
db.once('open', function () {
    console.log('Koneksi Berhasil')
})

app.use(exRouter); //tambahkan app.use untuk menggunakan module

app.listen(3000, function () {
    console.log('Server sedang berjalan di localhost:3000')
})

var myLogger = function (req, res, next) {
    console.log("LOGGED")
    next();
}

app.use(myLogger); //cara express js mengaktifkan atau memasang middleware sebelum dilanjutkan
//ke function selanjutnya
//pasang middleware sebelum jalur route aplikasinya dijalankan

app.get('/', function (req, res) { //function ini akan dijalankan ketika berhasil melewati middleware
    const siswa = {
        nim: 111,
        nama: 'Yoel Alfandi'
    }
    res.render('pages/index', { siswa: siswa })
})

//Middleware Waktu
const requestTime = function (req, res, next) {
    date = new Date(); //pesan yang ingin ditampilkan
    console.log(date);
    next();
}

app.use(requestTime); //nama properti middleware
app.set('view engine', 'ejs');//tambahkan settingan untuk jenis template yang digunakan

app.get('/date', function (req, res) {
    const tanggal = `Selamat belajar Express js <br>
    <p><small>Requested at: "${date}"</small></p>`
    res.send(tanggal)
})


//membuat URL /about dengan method GET
app.get('/about', function (req, res) {
    res.render('pages/about')
})

//Method Post
app.post('/post', function (req, res) {
    res.send('Menambahkan data')
})

//Method Delete
app.delete('/delete', function (req, res) {
    res.send('Menghapus data')
})

//Method Put
app.put('/put', function (req, res) {
    res.send('Memperbaharui data')
})

//Route Parameter
app.put('/barang/:id/:nama/:jenis', function (req, res) {
    res.send(req.params);
})


//1
// app.get('/katalog', function(req,res){
//     const katalog= {
//         idBarang : '3',
//         namaBarang : 'Nvidia'
//     }
//     res.send(katalog)
// })
//1

//2
app.get('/redirect', function (req, res) {
    res.redirect('https://www.google.com/')
})
//2

//3
app.get('/error', function (req, res) {
    res.sendStatus(404)
})
//3

app.route('/list')
    .get(function (req, res) {
        res.send('Tampilkan list barang komponen komputer yang dijual')
    })
    .post(function (req, res) {
        res.send('Tambahkan barang ke dalam list komponen komputer yang dijual')
    })
    .put(function (req, res) {
        res.end('Perbaharui data barang komponen komputer yang dijual')
    })
    .delete(function (req, res) {
        res.send('Hapus barang komponen komputer yang dijual')
    })