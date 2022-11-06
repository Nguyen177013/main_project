
class userController{
    login_get(req,res){
        res.render('Login/login')
    }
    register_get(rep,res){
        res.render('Login/register')
    }

    login_post(req,res){

    }
    register_post(rep,res){

    }
}
module.exports = new userController;
