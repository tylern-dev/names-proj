import { gql } from 'apollo-server-express'
const typeDef = gql`
  extend type Query {
    project(id: String): Project
    projects: [Project]
  }

  extend type Mutation {
    activateProject(projectId: ID): Project
    deactivateProject(projectId: ID): Project
    addNameToProject(projectId: String, nameId: String): BabyName
    deleteNameFromProject(projectBabyNameId: ID): Project
  }

  type Project {
    id: ID
    projectName: String
    isActive: Boolean
    # updatedAt: Date
    # createdAt: Date
    babyName: [BabyName]
  }

  type BabyName {
    id: ID
    nameId: String
    name: Name
    limit: Int
    addedBy: User
    ratings: [Rating]
    projectId: String
  }

  type Rating {
    id: ID
    rating: Int
    user: User
  }

  type User {
    id: ID
    firstName: String
    lastName: String
  }
`

export default typeDef
