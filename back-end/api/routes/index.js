import express from 'express'
import cookieParser from 'cookie-parser';
import db from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multerConfig from '../config/multer.js';
import multer from 'multer';


import { readFile } from 'fs/promises';
const authConfig = JSON.parse(await readFile(new URL('../config/auth.json', import.meta.url)));

const router = express.Router();

router.use(cookieParser());
/*router.get('/', (req, res) =>{

    let isUserAuthenticated = false;
    const { cookies } = req;

    if ("spielshiffAccessToken" in cookies) {
        isUserAuthenticated = true;
    }

    res.render('index',{isUserAuthenticated})
});
*/
/* GET página inicial */
router.get('/', async (req, res, next) => {
    const { sts_CPF } = req.body;
    console.log(sts_CPF)

    try {
        const [productlist] = await db.execute(`SELECT * FROM loja.product;`);

        console.log(productlist)
        res.format({
            html: () => res.render('index', { productlist: productlist, funcionario: true }),
            json: () => res.json({ productlist })
        })

    } catch (error) {
        console.log(error)
    }

})

/* GET página inicial */
router.get('/cadastrar', async (req, res, next) => {
    try {

        const [productlist] = await db.execute(`SELECT * FROM loja.product;`);

        console.log(productlist)
        res.format({
            html: () => res.render('user_register', { productlist: productlist, funcionario: true }),
            json: () => res.json({ productlist })
        })

    } catch (error) {
        console.log(error)
    }

})


router.post('/cadastrar', async (req, res, next) => {
    const { usr_name, usr_email, usr_password, usr_uname } = req.body;

    console.log(req.body)
    try {
        if (usr_name === '' || usr_email === ''
            || usr_password === '' || usr_uname === '') {
            throw new Error(`Preencha todos os campos!`);
        }
        const [findOne] = await db.execute(`SELECT * FROM loja.user WHERE usr_email=?`, [usr_email]);
        if (findOne.length > 0) {
            throw new Error(`Usuário já existente!`);
        }
        let hash = '';
        if (usr_password === usr_password) {
            hash = await bcrypt.hash(usr_password, 10);
        } else throw new error("Senhas não conferem");

        const [user] = await db.execute(`INSERT INTO loja.user VALUES (0,'${usr_name}','${usr_email}','${hash}','${usr_uname}')`)

        if (!user || user.affectedRows < 1) {
            throw new Error('Usuário não foi inserido corretamente')
        }

        res.format({
            html: () => {
                res.render('index', { success: 'Usuario cadastrado com sucesso' })

            }
        })

        //res.redirect('/teste')
    } catch (error) {

        console.log(error.sqlMessage)
        res.format({
            html: () => {
                res.render('index', { error: error.message })

            }
        })
    }
})

router.get('/login', async (req, res, next) => {

    try {

        res.format({
            html: () => res.render('user_login'),
        })

    } catch (error) {
        console.log(error)
    }

})

router.post('/login', async (req, res, next) => {
    try {
        const { usr_mail, usr_password } = req.body;

        //Se o user ou pass estiverem vazios retornar erro

        const [findOne] = await db.execute(`SELECT * FROM loja.user WHERE usr_email="${usr_mail}"`);

        if (!findOne || findOne === '')
            throw new error("User not found");

        if (!await bcrypt.compare(usr_password, findOne[0].usr_password))
            throw new error("Invalid password");

        findOne[0].password = undefined;
        const token = jwt.sign({ id: findOne[0].usr_id }, authConfig.secret, { expiresIn: 86400 });

        res.cookie("superloja", 'Bearer ' + token, { maxAge: 900000 })
        res.cookie("superloja_usr_id", findOne[0].usr_id, { maxAge: 900000 })
        'Bearer ' + token,

            res.redirect('/perfil')

    } catch (error) {
        console.log(error)
    }


})

router.get('/perfil', async (req, res, next) => {
    const usr_id = req.cookies.superloja_usr_id
    console.log(usr_id)
    try {
        const [perfil_user] = await db.execute(`SELECT * FROM loja.user WHERE usr_id = "${usr_id}"`);
        console.log(perfil_user)
        const [perfil_productlist] = await db.execute(`SELECT * FROM loja.product WHERE usr_id = "${usr_id}"`);

        console.log(perfil_productlist)
        res.format({
            html: () => res.render('user_perfil', { perfil_productlist: perfil_productlist, perfil_user: perfil_user, funcionario: true }),
            json: () => res.json({ perfil_productlist, perfil_user })
        })

    } catch (error) {
        console.log(error)
    }

})

router.get('/user_produto', async (req, res, next) => {

    try {

        res.format({
            html: () => res.render('user_produto'),
        })

    } catch (error) {
        console.log(error)
    }

})


router.post('/adicionar_produto', multer(multerConfig).single('file'), async (req, res) => {
    console.log(req.file);

    let usrId = req.cookies.superloja_usr_id;
    const { originalname: name, size, key, location: url = "", filename } = req.file;
    const { product_name, product_desc } = req.body;

    try {
        const [insertPub] = await db.execute(`INSERT INTO loja.product VALUES (0,"tmp/uploads/${filename}", "${product_name}", "${product_desc}", "${usrId}")`);
        if (!insertPub || insertPub.affectedRows < 1) {
            throw new error("Erro na inserção");
        }
        res.redirect('/perfil')
    } catch (error) {
        console.log(error);
    }
});

router.post('/apagar_produto', async (req, res) => {
    const { product_id } = req.body;
    console.log(req.body)
    console.log(product_id)

    try {
        const [insertPub] = await db.execute(`DELETE FROM loja.product WHERE product_id=${product_id}`);

        res.redirect('/perfil')
    } catch (error) {
        console.log(error);
    }
});



router.post('/alterar_senha', async (req, res, next) => {
    try {
        const { usr_email, senha, novasenha } = req.body;
        let usrId = req.cookies.superloja_usr_id;
        //Se o user ou pass estiverem vazios retornar erro

        const [findOne] = await db.execute(`SELECT * FROM loja.user WHERE usr_id="${usrId}"`);

        if (!findOne || findOne === '')
            throw new error("User not found");

        if (!await bcrypt.compare(senha, findOne[0].senha))
            throw new error("Invalid password");


        console.log("oi")
        let hash = '';
        if (novasenha === novasenha) {
            hash = await bcrypt.hash(novasenha, 10);
        } else throw new error("Senhas não conferem");

        const [user] = await db.execute(`UPDATE loja.user SET usr_password = ${novasenha} WHERE usr_id="${usrId}"`)

        if (!user || user.affectedRows < 1) {
            throw new Error('Não foi alterado')
        }



        findOne[0].password = undefined;
        
        const token = jwt.sign({ id: findOne[0].usr_id }, authConfig.secret, { expiresIn: 86400 });

        res.cookie("superloja", 'Bearer ' + token, { maxAge: 900000 })
        res.cookie("superloja_usr_id", findOne[0].usr_id, { maxAge: 900000 })
        'Bearer ' + token,

            res.redirect('/perfil')

    } catch (error) {
        console.log(error)
    }


})

export default router