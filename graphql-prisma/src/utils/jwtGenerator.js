import JWT from "jsonwebtoken";

const SECURE = "SECURE";

const JWTSignature = userId => JWT.sign({ userId }, SECURE);
const decodeJWTToken = token => JWT.verify(token, SECURE);

export { JWTSignature, decodeJWTToken };
