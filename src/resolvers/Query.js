const project = require("./project");
const event = require("./event");

function users(parent, args, context, info) {
  return context.prisma.users();
}

module.exports = {
  users,
  projects: project.index,
  events: event.index,
};
