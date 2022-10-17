const router = require("express").Router();
const messageController = require("../controllers/messageController");

// delete conversation
router.delete("/:id",messageController.delete);

// delete all conversations
router.delete("/all/:id",messageController.delete);

// //get all conversations
router.get("/:id", messageController.getConversations);
module.exports = router;
