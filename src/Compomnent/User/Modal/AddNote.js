import React, { useEffect } from "react";
import {
    Button,
    Modal,
    Form,
} from "antd";
import { useIntl } from 'react-intl'
import FormIniput from '../../Common/FormItem/Input';

const UserModal = (props) => {
    const intl = useIntl()
    const [form] = Form.useForm();
    const {
        modal,
        title,
        Data,
        handleCancel,
        handleSubmit
    } = props;

    useEffect(() => {
        if (Data) {
            form.setFieldsValue({
                ...Data
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Data])

    const onFinish = async () => {
        const formData = await form.validateFields();

        if (Data) {
            handleSubmit({ ...formData, ID: Data.ID }, true);
        } else handleSubmit({ ...formData }, false);

    }

    return (
        <>
            <Modal
                visible={modal}
                width={"50%"}
                style={{ top: 18 }}
                title={title}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        {intl.formatMessage({ id: 'Button.Close' })}
                    </Button>,

                    // <UpdateFormPopup user={InputData.userId} checkUpdate={checkUpdate} />,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={onFinish}
                    >
                        {intl.formatMessage({ id: 'Button.Submit' })}
                    </Button>,
                ]}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="dynamic_form_nest_item"
                    autoComplete="off"
                >
                    <FormIniput
                        name="content"
                        maxLength={200}
                        label={intl.formatMessage({ id: 'form.Content' })}
                        rules={[
                            {
                                whitespace: true,
                                message: intl.formatMessage({ id: 'form.Validate' })
                            },
                            {
                                required: true,
                                message: intl.formatMessage({ id: 'form.Validate' })
                            }
                        ]}
                    />
                </Form>
            </Modal>
        </>
    )
}
export default UserModal;