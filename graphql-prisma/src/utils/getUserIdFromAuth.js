import { decodeJWTToken } from "./jwtGenerator";

const getUserId = async (authorizationHeader, prisma) => {
  if (!authorizationHeader) return null;
  const token = authorizationHeader.replace("Bearer ", "");
  const decodedToken = decodeJWTToken(token);

  const userExists = await prisma.exists.User({ id: decodedToken.userId });
  if (!userExists) return null;
  return decodedToken.userId;
};

export { getUserId as default };
