const { getCurrentUser } = require("../getCurrentUser");

async function create(parent, args, context, info) {
  const currentUser = await getCurrentUser(context);
  const { ...data } = await context.prisma.createClient({
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

async function show(parent, args, context, info) {
  return await context.prisma.client({
    id: args.id,
  });
}

async function index(parent, args, context, info) {
  const currentUser = await getCurrentUser(context);
  return await context.prisma.clients({
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
  const eventsByClient = await context.prisma.events({
    where: {
      clientId: client.id,
    },
  });

  // get sum of hours prop across all events in array
  let totalHours = eventsByClient.reduce((prev, current) => {
    return prev + current.hours;
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
  show,
  index,
  indexWithTotalHours,
};
