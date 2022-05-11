import User from "../models/User.js";
import generateId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJWT.js";

export const registerUser = async (req, res) => {
    // verificar si existe usuario
    const { email } = req.body;
    const emailExists = await User.findOne({ email });

    if (emailExists) {

        const error = new Error('Usuario ya registrado');

        return res.status(400).json({ msg: error.message });
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

export const authentication = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email })

    if (!user) {

        const error = new Error('El email ingresado no tiene una cuenta asociada a nuestra plataforma');

        return res.status(400).json({ msg: error.message });
    }

    if (!user.confirmado) {
        const error = new Error('Esta cuenta aun no fue confirmada. Chequee su email para verificar tu cuenta');

        return res.status(400).json({ msg: error.message });
    }

    if (await user.checkPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateJWT(),
        })
    } else {
        const error = new Error('El password es incorrecto');

        return res.status(400).json({ msg: error.message });
    }

}

export const confirmToken = async (req, res) => {
    const { token } = req.params;

    const confirmUser = await User.findOne({ token });
    if (!confirmToken) {

        const error = new Error('Token no válido');

        return res.status(400).json({ msg: error.message });
    }

    try {
        confirmUser.confirmado = true;
        confirmUser.token = "";
        await confirmUser.save();

        res.json({ msg: 'Usuario confirmado correctamente' });

    } catch (error) {

        return res.status(400).json({ msg: 'Error' });

    }
}

// usuario olvida contraseña,al ingresar su email se le genera un token para poder realizar el cambio
export const fargotPassword = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email })


    if (!user) {

        const error = new Error('El email ingresado no tiene una cuenta asociada a nuestra plataforma');

        return res.status(400).json({ msg: error.message });
    }

    try {

        user.token = generateId();
        await user.save();
        res.json({ msg: 'Hemos enviado un email con las instrucciones para el cambio de contraseña' })

    } catch (error) {

        console.log(error)
    }
}

// al generar en nuevo token, chequear que sea correcto y exista el usuario
export const checkToken = async (req, res) => {
    const { token } = req.params;

    const validToken = await User.findOne({ token })

    if (validToken) {

        res.json({ msg: 'Token válido y el Usuario existe' })

    } else {

        const error = new Error('Token no válido');

        return res.status(400).json({ msg: error.message });
    }

}

// cambio de contraseña una vez validado el token
export const newPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;


    const user = await User.findOne({ token });

    if (user) {

        user.password = password;
        user.token = "";

        try {

            await user.save();
            res.json({ msg: 'Password modificado correctamente' });

        } catch (error) {
            console.log(error);
        }

    } else {

        const error = new Error('Token no válido');

        return res.status(400).json({ msg: error.message });
    }

    res.json({ token, password })

}