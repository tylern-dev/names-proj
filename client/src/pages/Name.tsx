import React, { useRef, FormEvent } from 'react'
import { useLazyQuery, gql } from '@apollo/client'
import { useAuthContext } from 'src/hooks/AuthProvider'

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
  const { handleSignOut } = useAuthContext()

  const nameRef = useRef<HTMLInputElement>(null)
  const [query] = useLazyQuery(QUERY)

  const handleGetName = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    query({ variables: { name: nameRef.current?.value || '' } })
  }
  return (
    <>
      <button onClick={() => handleSignOut()}>sign out</button>
      <h2>Get Names</h2>
      <form onSubmit={handleGetName}>
        <input type="text" placeholder="name" ref={nameRef} />
        <input type="submit" value="submit" />
      </form>
    </>
  )
}

export default Name
