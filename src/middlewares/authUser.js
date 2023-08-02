

function isUser(req, res, next) {
    if (req.session?.email) {
      return next();
    }
    return res.status(401).render('error', { error: 'error de autenticacion!' });
  }


    module.exports = isUser;
