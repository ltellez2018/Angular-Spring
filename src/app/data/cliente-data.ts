import { Region } from './region-data';
import { Factura } from './factura-data';


export class Cliente {
  id: number;
  nombre: string;
  apellido: string;
  createAt: string;
  email: string;
  foto: string;
  region: Region;
  facturas: Factura[] = []
}
