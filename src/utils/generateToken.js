import jwt from "jsonwebtoken"
import serverConfig from "../config/serverConfig.js"
function generateToken(email){
    return jwt.sign({email}, serverConfig.token, { expiresIn: '1d' });
}

export default generateToken;

// import jwt from "jsonwebtoken" ;
// import serverConfig from "../config/serverConfig.js";

// function generateToken(username) {
//     return jwt.sign({name:username}, serverConfig.token, { expiresIn: '1d' });
//     //jsonwebtoken.sign( {name: name}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 60});
//   }
//   export default generateToken ;

// import jwt from 'jsonwebtoken';

// const generateToken = (email) => {
//   return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
// };
