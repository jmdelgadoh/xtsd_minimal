import dotenv from 'dotenv';
// import { deserializeUser } from './middleware/deserializeUser';
import createServer from 'util/server';
dotenv.config()

const app = createServer();

const port = process.env.PORT || 8080


app.listen(port, async ()=>{

	console.log(`Express listening on port ${port}`)
    // await connectDB();
});

