const { getCurrentUser } = require("../getCurrentUser");

async function create(parent, args, context, info) {
  const currentUser = await getCurrentUser(context);
  const { ...data } = await context.prisma.createProject({
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
  const projectsByUser = await context.prisma.projects({
    where: {
      userId: currentUser.id,
    },
  });
  return projectsByUser;
}

async function indexWithTotalHours(parent, args, context, info) {
  const projectsByUser = await index({}, {}, context);

  return projectsByUser.map((project) =>
    decorateProjectWithTotalHours(context, project)
  );
}

async function decorateProjectWithTotalHours(context, project) {
  const eventsByProject = await context.prisma.events({
    where: {
      projectId: project.id,
    },
  });

  // get sum of hours prop across all events in array
  let totalHours = eventsByProject.reduce((prev, current) => {
    return prev + current.hours;
  }, 0);

  return {
    ...project,
    totalHours,
  };
}

module.exports = {
  create,
  index,
  indexWithTotalHours,
};
