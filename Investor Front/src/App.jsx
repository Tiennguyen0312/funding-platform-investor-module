import './App.css'
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import ReactDOM from "react-dom/client";

import Account from './components/account.jsx'
import HelpCenter from './components/helpcenter.jsx'
import Layout from './components/Layout'
import Main from './components/main'
import LayoutB from './components/LayoutB.jsx'
import Project from "./components/projects.jsx"
import { AuthProvider } from './customHooks/AuthContext'

function App() {
  return (
    <>
    
      <AuthProvider>
      <BrowserRouter>
      <Routes>
      <Route element={<Layout/>}>
      <Route index element={<Main/>}></Route>
      <Route path={'/account'} element={<Account/>}></Route>
      <Route path={'/balance'} element={<LayoutB/>}></Route>
      <Route path={'/helpcenter'} element={<HelpCenter/>}></Route>
   
      <Route path={'/project'} element={<Project/>}></Route>
      
      </Route>
      
      </Routes>
      </BrowserRouter>
      </AuthProvider>
      
    </>
  )
}

export default App
