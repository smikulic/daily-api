const client = require("./client");
const event = require("./event");

function users(parent, args, context, info) {
  return context.prisma.users();
}

module.exports = {
  users,
  clients: client.index,
  clientsWithTotalHours: client.indexWithTotalHours,
  events: event.index,
};
