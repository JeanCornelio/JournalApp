import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { JornalApp } from './JornalApp'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <JornalApp></JornalApp>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
