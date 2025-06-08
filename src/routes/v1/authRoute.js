import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { userController } from '~/controllers/authController'
import authentication from '~/middlewares/authenticationMiddleware'
const router = express.Router()



router.route('/signup')
  .post(expressAsyncHandler(userController.signUp))

router.route('/login')
  .post(expressAsyncHandler(userController.login))


router.use(authentication)  

router.route('/logout')  
  .post(expressAsyncHandler(userController.logout))
 
router.route('/refresh-token')  
  .post(expressAsyncHandler(userController.refreshToken))
 
  
export const authRoute = router