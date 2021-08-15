import { role } from '@prisma/client'
import { allow, deny, rule, shield } from 'graphql-shield'

function checkPermissions(user: any, permission: role): boolean {
  if (user) {
    return user.role === permission
  }
  return false
}

const isAuthenticated = rule()((parent, args, ctx) => ctx.user !== null)

const isAdmin = rule()((parent, args, ctx) => checkPermissions(ctx.user, role.ADMIN))

export default shield({
  Query: {
    name: allow,
    names: allow,
  },
})
