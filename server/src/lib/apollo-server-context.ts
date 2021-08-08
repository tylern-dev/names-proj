import { ExpressContext } from 'apollo-server-express'
export default async function apolloServerContext({ req }:ExpressContext) {
  const user = req.user || null
  console.log({user1: user})
  return {
    req,
    user
    // authToken
  }
}
