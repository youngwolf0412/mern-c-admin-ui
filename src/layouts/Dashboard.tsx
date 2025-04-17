import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";
import {
  Avatar,
  Badge,
  Breadcrumb,
  Dropdown,
  Flex,
  Layout,
  Menu,
  Space,
  theme,
} from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import {
  BellFilled,
  GiftOutlined,
  HomeOutlined,
  OrderedListOutlined,
  ProductOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import Logo from "../components/icons/Logo";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../http/api";
const { Sider } = Layout;
const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout: logoutFromStore } = useAuthStore();

  const { mutate: logoutMutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: async () => {
      logoutFromStore();
      return;
    },
  });

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  if (user === null) {
    return <Navigate to="/auth/login" replace={true} />;
  }

  const items = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <NavLink to="/">Home</NavLink>,
    },
    {
      key: "/users",
      icon: <UserOutlined />,
      label: <NavLink to="/users">Users</NavLink>,
    },
    {
      key: "/tenants",
      icon: <ShopOutlined />,
      label: <NavLink to="/tenants">Restuarants</NavLink>,
    },
    {
      key: "/products",
      icon: <ProductOutlined />,
      label: <NavLink to="/products">Products</NavLink>,
    },
    {
      key: "/orders",
      icon: <OrderedListOutlined />,
      label: <NavLink to="/orders">Orders</NavLink>,
    },
    {
      key: "/promos",
      icon: <GiftOutlined />,
      label: <NavLink to="/promos">Promos</NavLink>,
    },
  ];

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          theme="light"
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo">
            <Logo />
          </div>
          <Menu defaultSelectedKeys={["/"]} mode="inline" items={items} />
        </Sider>
        <Layout>
          <Header
            style={{
              paddingLeft: "16px",
              paddingRight: "16px",
              background: colorBgContainer,
            }}
          >
            <Flex gap="middle" align="center" justify="space-between">
              <Badge
                text={
                  user.role === "admin"
                    ? "You are an admin"
                    : user.tenant?.address
                }
                status="success"
              />
              <Space size={16}>
                <Badge dot={true}>
                  <BellFilled />
                </Badge>
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "logout",
                        label: "Logout",
                        onClick: () => logoutMutate(),
                      },
                    ],
                  }}
                  placement="bottomRight"
                >
                  <Avatar
                    style={{
                      backgroundColor: "#fde3cf",
                      color: "#f56a00",
                    }}
                  >
                    U
                  </Avatar>
                </Dropdown>
              </Space>
            </Flex>
          </Header>
          <Content style={{ margin: "24px 24px" }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Mern Space Pizza Shop!!!
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default Dashboard;
