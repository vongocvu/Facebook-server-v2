const GroupPrivate = require("../models/GroupPrivate");

const groupController = {
  getMyGroupPrivate: async (req, res) => {  
    try {
        const MyGroup = await GroupPrivate.findOne({
          $and: [
            {
              members: {
                $elemMatch: {
                  user: req.params.user
                }
              }
            },
            {
              members: {
                $elemMatch: {
                  user: req.params.friend
                }
              }
            }
          ]
        })
        res.status(200).json({MyGroup})

    } catch (e) {
        res.status(500).json(e)
    }
  },
  getMyGroupsPrivate: async (req, res) => {
    try {
        const MyGroups = await GroupPrivate.find({ 
          members: { 
            $elemMatch: {
              user: req.params.user, 
            }
          }
        })
          .populate('members.user')
        res.status(200).json({MyGroups})

    } catch (e) {
        res.status(500).json(e)
    }
  },
  getGroupsPrivate: async (req, res) => {
    try {
      const groups = await GroupPrivate.find({}).populate("members");
      res.status(200).json({ groups });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getOneGroupPrivate: async (req, res) => {
    try {
      const { id } = req.params;
      const group = await GroupPrivate.findOne({ _id: id })
        .populate("members.user")

      res.status(200).json({ group });
    } catch (err) {
      res.status(500).json("Room is not valid !");
    }
  },
  addGroupPrivate: async (req, res) => {
    try {
      const { members } = req.body;

      const group = await new GroupPrivate({
        members: members,
        typeGroup: 1,
        events: []
      });

      await group.save();
      return res.status(200).json({group});
    } catch (err) {
      return res.status(500).json("Add group failed !");
    }
  },
  updateTheme: async (req, res) => {
    try {
       await GroupPrivate.findByIdAndUpdate(req.params.idGroup, {
           theme: req.body.theme
       });
       res.status(200).json("Update theme successfully")
    } catch (err) {
     res.status(500).json("Update theme failed !");
    }
 },
  updateNickname: async (req, res) => {
  try {
     await GroupPrivate.updateOne(
      { _id: req.params.idGroup, "members.user": req.body.idUser },
      { $set: { "members.$.nickname": req.body.newNickname } }
   );
     res.status(200).json("Update nickname successfully")
  } catch (err) {
   res.status(500).json("Update nickname failed !");
  }
},
  deleteGroupPrivate: async (req, res) => {
    try {
      const { id } = req.params;
      await GroupPrivate.findByIdAndDelete(id);

      return res.status(200).json("Delete group successfully !");
    } catch (err) {
      return res.status(500).json("Delete group failed !");
    }
  },
};

module.exports = groupController;
