"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const transactionController_1 = __importDefault(require("./controllers/transactionController"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/transactions", transactionController_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to the transaction API!");
});
app.get("*", (req, res) => {
    res.status(404).json("Could not find resource, please try again");
});
exports.default = app;
//# sourceMappingURL=app.js.map