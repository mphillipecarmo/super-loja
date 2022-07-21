import express from 'express';

const router = express.Router();
/*
import  ensureAuth from '../middleware/auth.js';
import  ensureGuest from '../middleware/auth.js';
*/
router.get('/', ensureGuest ,(req, res) => {
    res.render('login')
  })

router.get("/log",ensureAuth, async(req,res)=>{
    res.render('index',{userinfo:req.user})
})

export default router