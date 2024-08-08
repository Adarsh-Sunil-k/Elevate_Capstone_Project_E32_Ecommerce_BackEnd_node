import dotenv from "dotenv"
dotenv.config();
export default {
    port : process.env.PORT || 4000,
    db: process.env.DB_URL || "",
    token: process.env.TOKEN_SECRET,
}
