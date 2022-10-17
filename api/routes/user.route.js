const router = require("express").Router();
const userController = require("../controllers/userController");
const bcrypt = require("bcrypt");
//UPDATE

//GET ALL USER
router.get("/", userController.getAll);

//GET USER
router.get("/:id", userController.getOne);

router.put("/:id", userController.update);
//DELETE
router.delete("/:id", userController.delete);

module.exports = router;
