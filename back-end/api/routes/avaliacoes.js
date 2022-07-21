import express from 'express';
import db from '../db.js';

const router = express.Router();

router.post('/register_avaliacoes', async (req, res) => {
    const { game_name, reg_user_email, gostou, titulo_avaliacao, texto_avaliacao } = req.body;

    try {
        const [findOne] = await db.execute(`SELECT * FROM avaliacoes WHERE game_name=? AND reg_user_email=?`, [game_name, reg_user_email]);

        if (findOne.length > 0) {
            await db.execute(`DELETE * FROM avaliacoes WHERE game_name=? AND reg_user_email=?`, [game_name, reg_user_email]);
        }
        const [insertAvaliacao] = await db.execute(`INSERT INTO avaliacoes VALUES (0,"${game_name}","${reg_user_email}","${gostou}", "${titulo_avaliacao}", "${texto_avaliacao}")`);
        if (!insertAvaliacao || insertAvaliacao.affectedRows < 1) {
            throw new error("Erro na inserção");
        }

        res.redirect('/')
    } catch (error) {
        console.log(error.message)
        res.send({ error: error.message })
        res.redirect('/')

    }
});

router.get('/get_avaliacao', async (req, res) => {
    const {game_name, reg_user_email} = req.body;

    try {
        return await db.execute(`SELECT gostou, titulo_avaliacao, texto_avaliacao FROM avaliacoes WHERE game_name=? AND reg_user_email=?`, [game_name, reg_user_email]);
    } catch (error) {
        console.log(error.message)
        res.send({ error: error.message })
        res.redirect('/')

    }
});

router.get('/get_avaliacoes/:game_name', async (req, res) => {
    const {game_name} = req.params.game_name;

    try {
        var [variavel] = await db.execute(`SELECT reg_user_email, gostou, titulo_avaliacao, texto_avaliacao FROM avaliacoes WHERE game_name=${game_name}`);
		console.log(variavel);
		res.send(variavel);
    } catch (error) {
        console.log(error.message)
        res.send({ error: error.message })
        res.redirect('/')

    }
});

/*router.get('/get_popularidade', async (req, res) => {
    const {game_name} = req.body;

    try {
		var cont = 0;
        const [findOne] = await db.execute(`SELECT gostou FROM avaliacoes WHERE game_name=?`, [game_name]);
		for (let item of findOne) {
			if item == "SIM"{
				cont++;
			}
		}
		return (cont*100)/(findOne.length);
			
    } catch (error) {
        console.log(error.message)
        res.send({ error: error.message })
        res.redirect('/references')

    }
});*/

export default router;