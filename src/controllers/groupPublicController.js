const GroupPublic = require("../models/GroupPublic");

const groupPublicController = {
  getMyGroupsPublic: async (req, res) => {
    try {
        const MyGroups = await GroupPublic.find(
          {
              members: {
                $elemMatch: {
                  user: req.params.user
                }
              }
            },
        )
        res.status(200).json({MyGroups})

    } catch (e) {
        res.status(500).json(e)
    }
  },
  getGroupsPublic: async (req, res) => {
    try {
      const groups = await GroupPublic.find({}).populate("members.user");
      res.status(200).json({ groups });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getOneGroupPublic: async (req, res) => {
    try {
      const { id } = req.params;
      const group = await GroupPublic.findOne({ _id: id })
        .populate("members.user")

      res.status(200).json({ group });
    } catch (err) {
      res.status(500).json("Room is not valid !");
    }
  },
  addGroupPublic: async (req, res) => {
    try {
      const { name, owner, avatar, members } = req.body;

      const group = await new GroupPublic({
        name: name,
        typeGroup: 2,
        owner: owner,
        avatar: avatar ? avatar : "https://i0.wp.com/networknuts.net/wp-content/uploads/2019/11/zahir-accounting-software-have-more-than-60.000-users.png",
        members: [...members],
        events: []
      });

      const newGroup = await group.save();
      return res.status(200).json(newGroup);
    } catch (err) {
      return res.status(500).json("Add group failed !");
    }
  },
  updateTheme: async (req, res) => {
     try {
        await GroupPublic.findByIdAndUpdate(req.params.idGroup, {
            theme: req.body.theme
        });
        res.status(200).json("Update theme successfully")
     } catch (err) {
      res.status(500).json("Update theme failed !");
     }
  },
  updateNickname: async (req, res) => {
    try {
       await GroupPublic.updateOne(
        { _id: req.params.idGroup, "members.user": req.body.idUser },
        { $set: { "members.$.nickname": req.body.newNickname } }
     );
       res.status(200).json("Update nickname successfully")
    } catch (err) {
     res.status(500).json("Update nickname failed !");
    }
  },
  deleteGroupPublic: async (req, res) => {
    try {
      const { id } = req.params;
      await GroupPublic.findByIdAndDelete(id);

      return res.status(200).json("Delete group successfully !");
    } catch (err) {
      return res.status(500).json("Delete group failed !");
    }
  },
};

module.exports = groupPublicController;
