import React, { useState, useEffect } from 'react';
import { getMenu } from '../data/iceCreamData';
import { Helmet } from 'react-helmet';
import IceCreamImage from './iceCreamImage';
import LoaderMessage from '../structure/LoaderMessage';
import { Link, useNavigate } from 'react-router-dom';

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
    const onLinkClickHandler = (e) => {
        //this prevents the click event from bubbling up to the parent li element
        //which would trigger the onItemClickHandler
        e.stopPropagation();
    };

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
                                <div className="menu-item-image">
                                    <IceCreamImage iceCreamId={iceCream.id} />
                                </div>
                                <section className="card">
                                    <div className="menu-item-details">
                                        <h3 className="menu-item-title">
                                            <Link
                                                to={`/menu/edit/${id}`}
                                                onClick={onLinkClickHandler}
                                            >
                                                {iceCream.name}
                                            </Link>
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
                !isLoading && <p>No ice cream available! the sadness!!</p>
            )}
        </main>
    );
};

export default Menu;
