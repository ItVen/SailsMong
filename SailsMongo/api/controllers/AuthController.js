/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
/**
* 验证逻辑控制器
* */
var passport = require('passport');
module.exports = {
     /**
     * 跳转到注册页面
     * @param req
     * @param res
     */
    toRegister: function (req, res) {
    	console.log('用户注册');
        return res.view('passport/register');
    },
	 /**
     * 处理注册逻辑
     * @param req
     * @param res
     */
     processRegister: function(req,res){
        // 由请求参数构造待创建User对象
        var user = req.allParams();
        console.log(user);
        User.create(user).exec(function createCB(err, created){
        	console.log('创建用户');
            if(err){
               // 如果有误，返回错误
                res.view('passport/register',{err:err});
            }else{
                req.login(created, function(err) {
                    if (err) { 
                    	console.log('创建新用户出错！！！！');
                    	console.log(err);
                    	return next(err);
                	}
                    return res.redirect('/');
                });
            }
        });
    },
     /**
     * 处理登陆逻辑
     * @param req
     * @param res
     */
    processLogin: function(req,res){
        // 使用本地验证策略对登录进行验证
        passport.authenticate('local', function(err, user, info) {
            console.log('正在登陆');
            console.log('err');
            console.log(err);
            console.log('user');
            console.log(user);
            console.log('info');
            console.log(info);
            if ((err) || (!user)) {
                return res.send({
                    message: info.message,
                    user: user
                });
            }
            req.logIn(user, function(err) {
                if (err) res.send(err);
                // return res.send({
                //     message: info.message,
                //     user: user
                // });  

                return res.redirect('/');
            });

        })(req, res);
    },
    /**
     * 处理登出逻辑
     * @param req
     * @param res
     */
    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    }
};

