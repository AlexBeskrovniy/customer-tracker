import { useState } from 'react';
import { createPortal } from 'react-dom';

import './Modal.scss';

interface ModalProps {
    content: JSX.Element
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" height="1em" viewBox="0 0 448 512">
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                </svg>
            </div>
            {show && createPortal(
                <>
                    <div className='modal-backdrop' onClick={close}></div>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <div className='modal-close' onClick={close}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" height="1em" viewBox="0 0 384 512">
                                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                </svg>
                            </div>
                        </div>
                        <div className='modal-body'>
                            { content }
                        </div>
                    </div>
                </> ,
                document.body
            )}
        </>
    );
}

export default Modal;