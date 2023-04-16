const express = require('express')
const router = express.Router()
const accountController = require('../controller/account')


router.post('/',async (req,res)=>{
    accountController.createAccount(req).then((account)=>{
    res.status(200).send(account)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

router.put('/',async (req,res)=>{
    accountController.updateAccount(req).then((account)=>{
        res.status(200).send(account)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})


router.get('/:id',async (req,res)=>{
    accountController.getAccount(req).then((account)=>{
        res.status(200).send(account)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

router.delete('/:id',async (req,res)=>{
    accountController.deleteAccount(req).then((account)=>{
        res.status(200).send(account)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})


module.exports = router;