import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { getIceCreamById, updateIceCream } from '../data/iceCreamData';
import useUniqueId from '../hooks/useUniqueId';
import LoaderMessage from '../structure/LoaderMessage';
import '../styles/forms-spacer.scss'; // Importing styles for form spacing
import IceCreamImage from './iceCreamImage';

const EditIceCream = () => {
    const params = useParams();
    const navigate = useNavigate();
    const isMounted = useRef(true);
    const [selectedIceCream, setSelectedIceCream] = useState({
        price: '0.00',
        description: '',
        inStock: true,
        quantity: '0',
        id: '',
        iceCream: {},
    });
    const [isLoading, setIsLoading] = useState(true);
    const [descriptionId, priceId, quantityId, stockId] = useUniqueId(4);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    });

    useEffect(() => {
        setIsLoading(true);
        getIceCreamById(params.id)
            .then(({ id, iceCream, price, description, inStock, quantity }) => {
                if (isMounted.current) {
                    // Update state only if the component is still mounted
                    setSelectedIceCream({
                        id,
                        iceCream,
                        price: price.toFixed(2),
                        description,
                        inStock,
                        quantity: quantity.toString(),
                    });
                }
                setIsLoading(false);
            })
            .catch((error) => {
                if (error.response.status === 404 && isMounted.current) {
                    // Handle not found error
                    navigate('/menu', { replace: true });
                }
            });
    }, [params.id, navigate]);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const { id, iceCream, price, description, inStock, quantity } =
            selectedIceCream;

        const submittedIceCream = {
            id,
            iceCream: { id: iceCream.id },
            price: parseFloat(price),
            description,
            inStock,
            quantity: parseInt(quantity, 10),
        };

        updateIceCream(submittedIceCream).then(() => {
            navigate('/menu', { replace: true });
        });

        // Perform the update logic here
    };

    const onChangeHandler = (e) => {
        let newIceCream = {
            ...selectedIceCream,
            [e.target.name]:
                e.target.type === 'checkbox'
                    ? e.target.checked
                    : e.target.value,
        };

        if (e.target.name === 'quantity') {
            newIceCream.inStock = e.target.value !== '0';
        }

        if (e.target.name === 'inStock' && !e.target.checked) {
            newIceCream.quantity = '0';
        }

        setSelectedIceCream(newIceCream);
    };

    return (
        <main>
            <Helmet>
                <title>Edit Ice Cream | Polar House</title>
            </Helmet>
            <h2 className="main-heading">Update This Beauty</h2>
            <LoaderMessage
                loadingMessage="Loading ice cream..."
                isLoading={isLoading}
            />
            {!isLoading && (
                <div className="form-frame">
                    <div className="image-container">
                        <IceCreamImage
                            iceCreamId={selectedIceCream.iceCream.id}
                        />
                    </div>
                    <div className="form-container">
                        <dl>
                            <dt>Name:</dt>
                            <dd>{selectedIceCream.iceCream.name}</dd>
                        </dl>
                        <form onSubmit={onSubmitHandler}>
                            <div>
                                <label htmlFor={descriptionId}>
                                    Description :
                                </label>
                                <textarea
                                    id={descriptionId}
                                    name="description"
                                    rows={3}
                                    value={selectedIceCream.description}
                                    onChange={onChangeHandler}
                                ></textarea>
                            </div>
                            <div>
                                <label htmlFor={stockId}>In Stock :</label>
                                <div className="checkbox-wrapper">
                                    <input
                                        id={stockId}
                                        type="checkbox"
                                        name="inStock"
                                        checked={selectedIceCream.inStock}
                                        onChange={onChangeHandler}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor={quantityId}>Quantity :</label>
                                <select
                                    id={quantityId}
                                    name="quantity"
                                    value={selectedIceCream.quantity}
                                    onChange={onChangeHandler}
                                >
                                    <option value="0">0</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                    <option value="40">40</option>
                                    <option value="50">50</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor={priceId}>Price :</label>
                                <input
                                    id={priceId}
                                    type="number"
                                    step={1}
                                    name="price"
                                    value={selectedIceCream.price}
                                    onChange={onChangeHandler}
                                />
                            </div>
                            <div style={{ justifyContent: 'center' }}>
                                <button className="button" type="submit">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
};

export default EditIceCream;
