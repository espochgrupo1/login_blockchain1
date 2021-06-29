"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.succes = void 0;
const succes = (req, res, message, status) => {
    let statusCode = status || 200;
    let statusMessage = message || "";
    res.status(statusCode).send({
        error: false,
        status: status,
        body: statusMessage,
    });
};
exports.succes = succes;
const error = (req, res, message, status) => {
    let statusCode = status || 500;
    let statusMessage = message || "Internal server error";
    res.status(statusCode).send({
        error: true,
        status: status,
        body: message,
    });
};
exports.error = error;
//# sourceMappingURL=response.js.map