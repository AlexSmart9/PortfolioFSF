import styles from './Modal.module.css'

import type { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode
}

export const Modal = ({ isOpen, onClose, title, children} : ModalProps) => {

    if(!isOpen) return null;

    return (
        <div className={`${styles.overlay} flex-container`}>
            <div className={`${styles.content} flex-container`}>
                <header className={`${styles.header} flex-container`}>
                    <h2>{title}</h2>
                    <button className={styles.closeBtn} onClick={onClose}>X</button>
                </header>
                <div className={`${styles.body}`}>
                    {children}
                </div>
            </div>
        </div>
    );
};