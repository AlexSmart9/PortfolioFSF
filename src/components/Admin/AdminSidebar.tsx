import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
    BiLogOut, 
    BiMenu, 
    BiBookContent, 
    BiBriefcase, 
    BiCertification, 
    BiStar 
} from 'react-icons/bi';
import styles from './AdminSidebar.module.css';
import { ConfirmDialog } from '../common/Modal/ConfirmDialog';

export const AdminSidebar = () => {
    
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
            localStorage.removeItem('token');
            navigate('/login');
    };

    const handleLogoutClick = () => {
        setIsLogoutModalOpen(true);
    }

    const toggleSidebar = () => setIsOpen(!isOpen);

    const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
        return isActive ? `${styles.listItemActive} ${styles.listItem}` : styles.listItem;
    };

    return (
        <>
        <aside className={`${styles.navbarContainer} ${isOpen ? styles.open : styles.closed}`}>
            <div className={`${styles.topSection} flex-container`}>
                <button onClick={toggleSidebar} className={styles.menuBtn}>
                    <BiMenu size={35} />
                </button>
                <h1 className={styles.title} style={{ display: isOpen ? "block" : "none" }}>Admin Panel</h1>
            </div>
            
            <nav className={styles.listContainer}>
                <ul className={styles.list}>
                    <li>
                        <NavLink to={'/admin/posts'} className={getNavLinkClass}>
                            <BiBookContent size={24} />
                            <span style={{ display: isOpen ? "block" : "none" }}>Blog</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/admin/projects'} className={getNavLinkClass}>
                            <BiBriefcase size={24} />
                            <span style={{ display: isOpen ? "block" : "none" }}>Projects</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/admin/certifications'} className={getNavLinkClass}>
                            <BiCertification size={24} />
                            <span style={{ display: isOpen ? "block" : "none" }}>Certifications</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/admin/skills'} className={getNavLinkClass}>
                            <BiStar size={24} />
                            <span style={{ display: isOpen ? "block" : "none" }}>Skills</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className={styles.logoutContainer}>
                <button onClick={handleLogoutClick} className={styles.logoutBtn}>
                    <BiLogOut size={24} />
                    <span style={{ display: isOpen ? "block" : "none" }}>Logout</span>
                </button>
            </div>
        </aside>
        <ConfirmDialog
            isOpen={isLogoutModalOpen}
            onClose={(() => setIsLogoutModalOpen(false))}
            onConfirm={handleLogout}
            title={'Logout'}
            message={'Are you sure you want to logout?'}
            confirmText={'Yes, Logout'}
            cancelText={'Cancel'}
        />
    </>
    );
};