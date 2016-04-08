/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
// 文章查询顺序：以更新时间逆序
FIND_ORDER = 'createdAt desc';
// 文章每页条目数
FIND_PER_PAGE = 2;

module.exports = {
    getArticles: function (req, res) {
        var id = req.param('id');
        var page = req.param('page') ? req.param('page') : 1;
        // 获得对应分类的所有文章
        // 获得总页数
        Article
            .count({category: id})
            .then(function (count) {
                return [
                    Math.ceil(count / FIND_PER_PAGE),
                    page,
                    Article.find({
                        where: {
                            category: id
                        },
                        sort: FIND_ORDER,
                        select: ['id', 'title', 'createdAt']
                    }).paginate({page: page, limit: FIND_PER_PAGE}),
                    Category.findOne(id)
                ];
            })
            .spread(function (count, page, articles, category) {
                res.view(
                    'category/index',
                    {
                        count: count,
                        page: page,
                        articles: articles,
                        category: category
                    }
                );
            })
            .catch(function (err) {
                res.badRequest();
            });

    }
};

