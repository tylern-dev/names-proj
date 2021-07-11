import serialize from 'serialize-javascript'

const getClientConfig = () => ({
  env: Object.entries(global.process.env)
    .filter(([key]) => /^CLIENT_/.test(key))
    .reduce((accum, [key, value]) => ({ ...accum, [key]: value }), {}),
})

export default ({ target, req, res } = {}) => {
  const { CLIENT_CONFIG_NONCE, TARGET_NONCE, WEBPACK_NONCE_SCRIPT_NONCE, WEBPACK_NONCE } = res?.locals?.nonces ?? {}
  return `
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <title>Nav</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" />
    <script nonce="${WEBPACK_NONCE_SCRIPT_NONCE}">window.__webpack_nonce__ = "${WEBPACK_NONCE}";</script>
  </head>

  <body data-testid="ent-web:body">
    <div class="js-root"></div>
    <script nonce="${CLIENT_CONFIG_NONCE}">window.global = window; global.process = ${serialize(
    getClientConfig()
  )}</script>
    ${
      (target &&
        `<script nonce="${TARGET_NONCE}">window.__TARGET__ = ${serialize(`/${target.replace(/_/g, '/')}`)}</script>`) ||
      ''
    }
  </body>
</html>
`
}
