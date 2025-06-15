import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { authController} from '~/controllers/authController'
import authentication, { authenticationV2 } from '~/middlewares/authenticationMiddleware'
const router = express.Router()



router.route('/signup')
  .post(expressAsyncHandler(authController.signUp))

router.route('/login')
  .post(expressAsyncHandler(authController.login))


router.use(authenticationV2)

router.route('/logout')  
  .post(expressAsyncHandler(authController.logout))
 
router.route('/refresh-token')  
  .post(expressAsyncHandler(authController.refreshToken))
 
  
export const authRoute = router