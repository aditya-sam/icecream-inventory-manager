import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { getIceCreams } from '../data/iceCreamData';
import LoaderMessage from '../structure/LoaderMessage';
import IceCreamCard from './iceCreamCard';

const IceCreams = () => {
    const navigate = useNavigate();
    const [iceCreams, setIceCreams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        getIceCreams().then((data) => {
            if (isMounted) {
                setIceCreams(data);
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
        <main>
            <Helmet>
                <title>Add your ice creams | Polar House</title>
            </Helmet>
            <h2 className="main-heading">Choose your poison and enjoy!</h2>
            <LoaderMessage
                loadingMessage="Loading the stock list..."
                isLoading={isLoading}
            />
            {iceCreams.length > 0 && !isLoading ? (
                <ul className="menu-list">
                    {iceCreams.map(({ id, name }) => (
                        <li
                            key={id.toString()}
                            className="menu-item"
                            onClick={() =>
                                onItemClickHandler({
                                    pathname: '/menu/add',
                                    search: `?id=${id.toString()}`,
                                })
                            }
                        >
                            <h3>{name}</h3>
                            <IceCreamCard
                                to={{
                                    pathname: '/menu/add',
                                    search: `?id=${id.toString()}`,
                                }}
                                iceCreamId={id}
                                heading={name}
                            ></IceCreamCard>
                        </li>
                    ))}
                </ul>
            ) : (
                !isLoading && (
                    <p className="fully-stocked">Your menu is fully stocked!</p>
                )
            )}
        </main>
    );
};

export default IceCreams;
