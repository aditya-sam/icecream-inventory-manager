export const validateDescription = (description) =>
    description ? null : 'Description is required';

export const validateQuantity = (quantity, inStock) =>
    inStock && parseInt(quantity, 10) === 0
        ? 'An item in stock should have a quantity'
        : null;

export const validatePrice = (price) => {
    const regex = /^[0-9]+(\.[0-9][0-9])$/;

    if (!price || price === '0.00') {
        return 'Price is required';
    } else if (!regex.test(price.trim())) {
        return 'Please enter a valid price in the format 0.00';
    }

    return null;
};
