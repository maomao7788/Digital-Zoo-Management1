import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

// 定义传递给 PrivateRoute 的 props 类型
interface PrivateRouteProps {
  children: ReactNode;
}

// 验证用户是否登录，未登录则跳转到 Login 页面
const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const token = localStorage.getItem('access_token');

  // 如果未登录，重定向到登录页面
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 已登录，正常显示组件
  return <>{children}</>;
};

export default PrivateRoute;
