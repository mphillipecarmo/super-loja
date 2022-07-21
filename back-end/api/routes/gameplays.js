import express from 'express';
import db from '../db.js';

router.post('/register_gameplays', async (req, res) => {
    const { game_name, reg_user_email, video_gameplay } = req.body;

    try {
        const [insertGameplays] = await db.execute(`INSERT INTO gameplays VALUES (0,"${game_name}","${reg_user_email}","${video_gameplay}")`);
        if (!insertGameplays || insertGameplays.affectedRows < 1) {
            throw new error("Erro na inserção");
        }

        res.redirect('/references/gameplays')
    } catch (error) {
        console.log(error.message)
        res.send({ error: error.message })
        res.redirect('/references/gameplays')

    }
});

router.get('/get_resenha', async (req, res) => {
    const {game_name, reg_user_email} = req.body;

    try {
        return await db.execute(`SELECT video_gameplay FROM gameplays WHERE game_name=? AND reg_user_email=?`, [game_name, reg_user_email]);
    } catch (error) {
        console.log(error.message)
        res.send({ error: error.message })
        res.redirect('/references/gameplays')

    }
});

router.get('/get_resenhas', async (req, res) => {
    const {game_name} = req.body;

    try {
        return await db.execute(`SELECT reg_user_email, video_gameplay FROM gameplays WHERE game_name=?`, [game_name]);
    } catch (error) {
        console.log(error.message)
        res.send({ error: error.message })
        res.redirect('/references/gameplays')

    }
});