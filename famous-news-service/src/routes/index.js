import constollers from '../controllers'
import famousNewsRtr from './famous-news'

const registerRoutes = (app) => {
    app.use('/news', famousNewsRtr(constollers.famousNewsCtrl))
}

export default registerRoutes
