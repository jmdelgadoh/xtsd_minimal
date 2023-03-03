import express from 'express'

import appRouter from 'routes/index.route';
import cors from 'cors';
// import cookieParser from 'cookie-parser'

function createServer(){
    const app = express();
    app.use(cors({
        origin: 'http://localhost:3000' //fix this?
    }))

    app.use(express.json());
    app.use(appRouter);

    return app;
}

export default createServer