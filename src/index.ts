import App from './App';
import { RestauranteController } from './controllers/restaurante.controller';

const app = new App([new RestauranteController()], 3000);

app.listen();
