import React from 'react'
import { Form, Input } from "antd";

const FormInput = ({
    name,
    label,
    rules,
    maxLength,
    style,
    placeholder,
    type = 'text',
    disabled = false,
}) => {

    return (
        <>
            <Form.Item
                style={style}
                label={label}
                hasFeedback
                name={name}
                rules={rules || []}
            >
                <Input 
                    placeholder={placeholder || ''} 
                    type={type} 
                    maxLength={maxLength + 5} 
                    disabled={disabled} />
            </Form.Item>
        </>
    )
}
export default FormInput