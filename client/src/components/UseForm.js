import {useState} from 'react';

const UseForm = initialValues => {
    const [values, setValues] = useState(initialValues);

    return [
        values, 
        e => {
            e.preventDefault();
            setValues({
                ...values, 
                [e.target.name]: e.target.value
            });
        }
    ];
};

export default UseForm