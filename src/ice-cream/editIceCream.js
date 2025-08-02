import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import {
    deleteIceCream,
    getIceCreamById,
    updateIceCream,
} from '../data/iceCreamData';
import useUniqueId from '../hooks/useUniqueId';
import useValidation from '../hooks/useValidation';
import LoaderMessage from '../structure/LoaderMessage';
import ErrorContainer from './errorContainer';
import {
    validatePrice,
    validateDescription,
    validateQuantity,
} from '../utils/validators';
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
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [descriptionId, priceId, quantityId, stockId] = useUniqueId(4);

    const descriptionError = useValidation(
        selectedIceCream.description,
        validateDescription
    );
    const priceError = useValidation(selectedIceCream.price, validatePrice);
    const quantityError = useValidation(
        selectedIceCream.quantity,
        validateQuantity,
        selectedIceCream.inStock
    );

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        };
    }, []);

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
                    setIsLoading(false);
                }
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

        setHasSubmitted(true);

        if (!descriptionError && !priceError && !quantityError) {
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
        }
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

    const onDeleteHandler = () => {
        deleteIceCream(params.id)
            .then(() => {
                navigate('/menu', { replace: true });
            })
            .catch((error) => {
                throw error;
            });
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
                                    Description<span aria-hidden="true">*</span>{' '}
                                    :
                                </label>
                                <ErrorContainer
                                    errorText={descriptionError}
                                    hasSubmitted={hasSubmitted}
                                >
                                    <textarea
                                        id={descriptionId}
                                        name="description"
                                        rows={3}
                                        value={selectedIceCream.description}
                                        onChange={onChangeHandler}
                                    ></textarea>
                                </ErrorContainer>
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
                                <ErrorContainer
                                    errorText={quantityError}
                                    hasSubmitted={hasSubmitted}
                                >
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
                                </ErrorContainer>
                            </div>
                            <div>
                                <label htmlFor={priceId}>
                                    Price<span aria-hidden="true">*</span> :
                                </label>
                                <ErrorContainer
                                    errorText={priceError}
                                    hasSubmitted={hasSubmitted}
                                >
                                    <input
                                        id={priceId}
                                        type="number"
                                        step={1}
                                        name="price"
                                        value={selectedIceCream.price}
                                        onChange={onChangeHandler}
                                    />
                                </ErrorContainer>
                            </div>
                            <div style={{ justifyContent: 'center' }}>
                                <button className="save-btn" type="submit">
                                    Save
                                </button>
                                <button
                                    className="delete-btn"
                                    type="button"
                                    onClick={onDeleteHandler}
                                >
                                    Delete
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
