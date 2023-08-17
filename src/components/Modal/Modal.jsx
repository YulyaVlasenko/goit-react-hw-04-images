
import { ModalStyles, Overlay } from "./Modal.styled";
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'

const Modal = ({ onCloseModal, children }) => {
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.code === 'Escape') {
                onCloseModal()
            }
        }

    document.addEventListener('keydown', handleEscape)

        return () => {
        document.removeEventListener('keydown', handleEscape)
    }
    })

    const handleImageClick = (event) => {
        event.stopPropagation();
    }
    
  return (
     <>
                <Overlay className="overlay" onClick={onCloseModal}>
                    <ModalStyles className="modal" onClick={handleImageClick}>
                        {children}
                    </ModalStyles>
                </Overlay>
    </>
  )
}


Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onCloseModal: PropTypes.func.isRequired,
}


export default Modal;