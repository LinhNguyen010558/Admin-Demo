import React from 'react'
import { Form, InputNumber } from "antd";

const FormInputNumber = ({
    name,
    label,
    initialValue,
    rules,
    min = 1,
    max = 999999999, 
    isFormatter = true,
    dependencies, 
    isDisabled = false,
    onChange,
    addonBefore,
    style,
    onBlur,
    controls,
    addonAfter,
    formatter = ((value) =>
        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','))
}) => {
    return (<>
        <Form.Item 
            label={label}
            hasFeedback
            style={style}
            name={name} 
            initialValue={initialValue}
            rules={rules || []}
            dependencies={dependencies}
        >
            <InputNumber
                controls={controls}
                addonAfter={addonAfter ? addonAfter : null}
                onBlur={(data) => onBlur ? onBlur(data) : {}}
                onChange={(data) => onChange ? onChange(data) : {}}
                style={{ width: '100%' }}
                min={min} 
                max={max}
                disabled={isDisabled}
                addonBefore={addonBefore}
                formatter={isFormatter && formatter}
            />
        </Form.Item>
    </>)
}
export default FormInputNumber