const express=require('express');
const router=express.Router();
const authMiddleware=require('../middlewares/auth.middleware');
const chatcontroller=require('../controllers/chat.controller');

// create chat (protected)
router.post('/',authMiddleware.authUser,chatcontroller.createChat);
router.get('/',authMiddleware.authUser,chatcontroller.getChats);

// respond to a message (does not require auth in this example)
router.post('/respond', chatcontroller.respond);

router.get('/message/:chatId',authMiddleware.authUser,chatcontroller.getMessage);

module.exports=router;