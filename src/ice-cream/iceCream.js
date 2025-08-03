import React, { useState, useEffect } from 'react';
import IceCreamImage from './iceCreamImage';
import ErrorContainer from './errorContainer';
import useUniqueId from '../hooks/useUniqueId';
import useValidation from '../hooks/useValidation';
import {
    validateDescription,
    validatePrice,
    validateQuantity,
} from '../utils/validators';

const IceCream = ({
    iceCream,
    price = 0,
    quantity = 0,
    inStock = true,
    description = '',
    onSubmit,
    onDelete,
}) => {
    const [descriptionId, priceId, quantityId, stockId] = useUniqueId(4);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [internalData, setInternalData] = useState({
        description: '',
        inStock: true,
        quantity: '0',
        price: '0.00',
    });

    const descriptionError = useValidation(
        internalData.description,
        validateDescription
    );
    const priceError = useValidation(internalData.price, validatePrice);
    const quantityError = useValidation(
        internalData.quantity,
        validateQuantity,
        internalData.inStock
    );

    useEffect(() => {
        setInternalData({
            price: price.toFixed(2),
            description,
            inStock,
            quantity: quantity.toString(),
        });
    }, [price, quantity, inStock, description]);

    const onChangeHandler = (e) => {
        let newInternalData = {
            ...internalData,
            [e.target.name]:
                e.target.type === 'checkbox'
                    ? e.target.checked
                    : e.target.value,
        };

        if (e.target.name === 'quantity') {
            newInternalData.inStock = e.target.value !== '0';
        }

        if (e.target.name === 'inStock' && !e.target.checked) {
            newInternalData.quantity = '0';
        }

        setInternalData(newInternalData);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        setHasSubmitted(true);

        if (!descriptionError && !priceError && !quantityError) {
            onSubmit({
                iceCream: { id: iceCream.id },
                price: parseFloat(internalData.price).toFixed(2),
                description: internalData.description,
                inStock: internalData.inStock,
                quantity: parseInt(internalData.quantity, 10),
            });
        }
    };

    return (
        <div className="form-frame">
            <div className="image-container">
                <IceCreamImage iceCreamId={iceCream.id} />
            </div>
            <div className="form-container">
                <dl>
                    <dt>Name:</dt>
                    <dd>{iceCream.name}</dd>
                </dl>
                <form onSubmit={onSubmitHandler}>
                    <div>
                        <label htmlFor={descriptionId}>
                            Description<span aria-hidden="true">*</span> :
                        </label>
                        <ErrorContainer
                            errorText={descriptionError}
                            hasSubmitted={hasSubmitted}
                        >
                            <textarea
                                id={descriptionId}
                                name="description"
                                rows={3}
                                value={internalData.description}
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
                                checked={internalData.inStock}
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
                                value={internalData.quantity}
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
                                value={internalData.price}
                                onChange={onChangeHandler}
                            />
                        </ErrorContainer>
                    </div>
                    <div style={{ justifyContent: 'center' }}>
                        <button className="save-btn" type="submit">
                            Save
                        </button>
                        {onDelete && (
                            <button
                                className="delete-btn"
                                type="button"
                                onClick={onDelete}
                            >
                                Delete
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default IceCream;
