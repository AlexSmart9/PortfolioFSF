import { Posts } from '../components/Post';
import './styles/admin.css'



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
                <li className="admin__list-item">Posts</li>
                <li className="admin__list-item">Projects</li>
                <li className="admin__list-item">Certifications</li>
                <li className="admin__list-item">Skills</li>
              </ul>
            </div>
          </div>
          <div className="admin__content-container">
            <Posts/>
          </div>

        </div>
    );

}