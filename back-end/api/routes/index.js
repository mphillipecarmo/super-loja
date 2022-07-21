import express from 'express'
import cookieParser from 'cookie-parser';

const router = express.Router();
router.use(cookieParser());

router.get('/', (req, res) =>{

    let isUserAuthenticated = false;
    const { cookies } = req;

    if ("spielshiffAccessToken" in cookies) {
        isUserAuthenticated = true;
    }

    res.render('index',{isUserAuthenticated})
});


router.get('/novo', (req, res) =>{

    res.send({ok:"novo"})
  
});


export default router