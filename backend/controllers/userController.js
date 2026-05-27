import User from "../models/userModels.js"
import bcrypt from "bcryptjs"

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()

        res.setHeader('Cache-Control', 'no-store')

        setTimeout(() => {
            res.status(200).json(users)
        }, 3000)

    } catch (e) {
        console.log("Error:", e)

        res.status(500).json({
            message: "Error fetching users"
        })
    }
}

export const addUser = async (req, res) => {
    try{
        const { userId, password, role } = req.body
        const existingUser = await User.findOne({ userId })
        if(existingUser){
            return res.status(400).json({
                message:"User already exists"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new User({
            userId,
            password: hashedPassword,
            role
        })
        await user.save()
        res.status(201).json({
            message:"User added successfully",
            user:{
                userId:user.userId,
                role:user.role
            }
        })
    }catch(e){
        console.log("Error:",e)
        res.status(500).json({
            message:"Error adding user"
        })
    }
}

export const loginUser = async (req, res) => {
  try {
    console.log("BODY:", req.body)
    const { userId, password, role } = req.body

    const user = await User.findOne({ userId, role })
    console.log("FOUND USER:", user)

    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials"
      })
    }

    console.log("USER PASSWORD:", user.password)
    const isMatch = await bcrypt.compare(password, user.password)
    console.log("PASSWORD MATCH:", isMatch)

    if (isMatch) {
      res.status(200).json({
        message: "Login Successful",
        user
      })
    } else {
      res.status(401).json({
        message: "Invalid Credentials"
      })
    }
  } catch (e) {
    console.log("LOGIN ERROR:", e)
    res.status(500).json({
      message: "Login Error"
    })
  }
}
