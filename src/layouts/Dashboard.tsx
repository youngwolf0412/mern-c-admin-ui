import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import {
  GiftOutlined,
  HomeOutlined,
  OrderedListOutlined,
  ProductOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import Logo from "../components/icons/Logo";
const { Sider } = Layout;
const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { user } = useAuthStore();
  if (user === null) {
    <Navigate to="/auth/login" replace={true} />;
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
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: "0 16px" }}>
            {/* <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}
            {/* <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              Bill is a cat.
            </div> */}
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Mern Space Pizza Shop!!!
          </Footer>
        </Layout>
      </Layout>
      <Outlet />
    </div>
  );
};

export default Dashboard;
