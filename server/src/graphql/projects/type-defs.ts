import { gql } from 'apollo-server-express'
const typeDef = gql`
  # extend type Query {
  #   project(id: String): Project
  #   # projects: [Project]
  # }

  extend type Mutation {
    # activateProject(projectId: ID): Project
    # deactivateProject(projectId: ID): Project
    # addNameToProject(projectId: String, nameId: String): BabyName
    deleteNameFromProject(projectBabyNameId: ID): Project
  }
`

export default typeDef
