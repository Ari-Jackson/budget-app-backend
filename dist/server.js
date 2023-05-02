"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("dotenv").config();
const PORT = process.env.PORT;
app_1.default.listen(PORT || 3000, () => {
    console.log(`I'll be right by your side, on port ${PORT || 3000}`);
});
//# sourceMappingURL=server.js.map