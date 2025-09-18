const chatModel=require('../models/chat.model');
const aiService = require('../services/ai.service');
const message=require("../models/message.model");
async function createChat(req,res){
        try {
                const {title}=req.body;
                const user=req.user;
                const chat=await chatModel.create({user:user._id,title});
                res.status(201).json({message:"Chat created successfully",chat:chat});
        } catch (error) {
                console.log(error);
                res.status(500).json({message:"Something went wrong"});
        }
}

// New: respond to a user message by forwarding to AI service and returning the reply
async function respond(req, res) {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: 'message required' });

        // call AI service
        const reply = await aiService.generateResponse(message);
        // return a simple payload the frontend expects
        return res.json({ reply });
    } catch (error) {
        console.error('AI respond error', error);
        return res.status(500).json({ error: 'AI generation failed' });
    }
}

async function getChats(req,res){
    try {
        const user = req.user;
        const chats = await chatModel.find({ user: user._id });
        res.status(200).json({ chats });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

async function getMessage(req,res){
    try {
        const { chatId } = req.params;
        const messages = await message.find({ chat: chatId }).sort({ createdAt: 1 });
        res.status(200).json({ messages });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports={createChat, respond,getChats,getMessage};