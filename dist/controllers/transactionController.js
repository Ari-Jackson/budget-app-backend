"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactionModels_1 = __importDefault(require("../models/transactionModels"));
const transactionRouter = express_1.default.Router();
transactionRouter
    .route("/")
    .get((req, res) => {
    res.status(200).json(transactionModels_1.default);
})
    .post((req, res) => {
    const nextId = transactionModels_1.default[transactionModels_1.default.length - 1].id + 1;
    console.log(Object.assign({ id: nextId }, req.body));
    transactionModels_1.default.push(Object.assign({ id: nextId }, req.body));
    res.status(201).json(transactionModels_1.default[transactionModels_1.default.length - 1]);
});
const findsTransaction = (id) => (trans) => {
    return trans.id === Number(id);
};
transactionRouter
    .route("/:id")
    .get((req, res) => {
    const { id } = req.params;
    const matchingTransaction = transactionModels_1.default.find(findsTransaction(id));
    if (!matchingTransaction) {
        res.status(404).send("No matching transaction found");
    }
    else {
        res.status(200).json(matchingTransaction);
    }
})
    .put((req, res) => {
    const { id } = req.params;
    const matchingTransaction = transactionModels_1.default.find(findsTransaction(id));
    const matchingIndex = transactionModels_1.default.findIndex(findsTransaction(id));
    if (!matchingTransaction) {
        res.status(404).send("No matching transaction found");
    }
    else {
        transactionModels_1.default[matchingIndex] = req.body;
        res.status(200).json(transactionModels_1.default[matchingIndex]);
    }
})
    .delete((req, res) => {
    const { id } = req.params;
    const matchingTransaction = transactionModels_1.default.find(findsTransaction(id));
    const matchingIndex = transactionModels_1.default.findIndex(findsTransaction(id));
    if (!matchingTransaction) {
        res.status(404).send("No matching transaction found");
    }
    else {
        transactionModels_1.default.splice(matchingIndex, 1);
        res.status(200).json(transactionModels_1.default);
    }
});
exports.default = transactionRouter;
//# sourceMappingURL=transactionController.js.map