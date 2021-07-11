import cssFilenames from '../utils/css-filenames'
import getFilename from '../utils/get-filename'
import jsFilenames from '../utils/js-filenames'

import baseHtml from '../utils/base-html'

const { MANIFEST = {} } = process.env

export default (req, res) => {
  const {
    query: { target },
  } = req
  res.send(
    baseHtml({
      cssFilenames: cssFilenames().map(getFilename(MANIFEST)),
      jsFilenames: jsFilenames().map(getFilename(MANIFEST)),
      initialState: {},
      target,
      req,
      res,
    })
  )
}
