import * as jwt from "jsonwebtoken";
export class JsonWebtoken {
  constructor() {}
  public sign(data: any) {
    let secretKey = "Palabra Secreta";
    return jwt.sign(
      {
        user: data,
      },
      secretKey,
      {
        expiresIn: 24 * 60 * 60,
      }
    );
  }

  public verify(token: string) {
    let secretKey = process.env.SECRET as string;
    try {
      return jwt.verify(token, secretKey) as string;
    } catch (error) {
      return "Token_not_valid";
      console.log(error);
    }
  }
}
