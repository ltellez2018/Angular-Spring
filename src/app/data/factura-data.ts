import { ItemFactura } from './item-factura-data';
import { Cliente } from './cliente-data';

export class Factura {
    id: number;
    descripcion: string; 
    observacion: string; 
    items: ItemFactura[] = [];
    cliente: Cliente;
    total: number;
    createAt: string;

    calculrGranTotal (): number {
        this.total = 0;
        this.items.forEach((item: ItemFactura) => this.total += item.calcularImporte());
        return this.total;
    }
}
