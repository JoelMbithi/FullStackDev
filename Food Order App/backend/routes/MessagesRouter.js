import express from 'express';
import { createMessage, deleteMessage, getAllMessages } from '../controllers/Messages/message.js';

const router = express.Router()

router.post('/send', createMessage)
router.get('/getAll',getAllMessages)
router.delete('/delete/:message_id',deleteMessage)

export default router;