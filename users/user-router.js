const router = require("express").Router();

const Users = require("./user-model.js");

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await Users.findById(userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to find user with id: ' + userId });
  }
});

router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const userData = {
    username: req.body.username,
    phone_number: req.body.phone_number,
  };
  try {
    const user = await Users.update(userId, userData);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user with id: ' + userId });
  }
});

module.exports = router;
