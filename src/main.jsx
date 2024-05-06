import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SocialMediaProvider } from './Context/SocialMediaContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Web3ModalProvider } from './Context/Web3ModalContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <Web3ModalProvider>
      <SocialMediaProvider>
        <App />
      </SocialMediaProvider>
    </Web3ModalProvider>
  </BrowserRouter>
)

