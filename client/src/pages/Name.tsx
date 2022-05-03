import React, { useState, useRef, FormEvent } from 'react'
import { useQuery, gql } from '@apollo/client'

const QUERY = gql`
  query Name($name: String) {
    name(name: $name) {
      name
      sex
      popularity {
        year
        rank
      }
    }
  }
`

const Name = () => {
  const [queryName, setQueryName] = useState('')
  const nameRef = useRef<HTMLInputElement>(null)
  const { data, loading } = useQuery(QUERY, { variables: { name: queryName } })

  const handleGetName = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setQueryName(nameRef.current?.value || '')
  }
  return (
    <>
      <h2>Get Names</h2>
      <form onSubmit={handleGetName}>
        <input type="text" placeholder="name" ref={nameRef} />
        <input type="submit" value="submit" />
      </form>
    </>
  )
}

export default Name
