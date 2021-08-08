import { Role, } from '@prisma/client'
import { allow,deny, rule, shield,} from 'graphql-shield'

function checkPermissions(user:any, permission:Role): boolean{
  if(user){
    return user.role === permission
  }
  return false
}
// @ts-ignore
const isAuthenticated = rule()((parent, args, ctx) => ctx.user !== null )

export default shield({
  Query: {
    name: isAuthenticated,
    age: isAuthenticated
  },

})