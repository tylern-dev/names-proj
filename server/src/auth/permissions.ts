import { role } from '@prisma/client'
import { allow, or, deny, rule, shield } from 'graphql-shield'
import { GUEST } from 'src/consts'

function checkPermissions(user: any, role: role): boolean {
  if (user) {
    return user.role === role
  }
  return false
}

const isAuthenticated = rule()((parent, args, ctx) => {
  return ctx.user !== null && ctx.user !== GUEST
})

const isAdmin = rule()((parent, args, ctx) => checkPermissions(ctx.user, role.ADMIN))

export default shield({
  Query: {
    name: allow,
    names: isAuthenticated,
    projects: isAuthenticated,
    project: isAuthenticated,
    '*': deny,
  },
  Mutation: {
    createProject: isAuthenticated,
    '*': allow,
  },
})
