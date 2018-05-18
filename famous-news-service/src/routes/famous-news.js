import express from 'express'

const registerRoutes = (controller) => {
    const router = express.Router()

    router.route('/')
        .get(controller.getAllNews)
        .post(controller.create)

    return router
}

export default registerRoutes