const Message = require('../models/Message')

const messageController = {
   getMessageByGroup: async (req, res) => {
      try {
          const messages = await Message.find({group: req.params.group}).sort({ createdAt: -1}).limit(req.params.limit)
          .populate('sender')
          .populate('reacts.user')
          res.status(200).json({messages})
      } catch (err) {
         res.status(500).json(err)
      }
   },
   getMessageImage: async (req, res) => {
       try {

         const ImageMessage = await Message.findOne({ _id: req.params.idMessage})
         const dataImages = await Message.find({ 
           group: ImageMessage.group, 
           image: { $exists: true },
           image: { $ne: " " }
         })
   
         res.status(200).json({image: ImageMessage.image, dataImages: dataImages});

       } catch (err) {
          res.status(500).json(err)
       }
   },
   addMessage: async (req, res) => {
        try {
            const newMessage = new Message({
                  sender: req.body.sender,
                  content: req.body.content,
                  image: req.file?.path ? req.file.path : "",
                  group: req.body.group,
                  event: req.body.event ? true : false,
                  sended: [req.body.sender],
                  reacts: []
            })

           const newMess = await newMessage.save()
            res.status(200).json(newMess)
        } catch (err) {
         res.status(500).json("Message is wrong! Please check again!")
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
         
         res.status(200).json("Sended message successfully !")

     } catch (err) {
      res.status(500).json("Message is wrong! Please check again!")
     }
   },
   deleteMessage: async (req, res) => {
      try {

         const { id } = req.params

         const resulf =  await Message.findByIdAndDelete(id)
        
         if (resulf) {
            res.status(200).json("Message is deleted successfully !")
         }

         res.status(404).json("Message is not found !")

      } catch (err) {
         res.status(500).json("Don't delete message! Please check again!")
      }
   },
   likeMessage: async (req, res) => {
     const MessageId = req.params.id;
     const react = req.body.react;
   
     // Kiểm tra xem react đã tồn tại trong mảng reacts hay chưa
     const MessageOne = await Message.findById(MessageId);
     const index = MessageOne?.reacts.findIndex(item => item?.user.toString() === react.user);
   
     if (index !== -1) {
       // Nếu react đã tồn tại, cập nhật giá trị mới nhất của nó
       await Message.findOneAndUpdate(
         { _id: MessageId, "reacts.user": react.user },
         { $set: { "reacts.$": react } }
       );
     } else {
       // Nếu react chưa tồn tại, thêm mới nó vào mảng reacts
       await Message.updateOne(
         { _id: MessageId },
         { $push: { reacts: react } }
       );
     }
   
     res.status(200).json('Like posi is susscess !');
   },
   cancelLikeMessage: async (req, res) => {
     await Message.findByIdAndUpdate(req.params.id, {
       $pull: {
          reacts: { user: req.body.user }
       }
     })
 
     res.status(200).json('Like posi is susscess !')
  }
}

module.exports = messageController