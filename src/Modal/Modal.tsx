import { useState, useContext, createContext } from 'react';
import { createPortal } from 'react-dom';

import Icon from "../Icons/Icon";
import './Modal.scss';

interface ModalProps {
    content: JSX.Element
}

const ModalContext = createContext<any>({});

export const useModalContext = () => {
    return useContext(ModalContext);
}

const Modal = ({ content }: ModalProps) => {
    const [show, setShow] = useState(false);

    const open = () => {
        setShow(true);
    }

    const close = () => {
        setShow(false);
    }

    return (
        <>
            <div className='modal-trigger' onClick={open}>
                <Icon id={"#plus"}/>
            </div>
            {show && createPortal(
                <>
                    <div className='modal-backdrop' onClick={close}></div>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <div className='modal-close' onClick={close}>
                                <Icon id={"#close"}/>
                            </div>
                        </div>
                        <ModalContext.Provider value={{ close }}>
                            <div className='modal-body'>
                                { content }
                            </div>
                        </ModalContext.Provider>
                    </div>
                </>,
                document.body
            )}
        </>
    );
}

export default Modal;