import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import IceCreamImage from './iceCreamImage';

const IceCreamCard = ({ children, to, iceCreamId, heading }) => {
    const onLinkClickHandler = (e) => {
        //this prevents the click event from bubbling up to the parent li element
        // e.stopPropagation();
    };

    return (
        <>
            <div className="menu-item-image">
                <IceCreamImage iceCreamId={iceCreamId} />
            </div>
            <section className="card">
                <div className="menu-item-details">
                    <h3 className="menu-item-title">
                        <Link to={to} onClick={onLinkClickHandler}>
                            {heading}
                        </Link>
                    </h3>
                    {children}
                </div>
            </section>
        </>
    );
};

IceCreamCard.prototype = {
    children: PropTypes.node,
    to: PropTypes.string.isRequired,
    iceCreamId: PropTypes.number.isRequired,
    heading: PropTypes.string.isRequired,
};

export default IceCreamCard;
