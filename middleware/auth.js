const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) =>{

  let token = req.get('Authorization');

  console.log('Header token:',token);
  

  jwt.verify(token, 'claveSecreta123456789', (err, decoded) =>{
    if(err){
      err.statusCode = 401;
      next(err);
    }

    console.log('decoded:',decoded);

    req.usuario = decoded;
        
    next();

  });

}

const isAdmin = (req, res, next) => {

  let usuario = req.usuario;

  if(usuario.role === 'ADMIN_ROLE'){
    next();
  }else{
    let err = new Error('Rol no valido');
    err.statusCode = 401;
    next(err)
  }


}


module.exports = {
  isAuth,
  isAdmin
}