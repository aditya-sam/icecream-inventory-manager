import React from 'react';
import PropTypes from 'prop-types';

const IceCreamImage = ({ iceCreamId }) =>
    iceCreamId != null && (
        <img
            src={`${process.env.PUBLIC_URL}/images/ice-cream-${iceCreamId}.png`}
            alt=""
        />
    );

IceCreamImage.propTypes = {
    iceCreamId: PropTypes.number.isRequired,
};

export default IceCreamImage;
