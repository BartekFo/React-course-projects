import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App'

//Jedyna różnica to dodanie routingu przez co App jest owinięte w Browser Router.

ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById('root'))
