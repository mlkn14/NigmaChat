/*
Berisi modul Model yang beroperasi pada data kumpulan database
1. Hubungkan ke database
  1.1. Memperkenalkan luwak
  1.2. Sambungkan ke database yang ditentukan (hanya URL yang berubah ke database)
  1.3. Dapatkan objek koneksi
  1.4. Pemantauan penyelesaian koneksi yang mengikat (digunakan untuk meminta koneksi berhasil)
2. Tentukan Model yang sesuai dengan koleksi tertentu dan paparkan ke luar
  2.1. Skema Literal (struktur dokumen deskriptif)
  2.2. Tentukan Model (sesuai dengan koleksi, Anda dapat mengoperasikan koleksi)
  2.3. Mengekspos Model ke Luar
 */

/*1. Hubungkan ke database*/
// 1.1. Perkenalkan luwak
const mongoose = require('mongoose')
// 1.2. Sambungkan ke database yang ditentukan (hanya URL yang berubah ke database)
mongoose.connect('mongodb://localhost:27017/local')
// 1.3. Dapatkan objek koneksi
const conn = mongoose.connection
// 1.4. Mendengarkan penyelesaian koneksi yang mengikat (digunakan untuk meminta koneksi berhasil)
conn.on('connected', () => {
  console.log('db connect success!')
})

/*2. Tentukan Model yang sesuai dengan koleksi tertentu dan tampilkan ke luar*/
// 2.1. Skema Literal (menjelaskan struktur dokumen)
const userSchema = mongoose.Schema({
  username: {type: String, required: true}, // nama belakang
  password: {type: String, required: true}, // kata sandi
  signature: {type: String}, // Tanda tangan
  avatar: {type: String}, // AvatarURI
})
// 2.2. Tentukan Model (sesuai dengan koleksi, Anda dapat mengoperasikan koleksi)
const UserModel = mongoose.model('user', userSchema) // Koleksinya adalah: pengguna
// 2.3. Ekspos Model ke luar
exports.UserModel = UserModel

