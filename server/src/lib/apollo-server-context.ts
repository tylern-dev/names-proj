import { ExpressContext } from 'apollo-server-express'
export default async function apolloServerContext({ req }:ExpressContext) {
  const user = req.user || null
  return {
    req,
    user,
    // authToken
  }
}
