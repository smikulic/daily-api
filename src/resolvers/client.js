const { getCurrentUser } = require("../getCurrentUser");

async function create(parent, args, context, info) {
  const currentUser = await getCurrentUser(context);
  const createdClient = await context.prisma.client.create({
    data: {
      ...args,
      user: {
        connect: {
          id: currentUser.id,
        },
      },
    },
  });
  return createdClient;
}

async function remove(parent, args, context, info) {
  return await context.prisma.client.delete({
    where: { id: args.id },
  });
}

async function show(parent, args, context, info) {
  return await context.prisma.client.findUnique({
    id: args.id,
  });
}

async function index(parent, args, context, info) {
  const currentUser = await getCurrentUser(context);
  return await context.prisma.client.findMany({
    where: {
      userId: currentUser.id,
    },
  });
}

async function indexWithTotalHours(parent, args, context, info) {
  const clientsByUser = await index({}, {}, context);

  return clientsByUser.map((client) =>
    decorateClientWithTotalHours(context, client)
  );
}

async function decorateClientWithTotalHours(context, client) {
  const eventsByClient = await context.prisma.event.findMany({
    where: {
      clientId: client.id,
    },
  });

  // get sum of hours prop across all events in array
  let totalHours = eventsByClient.reduce((prev, current) => {
    return prev + Number(current.hours);
  }, 0);

  const totalBilled = totalHours * client.rate;

  return {
    ...client,
    totalHours,
    totalBilled,
  };
}

module.exports = {
  create,
  remove,
  show,
  index,
  indexWithTotalHours,
};
