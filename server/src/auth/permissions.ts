import { ApolloError } from 'apollo-server-express'
import { role } from '@prisma/client'
import { allow, or, deny, rule, shield } from 'graphql-shield'
import { GUEST } from 'src/consts'
import { IRuleFieldMap, ShieldRule } from 'graphql-shield/dist/types'

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

export default shield(
  {
    Query: {
      name: allow,
      names: isAuthenticated,
      namesByYear: allow,
      projects: isAuthenticated,
      project: isAuthenticated,
      '*': deny,
    },
    Mutation: {
      createProject: isAuthenticated,
      addNameToProject: isAuthenticated,
      activateProject: or(isAuthenticated, isAdmin),
      deactivateProject: or(isAuthenticated, isAdmin),
      createRating: isAuthenticated,
      '*': deny,
    },
  },
  {
    fallbackError: async (thrownThing: ApolloError | Error) => {
      if (thrownThing instanceof ApolloError) {
        // expected errors
        return thrownThing
      } else if (thrownThing instanceof Error) {
        // unexpected errors
        return new ApolloError('Internal server error', 'ERR_INTERNAL_SERVER')
      } else {
        // what the hell got thrown
        console.error('The resolver threw something that is not an error.')
        console.error(thrownThing)
        return new ApolloError('Internal server error', 'ERR_INTERNAL_SERVER')
      }
    },
  }
)
