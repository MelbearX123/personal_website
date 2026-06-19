import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css' // global theme + neon color variables

// This file is the app's entry point — the equivalent of Angular's main.ts.
// It finds the <div id="root"> in index.html and renders <App /> into it.
//
// <BrowserRouter> turns on client-side routing for everything inside it
// (this is like importing RouterModule.forRoot(routes) in Angular).
// <React.StrictMode> is a dev-only helper that surfaces potential bugs;
// it renders nothing visible.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
