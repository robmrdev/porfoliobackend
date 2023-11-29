import express from "express";
import nodemailer from 'nodemailer'
import mongoose from "mongoose";
import cors from 'cors'
import { counterModel } from "./src/dao/models/counter.model.js";
const app = express()
app.use(express.json());
app.use(cors({origin: 'https://robertmendoza.netlify.app/',credentials: true}))
// const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true, // Utiliza SMTPS
//     auth: {
//         user: 'robmr.dev@gmail.com',
//         pass: 'dpiugbguhugqkwya'
//     }
// })
try {
    await mongoose.connect('mongodb+srv://robmrdev:6jaBoEyWbmYr3K50@porfoliocluster.f5l4xfs.mongodb.net/portfolioDB?retryWrites=true&w=majority')
    console.log('DB connected')
} catch (error) {
    console.log(error.message)   
}

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Utiliza SMTPS
    auth: {
        user: 'robmr.dev@gmail.com',
        pass: 'dpiugbguhugqkwya'
    },
    tls: {
        rejectUnauthorized: false // Desactiva la verificación del certificado (SOLO PARA DESARROLLO)
    }
})

app.post('/mail', async (req,res)=>{
    const {name, email, message} = req.body
    const formattedMessage = message.replace(/\n/g, '<br>');
    try {
        await transporter.sendMail({
            from: 'PORFOLIO MESSAGE',
            to: 'robmr.dev@gmail.com',
            subject: `PORTFOLIO MESSAGE FROM ${name}`,
            html: `<div><h1>Mail de la persona que envia: ${email}</h1><br/><p>${formattedMessage}</p></div>`
        });
        res.send({status:'success', message: 'Correo Enviado!'});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al enviar el correo');
    }
})
app.get('/counter/:counterType', async (req,res)=>{
    const {counterType} = req.params
    const counter = await counterModel.findOne()|| new counterModel();
    counter[counterType]++;
    await counter.save()
    res.json({ counter: counter.counter });
})

app.get('/', (req,res)=>{
    res.send('prueba')
})

app.listen(8080);

