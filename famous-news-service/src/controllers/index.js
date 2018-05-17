import models from '../models'
import FamousNewsController from './famous-news'

export default {
    famousNewsCtrl: new FamousNewsController({ model: models.FamousNews })
}
