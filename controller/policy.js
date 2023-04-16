const Account = require('../models/account');
const Policy = require('../models/policy')
const User = require('../models/user')
const LOB = require('../models/LOB')
const Agent = require('../models/agent')
const Carrier = require('../models/carrier')
const csv = require("csvtojson");

module.exports = {
    createPolicy : (req,res)=>{
        return new Promise(async (resolve, reject) => {
            try{
            const { agency_id,
                    agent,
                    policy_mode,
                    producer,
                    policy_number,
                    premium_amount_written,
                    premium_amount,
                    policy_type,
                    company_name,
                    category_name,
                    policy_start_date,
                    policy_end_date,
                    csr,
                    email,
                    account_name,
                    account_type
                } = req.body;
            let checkUserExistOrNot = await User.findOne({email});
            //check user
            if(!checkUserExistOrNot){
                throw {status:false, message:"User not exist!"}
            }
            let userId = checkUserExistOrNot._id

            //check user Account
            let checkUserAccount = await Account.findOne({user:userId,account_name})
            console.log("Acc",checkUserAccount)
            if(!checkUserAccount || checkUserAccount == null){
                 checkUserAccount = await Account.create({user:userId,account_name,account_type})
            }
            let accountId = checkUserAccount._id
            //

            //check Agent
            let checkAgent = await Agent.findOne({agent})
            if(!checkLOB){
                checkAgent = await Agent.create({agency_id,agent})
            }
            let agentId = checkAgent._id
            //

            //check LOB
            let checkLOB = await LOB.findOne({category_name})
            if(!checkLOB){
                checkLOB = await LOB.create({category_name})
            }
            let LobId = checkLOB._id
            //

            //check carrier
            let checkCarrier = await Carrier.findOne({company_name,lob:LobId})
            if(!checkCarrier){
                 checkCarrier = await Carrier.create({company_name,LobId})
            }
            let carrierId = checkCarrier._id
            //
            let policy = await Policy.create({carrier:carrierId,
                userAccount:accountId,
                policy_mode,
                producer,
                policy_number,
                premium_amount_written,
                premium_amount,
                policy_type,
                policy_start_date,
                policy_end_date,
                csr,
                agency : agentId
            })
            resolve({status:true, data:policy})
            }catch (err) {
                reject({status:false, message:err.message})
            }
        })
    },
    getPolicy : (req,res)=>{
        return new Promise(async (resolve, reject) => {
            try{
                const {accountId} = req.params;
                let policies = await Policy.find({userAccount:accountId})
                resolve({status:true, policies})
            }catch(err){
                reject({status:false, message:err.message})
            }
        })
    }, 
    updatePolicy : (req,res)=>{
        return new Promise(async (resolve, reject) => {
            try{
                const {_id} = req.body;
                let data = await Policy.updateOne({_id},req.body,{new: true, runValidators: true})
                resolve({status:true, data})
            }catch(err){
                reject({status:false, message:err.message})
            }
        })
    },
    deletePolicy : (req,res)=>{
        return new Promise(async (resolve, reject) => {
            try{
                const {id} = req.params;
                    await Policy.deleteOne({"_id":id})
                    resolve({status:true,message:"sucess"})
            }catch(err){
                reject({status:false, message:err.message})
            }
        })
    },
    createPolicyForCSVUpload : (req)=>{
        return new Promise(async (resolve, reject) => {
            try{
            const { 
                    agency_id,
                    agent,
                    policy_mode,
                    producer,
                    policy_number,
                    premium_amount_written,
                    premium_amount,
                    policy_type,
                    company_name,
                    category_name,
                    policy_start_date,
                    policy_end_date,
                    csr,
                    email,
                    account_name,
                    account_type,userType,firstName,city,phone,address,state,zip,dob
                } = req;
            let checkUserExistOrNot = await User.findOne({email});
            //check user
            // if(!checkUserExistOrNot){
            //     checkUserExistOrNot = await User.create({email,userType,firstName,city,phone,address,state,zip,dob})
            // }
            let userId = checkUserExistOrNot._id

            //check user Account
            let checkUserAccount = await Account.findOne({user:userId,account_name})
            if(!checkUserAccount || checkUserAccount == null){
                 checkUserAccount = await Account.create({user:userId,account_name,account_type})
            }
            let accountId = checkUserAccount._id
            //

            //check Agent
            let checkAgent = await Agent.findOne({agent})
            if(!checkAgent){
                checkAgent = await Agent.create({agency_id,agent})
            }
            let agentId = checkAgent._id
            //

            //check LOB
            let checkLOB = await LOB.findOne({category_name})
            if(!checkLOB){
                checkLOB = await LOB.create({category_name})
            }
            let LobId = checkLOB._id
            //

            //check carrier
            let checkCarrier = await Carrier.findOne({company_name,lob:LobId})
            if(!checkCarrier){
                 checkCarrier = await Carrier.create({company_name,LobId})
            }
            let carrierId = checkCarrier._id
            //
            let policy = await Policy.create({carrier:carrierId,
                userAccount:accountId,
                policy_mode,
                producer,
                policy_number,
                premium_amount_written,
                premium_amount,
                policy_type,
                policy_start_date,
                policy_end_date,
                csr,
                agency : agentId
            })
            resolve(policy)
            }catch (err) {
                reject(err.message)
            }
        })
    },
    createUserIfNotExist : async (req,res)=> {
        return new Promise(async (resolve, reject) => {
            try{
                const {email,userType,firstName,city,phone,address,state,zip,dob} = req
                let checkUserExistOrNot = await User.findOne({email});
                //check user
                if(!checkUserExistOrNot){
                    checkUserExistOrNot = await User.create({email,userType,firstName,city,phone,address,state,zip,dob})
                }
                    resolve("sucess")
            }catch (err){
                reject(err.message)
            }
        })
    },
    uploadData : (req,res)=>{
        return new Promise(async (resolve, reject) => {
            try{
                let {file} = req;
                if(file.mimetype == 'text/csv' || file.mimetype == 'application/vnd.ms-excel'|| file.mimetype == "application/vnd.ms-excel" ||
                file.mimetype == "application/msexcel" ||
                file.mimetype == "application/x-msexcel" ||
                file.mimetype == "application/x-ms-excel" ||
                file.mimetype ==  "application/x-excel" ||
                file.mimetype ==  "application/x-dos_ms_excel" ||
                file.mimetype ==  "application/xls" ||
                file.mimetype ==  "application/x-xls" ||
                file.mimetype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
                    await csv().fromString(file.buffer.toString()).then(async(data)=>{
                        let res = [];
                        let errors = []
                        let promise = []
                        let promiceForCreateUser = []
                        let distByEmail = [...new Map(data.map(item =>[item['email'], item])).values()]
                        for await(let row of distByEmail){
                            promiceForCreateUser.push(module.exports.createUserIfNotExist(row))
                        }
                        await Promise.allSettled(promiceForCreateUser)
                        for await(let row of data){
                            promise.push(module.exports.createPolicyForCSVUpload(row).then(a=>res.push(a)).catch(err=>errors.push(err)))
                        }
                        await Promise.allSettled(promise)
                        resolve({data:res,errors})
                    }).catch(err=>reject({status:false, message:err.message}))
                    
                }else{
                    reject({status : false , message : "file not supported" })
                }
                
            }catch(err){
                reject({status:false, message:err.message})
            }
        })
    }
}

