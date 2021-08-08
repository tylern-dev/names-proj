
const resolvers = {
  Query: {
    //@ts-ignore
    name: (parent, args, context) => 'Tyler',
    age: () => 1
  },
  Mutation: {
    addName: () => true,
  },
}
export default resolvers
