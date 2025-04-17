import { Breadcrumb, Button, Drawer, Space, Table } from "antd";
import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../http/api";
import { User } from "../../types";
import UsersFilter from "./UsersFilter";
import { useState } from "react";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
];

const Users = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

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

      <UsersFilter>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setDrawerOpen(true)}
        >
          Add User
        </Button>
      </UsersFilter>

      <Table columns={columns} dataSource={users?.data} />

      <Drawer
        title="Create User"
        width={720}
        // styles={{ body: { backgroundColor: colorBgLayout } }}
        destroyOnClose={true}
        open={drawerOpen}
        onClose={() => {
          console.log("CLODINSG");

          // form.resetFields();
          // setCurrentEditingUser(null);
          setDrawerOpen(false);
        }}
        extra={
          <Space>
            <Button
              onClick={() => {
                // form.resetFields();
                // setDrawerOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button type="primary">Submit</Button>
          </Space>
        }
      >
        <p>some contetn....</p>
        <p>some contetn....</p>
        <p>some contetn....</p>
        {/* <Form layout="vertical" form={form}>
          <UserForm isEditMode={!!currentEditingUser} />
        </Form> */}
      </Drawer>

      {/* {users && (
        <ul>
          <h1>Users</h1>
          {users["data"].map((user: User) => (
            <li key={user.id}>{user.firstName}</li>
          ))}
        </ul>
      )} */}
    </>
  );
};

export default Users;
