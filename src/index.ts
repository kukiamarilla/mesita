import App from './App';
import { ClienteController } from './controllers/cliente.controller';
import { MesaController } from './controllers/mesa.controller';
import { RestauranteController } from './controllers/restaurante.controller';

const app = new App(
  [new RestauranteController(), new MesaController(), new ClienteController()],
  3000
);

app.listen();
