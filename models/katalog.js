const mongoose = require('mongoose');
const { Schema } = mongoose;

const katalogSchema = new Schema({
    id: String,
    namaBarang: String,
    jenisBarang: String,
    password: String,
    img: {
        data: Buffer, contentType: String
    },
}, { timestamps: true })

const Katalog = mongoose.model('Katalog', katalogSchema);
module.exports = Katalog