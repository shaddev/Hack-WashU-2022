import { Link, useMatch, useResolvedPath } from "react-router-dom"
import "../../css/NavBar.css"
import React from 'react'


const Navbar = (props) => {

  const user = props.user

  return (
    <nav className="nav">
        {user.type === 'contributor' &&
            <Link to='/contributor/view' className="site-title">
                Capstone Capitalists
            </Link>
        }
        {user.type === 'student' &&
            <Link to='/student/view' className="site-title">
                Capstone Capitalists
            </Link>
        }
        {
            user.type!='student' && user.type!='contributor' &&
            <Link to='/' className="site-title">
                Capstone Capitalists
            </Link>
        }

        {user.type === 'contributor' &&
        <ul>
            <CustomLink to="/contributor/view">All Projects</CustomLink>
            <CustomLink to="/contributor/likedprojects">Liked Projects</CustomLink>
        </ul>
        }
        {user.type === 'student' &&
        <ul>
            <CustomLink to="/student/view">View Projects</CustomLink>
            <CustomLink to="/student/upload-project">Upload</CustomLink>
        </ul>
        }
      
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
export default Navbar