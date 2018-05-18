import express from 'express'

const registerRoutes = (controller) => {
    const router = express.Router()

    router.route('/')
        .get(controller.getAllNews)

    return router
}

export default registerRoutes