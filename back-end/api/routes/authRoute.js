import express from 'express';
import db from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import cookieParser from 'cookie-parser';

import { readFile } from 'fs/promises';
const authConfig = JSON.parse(await readFile(new URL('../config/auth.json', import.meta.url)));

const router = express.Router();

router.use(cookieParser());

function sendMail(user_uname, user_email) {
    const myMail = "spielshiff@gmail.com";
    const myPass = "NirLr3rNHXPWTyC"; //Colocar a senha

    const userName = "Abacatinho";

    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: myMail,
            pass: myPass
        }
    });

    // Email é enviado para myMail apenas para confirmar o envio
    transporter.sendMail({
        from: myMail,
        to: `${user_email}, ${myMail}`,
        replyTo: myMail,
        subject: `Olá ${user_uname}, seja bem-vindo a SpielShiff`,
        html: `<h2>Olá novo ${userName}, </h2>
                <p>muito obrigado por se cadastrar na nossa plataforma!</p>
                <p>Aproveite as novidades do mundo dos jogos.</p>
                <img src="cid:banner"/>
                `,
        attachments: [{
            filename: 'banner-email.jpg',
            path: 'public/images/banner-email.jpg',
            cid: 'banner'
        }]
    }).then(info => {
        console.log(info)
        //res.send(info)
    }).catch(error => { res.send(error) });
}

router.post('/register', async (req, res) => {
    const { reg_user_name, reg_user_email, reg_user_uname, reg_passwd_login, reg_passwd_conf } = req.body;

    try {
        if (reg_user_name === '' || reg_user_email === ''
            || reg_user_uname === '' || reg_passwd_login === ''
            || reg_passwd_conf === '') {
            throw new Error(`Preencha todos os campos!`);
        }
        const [findOne] = await db.execute(`SELECT * FROM user WHERE usr_email=?`, [reg_user_email]);

        if (findOne.length > 0) {
            throw new Error(`Usuário já existente!`);
        }
        let hash = '';
        if (reg_passwd_login === reg_passwd_conf) {
            hash = await bcrypt.hash(reg_passwd_login, 10);
        } else throw new error("Senhas não conferem");

        const [insertUser] = await db.execute(`INSERT INTO user VALUES (0,"${reg_user_name}","${reg_user_email}", "${hash}", "${reg_user_uname}")`);
        if (!insertUser || insertUser.affectedRows < 1) {
            throw new error("Erro na inserção");
        }

        let mailResp = sendMail(reg_user_uname, reg_user_email);

        res.redirect('/perfil');
    } catch (error) {
        //console.log(error.message);
        res.redirect('/')

    }
});

router.post('/authenticate', async (req, res) => {
    try {
        const { user_login, passwd_login } = req.body;

        //Se o user ou pass estiverem vazios retornar erro

        const [findOne] = await db.execute(`SELECT * FROM user WHERE usr_email="${user_login}"`);

        if (!findOne || findOne === '')
            throw new error("User not found");

        if (!await bcrypt.compare(passwd_login, findOne[0].usr_password))
            throw new error("Invalid password");

        findOne[0].password = undefined;
        const token = jwt.sign({ id: findOne[0].usr_id }, authConfig.secret, { expiresIn: 86400 });

        res.cookie("spielshiffAccessToken", 'Bearer ' + token, { maxAge: 900000 })

        res.redirect('/perfil')
      
    } catch (error) {
        console.log(error)
    }

});

export default router