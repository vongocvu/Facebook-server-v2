const GroupPublic = require('../models/GroupPublic')
const GroupPrivate = require('../models/GroupPrivate')
const Message = require('../models/Message')
const User = require('../models/User')

const groupController = {
  getMyGroups: async (req, res) => {
    try {
      const Data = []
    
      const Public = await GroupPublic.find({
        members: {
          $elemMatch: {
            user: req.params.user,
          },
        },
      })
    
      for (const Group of Public) {
        const lastMessagePublic = await Message.find({
          group: Group._id,
        })
          .sort({ createdAt: -1 })
          .limit(1)
          .populate('sender')
           Data.push({message: lastMessagePublic[0], Group})
      }
    
      const Private = await GroupPrivate.find({
        members: {
          $elemMatch: {
            user: req.params.user,
          },
        },
      }).populate('members.user')

      const user = await User.findById(req.params.user)
    
      for (const Group of Private) {
        const lastMessagePrivate = await Message.find({
          group: Group._id,
        })
          .sort({ createdAt: -1 })
          .limit(1)
          .populate('sender')
          
          const friend = Group.members.filter(member => member.user._id.toString() !== user._id.toString())
          Data.push({message: lastMessagePrivate[0], Group, friend: {...friend[0]._doc}})
      }
    
      res.status(200).json(Data)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports = groupController