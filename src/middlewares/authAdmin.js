
function isAdmin(req, res, next) {
  //  if (req.session?.isAdmin) {
    
  if (req.user && req.user.isAdmin){
  return next();
    }


    return res.status(403).render('error', { error: 'error de autorización!' });
  }
module.exports = isAdmin;   

//redireccionando a una pagina de error
//res.redirect('/auth/error'); 