import { Role } from '@prisma/client'
import { deny, rule, shield } from 'graphql-shield'

function checkPermissions(user: any, permission: Role): boolean {
  if (user) {
    return user.role === permission
  }
  return false
}

const isAuthenticated = rule()((parent, args, ctx) => ctx.user !== null)

const isAdmin = rule()((parent, args, ctx) => checkPermissions(ctx.user, Role.ADMIN))

export default shield(
  {
    Query: {
      name: isAuthenticated,
      age: isAuthenticated,
    },
  },
  { fallbackRule: deny }
)
