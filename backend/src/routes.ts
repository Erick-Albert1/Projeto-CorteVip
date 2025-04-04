import { Router, Request, Response} from 'express'

import { CreateUserController } from '././controllers/User/CreateUserController'
import { AuthUserController } from './controllers/User/AuthUserController';
import { DetailUserController } from './controllers/User/DetailUserController';
import { UpdateUserController } from './controllers/User/UpdateUserController';

import { CreateHaircutController } from './controllers/Haircut/CreateHaircutController';
import { ListHaircutControler } from './controllers/Haircut/ListHaircutController';

import { isAthenticated } from './middlewares/isAuthenticated';

const router = Router();



//--- ROTAS USER ---
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me',isAthenticated, new DetailUserController().handle)
router.put('/userss',isAthenticated, new UpdateUserController().handle)


//--- rota haircuts ---
router.post('/haircut', isAthenticated, new CreateHaircutController().handle)
router.get('/haircuts',isAthenticated, new ListHaircutControler().handle)
export{router};