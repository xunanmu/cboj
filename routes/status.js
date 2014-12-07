var express = require('express');
var router = express.Router();
var stats = require('../model/submission');
var judger = require('../model/judger');
var Step = require('step');

var nav = [
	{ name: '首页', ref: '/', active: false },
	{ name: '问题', ref: '/problem', active: false },
	{ name: '状态', ref: '/status', active: true },
	{ name: '比赛', ref: '/contest', active: false },
	{ name: '排名', ref: '/ranklist', active: false }
            ];

router.get('/', function(req, res) {
    stats.getstats(1, function(arr) {
        res.render('status', {status: arr, nav: nav, title: '状态 - CodeBursts'});
    });
});

router.get('/:submissionId', function(req, res) {
    var submissionId = req.params.submissionId;
    submissionId = Number(submissionId);
    Step(
        function() {
            judger.getSubmission(Number(submissionId), this);
        },
        function(err, doc) {
            if (req.session.user && doc && req.session.user.username == doc.user) {
                res.render('status/view', { nav: nav, title: submissionId + ' - 记录 - CodeBursts', doc: doc});
            } else res.redirect(302, '/status');
        }
        );
});

module.exports = router;

