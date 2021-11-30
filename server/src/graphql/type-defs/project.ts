import { gql } from 'apollo-server-express'

export const Project = gql`
  type Project {
    id: ID
    projectName: String
    isActive: Boolean
    updatedAt: DateTime
    createdAt: DateTime
    babyName: [BabyName]
  }
`
