import { Breadcrumb } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../http/api";
import { User } from "../../types";

const Users = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await getUsers();
      return res.data;
    },
  });
  return (
    <>
      <Breadcrumb
        separator={<RightOutlined />}
        items={[
          {
            title: <Link to="/">Dashboard</Link>,
          },
          {
            title: "Users",
          },
        ]}
      />
      {isLoading && <div>Loading...</div>}

      {users && (
        <ul>
          <h1>Users</h1>
          {users["data"].map((user: User) => (
            <li key={user.id}>{user.firstName}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Users;
