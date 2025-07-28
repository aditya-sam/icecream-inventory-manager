import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const LoaderMessage = ({ loadingMessage, isLoading }) => {
    const [showLoadingMessage, setShowLoadingMessage] = useState(false);

    useEffect(() => {
        let loadingMessagDelay;
        if (isLoading) {
            loadingMessagDelay = setTimeout(() => {
                setShowLoadingMessage(true);
            }, 400);
        }

        return () => {
            clearTimeout(loadingMessagDelay);
            setShowLoadingMessage(false);
        };
    }, [isLoading]);

    return showLoadingMessage ? (
        <p className="loading">{loadingMessage}</p>
    ) : null;
};

LoaderMessage.propTypes = {
    loadingMessage: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
};

export default LoaderMessage;
