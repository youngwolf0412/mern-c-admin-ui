import { Breadcrumb, Button, Drawer, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { getRestaurants } from "../../http/api";
import RestaurantsFilter from "./RestaurantsFilter";
import { useState } from "react";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },

  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const Restaurants = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data: restuarants, isLoading } = useQuery({
    queryKey: ["tenants"],
    queryFn: async () => {
      const res = await getRestaurants();
      return res.data;
    },
  });
  return (
    <div>
      <Breadcrumb
        separator={<RightOutlined />}
        items={[
          {
            title: <Link to="/">Dashboarb</Link>,
          },
          {
            title: "Restaurants",
          },
        ]}
      />
      {isLoading && <div>Loading...</div>}

      <RestaurantsFilter>
        <Button type="primary" onClick={() => setDrawerOpen(true)}>
          Add Restaurants
        </Button>
      </RestaurantsFilter>

      <Table columns={columns} dataSource={restuarants?.data} />

      <Drawer
        title="Create restaurant"
        // styles={{ body: { backgroundColor: colorBgLayout } }}
        width={720}
        destroyOnClose={true}
        open={drawerOpen}
        onClose={() => {
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
            {/* <Button type="primary" onClick={onHandleSubmit}>
              Submit
            </Button> */}
          </Space>
        }
      >
        <p>SOmekjadoj</p>
        <p>dajhwdo</p>
        {/* <Form layout="vertical" form={form}>
                        <TenantForm />
                    </Form> */}
      </Drawer>
    </div>
  );
};

export default Restaurants;
