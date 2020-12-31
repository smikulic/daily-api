const { getCurrentUser } = require("../getCurrentUser");
const client = require("./client");

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

async function indexGroupedByDate(parent, args, context, info) {
  const eventsByUser = await index({}, {}, context);
  const clientsByUser = await client.index({}, {}, context);

  // 1. We need to get unique dates from a list of
  // events in order to group them
  const uniqueDates = [...new Set(eventsByUser.map((event) => event.date))];

  return uniqueDates.map((date, key) => {
    // 2. for each date we group those events that match it
    const eventsByDate = eventsByUser.filter((event) => event.date === date);
    // 3. we decorate each of those events with its client data
    const eventsWithClientInfo = eventsByDate.map((event, key) => {
      return {
        ...event,
        client: clientsByUser.find((client) => client.id === event.clientId),
      };
    });

    return {
      key,
      date,
      events: eventsWithClientInfo,
    };
  });
}

module.exports = {
  create,
  index,
  indexGroupedByDate,
};
