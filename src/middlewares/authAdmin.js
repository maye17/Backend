
function isAdmin(req, res, next) {
    if (req.session?.isAdmin) {
      return next();
    }
    return res.status(403).render('error', { error: 'error de autorización!' });
  }
module.exports = isAdmin;