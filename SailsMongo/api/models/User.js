/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt=require('bcrypt-nodejs');
module.exports = {

	attributes: {
	  	 // 站点名称
	    siteName: {
	      type: 'string',
	      required: true,
	      minLength:1,
	      maxLength:10
	    },
	    // 邮箱
	    email: {
	      type: 'email',
	      unique: true,
	      required: true
	    },
	    // 密码
	    password: {
	      type: 'string',
	      required: true
	    },
	    // 站点简介
	    siteDesc: {
	      type: 'string',
	      defaultsTo: '暂无简介',
	      maxLength:40
	    },
	    // 是否管理员（默认为非管理员）
	    isAdmin: {
	      type: 'boolean',
	      defaultsTo: false
	    },
	     toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }
	},
	 // 创建（注册）用户前，对用户密码加密sails中模型层的生命期回调
	 // Lifecycle callbacks,在此，我们用到的生命期为beforeCreate，亦即模型创建前执行的回调
	beforeCreate: function (user, cb) {
		//加盐处理密码
		bcrypt.hash(user.password,null,null,function(err,hash){
			if(err){
				return next(err);
			}
			user.password=hash;
			cb();
		});
	},
	// 创建用户后，自动为之生成默认分类-"未分类"，并更新站点信息
    afterCreate: function (createdUser, cb) {
       var thisModal = this;
       Category.create({name:Category.getDefault(),creator:createdUser})
           .exec(function(err,category){
               if(category){
                   thisModal.updateSite(createdUser);
                   cb();
               }
           });
    },

	// 用户信息更新时，更新站点信息
	afterUpdate: function (user,cb) {
	    this.updateSite(user);
	    cb();
	},

	// 更新站点信息
	updateSite: function(user){
	    sails.config.site.name = user.siteName;
	    sails.config.site.desc = user.siteDesc;
	}
};

