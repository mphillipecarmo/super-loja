import express from 'express'
import authMiddleware from '../middleware/auth.js';
import db from '../db.js';
import multer from 'multer';
import multerConfig from '../config/multer.js';
import aws from 'aws-sdk';

const s3 = new aws.S3();

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res, next) => {
    console.log("Perfil")
    
    let usrId = 1;
    try {
        const [ selectPub ] = await db.execute(`SELECT * FROM userFeedPub fp inner join userFeedImg fi on fp.pubUsrId = fi.usrId WHERE fp.pubUsrId = fi.imgId`);
        let imgPub = []
        res.render('perfil', { isUserAuthenticated: true, selectPub})
        
    } catch (error) {
        console.log(error)

    }
});

router.post('/savePubImg', multer(multerConfig).single('file'), async (req, res) => {
    console.log(req.file);
    let usrId = 1;
    const { originalname: name, size, key, location: url = "" } = req.file;
    const { text_review, gamename_review } = req.body;

    try {
        const [insertImage] = await db.execute(`INSERT INTO userFeedImg VALUES (0,${usrId}, "${key}", "${url}")`);
        if (!insertImage || insertImage.affectedRows < 1) {
            throw new error("Erro na inserção");
        }
        const [insertPub] = await db.execute(`INSERT INTO userFeedPub VALUES (0,${usrId}, "${insertImage.insertId}", "${text_review}", "${gamename_review}")`);
        if (!insertPub || insertPub.affectedRows < 1) {
            throw new error("Erro na inserção");
        }
        res.send({ name, size, key, url, text_review, gamename_review });

    } catch (error) {
        console.log(error);
    }
});

/* delete 
router.delete('/:id', (res, req) => {
})
*/

export default router
