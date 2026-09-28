
import { Outlet } from 'react-router-dom'
import Nav  from './Nav'

export default function Layout(){
  return(
    <>
    <header></header>
   
    <div className='navlist'>
      <Nav></Nav>
    </div>
    <div className="container">
            <Outlet/>
    </div>
    </>
  )
}