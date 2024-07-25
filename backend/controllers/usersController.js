import User from "../models/user.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const signup = async (req, res) => {
    try {
        const {email, password,name} = req.body

        const hashedPassword = bcrypt.hashSync(password, 8)
        await User.create({email,name, password: hashedPassword})

        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
}
const login = async (req, res) => {
    try {
        const {email, password} = req.body

        const user = await User.findOne({email})
        if (!user) return res.sendStatus(401)
        const passwordMatch = bcrypt.compareSync(password, user.password)
        if (!passwordMatch) return res.sendStatus(401)

        const exp = Date.now() + 1000 * 60 * 60 * 24 * 30
        const token = jwt.sign({sub: user._id, exp: exp}, process.env.JWT_SECRET)

        res.cookie("Authorization", token, {
            expires: new Date(exp),
            httpOnly: true,
            sameSite: 'lax',
        })


        res.sendStatus(200)
    } catch (err) {
        console.log(res)
        res.sendStatus(400)
    }
}


const checkAuth = async (req, res) => {
    try {
        console.log(req.user)
        res.sendStatus(200)

    } catch (err) {
        console.log(res)
        res.sendStatus(400)
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("Authorization")
        res.sendStatus(200)

    } catch (err) {
        console.log(res)
        res.sendStatus(400)
    }
}

export {signup, logout, login, checkAuth}