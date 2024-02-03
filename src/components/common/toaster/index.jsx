import React from 'react';
import { ToastContainer as ReactToastContainer } from 'react-toastify';

const ToastContainer = ({
    position = 'top-center',
    autoClose = 3000,
    hideProgressBar = false,
    rtl = false,
    pauseOnFocusLoss = true,
    newestOnTop = false,
    closeOnClick = true,
    theme = 'light',
}) => {
    return (
        <ReactToastContainer
            position={position}
            autoClose={autoClose}
            hideProgressBar={hideProgressBar}
            newestOnTop={newestOnTop}
            closeOnClick={closeOnClick}
            rtl={rtl}
            pauseOnFocusLoss={pauseOnFocusLoss}
            draggable
            pauseOnHover
            theme={theme}
        />
    )
}

export default ToastContainer;
