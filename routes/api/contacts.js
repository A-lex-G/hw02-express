const express = require("express");
const ctrl = require("../../controlers/contacts");
const {
  validateBody,
  isValidId,
  validateFavoriteField,
  authenticate,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addNewContact
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContactById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateFavoriteField(schemas.switchFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteContactById);

module.exports = router;
