const { getCurrentUser } = require("../getCurrentUser");

async function create(parent, args, context, info) {
  const currentUser = await getCurrentUser(context);
  const { ...data } = await context.prisma.createProject({
    ...args,
    userId: currentUser.id,
  });

  return {
    data,
  };
}

async function index(parent, args, context, info) {
  const currentUser = await getCurrentUser(context);
  const projectsByUser = await context.prisma.projects({
    where: {
      userId: currentUser.id,
    },
  });
  return projectsByUser;
}

module.exports = {
  create,
  index,
};
