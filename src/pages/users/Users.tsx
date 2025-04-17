import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Breadcrumb, Button, Drawer, Form, Space, Table, theme } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { createUser, getUsers } from "../../http/api";
import UsersFilter from "./UsersFilter";
import UserForm from "./forms/UserForm";
import { CreateUserData } from "../../types";

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
  const queryClient = useQueryClient();
  const {
    token: { colorBgLayout },
  } = theme.useToken();
  const [form] = Form.useForm();

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await getUsers();
      return res.data;
    },
  });

  const { mutate: userMutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: async (data: CreateUserData) =>
      createUser(data).then((res) => res.data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      return;
    },
  });

  const onHandleSubmit = async () => {
    await form.validateFields();
    await userMutate(form.getFieldsValue());
    // console.log("SUBMITING FORM", form.getFieldsValue(true));
    setDrawerOpen(false);
  };

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
        styles={{ body: { backgroundColor: colorBgLayout } }}
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
                form.resetFields();
                setDrawerOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button type="primary" onClick={onHandleSubmit}>
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" form={form}>
          <UserForm isEditMode={true} />
        </Form>
      </Drawer>
    </>
  );
};

export default Users;
