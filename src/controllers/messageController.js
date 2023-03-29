const Message = require('../models/Message')

const messageController = {
   getMessageByGroup: async (req, res) => {
      try {
          const messages = await Message.find({group: req.params.group}).sort({ createdAt: -1}).limit(req.params.limit)
          .populate('sender')
          res.status(200).json({messages})
      } catch (err) {
         res.status(500).json(err)
      }
   },
   addMessage: async (req, res) => {
        try {
            const { sender, content, group } = req.body

            const message = await new Message({
                  sender: sender,
                  content: content,
                  group: group,
                  event: req.body.event ? true : false,
                  sended: [sender]
            })
            await message.save()
            
            return res.status(200).json("Add message successfully !")

        } catch (err) {
           return res.status(500).json("Message is wrong! Please check again!")
        }
   },
   sendMessage: async (req, res) => {
      try {

        await Message.findByIdAndUpdate( req.params.id,
         { 
            $push: {
               sended: req.body.user
            }
         })
         
         return res.status(200).json("Sended message successfully !")

     } catch (err) {
        return res.status(500).json("Message is wrong! Please check again!")
     }
   },
   deleteMessage: async (req, res) => {
      try {

         const { id } = req.params

         const resulf =  await Message.findByIdAndDelete(id)
        
         if (resulf) {
            return res.status(200).json("Message is deleted successfully !")
         }

         return res.status(404).json("Message is not found !")

      } catch (err) {
         return res.status(500).json("Don't delete message! Please check again!")
      }
   },
}

module.exports = messageController