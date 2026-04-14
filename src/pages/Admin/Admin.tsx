import { Routes, Route, Navigate } from 'react-router-dom';
import { Posts } from '../../components/Posts/Posts';
import { Projects } from '../../components/Projects/Projects';
import styles from './Admin.module.css';
import { Certifications } from '../../components/Certifications/Certifications';
import { Skills } from '../../components/Skills/Skills';
import { AdminSidebar } from '../../components/Admin/AdminSidebar';



export const Admin = () => {

    return (
        <div className={`${styles.panelContainer} grid-container`}>
            <AdminSidebar/>
          <div className={styles.contentContainer}>
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