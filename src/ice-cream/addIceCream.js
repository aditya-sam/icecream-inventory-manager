import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useLocation } from 'react-router-dom';
import { getIceCreamFromStock, addIceCreamToMenu } from '../data/iceCreamData';
import LoaderMessage from '../structure/LoaderMessage';
import IceCream from './iceCream';

const AddIceCream = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isMounted = useRef(true);
    const [selectedIceCream, setSelectedIceCream] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        setIsLoading(true);
        getIceCreamFromStock(location.search.split('=')[1])
            .then((item) => {
                if (isMounted.current) {
                    // Update state only if the component is still mounted
                    setSelectedIceCream(item);
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                if (error.response.status === 404 && isMounted.current) {
                    // Handle not found error
                    navigate('/menu', { replace: true });
                }
            });
    }, [navigate, location.search]);

    const onSubmitHandler = (menuItem) => {
        addIceCreamToMenu(menuItem).then(() => {
            navigate('/menu', { replace: true });
        });
    };

    return (
        <main>
            <Helmet>
                <title>Add Ice Cream | Polar House</title>
            </Helmet>
            <h2 className="main-heading">Add some goodness to the menu</h2>
            <LoaderMessage
                loadingMessage="Loading ice cream..."
                isLoading={isLoading}
            />
            {!isLoading && (
                <IceCream
                    iceCream={{ ...selectedIceCream }}
                    onSubmit={onSubmitHandler}
                ></IceCream>
            )}
        </main>
    );
};

export default AddIceCream;
