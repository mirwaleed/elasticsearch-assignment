import { Router } from 'express';

import Paths from './constants/Paths';
import SearchRoutes from './SearchRoutes';

// **** Variables **** //

const apiRouter = Router();

// **** Setup **** //

const searchRouter = Router();

// Search for users

searchRouter.get('/', SearchRoutes.search);

searchRouter.post('/_search', SearchRoutes.elasticSearch);

searchRouter.get(Paths.Search.Add, SearchRoutes.add);

apiRouter.use(Paths.Search.Base, searchRouter);

// ** Add UserRouter ** //

const userRouter = Router();

// **** Export default **** //

export default apiRouter;
