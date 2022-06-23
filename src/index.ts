import App from './App';
import { ClienteController } from './controllers/cliente.controller';
import { MesaController } from './controllers/mesa.controller';
import { ReservaController } from './controllers/reserva.controller';
import { RestauranteController } from './controllers/restaurante.controller';
import { ProductoController } from './controllers/producto.controller';
import { CategoriaController } from './controllers/categoria.controller';
import { ConsumicionController } from './controllers/consumicion.controller';
import { DetalleConsumicionController } from './controllers/detalleConsumicion.controller';

const app = new App(
  [
    new RestauranteController(),
    new MesaController(),
    new ClienteController(),
    new ReservaController(),
    new CategoriaController(),
    new ProductoController(),
    new ConsumicionController(),
    new DetalleConsumicionController(),
  ],
  3000
);

app.listen();
