const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    "userId" : Number,//用户ID， 自增长
    "userName" : String,//用户名称
    "userPwd" : String,//用户密码， md5加密
    "userEmail" : String,
    "mobile" : String,//手机号
    "sex":Number,//性别0:男1: 女
    "deptId" : [],//部门
    "job": String,//岗位
    "state":{
        type : Number,
        default : 1
    },// 1:在职2:离职3:试用期
    "role": {
        type : Number,
        default : 1
    },//用户角色0:系统管理员1: 普通用户
    "rolelist" : [], //系统角色
    "createTime" : {
        type : Date,
        default : Date.now()
    },//创建时间
    "lastLoginTime" : {
        type : Date,
        default : Date.now()
    },//更新时间
    remark:String
})

module.exports = mongoose.model("users",userSchema,"users")