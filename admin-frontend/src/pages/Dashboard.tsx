import { FC, useState } from 'react';
import { Layout, Menu, theme, Button } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useNavigate, Routes, Route } from 'react-router-dom';
import type { MenuProps } from 'antd';

const { Header, Sider, Content } = Layout;

const Dashboard: FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = (): void => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const onMenuClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key);
  };

  return (
    <Layout style={{ height: '100%' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          height: '100%',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 101,
        }}
      >
        <div style={{ height: 32, margin: 16, color: '#fff', textAlign: 'center' }}>
          {collapsed ? 'A' : 'Admin'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/dashboard']}
          items={[
            {
              key: '/dashboard',
              icon: <DashboardOutlined />,
              label: '仪表盘',
            },
            {
              key: '/dashboard/users',
              icon: <UserOutlined />,
              label: '用户管理',
            },
            {
              key: '/dashboard/settings',
              icon: <SettingOutlined />,
              label: '系统设置',
            },
          ]}
          onClick={onMenuClick}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: 'all 0.2s',
          height: '100%',
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            position: 'sticky',
            top: 0,
            zIndex: 100,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{ marginRight: 16 }}
          >
            退出登录
          </Button>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: colorBgContainer }}>
          <Routes>
            <Route path="/" element={<div>欢迎来到管理系统</div>} />
            <Route path="/users" element={<div>用户管理页面</div>} />
            <Route path="/settings" element={<div>系统设置页面</div>} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
