export default async function apolloServerContext({ req }) {
  const user = req.user || null
  return {
    req,
    user,
    // authToken
  }
}
