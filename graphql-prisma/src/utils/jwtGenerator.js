import JWT from "jsonwebtoken";

const JWTSignature = userId => JWT.sign({ userId }, process.env.JWT_SECRET);
const decodeJWTToken = token => JWT.verify(token, process.env.JWT_SECRET);

export { JWTSignature, decodeJWTToken };
