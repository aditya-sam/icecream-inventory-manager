import { useRef } from 'react';
import unqid from 'uniqid';

const useUniqueId = (count) => {
    const ids = useRef([...new Array(count)].map((_) => unqid()));
    return ids.current;
};

export default useUniqueId;
