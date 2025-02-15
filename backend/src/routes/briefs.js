"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const briefsController_1 = require("../controllers/briefsController");
const router = (0, express_1.Router)();
router.get("/", briefsController_1.getBriefs);
exports.default = router;
