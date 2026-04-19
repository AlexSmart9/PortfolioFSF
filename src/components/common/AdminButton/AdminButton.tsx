import React from 'react';
// Importamos el icono de react-icons
import { BiPlus } from 'react-icons/bi';
import styles from './AdminButton.module.css';

// Cambiamos 'text' por 'tooltipText' para dejar clara su nueva función
interface AdminButtonProps {
    tooltipText: string; 
    onClick: () => void;
}

export const AdminButton = ({ tooltipText, onClick }: AdminButtonProps) => {
    return (
        <button 
            className={`${styles.btnAdminCreate} flex-container`}
            onClick={onClick}
            title={tooltipText}       
            aria-label={tooltipText}
        >
            <BiPlus size={20} /> New
        </button>
    );
};