const client = require("./client");
const event = require("./event");

function users(parent, args, context, info) {
  return context.prisma.user.findMany();
}

module.exports = {
  users,
  client: client.show,
  clients: client.index,
  clientsWithTotalHours: client.indexWithTotalHours,
  events: event.index,
  activities: event.indexGroupedByDate,
};
