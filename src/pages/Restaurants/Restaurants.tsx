import { Breadcrumb, Button, Drawer, Form, Space, Table, theme } from "antd";
import { Link, Navigate } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTenant, getTenants } from "../../http/api";
import RestaurantsFilter from "./RestaurantsFilter";
import { useState } from "react";
import TenantForm from "./forms/TenantForm";
import { CreateTenantData, FieldData } from "../../types";
import { useAuthStore } from "../../store";
import { PER_PAGE } from "../../constants";

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
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const [form] = Form.useForm();
  // const [filterForm] = Form.useForm();

  const [queryParams, setQueryParams] = useState({
    perPage: PER_PAGE,
    currentPage: 1,
  });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data: restuarants, isLoading } = useQuery({
    queryKey: ["tenants"],
    queryFn: async () => {
      const filteredParams = Object.fromEntries(
        Object.entries(queryParams).filter((item) => !!item[1])
      );

      const queryString = new URLSearchParams(
        filteredParams as unknown as Record<string, string>
      ).toString();

      return getTenants(queryString).then((res) => res.data);
    },
  });

  const { user } = useAuthStore();

  const queryClient = useQueryClient();
  const { mutate: tenantMutate } = useMutation({
    mutationKey: ["tenant"],
    mutationFn: async (data: CreateTenantData) =>
      createTenant(data).then((res) => res.data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
      return;
    },
  });

  const onHandleSubmit = async () => {
    await form.validateFields();
    await tenantMutate(form.getFieldsValue());
    form.resetFields();
    setDrawerOpen(false);
  };

  // const debouncedQUpdate = React.useMemo(() => {
  //     return debounce((value: string | undefined) => {
  //         setQueryParams((prev) => ({ ...prev, q: value }));
  //     }, 500);
  // }, []);

  const onFilterChange = (changedFields: FieldData[]) => {
    const changedFilterFields = changedFields
      .map((item) => ({
        [item.name[0]]: item.value,
      }))
      .reduce((acc, item) => ({ ...acc, ...item }), {});
    setQueryParams((prev) => ({ ...prev, ...changedFilterFields }));
    //     if ('q' in changedFilterFields) {
    //         debouncedQUpdate(changedFilterFields.q);
    //     } else {
    //         setQueryParams((prev) => ({ ...prev, ...changedFilterFields }));
    //     }
  };

  if (user?.role !== "admin") {
    return <Navigate to="/" replace={true} />;
  }
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
        styles={{ body: { backgroundColor: colorBgLayout } }}
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
        <Form layout="vertical" form={form} onFieldsChange={onFilterChange}>
          <TenantForm />
        </Form>
      </Drawer>
    </div>
  );
};

export default Restaurants;
