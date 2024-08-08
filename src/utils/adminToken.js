import jwt from "jsonwebtoken"
import serverConfig from "../config/serverConfig.js";
function adminToken(result) {
    return jwt.sign({data:result.email, role:result.role}, serverConfig.token, { expiresIn: '1d' });
    //jsonwebtoken.sign( {name: name}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 60});
  }
  export default adminToken ;