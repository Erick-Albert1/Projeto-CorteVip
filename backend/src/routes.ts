import { Router, Request, Response} from 'express'

import { CreateUserController } from '././controllers/User/CreateUserController'

const router = Router();

// router.get('/teste', (req: Request, res: Response)=>{

//     return res.json({ok: true})

// })


//--- ROTAS USER ---
router.post('/users', new CreateUserController().handle)

export{router};