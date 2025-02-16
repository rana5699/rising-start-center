import { Router } from "express";


const routers = Router()


const projectsRoutes =[
    {
        path:"/",
        route:"userRoutes"
    },
    {
        path:"/therapist",
        route:"therapistRoutes"
    },
    {
        path:"/doctors",
        route:"doctorsRoutes"
    }
]

projectsRoutes.forEach(({ path, route })=>{
    routers.use(path, route);
})

export default routers