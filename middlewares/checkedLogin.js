const checkLogin = (req, res, next)=>{
    if(req.headers.authorization != 'undefined'){
        next();
    }else{
        next("Authentication required!")
    }

}

module.exports = checkLogin;