import App from './App';
import { MesaController } from './controllers/mesa.controller';
import { RestauranteController } from './controllers/restaurante.controller';

const app = new App([new RestauranteController(), new MesaController()], 3000);

app.listen();
