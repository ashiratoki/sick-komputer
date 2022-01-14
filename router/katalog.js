const express = require('express'); //Mengimpor modul express lalu menyimpannya di const express
const router = express.Router(); // Instansi objek express untuk menjalankan route secara modular
const katalogController = require('../controllers/katalog');
const Katalog = require('../models/katalog');
const fs = require('fs');
var multer = require('multer');
var path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
const upload = multer({ storage: storage, limits: { fieldSize: 10 * 1024 * 1024 } })

router.route('/katalog') // syntax .app diganti dengan syntax router
    .get(katalogController.index)
// .post(katalogController.create)
router.route('/katalog').post(upload.single('image'), (req, res, next) => {
    const katalog = new Katalog({
        id: req.body.id,
        namaBarang: req.body.namaBarang,
        jenisBarang: req.body.jenisBarang,
        password: req.body.password,
        img: {
            data: fs.readFileSync(path.join(__dirname, '../' + '/uploads/' + req.file.filename)),
            contentType: 'image/jpg'
        }
    });
    katalog.save(function (error) {
        if (error) return handleError(error);
        res.redirect('/katalog')
    });


});
// router.route('/katalog/update').post(katalogController.baharui)
router.route('/katalog/update').post(upload.single('image'), (req, res, next) => {
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
        password: password,
        img: {
            data: fs.readFileSync(path.join(__dirname, '../' + '/uploads/' + req.file.filename)),
            contentType: 'image/jpg'
        }
    };
    Katalog.updateOne(filter, update, function (err) {
        res.redirect('/katalog')
    });
});
router.get('/katalog/create', katalogController.tambah)
router.get('/katalog/:id', katalogController.show)
router.get('/katalog/hapus/:id', katalogController.hapus)
router.route('/katalog/update/:_id/:id/:namaBarang/:jenisBarang/:password').get(katalogController.renderUpdate)
//UPDATE DATA
router.put('/katalog/:idBarang', katalogController.update)
//HAPUS DATA
router.delete('/katalog/:idBarang', katalogController.delete)

module.exports = router; //Modul ini akan diekspor dengan route khusus untuk (URL:/katalog),
                        //dan sudah bisa diexport