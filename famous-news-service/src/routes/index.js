import constollers from '../controllers'
import famousNewsRtr from './famous-news'

const registerRoutes = (app) => {
    app.use(famousNewsRtr(constollers.famousNewsCtrl))
}

export default registerRoutes
