import React, { useEffect, useState, useMemo } from "react";
import {
    Button,
    Modal,
    Form,
    Table,
} from "antd";
// import { useDispatch } from "react-redux";
import { useIntl } from 'react-intl'
import FormIniput from '../../Common/FormItem/Input';
import FormNumber from '../../Common/FormItem/Number';
import NoteModal from './AddNote'
import DeleteNote from '../Item/DeleteNotes'

const UserModal = (props) => {
    const intl = useIntl()
    const [form] = Form.useForm();
    const [noteModal, setNoteModal] = useState(false);
    const [dataUpdate, setDataUpdate] = useState();
    const [listNote, setListNote] = useState([]);
    const {
        modal,
        title,
        Data,
        handleCancel,
        handleSubmit } = props;
    const columns = useMemo(() => [
        {
            title: "ID",
            dataIndex: "ID",
            key: "ID",
        },
        {
            title: "Content",
            dataIndex: "content",
            key: "content",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => {
                return (
                    <div>
                        <DeleteNote
                            note={record}
                            handleDelete={() => {
                                let newArr = listNote.filter((u) => u?.ID !== record?.ID)
                                setListNote(newArr)
                            }} />
                        <Button
                            type="primary"
                            style={{ marginLeft: 10 }}
                            onClick={() => {
                                setDataUpdate(record)
                                setNoteModal(true)
                            }}
                        >
                            {intl.formatMessage({ id: 'Button.Edit' })}
                        </Button>
                    </div>
                )
            },
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
    ], [listNote]);

    useEffect(() => {
        if (Data) {
            setListNote(Data?.notes || [])
            form.setFieldsValue({
                ...Data
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Data])

    const onSubmitNote = (data) => {
        let newArr = [...listNote]
        if (data?.ID) {
            let objindex = newArr.findIndex((obj) => obj.ID === data?.ID);
            newArr[objindex] = data;
        } else {
            newArr.push({
                ...data,
                ID: parseInt(Math.random() * 100),
            })
        }
        setListNote(newArr)
        setNoteModal(false)
    }

    const onFinish = async () => {
        const formData = await form.validateFields();
        let temp = {
            userName: formData?.userName?.trim(),
            age: formData.age,
            email: formData.email,
            password: formData.password
        }
        if (Data) {
            handleSubmit({ ...temp, notes: listNote, userId: Data.userId }, modal);
        } else handleSubmit({ ...temp }, modal);
    }

    return (
        <>
            {
                noteModal && <NoteModal
                    modal={noteModal}
                    title={intl.formatMessage({ id: title.AddNote ? 'title.EditNote' : 'title.AddNote' })}
                    Data={dataUpdate}
                    handleCancel={() => setNoteModal(false)}
                    handleSubmit={onSubmitNote}
                />
            }
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

                    <Button
                        key="add"
                        type="primary"
                        onClick={() => {
                            setDataUpdate(null)
                            setNoteModal(true)
                        }}
                    >
                        {intl.formatMessage({ id: 'Button.AddNew' })}
                    </Button>,
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
                        name="userName"
                        label="Username"
                        maxLength={50}
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
                    <FormNumber
                        name="age"
                        label="Age"
                        min={1} max={130}
                        rules={[
                            {
                                required: true,
                                message: intl.formatMessage({ id: 'form.Validate' })
                            }
                        ]}
                    />

                    <FormIniput
                        name="email"
                        maxLength={50}
                        label="Email"
                        rules={[
                            {
                                whitespace: true,
                                message: intl.formatMessage({ id: 'form.Validate' })
                            },
                            {
                                required: true,
                                message: intl.formatMessage({ id: 'form.Validate' })
                            },
                            {
                                type: "email",
                                message:  intl.formatMessage({ id: 'form.Validate.Email' })
                            }
                        ]}
                    />

                    <FormIniput
                        name="password"
                        label="Password"
                        maxLength={50}
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
                        type='password'
                    />


                    <Form.Item name="Note" label="Note">
                        <Table
                            columns={columns}
                            dataSource={listNote || []}
                            rowKey="ID"
                            scroll={{ y: 200 }}
                            pagination={{ pageSize: 4 }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
export default UserModal;