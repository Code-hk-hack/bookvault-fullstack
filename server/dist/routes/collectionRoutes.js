"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const collectionController_1 = require("../controllers/collectionController");
const router = (0, express_1.Router)();
router.post('/', collectionController_1.addToCollection);
router.get('/:userId', collectionController_1.getUserCollection);
router.delete('/', collectionController_1.removeFromCollection);
exports.default = router;
