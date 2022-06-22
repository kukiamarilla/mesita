import App from './App';
import { ClienteController } from './controllers/cliente.controller';
import { MesaController } from './controllers/mesa.controller';
import { ReservaController } from './controllers/reserva.controller';
import { RestauranteController } from './controllers/restaurante.controller';
import { CategoriaController } from './controllers/categoria.controller';

const app = new App(
  [
    new RestauranteController(),
    new MesaController(),
    new ClienteController(),
    new ReservaController(),
    new CategoriaController(),
  ],
  3000
);

app.listen();
