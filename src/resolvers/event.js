const { getCurrentUser } = require("../getCurrentUser");

async function create(parent, args, context, info) {
  const currentUser = await getCurrentUser(context);
  const { ...data } = await context.prisma.createEvent({
    ...args,
    user: {
      connect: {
        id: currentUser.id,
      },
    },
    userId: currentUser.id,
  });
  return data;
}

async function index(parent, args, context, info) {
  const currentUser = await getCurrentUser(context);
  const eventsByUser = await context.prisma.events({
    where: {
      userId: currentUser.id,
    },
  });
  return eventsByUser;
}

module.exports = {
  create,
  index,
};
