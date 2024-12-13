const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user.schema'); // Ensure correct path to User model
const { randomBytes, createHash } = require("crypto");

exports.signup = async (req, res) => {
    // Extracting data from the request body
    const { name, email, password, confirm_password } = req.body;

    try {
        // Check if a user with the given email already exists
        const Exists = await User.findOne({ email });
        if (Exists) {
            return res.status(400).json({
                success: true,
                message: "User is already Exists"
            });
        }

        // Hash the user's password
        // const hashedPassword = await bcrypt.hash(password, 12);

        // Create ans save a new customer 
        const newUser = await User.create({
            name,
            email,
            password: password,
            confirm_password: confirm_password,  // Typically store hashed version if needed

        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully"
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};




exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const Exists = await User.findOne({ email });
        if (!Exists) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            });
        }

        // Compare passwords
        const isPasswordMatched = await bcrypt.compare(password, Exists.password);
        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Password does not match"
            });
        }

        // Generate JWT payload
        const payload = { email: Exists.email, name: Exists.name, _id: Exists._id };

        // Sign JWT token
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES
        });

        return res.status(200).json({
            success: true,
            token,
            user: {
                _id: Exists._id,
                name: Exists.name,
                email: Exists.email
            },
            message: "Login successful"
        });

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error. Please try again later."
        });
    }
};


exports.forgot = async (req, res) => {
    try {
        const { email } = req.body;
        const Exist = await User.findOne({ email });
        if (!Exist) {
            return res.status(500).json({
                success: false,
                message: "Not Exists",
            })
        }
        //create reset_password token
        const resetToken = randomBytes(32).toString("hex");
        //create Exist.reset_password_token = createHash("sha256").update(resetToken).digest("hex");
        Exist.reset_password_token_expire = Date.now() + 10 * 60 * 1000
        //save in database
        await Exist.save({
            validateBeforeSave: false
        })

        //generate a link
        // const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/customer/reset-password?token=${resetToken}`
        const resetUrl=`http://localhost:3000/reset-password?token=${resetToken}`
        //send the link in email

        return res.status(200).json({
            success: true,
            message: "reset password Successfully",
            resetUrl,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "error",
        });
    }
}
