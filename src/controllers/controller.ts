import { Router } from 'express';

interface Controller {
  router: Router;
  initializeRoutes(): void;
}

export { Controller };
