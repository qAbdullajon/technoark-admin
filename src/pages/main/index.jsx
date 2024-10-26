import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { login_suc } from "@toastify";
import { MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Logo from "../../assets/logo.svg";
import { menu } from "../../routes/routes";
import "./style.css";

const { Header, Sider, Content } = Layout;

const Index = () => {
  const location = useLocation();
  const naviget = useNavigate();
  useEffect(() => {
    const showToast = sessionStorage.getItem("showToast");
    if (showToast) {
      login_suc();
      sessionStorage.removeItem("showToast");
    }
  }, []);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleLogo = () => {
    naviget("/");
  };
  const menuItems = menu.map((item, i) => ({
    key: item.path,
    icon: item.icon,
    label: (
      <NavLink style={{ fontSize: "17px" }} to={item.path}>
        {item.counter}
      </NavLink>
    ),
    style: { backgroundColor: location.pathname === item.path ? "#d55200" : "", paddingInline: collapsed ? "20px" : "16px" },
  }));
  const handleLogout = () => {
    naviget("/sign-in");
    sessionStorage.removeItem("access_token");
  };
  return (
    <Layout>
      <ToastContainer />
      <Sider className={collapsed ? "minStyle" : "maxStyle"} collapsed={collapsed} trigger={null} collapsible>
        <button onClick={handleLogo} className="flex items-center gap-3 text-white py-4 px-3">
          <img width={40} src={Logo} alt="logo" />
          {!collapsed && <p className="text-xl">TechnoArk</p>}
        </button>

        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={menuItems} />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "17px",
              width: 64,
              height: 64,
            }}
          />
          <Button onClick={handleLogout} className="text-lg flex gap-2 items-center mr-5 p-5 !hover:bg-gray-500" type="text">
            <LogoutOutlined style={{ marginTop: "3px" }} />
            <span>Logout</span>
          </Button>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Index;
