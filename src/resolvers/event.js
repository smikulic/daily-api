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
    client: {
      connect: {
        id: args.clientId,
      },
    },
    userId: currentUser.id,
  });
  return data;
}

async function index(parent, args, context, info) {
  const currentUser = await getCurrentUser(context);
  return await context.prisma.events({
    where: {
      userId: currentUser.id,
    },
  });
}

module.exports = {
  create,
  index,
};
