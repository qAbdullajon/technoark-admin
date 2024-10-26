import { AppstoreOutlined, AppstoreAddOutlined, LaptopOutlined, ApartmentOutlined, ApiOutlined, StockOutlined, SettingOutlined } from "@ant-design/icons";

const menu = [
  {
    counter: "Products",
    icon: <AppstoreOutlined style={{ fontSize: "20px" }} />,
    path: "/",
  },
  {
    counter: "Categories",
    icon: <AppstoreAddOutlined style={{ fontSize: "20px" }} />,
    path: "/categories",
  },
  {
    counter: "Brands",
    icon: <LaptopOutlined style={{ fontSize: "20px" }} />,
    path: "/brands",
  },
  {
    counter: "Brand category",
    icon: <ApartmentOutlined style={{ fontSize: "20px" }} />,
    path: "/brand-category",
  },
  {
    counter: "Ads",
    icon: <ApiOutlined style={{ fontSize: "20px" }} />,
    path: "/ads",
  },
  {
    counter: "Stock",
    icon: <StockOutlined style={{ fontSize: "20px" }} />,
    path: "/stock",
  },
  {
    counter: "Settings",
    icon: <SettingOutlined style={{ fontSize: "20px" }} />,
    path: "/settings",
  },
];

export { menu };
