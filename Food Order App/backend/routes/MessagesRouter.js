import express from 'express';
import { createMessage, deleteMessage, getAllMessages, subscribeToNewsletter } from '../controllers/Messages/message.js';

const router = express.Router()

router.post('/send', createMessage)
router.get('/getAll',getAllMessages)
router.delete('/delete/:message_id',deleteMessage)
router.post('/subscribe',subscribeToNewsletter)

export default router;