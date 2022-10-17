const router = require("express").Router();
const messageController = require("../controllers/messageController");

router.post("/", messageController.newMessage);

// effacer message
router.delete("/:id",messageController.delete);

// //get all Messages
router.get("/:sender/", messageController.get);

router.get("/", messageController.getAll);

module.exports = router;
