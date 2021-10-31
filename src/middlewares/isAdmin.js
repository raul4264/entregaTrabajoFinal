const ADMIN = true;

const isAdmin = (req, res, next) => {
  if (ADMIN) {
    next();
  } else { 
    res
      .status(401)
      .json({
        error: -1,
        descripcion: `ruta ${req.path} metodo ${req.method} no autorizada`, 
      })
  }
};

module.exports = isAdmin;
