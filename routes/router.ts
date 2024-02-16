import { Router, Request, Response } from 'express';
import Server from '../classes/server';

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: "Todo está bien!!"
    })

});


//Recuperamos datos del x-www-form-urlencoded
router.post('/mensajes', (req: Request, res: Response) => {

    //parametros del postman
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;


    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;
    //Enviamos mensaje a un usuario(id) en especifico
    server.io.emit('mensaje-nuevo', payload);


    res.json({
        ok: true,
        cuerpo: cuerpo,
        de: de
    })

});


//Recuperando un parámetro de la ruta (url) y form
router.post('/mensajes/:id', (req: Request, res: Response) => {

    //parametros del postman
    const cuerpo = req.body.cuerpo; //recupera del form
    const de = req.body.de;
    const id = req.params.id; //recupera el parámetro de la url


    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;

    //Enviamos mensaje a un usuario(id) en especifico
    server.io.in(id).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        cuerpo: cuerpo,
        de: de,
        id: id
    })

});




//Exportamos el router por defecto
export default router;