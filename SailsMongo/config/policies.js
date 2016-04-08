/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  /******建立policy与各业务逻辑的映射关系*******/
    // 默认所有行为需要登录
    // 若某些行为不需要，则在下面声明
    '*': 'isAuthenticated',

    // 验证逻辑都不需要登录
    // 用户创建后不再允许注册
    AuthController: {
        '*': true,
        toRegister: 'userNotCreated'
    },
    // 文章显示逻辑不需要登录
    ArticleController: {
        index: 'userCreated',
        show: 'userCreated'
    },

    CategoryController: {
        getArticles: true
    },

    TagsController: {
        getArticles: true
    }
};
