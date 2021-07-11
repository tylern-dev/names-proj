import baseHtml from '../utils/base-html'

export default (req, res) => {
  const {
    query: { target },
  } = req
  res.send(
    baseHtml({
      target,
      req,
      res,
    })
  )
}
