import { Table, Space, Divider, Button, Row, Col, Pagination, Tag } from "antd";
import DeleteUser from "../Copomnent/User/DeleteUser";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectPagin, slectNumberUsers } from "../Redux/User/userReducer";
import AddUser from "../Copomnent/User/AddUser";
import EditUser from "../Copomnent/User/EditUser";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { LogOutAction } from "../Redux/Login/action";
import { selectAuth } from "../Redux/Login/loginReducer";
import { ACTION } from "../Assets/ActionType";
import { ActionPagin } from "../Redux/User/action";
import Csv from "../Copomnent/CSV/Csv";
import AddListUsers from "../Copomnent/User/AddListUser/AddListUsers";

export default function Users() {
  let dispatch = useDispatch();
  let Navigate = useNavigate();
  let users = useSelector(selectPagin);

  let Num = useSelector(slectNumberUsers);
  const [page, setPage] = useState({ ...users });
  const [list, setList] = useState([...users.dataShow]);

  console.log("check data Num is", list);
  console.log("check data page is", users);

  useEffect(() => {
    setList([...users.dataShow]);
  }, [users]);

  useEffect(() => {
    setList([...page.dataShow]);
    dispatch(ActionPagin(ACTION.GET_DATA_USERS, page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, Num]);

  const isLog = useSelector(selectAuth);
  useEffect(() => {
    if (!isLog) {
      Navigate("/");
    } else {
      Navigate("/Users");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLog]);

  const columns = [
    {
      title: "ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Notes",
      key: "notes",
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
      title: "Action",
      key: "userId",
      render: (userId, record) => (
        <Space size="middle">
          <DeleteUser key={1} user={record}></DeleteUser>
          <EditUser key={2} user={record}></EditUser>
        </Space>
      ),
    },
  ];

  const onChange = (pageNumber) => {
    setPage({ ...page, curr: pageNumber });
  };

  return (
    <>
      <Divider orientation="left">List of Users</Divider>
      <Row>
        <Col span={12}>
          <Row>
            <AddUser />
            <AddListUsers />
          </Row>
        </Col>
        <Col span={12}>
          {" "}
          <Divider orientation="right">
            <Csv />
          </Divider>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={users.dataShow}
        pagination={false}
        rowKey="userId"
      />
      <Pagination
        defaultCurrent={1}
        defaultPageSize={10}
        total={Num}
        onChange={onChange}
      />
      <Divider orientation="right">
        <Button
          type="primary"
          onClick={() => {
            dispatch(LogOutAction(ACTION.USER_LOGOUT));
          }}
        >
          Log Out
        </Button>
      </Divider>
    </>
  );
}
