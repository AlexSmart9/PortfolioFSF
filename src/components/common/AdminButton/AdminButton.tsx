import { BiPlus } from 'react-icons/bi';
import styles from './AdminButton.module.css';
import { useAuth } from '../../../context/AuthContext';


interface AdminButtonProps {
    tooltipText: string; 
    onClick: () => void;
}

export const AdminButton = ({ tooltipText, onClick }: AdminButtonProps) => {
    
    const {userRole} = useAuth();



    return (
        <>
            {
                userRole === 'admin' && (
                    <button 
                        className={`${styles.btnAdminCreate} flex-container`}
                        onClick={onClick}
                        title={tooltipText}       
                        aria-label={tooltipText}
                    >
                        <BiPlus size={20} /> New
                    </button>
                )                
            }
        </>
    );
};