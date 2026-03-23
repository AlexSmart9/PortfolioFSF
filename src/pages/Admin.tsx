import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import { Posts } from '../components/Posts';
import { Projects } from '../components/Projects';
import './styles/admin.css'
import { Certifications } from '../components/Certifications';
import { Skills } from '../components/Skills';



export const Admin = () => {

    const handleLogout = () => {
        localStorage.removeItem('token');
    }

    return (
        <div className="admin__panel-container grid-container">
          <div className="admin__navbar-container">
            <h1 className="admin__title">MAE Tech Admin</h1>
            <div className="admin__list-container">
              <ul className="admin__list">
                <li className="admin__list-item">
                  <NavLink to={'/admin/posts'} className={({ isActive }) => isActive ? 'admin__list-item-active' : undefined}>Blog</NavLink>
                </li>
                <li className="admin__list-item">
                  <NavLink to={'/admin/projects'} className={({ isActive }) => isActive ? 'admin__list-item-active' : undefined}>Projects</NavLink>
                </li>
                <li className="admin__list-item">
                  <NavLink to={'/admin/certifications'} className={({ isActive }) => isActive ? 'admin__list-item-active' : undefined}>Certifications</NavLink>
                </li>
                <li className="admin__list-item">
                  <NavLink to={'/admin/skills'} className={({ isActive }) => isActive ? 'admin__list-item-active' : undefined}>Skills</NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="admin__content-container">
            <Routes>
            
              <Route path='/' element={<Navigate to='posts' replace />} />
              <Route path='posts' element={<Posts />} />
              <Route path='projects' element={<Projects />} />
              <Route path='certifications' element={<Certifications />} />
              <Route path='skills' element={<Skills />} />

            </Routes>
          </div>

        </div>
    );

}