import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css' // global theme + design tokens

// Entry point. Finds <div id="root"> in index.html and renders <App /> into
// it. This is a single-page site (no router) — navigation is in-page anchor
// scrolling handled inside the Nav component.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
