import React, { useState, useEffect } from 'react';
import { getMenu } from '../data/iceCreamData';
import { Helmet } from 'react-helmet';

const Menu = ({ menuItems }) => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        let isMounted = true;

        getMenu().then((data) => {
            if (isMounted) {
                setMenu(data);
            }
        });

        return () => {
            isMounted = false;
        };
    }, [menuItems]);

    return (
        <main>
            <Helmet>
                <title>
                    Rock your taste buds with one of these | Polar House
                </title>
            </Helmet>
            <h2 className="main-heading">
                Rock your taste buds with one of these
            </h2>
            {menu.length > 0 ? (
                <ul className="menu-list">
                    {menu.map(
                        ({
                            id,
                            iceCream,
                            price,
                            description,
                            inStock,
                            quantity,
                        }) => (
                            <li key={id.toString()} className="menu-item">
                                <div className="menu-item-image"></div>
                                <section className="card">
                                    <div className="menu-item-details">
                                        <h3 className="menu-item-title">
                                            {iceCream.name}
                                        </h3>
                                        <div className="content card-content">
                                            <p className="price">{`$${price.toFixed(
                                                2
                                            )}`}</p>
                                            <p
                                                className={`stock${
                                                    inStock ? '' : ' out'
                                                }`}
                                            >
                                                {inStock
                                                    ? `${quantity} in stock`
                                                    : 'Currently out of Stock!'}
                                            </p>
                                            <p className="description">
                                                {description}
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            </li>
                        )
                    )}
                </ul>
            ) : (
                <p>No ice cream available! the sadness!!</p>
            )}
        </main>
    );
};

export default Menu;
