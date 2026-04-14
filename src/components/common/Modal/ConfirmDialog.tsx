import styles from './ConfirmDialog.module.css';
import { Modal } from './Modal';

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string; 
    cancelText?: string;
    isDanger?: boolean;
}

export const ConfirmDialog = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    isDanger = true
} : ConfirmDialogProps) => {
    
    const handleConfirm = () => {
        onClose();
        onConfirm();
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
        >
            <div className={`${styles.dialogContainer} flex-container`}>
                <p className={styles.message}>{message}</p>
                <div className={`${styles.actions} flex-container`} >
                    <button className={styles.btnCancel} onClick={onClose}
                    >
                        {cancelText}
                    </button>
                    <button
                    onClick={() => handleConfirm()}
                        type='button'
                        className={isDanger ? styles.btnDanger : styles.btnSuccess}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </Modal>
    );
};