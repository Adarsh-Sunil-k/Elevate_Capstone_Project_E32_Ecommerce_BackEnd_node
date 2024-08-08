import jwt from "jsonwebtoken"
import serverConfig from "../config/serverConfig.js"
function generateToken(email){
    jwt.sign({name:email}, serverConfig.token, { expiresIn: '1d' });
}

export default generateToken;