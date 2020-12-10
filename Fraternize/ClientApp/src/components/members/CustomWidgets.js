import React from 'react';
import Select from 'react-select';
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";

export const CustomDatePicker = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    return (
        <DatePicker
            {...field}
            {...props}
            selected={(field.value && new Date(field.value)) || null}
            onChange={val => {
                setFieldValue(field.name, val);
            }}
        />
    );
};

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