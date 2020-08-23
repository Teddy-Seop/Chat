var common;
(function (common) {
    exports.isAuthenticated = (req, res, next) => {
        console.log('isAuthenticated');
        console.log(req.user);
        if (!req.isAuthenticated()) {
            res.redirect('/');
        }
        else {
            next();
        }
    };
})(common || (common = {}));
//# sourceMappingURL=common.js.map