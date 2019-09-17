const Dev = require('../models/dev')
module.exports = {
   async store(req,res){    
       console.log(req.io,req.connectUsers)
     const {user}= req.headers
     const {devId} = req.params 
     const loggedDev = await Dev.findById(user)
     const targetDev = await Dev.findById(devId)
     
     if (!targetDev){
         return res.status(400).json({error:"Dev not exists"})
     }
     if(targetDev.likes.includes(loggedDev._id)){
         const loggedSocket = req.connectUsers[user]
         const targetSocket = req.connectUsers[devId]
         if (loggedDev){
            req.io.to(loggedSocket).emit('math',targetDev)
         }
         if (targetSocket){
             req.io.to(targetSocket).emit('math',loggedDev)
         }
     }
     loggedDev.likes.push(targetDev._id)
     await loggedDev.save()
     return res.json(loggedDev)
    }
}