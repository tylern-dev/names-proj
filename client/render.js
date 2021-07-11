import React from 'react'
import { render } from 'react-dom'

delete window.__INITIAL_STATE__

export default ({ Routes }) => render(<Routes />, document.querySelector('.js-root'))
