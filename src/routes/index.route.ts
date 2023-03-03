import { Request, Response, Router } from "express";

const appRouter = Router()

appRouter.get('/healthcheck',(req : Request, res: Response)=>{
	res.status(200).send('<h1>Server running and API is connected!%^</h1>')
})

appRouter.use('*',(req : Request, res: Response)=>{
	res.status(404).send('404 - Resource not found')
})
export default appRouter