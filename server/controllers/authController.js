const User = require('../models/user')
const {hashPassword, comparePassword,} = require('../helpers/auth')
const jwt = require('jsonwebtoken')

// GET ENDPOINT
const test = (req, res) => {
    res.json('test is working')
}

// REGISTER ENDPOINT
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // check if name was entered
        if (!name) {
            return res.json({
                error: 'name is required'
            })
        };
        // check to see if password is good
        if(!password || password.length < 6) {
            return res.json({
                error: 'Password is required and should be atleast six charcter long'
            })
        };
         // check if email was entered
         if (!email) {
            return res.json({
                error: 'Email is required'
            })
         }
        // check to see if email exist
        const exist = await User.findOne({email});
        if (exist) {
            return res.json({
                error: 'Email is taken already'
            })
        };
        //to hash password
        const hashedPassword = await hashPassword(password)
        
        // to create new user
        const user = await User.create({
            name, 
            email, 
            password: hashedPassword,
        })
        return res.json(user)
    } catch (error) {
        console.log(error)
        
    }

}

// LOGIN ENDPOINT
const loginUser = async (req,res) => {
    try {
    const {email, password} = req.body

        // check if email is good
        if (!email) {
            return res.json({
                error: 'email is required'
            })

        }
        
        // check to see if user exist
        const user = await User.findOne({email})
        if (!user) {
            return res.json({
                error: 'No user found'
            })
        }
        // check to see if password match
        const match = await comparePassword(password, user.password)
        if (match) {
            jwt.sign({ email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) {
                    throw new err;
                }
                res.cookie('token', token).json(user)
            })
                }
        if (!match) {
            return res.json({
                error: 'incorrect password'
            })
        }
        
    } catch (error) {
        console.log(error)
        
    }
}

//PROFILE ENDPOINT
const getProfile = (req, res) => {
    const {token} = req.cookies
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw new err;
            res.json(user)
        })
       
    }  else {
        res.json(null)
    }

}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
}