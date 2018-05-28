import express from 'express'

const initRouter = (controller) => {
    const router = express.Router()

    router.route('/:news_type')
        .get(controller.getAllNewsByType)
        .post(controller.addNews)
        .put(controller.updateNews)

    router.route('/:news_type/:news_id')
        .get(controller.getNews)
    
    router.route('/all')
        .get(controller.getAllNews)
    

    return router
}

export default initRouter