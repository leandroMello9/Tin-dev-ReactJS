const express = require('express')
const mongoose = require ('mongoose')
const cors = require ('cors')
const routes= require('./routes')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const connectUsers = {}
io.on('connection',socket=>{
    const {user} = socket.handshake.query

    connectUsers[user]=socket.id
   
})
app.use((req,res,next)=>{
    req.io = io
    req.connectUsers = connectUsers
    return next()
})
app.use(cors())
app.use(express.json())
mongoose.connect('mongodb+srv://oministack:oministack@cluster0-kwoxj.mongodb.net/oministack8?retryWrites=true&w=majority',{useNewUrlParser:true})

app.use(routes)





server.listen(3333,console.log('Servidor na porta 3333'))