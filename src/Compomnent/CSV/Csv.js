import { CSVLink } from "react-csv";  
import { useSelector } from "react-redux";
import { selectUsers } from "../../Redux/User/userReducer";

const fixTags = (page) => {
  const users = [...page];
  let datauser = [];
  users.forEach((user) => {
    if (user.tags) {
      let objName = Object.getOwnPropertyNames({ ...user.tags });
      objName = objName.filter((name) => name.match(/Tag/));

      let arrDatatag = [];
      objName.forEach((name) => {
        if (user.tags[name]) {
          user.tags[name].forEach((item) => {
            let arr = Object.values(item);
            arr.forEach((it) => {
              arrDatatag.push(it);
            });
          });
        }
      });

      if (arrDatatag) {
        let us = { ...user };
        delete us.tags;
        datauser.push({ ...us, tags: arrDatatag });
      }
    } else datauser.push({ ...user });
  });

  return datauser;
};

const Csv = () => {
  let users = useSelector(selectUsers);
  const headers = [
    { label: "User ID", key: "userId" },
    { label: "User Name", key: "userName" },
    { label: "Age", key: "age" },
    { label: "Email", key: "email" },
    { label: "Password", key: "password" },
    { label: "Tag", key: "tags" },
    { label: "Address", key: "userAddress" },
    { label: "Phone number", key: "userPhoneNumber" },
  ];

  let newUsers = [];
  let Users = [...users];

  fixTags([...Users]).forEach((item) => {
    let i;
    let newTag = "";
    if (item.tags) {
      if (item.tags[0]) {
        item.tags.forEach((fs) => {
          newTag = newTag + fs + " ";
        });
        i = { ...item, tags: newTag };
      } else {
        i = { ...item };
      }
      newUsers.push(i);
    }
  });

  return (
    <CSVLink
      data={newUsers}
      filename={"Users.csv"}
      className="btn btn-default border border-1"
      target="_blank"
      headers={headers}
    >
      CSV
    </CSVLink>
  );
};
export default Csv;
