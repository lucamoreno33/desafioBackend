import { readFileSync, writeFileSync, existsSync } from 'node:fs';

class ProductManager {
    static #id = 0;
    #products;
    #path;
    constructor() {
        this.#path = 'productos.json'
        this.#products = this.#leerArchivo()
    }
    #leerArchivo() {
        try {
            let data;
            if (existsSync(this.#path))
                data = JSON.parse(readFileSync(this.#path, 'utf-8'));
            else
                data = [];

            return data;
        } catch (error) {
            console.log(error);
        }
    }

    addProduct(title, description, price, img, code, stock) {
        try {
            let mensaje;

            const existeCodigo = this.#products.some(p => p.code === code);

            if (existeCodigo)
                mensaje = `El codigo del producto ${code} ya existe.`;
            else {
                const newProduct = {
                    id: ++ProductManager.#id,
                    title,
                    description,
                    price,
                    img,
                    code,
                    stock,
                };

                if (!Object.values(newProduct).includes(undefined)) {
                    this.#products.push(newProduct);
                    writeFileSync(this.#path, JSON.stringify(this.#products));
                    mensaje = 'Producto agregado exitosamente!';
                } else
                    mensaje = "Se requiere completar todos los campos";

            }

            return mensaje;
        } catch (error) {
            console.log(error);
        }
    }
    getProducts = () => this.#products

    
    getProductById(id) {
        const productoId = this.#products.find(p => p.id === id);

        return productoId ? productoId : `El producto con ID ${id} no existe.`;
    }

    updateProduct(id, propiedades) {

        try {
            let mensaje;

            const indice = this.#products.findIndex(p => p.id === id);
            if (indice != -1) {
                const { id, ...rest } = propiedades;
                this.#products[indice] = { ...this.#products[indice], ...rest };
                writeFileSync(this.#path, JSON.stringify(this.#products));
                mensaje = 'El producto fue actualizado correctamente!'
            } else
                mensaje = `El producto con ID ${id} no existe`;

            return mensaje;
        } catch (error) {
            console.log(error);
        }
    }

    deleteProduct(id) {
        try {
            let mensaje;
            const index = this.#products.findIndex((product) => product.id === id)
        
            if (index !== -1) {
                this.#products.splice(index, 1);
                writeFileSync(this.#path, JSON.stringify(this.#products));
                mensaje = 'Producto eliminado correctamente';
                } 
        else {
            mensaje = `El producto con ID ${id} no existe`;
        }
    }
    catch (error) {
        console.error('Error al eliminar el producto:', error)
    }
    }
}

export default ProductManager