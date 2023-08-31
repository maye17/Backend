

function isUser(req, res, next) {
    if (req.user) {
      return next();
    } 

    return res.status(401).render('error', { error: 'error de autenticacion!' });
  }


    module.exports = isUser;
  //redireccionando una pagina de error
  //res.redirect('/auth/error');