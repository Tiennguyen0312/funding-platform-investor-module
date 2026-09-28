import { Link } from 'react-router-dom'
export default function Nav(){
    return(
        <nav className="navlist">
        <div className='navlogo'></div>
        <ul className="navitem">    
                <Link to='/'></Link>
                <li><Link  to='balance' className="nav-link">Balance</Link></li>
                <li><Link to='project'className="nav-link">Project</Link></li>
                <li><Link to='account' className="nav-link1">Account</Link></li>
                <li><Link to='helpcenter'className="nav-link1">HelpCenter</Link></li>
        </ul>
         </nav>       
    )
}