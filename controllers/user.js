const Account = require('../models/account');
class userController{
    login_get(req,res){
        res.render('Login/login')
    }
    register_get(rep,res){
        res.render('Login/register')
    }

    login_post(req,res){

    }
    async register_post(req,res){
        try{
            let data = req.body;
            console.log(data);
            const user = await Account.create(data);
            res.status(201).json({user:user._id});
        }
        catch(ex){
            console.log(ex.message);
        }
    }
    forgot_get(req, res) { res.render('Login/forgot-password') };

    async forgot_post(req, res) {
                const { email } = req.body
                const { password } = req.body
                    //res.send(email)
                let UserEmail = await AccountModel.findOne({ email })
                let UserID = await AccountModel.findById('6367ca98d840d1daec4ab049')

                let Userpass = AccountModel.findOne(password)
                if (!UserEmail) {
                    res.send('User not registered')
                    return;
                }
                const secret = JWT_SECRET + Userpass.password
                const payload = {
                    email: UserEmail.email,
                    _id: UserID._id
                }
                const token = jwt.sign(payload, secret, { expiresIn: '5m' })
                const link = `http://localhost:3000/signup/reset-password/${UserID._id}/${token}`
                console.log(link);
                res.send('Mã reset mật khẩu đã được gửi vào email...')
            }
}
module.exports = new userController;
