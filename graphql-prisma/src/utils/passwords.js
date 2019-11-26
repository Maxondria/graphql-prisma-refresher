import bcrypt from "bcryptjs";

const hashPassword = async rawPassword => {
  if (rawPassword < 6)
    throw new Error("Passwords must be 6 atleast characters");
  return await bcrypt.hash(rawPassword, 10);
};

const comparePasswords = async (providedPassword, savedPassword) => {
  const passwordMatches = await bcrypt.compare(providedPassword, savedPassword);
  if (!passwordMatches) throw new Error("Oops, Authentication Error");
  return true;
};

export { hashPassword, comparePasswords };
