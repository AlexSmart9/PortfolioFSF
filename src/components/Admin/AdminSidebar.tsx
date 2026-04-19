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
    const [isOpen, setIsOpen] = useState(() => window.innerWidth > 768);
    const navigate = useNavigate();

    const handleLinkClick = () => {
        setIsOpen(false);
    };


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
        <button onClick={toggleSidebar} className={styles.mobileMenu}>
            <BiMenu size={35} />
        </button>
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
                        <NavLink to={'/admin/posts'} className={getNavLinkClass} onClick={handleLinkClick}>
                            <BiBookContent size={24} />
                            <span style={{ display: isOpen ? "block" : "none" }}>Blog</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/admin/projects'} className={getNavLinkClass} onClick={handleLinkClick}>
                            <BiBriefcase size={24} />
                            <span style={{ display: isOpen ? "block" : "none" }}>Projects</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/admin/certifications'} className={getNavLinkClass} onClick={handleLinkClick}>
                            <BiCertification size={24} />
                            <span style={{ display: isOpen ? "block" : "none" }}>Certifications</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/admin/skills'} className={getNavLinkClass} onClick={handleLinkClick}>
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