const express = require('express')
const router = express.Router()
const userController = require('../controller/user')


router.post('/',async (req,res)=>{
    userController.createUser(req).then((user)=>{
    res.status(200).send(user)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

router.put('/',async (req,res)=>{
    userController.updateUser(req).then((user)=>{
        res.status(200).send(user)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})


router.get('/',async (req,res)=>{
    userController.getUser(req).then((user)=>{
        res.status(200).send(user)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

router.delete('/:id',async (req,res)=>{
    userController.deleteUser(req).then((user)=>{
        res.status(200).send(user)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})


module.exports = router;