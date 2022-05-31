import App from './App';
import { ClienteController } from './controllers/cliente.controller';
import { MesaController } from './controllers/mesa.controller';
import { ReservaController } from './controllers/reserva.controller';
import { RestauranteController } from './controllers/restaurante.controller';

const app = new App(
  [
    new RestauranteController(),
    new MesaController(),
    new ClienteController(),
    new ReservaController(),
  ],
  3000
);

app.listen();
