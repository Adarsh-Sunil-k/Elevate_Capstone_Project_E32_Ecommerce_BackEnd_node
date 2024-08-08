import express from 'express'
import serverConfig from './config/serverConfig.js'
import dbConnection from './config/dbConfig.js'
import apiRouter from './routes/index.js'
import cookieParser from "cookie-parser"
const app = express()
app.use(express.json());
app.use(cookieParser());
app.use('/api',apiRouter);


app.get('/', (req, res) => {
    res.send('Hello World!')
})
    app.listen(serverConfig.port, () => {
        console.log(`Server is running on port ${serverConfig.port}`);
        dbConnection();
    });


