import jwt from 'jsonwebtoken';

const generateJWT = () => {
    return jwt.sign( { name: 'Gaston' }, process.env.JWT_SECRET, {
        expiresIn: "30D",
    })
}
export default generateJWT;