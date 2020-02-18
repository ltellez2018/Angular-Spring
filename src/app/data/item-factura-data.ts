import { Producto } from './producto-data';

export class ItemFactura {
    producto:  Producto;
    cantidad: number = 1;
    importe: number;


    public calcularImporte() {
        return this.cantidad * this.producto.precio;
    }


    
}
