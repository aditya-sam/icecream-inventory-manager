import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getMenu } from '../data/iceCreamData';
import LoaderMessage from '../structure/LoaderMessage';
import IceCreamCard from './iceCreamCard';

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        getMenu().then((data) => {
            if (isMounted) {
                setMenu(data);
                setIsLoading(false);
            }
        });

        return () => {
            isMounted = false;
        };
    }, []);

    const onItemClickHandler = (to) => {
        navigate(to);
    };

    return (
        <main id="menu">
            <Helmet>
                <title>
                    Rock your taste buds with one of these | Polar House
                </title>
            </Helmet>
            <h2 className="main-heading">
                Rock your taste buds with one of these
            </h2>
            <LoaderMessage
                loadingMessage="Loading..."
                isLoading={isLoading}
            ></LoaderMessage>
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
                            <li
                                key={id.toString()}
                                className="menu-item"
                                onClick={() =>
                                    onItemClickHandler(`/menu/edit/${id}`)
                                }
                            >
                                <IceCreamCard
                                    to={`/menu/edit/${id}`}
                                    iceCreamId={iceCream.id}
                                    heading={iceCream.name}
                                >
                                    <div className="content card-content">
                                        <p className="price">{`$${parseFloat(
                                            price
                                        ).toFixed(2)}`}</p>
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
                                </IceCreamCard>
                            </li>
                        )
                    )}
                </ul>
            ) : (
                !isLoading && <p>No ice cream available! the sadness!!</p>
            )}
        </main>
    );
};

export default Menu;
