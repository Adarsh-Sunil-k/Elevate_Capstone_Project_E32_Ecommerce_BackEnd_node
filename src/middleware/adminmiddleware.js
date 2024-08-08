import jwt from "jsonwebtoken" ;
import serverConfig from "../config/serverConfig.js";
// import adminToken from "../utils/adminToken.js";


const authenticateAdmin = (req,res,next)=>{
    console.log("cookies",req.cookies);
    const token = req.cookies.token
    console.log("tocken",token);
    if(!token){
        res.send("token not provided");
    }

    jwt.verify(token,serverConfig.token,(err,result)=>{
        if(err){
            console.log(err);
            return res.status(401).send("not verified");
        }
        console.log("result",result);
        if(result.role !== "admin"){
            return res.status(401).send("not admin");
        }
        req.user = result;
        next();
    });
};
export default authenticateAdmin;