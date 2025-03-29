import React from "react";
import s from "./Modal.module.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    title?: string;
    children?: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
}

const Modal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirmation",
    children,
    confirmText = "Yes",
    cancelText = "Cancel",
}: ModalProps) => {
    if (!isOpen) return null;

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
