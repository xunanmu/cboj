var express = require('express');
var router = express.Router();
var p = require('../model/problem');

var nav = [
	{ name: '首页', ref: '/', active: false },
	{ name: '问题', ref: '/problem', active: true },
	{ name: '状态', ref: '/status', active: false },
	{ name: '比赛', ref: '/contest', active: false },
	{ name: '排名', ref: '/ranklist', active: false }
            ];

var problems, login; 

var perPage = 100;

function getProblems(pageId, callback) {
    p.fetchProblems(1 + perPage * (pageId - 1), perPage, function(err, doc) {
        if (err) return;
        problems = doc;
        callback();
    });
}

router.get('/', function(req, res) {
    if (req.session.user) login = req.session.user;
    else login = null;
    getProblems(1, function() {
        for (var i = 0; i < problems.length; ++ i) {
            if (problems[i].avail == false && !(req.session.user && req.session.user.admin)) {
                problems[i].name = '这是权限题';
            }
        }
        res.render('v2/problem', { title: '问题 - CodeBursts!', nav: nav, problems: problems, login: login });
    });
});

router.get('/:pageId', function(req, res) {
    if (req.session.user) login = req.session.user;
    else login = null;
    getProblems(req.params.pageId, function() {
        res.render('v2/problem', { title: '问题 - CodeBursts!', nav: nav, problems: problems, login: login });
    });
});

module.exports = router;

