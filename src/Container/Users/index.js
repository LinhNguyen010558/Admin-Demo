import { Divider, Button, Row, Col, Tag } from "antd";
import React, { useMemo } from 'react';
import DeleteUser from "../../Compomnent/User/Item/Deleteuser";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import actions from "../../Redux/User/actions";
import { useIntl } from 'react-intl'
import UserModal from "../../Compomnent/User/Modal/edit";
import TableComponent from '../../Compomnent/Common/Table/index'
import authActions from '../../Redux/Auth/actions'

export default function Users() {
  const intl = useIntl();
  let dispatch = useDispatch();
  const [dataUpdate, setDataUpdate] = useState(null);
  const [titleModal, setTitleModal] = useState();
  let {
    page,
    limit,
    count,
    listData,
    loading,
    modal
  } = useSelector((state) => state?.users);

  const handleResetSearch = async (page = 1, limit = 10) => {
    dispatch(actions.getDataUser({ page, limit }))
  };

  const handleOnclick = (data = null, type) => {
    setDataUpdate(data)
    if (type === 'add') {
      setTitleModal(intl.formatMessage({ id: 'title.AddUser' }))
      dispatch(actions.actionModal('Add'))
    } else if (type === 'edit') {
      setTitleModal(intl.formatMessage({ id: 'title.EditUser' }))
      dispatch(actions.actionModal('Edit'))
    } else {
      handleResetSearch(page, limit)
    }
  }

  const onChange = (pageNumber) => {
    if (page !== pageNumber.current || limit !== pageNumber.pageSize)
      handleResetSearch(pageNumber.current, pageNumber.pageSize);
  };

  useEffect(() => {
    handleResetSearch(page, limit)
    return () => {
      dispatch(actions.clearData())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns = useMemo(() => [
    {
      title: intl.formatMessage({ id: 'table.column.Id' }),
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: intl.formatMessage({ id: 'table.column.Username' }),
      dataIndex: "userName",
      key: "userId",
    },
    {
      title: intl.formatMessage({ id: 'table.column.Age' }),
      dataIndex: "age",
      key: "userId",
      width: 60
    },
    {
      title: intl.formatMessage({ id: 'table.column.Email' }),
      dataIndex: "email",
      key: "userId",
    },
    {
      title: intl.formatMessage({ id: 'table.column.Notes' }),
      key: "userId",
      dataIndex: "notes",
      render: (notes) => (
        <>
          {notes
            ? notes.map((tag) => {
              let color = tag.content.length > 5 ? "geekblue" : "green";
              return (
                <Tag color={color} key={tag.ID}>
                  {tag.content}
                </Tag>
              );
            })
            : null}
        </>
      ),
    },
    {
      title: intl.formatMessage({ id: 'table.column.Action' }),
      key: "userId",
      width: 200,
      fixed: "right",
      render: (_, record) => (
        <div>
          <DeleteUser user={record} />
          <Button
            type="primary"
            style={{ marginLeft: 10 }}
            onClick={() => {
              handleOnclick(record, 'edit')
            }}
          >
            {intl.formatMessage({ id: 'Button.Edit' })}
          </Button>
        </div>
      ),
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], []);

  return (
    <>
      {
        modal && <UserModal
          modal={modal}
          title={titleModal}
          Data={dataUpdate}
          handleCancel={() => dispatch(actions.actionModal(null))}
          handleSubmit={(data, type) => dispatch(actions.editData(data, type))}
        />
      }
      <Divider orientation="left">{intl.formatMessage({ id: 'title.UserManegerment' })}</Divider>
      <Row>
        <Col span={12}>
          <Row>
            <Button
              type="primary"
              style={{ marginLeft: 10 }}
              onClick={() => {
                handleOnclick(null, 'add')
              }}
            >
              {intl.formatMessage({ id: 'Button.AddNew' })}
            </Button>
            <Button
              type="primary"
              style={{ marginLeft: 10 }}
              onClick={() => {
                handleOnclick(null, 'SEARCH')
              }}
            >
              {intl.formatMessage({ id: 'Button.RefreshList' })}
            </Button>
          </Row>
        </Col>
        <Col span={12}>
          <Divider orientation="right">
          </Divider>
        </Col>
      </Row>
      <TableComponent
        onTableChange={onChange}
        columns={columns}
        keys="id"
        page={page}
        count={count}
        limit={limit}
        data={listData}
        loading={loading}
      />
      <Divider orientation="right">
        <Button
          type="primary"
          onClick={() => {
            dispatch(authActions.logoutAction());
          }}
        >
          {intl.formatMessage({ id: 'title.Logout' })}
        </Button>
      </Divider>
    </>
  );
}
