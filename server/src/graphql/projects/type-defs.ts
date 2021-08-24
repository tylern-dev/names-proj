import { gql } from 'apollo-server-express'
const typeDef = gql`
  extend type Query {
    project(id: String): [Project]
    # projects: [Project]
  }

  extend type Mutation {
    createProject(projectName: String): Boolean
    addNameToProject(projectId: String, nameId: String): Project
  }

  type Project {
    id: ID
    projectName: String
    babyName: [BabyName]
  }

  type BabyName {
    id: String
    nameId: String
    name: Name
    limit: Int
    ratings: [Rating]
    projectId: String
  }

  type Rating {
    id: String
    rating: Int
  }
`

export default typeDef
