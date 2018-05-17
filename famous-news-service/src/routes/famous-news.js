import express from 'express'

const registerRoutes = (controller) => {
    const router = express.Router()

    router.route('/')
        .get(controller.getAllNews)
}

export default registerRoutes