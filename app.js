import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
const almacenamiento = new ProductManager('./data/productos.json');
const productos = almacenamiento.getProducts()

app.use(express.urlencoded({ extended: true }))

app.get("/productos", (req, res) => {
    try{
        let pedido = productos;
        const {limit, Pid} = req.query;
            if(Pid){
                let pedido = productos.find(e => e.id == Pid)
                res.send(pedido)
            }
            if (limit){
                let pedido = productos.slice(0, limit);
                res.send(pedido);}
            res.send(pedido)
        
    }catch (error) {
        console.log(error);
    }
    
});

app.listen(3000)
