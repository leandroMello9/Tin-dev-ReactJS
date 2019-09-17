const express= require('express')
const DevControler = require('./controllers/DevController')
const LikeControler = require('./controllers/LikeController')
const DeslikesControler = require('./controllers/DeslikeController')
const routes = express.Router()


routes.get('/devs',DevControler.index)
routes.post('/devs', DevControler.store)
routes.post('/devs/:devId/likes',LikeControler.store)
routes.post('/devs/:devId/dislikes',DeslikesControler.store)


module.exports=routes
 