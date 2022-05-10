import User from "../models/User.js";
import { generateId } from "../helpers/generateId.js";

const registerUser = async (req, res) => {
    // verificar si existe usuario
    const { email } = req.body;
    const emailExist = await User.findOne({ email });

    if(emailExist){

        const error = new Error('Usuario ya registrado');

        return res.status(400).json({ msg: error.message});
    }

    try {
        const user = new User(req.body);

        user.token = generateId();

        const saveUser = await user.save();

        res.json({ user: req.body })

    } catch (error) {
        console.log('error en registerUser', error)
    }
}


export { registerUser }