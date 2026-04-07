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
        <div>
            <div>
                <header>
                    <h2>{title}</h2>
                    <button onClick={onClose}>X</button>
                </header>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}