const authenticationModel = require('../models/AuthentificationModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Mail = require('../facades/Mail')


const registration = async (req, res, next) => {

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    function getRandomCode(){
        const min= 1000
        const max= 9999
        return Math.floor(Math.random() * (max - min + 1))  
    }
    getRandomCode()
    const number=getRandomCode()

    const userData = new authenticationModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword,
        code: number
    });

    try {
        const userSave = await userData.save()

        if (!userSave) {
            res.status(400).send('Schema/Model non conforme')
        }
        await Mail.to(req.body.email).send('hello '+req.body.firstName + " je vous prie de copier et de saisir le code suivant dans le champ pour finaliser l'inscription: " + number)
        res.status(201).send(userSave)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

//gegerate token
const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60000s' });
}
//process.env.JWT_SECRET = 'YOUR_SECRET_KEY';
//signin
const connection = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const connectData = await authenticationModel.findOne({ email })
        console.log(connectData);
        if(connectData){
            if (connectData && bcrypt.compareSync(password, connectData.password)){
            
                const accessToken = generateAccessToken(connectData.toObject())
    
                console.log('accessToken', accessToken);
                //token
                res.status(200).send(accessToken)

            }else{
                res.status(400).send('Mot de passe Incorrect!')
            }
        }
        else{
            res.status(400).send('Données Invalid!')
        }

    }catch (e) {
        res.status(400).json({ message: e.message })
    }

}

const validate = async (req, res, next) => {
    const { code } = req.body

    try {
        const connectData = await authenticationModel.findOne({ code })

        if (connectData && connectData.code === code) {
            const accessToken = generateAccessToken(connectData.toObject())

            res.status(200).send(accessToken)
        } else {
            res.status(400).send('Code incorrect!')
        }
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
}


module.exports = {
    registration,
    connection,
    validate
}