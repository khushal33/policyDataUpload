const User = require('../models/user')

module.exports = {
    createUser : (req,res)=>{
        return new Promise(async (resolve, reject) => {
            try{
            const {email,userType,firstName,city,phone,address,state,zip,dob } = req.body;
            let checkUserExistOrNot = await User.findOne({email});
            console.log(checkUserExistOrNot)
            if(!checkUserExistOrNot){
            let data = await User.create(req.body)
            resolve({status:true, data})
            }else{
                reject({status:false, message:"User already exist!"})
            }
            }catch (err) {
                reject({status:false, message:err.message})
            }
        })
    },
    getUser : (req,res)=>{
        return new Promise(async (resolve, reject) => {
            try{
                const {id} = req.query;
                let data;
                if(id){
                     data = await User.find({"_id":id})
                }else{
                     data = await User.find({})
                }
                resolve({status:true, data})
            }catch(err){
                reject({status:false, message:err.message})
            }
        })
    }, 
    updateUser : (req,res)=>{
        return new Promise(async (resolve, reject) => {
            try{
                const {_id} = req.body;
                let data = await User.updateOne({_id},req.body,{new: true, runValidators: true})
                resolve({status:true, data})
            }catch(err){
                reject({status:false, message:err.message})
            }
        })
    },
    deleteUser : (req,res)=>{
        return new Promise(async (resolve, reject) => {
            try{
                const {id} = req.params;
                    await User.deleteOne({"_id":id})
                    resolve({status:true,message:"sucess"})
            }catch(err){
                reject({status:false, message:err.message})
            }
        })
    },
}