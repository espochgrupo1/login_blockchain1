import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const tokenValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send({ message: "No Autorizado" });
  const Btoken = token.replace("Bearer ", "");
  jwt.verify(
    Btoken,
    process.env.SECRET || "Palabra Secreta",
    function (err, decoded: any) {
      if (err) return res.status(401).send({ message: "No Autorizado" });

      if (decoded) {
        console.log(decoded.user.iduse);
        next();
      } else {
        return res.status(401).send({ message: "No Autorizado" });
      }
    }
  );
};
