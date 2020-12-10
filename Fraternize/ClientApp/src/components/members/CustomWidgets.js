import React from 'react';
import Select from 'react-select';
import { useField } from 'formik';
import DatePicker from 'react-datepicker';
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";



export const CustomDatePicker = () => {
    const [startDate, setStartDate] = useState();
    return (
        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
    );
}

export function CustomSelect(props) {
    const { name, options } = props;
    const [field, , helpers] = useField(name);
    return (
        <Select
            options={options}
            name={field.name}
            value={options ? options.find((option) => option.value === field.value) : ''}
            onChange={(option) => helpers.setValue(option.value)}
            onBlur={field.onBlur}
        />
    );
}