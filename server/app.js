var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');// gunakan req.body
const md5 = require('blueimp-md5')
const {UserModel} = require('./models')

app.use(bodyParser.json());// gunakan req.body
app.use(bodyParser.urlencoded({ extended: false }));// gunakan req.body

var messages = []// daftar pesan
var messagesMap = {}// Daftar pesan, yang merupakan key-value pair {msgid: messageObj}

// socketIO
io.on('connection', (socket)=>{
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat', msg=>{
        io.emit('chat', msg);
        messages.push(msg)
        const {id} = msg
        messagesMap[id] = msg
    })
})


const filter = {password: 0, __v: 0} // Tentukan atribut yang akan difilter
// minta login
app.post('/login', (req, res)=>{
    const {username, password} = req.body
    // Meminta pengguna basis data sesuai dengan nama pengguna dan kata sandi, jika tidak, kembalikan pesan kesalahan, jika ya, kembalikan pesan berhasil masuk (termasuk pengguna)
    UserModel.findOne({username, password:md5(password)}, filter, function (err, user) {
        if(user) { // Berhasil mendarat
            // Hasilkan cookie (userid: user._id), dan berikan ke browser untuk disimpan
            res.cookie('userid', user._id, {maxAge: 1000*60*60*24})
            // Mengembalikan informasi login yang berhasil (termasuk pengguna)
            res.send({code: 0, data: user})
        } else {// Gagal masuk
            res.send({code: 1, msg: 'Username atau kata sandi salah!'})
        }
    })
})



// permintaan pendaftaran
app.post('/register', (req, res)=>{
    const {username, password} = req.body
    // Memproses: Tentukan apakah pengguna sudah ada, jika ada, kembalikan pesan kesalahan, jika tidak, simpan
   // kueri (sesuai nama pengguna)
    UserModel.findOne({username}, function (err, user) {
        // Jika pengguna memiliki nilai (ada)
        if(user) {
            // mengembalikan pesan kesalahan
            res.send({code: 1, msg: 'Pengguna ini sudah ada'})
        } else { // tidak ada nilai (tidak ada)
            // menyimpan
            new UserModel({username, password:md5(password), signature:'', avatar:''}).save(function (error, user) {

                // Hasilkan cookie (userid: user._id), dan berikan ke browser untuk disimpan
                res.cookie('userid', user._id, {maxAge: 1000*60*60*24})
               // kembalikan data json yang berisi pengguna
                const data = {username, userid: user._id, signature:'', avatar:''} // 响应数据中不要携带password
                res.send({code: 0, data})
            })
        }
    })
})

// Permintaan untuk memperbarui informasi pengguna
app.post('/updateuser', (req, res)=>{
    const {username, password, signature, avatar} = req.body
    let {userid} = req.body
    userid = userid.split(':')[1]
    userid = userid.substring(1, userid.length-1)

    UserModel.findByIdAndUpdate(userid, {username, password:md5(password), signature, avatar}, function (error, oldUser) {

        if(!oldUser) {
          // Beri tahu browser untuk menghapus cookie userid
          res.clearCookie('userid')
         // Kembali mengembalikan pesan cepat
          res.send({code: 1, msg: 'Silahkan login terlebih dahulu'})
        } else {
          // Siapkan objek data pengguna yang dikembalikan
          const data = {...oldUser, username, password:md5(password), signature, avatar}
          // kembali
          res.send({code: 0, data})
        }
      })
})


// Menurut userid dari cookie browser, periksa apakah userid itu benar, lalu putuskan apakah akan mengizinkan login langsung
app.post('/user', (req, res)=>{
    let {userid} = req.body
    userid = userid.split(':')[1]
    userid = userid.substring(1, userid.length-1)
    
   // Meminta pengguna basis data sesuai dengan userid, jika tidak, kembalikan pesan kesalahan, jika ya, kembalikan pesan berhasil masuk (termasuk pengguna)
    UserModel.findById(userid, filter, function (err, user) {
        if(user) { // userid ada
            // Hasilkan cookie (userid: user._id), dan berikan ke browser untuk disimpan
            res.send({code: 0, data: user})
        } else {// userid adalah ilegal
            res.send({code: 1, msg: 'userid ilegal!'})
        }
    })
})

// Minta semua pesan obrolan
app.get('/chat', (req, res)=>{
    res.send(messages) 
})

// Minta informasi obrolan dari msgid yang ditentukan
app.get('/message', (req, res)=>{
    const {msgid} = req.query
    res.send(messagesMap[msgid])
})

app.get('/user', (req, res)=>{
    const {userid} = req.query
    console.log(userid)
})


http.listen(4000, ()=>{
    console.log('The service is starting, port 4000 is open...')
});