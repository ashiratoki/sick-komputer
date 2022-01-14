const Katalog = require('../models/katalog')

// let katalog = [
//     { idBarang: '1', namaBarang: 'Nvidia GTX 1080', jenisBarang: 'VGA' },
//     { idBarang: '2', namaBarang: 'AMD Athlon 3000G', jenisBarang: 'CPU' }
// ]



module.exports = { //Export modul untuk diimpor dalam file router
    index: function (req, res) {
        Katalog.find(function (error, katalog) {
            if (error) console.log(error)
            res.render('pages/katalog/index', { katalog })
        })
        // Katalog.findOne({ id: 11 }, function (error, katalog) {
        //     if (error) console.log(error)
        //     console.log(katalog)
        //     res.render('pages/katalog/index', { katalog: katalog })
        // })
    },
    show: function (req, res) {
        const id = req.params.id
        Katalog.findById(id, function (error, data) {
            if (error) console.log(error)
            res.render('pages/katalog/show', { katalog: data })
        })
        // const data = katalog.filter(katalog => {
        //     return katalog.idBarang == id
        // })
        // res.render('pages/katalog/show', { katalog: data });
    },
    read: function (req, res) {
        if (katalog.length > 0) {
            res.json({
                status: true,
                data: katalog,
                method: req.method,
                URL: req.url,
                tanggal: new Date()
            })
        } else {
            res.json({
                status: false,
                message: "Katalog Barang tidak ada",
            })
        }
        res.json(katalog)
    },
    create: function (req, res) { //Menambahkan data
        //LAMA
        // katalog.push(req.body)
        // res.send({
        //     status: true,
        //     data: katalog,
        //     message: "Penambahan Barang ke Katalog berhasil",
        //     method: req.method,
        //     url: req.url,
        //     tanggal: new Date()
        // })

        //BARU

        const katalog = new Katalog({
            id: req.body.id,
            namaBarang: req.body.namaBarang,
            jenisBarang: req.body.jenisBarang,
            password: req.body.password,
        });
        // imgModel.create(obj, (err, item) => {
        //     if (err) {
        //         console.log(err);
        //     }
        //     else {
        //         // item.save();
        //         res.redirect('/');
        //     }
        // });
        katalog.save(function (error) {
            if (error) return handleError(error);
            res.redirect('/katalog')
        });

    },
    tambah: function (req, res) {
        res.render('pages/katalog/create')
    },
    update: function (req, res) { //Memperbaharui data
        const id = req.params.idBarang;
        let isFound = false
        console.log(id)
        katalog.filter(barang => { //Filter adalah metode update dari javascript (agar data katalog di filter satu/satu)
            if (barang.idBarang == id) { //Untuk pengecekan kondisi
                barang.namaBarang = req.body.namaBarang
                barang.jenisBarang = req.body.jenisBarang
                res.send({
                    status: true,
                    data: katalog,
                    message: "Barang dalam katalog berhasil diperbaharui",
                    method: req.method,
                    url: req.url,
                    tanggal: new Date()
                })
                isFound = true
                return barang //return data katalog yang baru
            }
        })
        if (isFound == false) {
            res.send({
                status: false,
                message: "Barang dalam katalog tidak ditemukan"
            })
        }
        res.json(katalog) //tampilkan data katalog yang baru
    },
    baharui: function (req, res) {
        const _id = req.body._id
        const id = req.body.id
        const namaBarang = req.body.namaBarang
        const jenisBarang = req.body.jenisBarang
        const password = req.body.password
        const filter = { _id: _id };
        const update = {
            id: id,
            namaBarang: namaBarang,
            jenisBarang: jenisBarang,
            password: password
        };
        Katalog.updateOne(filter, update, function (err) {
            console.log(namaBarang, jenisBarang, password)
            res.redirect('/katalog')
        });


    },
    renderUpdate: function (req, res) {
        const id = req.params._id
        Katalog.findById(id, function (error, data) {
            if (error) console.log(error)
            console.log(data)
            res.render('pages/katalog/update', { katalog: data })
        })
    },
    hapus: function (req, res) {
        const id = req.params.id
        Katalog.deleteOne({ _id: id }, function (err) {
            if (err) return console.log(err);
            res.redirect('/katalog')
        });
    },
    delete: function (req, res) { //Menghapus data
        const id = req.params.idBarang;
        let isFound = false
        katalog.filter(barang => {
            if (barang.idBarang == id) {
                const index = katalog.indexOf(barang)
                katalog.splice(index, 1)
                res.send({
                    status: true,
                    data: katalog,
                    message: "Barang dalam katalog berhasil dihapus",
                    method: req.method,
                    url: req.url,
                    tanggal: new Date()
                })
                isFound = true
            }
        })
        if (isFound == false) {
            res.json({
                status: false,
                message: "Barang dalam katalog tidak ditemukan"
            })
        }
        res.json(katalog)
    }
}