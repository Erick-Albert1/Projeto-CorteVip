import { Router, Request, Response} from 'express'

import { CreateUserController } from '././controllers/User/CreateUserController'
import { AuthUserController } from './controllers/User/AuthUserController';
import { DetailUserController } from './controllers/User/DetailUserController';
import { UpdateUserController } from './controllers/User/UpdateUserController';

import { CreateHaircutController } from './controllers/Haircut/CreateHaircutController';
import { ListHaircutControler } from './controllers/Haircut/ListHaircutController';
import { UpdateHaircutController } from './controllers/Haircut/UpdateHaircutController';
import { CheckSubscriptionController } from './controllers/Haircut/CheckSubscriptionController';
import { CountHaircutsController } from './controllers/Haircut/CountHaircutsController';
import { DetailHaircutController } from './controllers/Haircut/DetailHaircutController';

import { NewScheduleController } from './controllers/schedule/NewScheduleController';
import { ListScheduleController } from './controllers/schedule/ListScheduleController';
import { FinishScheduleController } from './controllers/schedule/FinishScheduleController';

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
router.put('/haircut', isAthenticated, new UpdateHaircutController().handle)
router.get('/haircut/check', isAthenticated, new CheckSubscriptionController().handle)
router.get('/haircut/count', isAthenticated, new CountHaircutsController().handle)
router.get('/haircut/detail', isAthenticated, new DetailHaircutController().handle)

//--- ROTA SCHEDULE/SERVIÇOS---
router.post('/schedule', isAthenticated, new NewScheduleController().handle)
router.get('/schedule', isAthenticated, new ListScheduleController().handle)
router.delete('/schedule', isAthenticated, new FinishScheduleController().handle)
export{router};