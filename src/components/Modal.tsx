import React, { useEffect } from "react";
import Spinner from "../components/Spinner";
import s from "./Modal.module.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    title?: string;
    children?: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
}

const Modal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirmation",
    children,
    confirmText = "Yes",
    cancelText = "Cancel",
    isLoading,
}: ModalProps) => {
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;
    if (isLoading) return <Spinner />;
    return (
        <div className={s.modalOverlay} onClick={onClose}>
            <div className={s.modal} onClick={(e) => e.stopPropagation()}>
                <h3 className={s.modal__title}>{title}</h3>
                <div className={s.modal__content}>{children}</div>
                <div className={s.modal__actions}>
                    <button className={s.modal__button} onClick={onConfirm}>
                        {confirmText}
                    </button>
                    <button className={s.modal__button} onClick={onClose}>
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
