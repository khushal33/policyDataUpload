const express = require('express')
const router = express.Router()
const policyController = require('../controller/policy')
const multer = require('multer');
const upload = multer();

router.post('/',async (req,res)=>{
    policyController.createPolicy(req).then((policy)=>{
    res.status(200).send(policy)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

router.post('/upload',upload.single('file'),async (req,res)=>{
    policyController.uploadData(req).then((policy)=>{
    res.status(200).send(policy)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

router.put('/',async (req,res)=>{
    policyController.updatePolicy(req).then((policy)=>{
        res.status(200).send(policy)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})


router.get('/:accountId',async (req,res)=>{
    policyController.getPolicy(req).then((policy)=>{
        res.status(200).send(policy)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

router.delete('/:id',async (req,res)=>{
    policyController.deletePolicy(req).then((policy)=>{
        res.status(200).send(policy)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})


module.exports = router;