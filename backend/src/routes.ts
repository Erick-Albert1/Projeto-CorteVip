import { Router, Request, Response} from 'express'

import { CreateUserController } from '././controllers/User/CreateUserController'
import { AuthUserController } from './controllers/User/AuthUserController';
import { DetailUserController } from './controllers/User/DetailUserController';

import { isAthenticated } from './middlewares/isAuthenticated';

const router = Router();



//--- ROTAS USER ---
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me',isAthenticated, new DetailUserController().handle)

export{router};