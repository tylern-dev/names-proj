export default async function apolloServerContext({ req }) {
  return {
    req,
    // authToken
  }
}
