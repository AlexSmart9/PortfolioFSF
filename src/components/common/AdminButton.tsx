import type { Admin } from "../../pages/Admin";

interface AdminButtonProps {
    text: string ;
    onClick: () => void;
}
export const AdminButton = ({text, onClick} : AdminButtonProps) => {
    return (
        <button className="admin__create-button" onClick={onClick}>
            <span>{text}</span>
        </button>
    )

}