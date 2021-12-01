import { gql } from 'apollo-server-express'

export const ProjectStatus = gql`
  type ProjectStatus {
    isActive: Boolean
  }
`
