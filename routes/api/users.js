import express from 'express';
import User from '../../models/User.js'
const router = express.Router();


//@route    POST api/users/register
//@desc     User registration
//@access   public
router.post('/register',async (req,res) => {

    try {

        const { firstname,lastname,surname,email,password,country,isAdmin } = req.body;

        // Check User already exists?
        let result = await User.findOne({ email })
        if (result) {
            return res.status(400).json({ success: false,message: 'Email already registered!',user: null })
        }

        const newUser = new User({
            firstname,
            lastname,
            surname,
            email,
            password,
            country,
            isAdmin
        })

        // Registerd User as a result
        result = await newUser.save()
        return res.status(201).json({ success: true,message: 'User registered successfully',user: result })

    } catch (error) {
        console.log(error.message);
        res.status(505).send('Internal Server Error');
    }
})


//@route    POST api/users/login
//@desc     User (Customer) Login
//@access   public
router.post("/login",async (req,res) => {
    try {

        const { email,password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ success: false,message: "Invalid Email or Password",user: null })
        } else {
            if (user.password === password) {
                return res.status(400).json({ success: true,message: "Login Successful",user })
            } else {
                return res.status(400).json({ success: false,message: "Invalid Email or Password",user: null })
            }
        }


    } catch (error) {
        console.log(error.message);
        res.status(505).send('Internal Server Error');
    }
})


//@route    POST api/users/getusers
//@desc     Get all Users
//@access   private
router.get('/',async (req,res) => {

    try {

        const users = await User.find()
        res.status(200).json(users)

    } catch (error) {
        console.log(error.message);
        res.status(505).send('Internal Server Error');
    }
})

export default router