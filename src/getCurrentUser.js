const jwt = require("jsonwebtoken");
// const { APP_SECRET } = require("../constants");
const APP_SECRET = "daily-api";

function getCurrentUserToken(context) {
  const authToken = context.request.headers.authorization
    .split("Bearer ")
    .pop();
  return jwt.verify(authToken, APP_SECRET);
}

async function getCurrentUser(context) {
  const currentUserToken = getCurrentUserToken(context);
  return await context.prisma.user.findUnique({
    where: {
      id: currentUserToken.userId,
    },
  });
}

module.exports = {
  getCurrentUserToken,
  getCurrentUser,
};
