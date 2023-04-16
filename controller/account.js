const Account = require('../models/account')

module.exports = {
    createAccount : (req,res)=>{
        return new Promise(async (resolve, reject) => {
            try{
            const {userId,account_name,account_type} = req.body;
            let checkAccountExistOrNot = await Account.findOne({account_name});
            console.log(checkAccountExistOrNot)
            if(!checkAccountExistOrNot){
            let data = await Account.create({user:userId,account_name,account_type})
            resolve({status:true, data})
            }else{
                reject({status:false, message:"Account already exist!"})
            }
            }catch (err) {
                reject({status:false, message:err.message})
            }
        })
    },
    getAccount : (req,res)=>{
        return new Promise(async (resolve, reject) => {
            try{
                const {id} = req.params;
                let data = await Account.find({"user":id})
                resolve({status:true, data})
            }catch(err){
                reject({status:false, message:err.message})
            }
        })
    }, 
    updateAccount : (req,res)=>{
        return new Promise(async (resolve, reject) => {
            try{
                const {_id} = req.body;
                let data = await Account.updateOne({_id},req.body,{new: true, runValidators: true})
                resolve({status:true, data})
            }catch(err){
                reject({status:false, message:err.message})
            }
        })
    },
    deleteAccount : (req,res)=>{
        return new Promise(async (resolve, reject) => {
            try{
                const {id} = req.params;
                    await Account.deleteOne({"_id":id})
                    resolve({status:true,message:"sucess"})
            }catch(err){
                reject({status:false, message:err.message})
            }
        })
    },
}