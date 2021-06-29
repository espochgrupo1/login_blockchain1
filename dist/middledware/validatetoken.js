"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenValidate = void 0;
const jwt = require("jsonwebtoken");
const tokenValidate = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token)
        return res.status(401).send({ message: "No Autorizado" });
    const Btoken = token.replace("Bearer ", "");
    jwt.verify(Btoken, process.env.SECRET || "Palabra Secreta", function (err, decoded) {
        if (err)
            return res.status(401).send({ message: "No Autorizado" });
        if (decoded) {
            console.log(decoded.user.iduse);
            next();
        }
        else {
            return res.status(401).send({ message: "No Autorizado" });
        }
    });
};
exports.tokenValidate = tokenValidate;
//# sourceMappingURL=validatetoken.js.map