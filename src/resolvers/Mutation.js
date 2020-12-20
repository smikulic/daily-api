const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const APP_SECRET = "daily-api"; // TODO: replace

async function signup(parent, args, context, info) {
  const hashedPass = await bcrypt.hash(args.password, 10);
  const { password, ...user } = await context.prisma.createUser({
    ...args,
    password: hashedPass,
  });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user({
    email: args.email,
  });

  if (user) {
    const isPasswordMatching = await bcrypt.compare(
      args.password,
      user.password
    );
    if (isPasswordMatching) {
      const token = jwt.sign({ userId: user.id }, APP_SECRET);
      return {
        token,
        user,
      };
    } else {
      return {
        error: {
          message: "Pasword is not correct",
        },
      };
    }
  } else {
    return {
      error: {
        message: "User does not exist",
      },
    };
  }
}

module.exports = {
  signup,
  login,
};
