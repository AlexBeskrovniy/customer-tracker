import { useState, useContext, createContext } from 'react';
import { createPortal } from 'react-dom';

import Icon from "../Icons/Icon";
import './Modal.scss';

import { useAuthContext } from '../AuthProvider';

interface ModalProps {
    content: JSX.Element
}

interface ModalAnimationNames {
    modalAnimation: 'liftUp' | 'liftDown';
    backdropAnimation: 'fadeIn' | 'fadeOut';
}

const ModalContext = createContext<any>({});

export const useModalContext = () => {
    return useContext(ModalContext);
}

const initialAnimations: ModalAnimationNames = {
    modalAnimation: 'liftUp',
    backdropAnimation: 'fadeIn'
}

const reversedAnimations: ModalAnimationNames = {
    modalAnimation: 'liftDown',
    backdropAnimation: 'fadeOut'
}

const ANIMATION_TIME = 300;

const Modal = ({ content }: ModalProps) => {
    const [show, setShow] = useState(false);
    const [animation, setAnimation] = useState<ModalAnimationNames>(initialAnimations);

    const open = () => {
        setShow(true);
    }

    const close = () => {
        setAnimation(reversedAnimations);

        setTimeout(() => {
            setAnimation(initialAnimations);
            setShow(false);
        }, ANIMATION_TIME);
    }

    const { user } = useAuthContext();

    return (
        <>
            {user && 
                <div className='modal-trigger' onClick={open}>
                    <Icon id={"#plus"}/>
                </div>
            }
            
            {show && createPortal(
                <>
                    <div className='modal-backdrop' onClick={close} style={{ animationName: animation.backdropAnimation }}></div>
                    <div className='modal-content' style={{ animationName: animation.modalAnimation }}>
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