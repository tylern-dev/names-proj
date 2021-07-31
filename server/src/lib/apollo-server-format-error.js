import generateErrorCode from './generate-error-code'
export default function apolloServerFormatError(error) {
  console.error('error', error)

  const { originalError } = error
  const { message = '', stack } = originalError || {}

  if (originalError instanceof FetchError) {
    // Let's hide the error message from the end user in this case, because these errors can be leaky and contain network addresses. We'll
    // create an error code that we can log in Bugsnag's metadata and mask the error we send to the client. This should help a client developer
    // find the true error when looking in enterprise-graphql's Bugsnag project.
    const errorCode = generateErrorCode(message)
    const maskedError = new Error(`Internal Server Error with errorCode: ${errorCode}.`)
    return maskedError
  }
}
