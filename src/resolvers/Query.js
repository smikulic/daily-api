const project = require("./project");

function users(parent, args, context, info) {
  return context.prisma.users();
}

module.exports = {
  users,
  projects: project.index,
};
