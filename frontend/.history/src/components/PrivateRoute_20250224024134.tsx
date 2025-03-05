import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

// 定义私有路由的 props 类型
interface PrivateRouteProps {
  children: ReactNode; // 接收子组件
}

// 验证用户是否已登录，未登录则重定向到登录页
const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const token = localStorage.getItem('access_token');

  if (!token) {
    // 没有令牌，重定向到登录页面
    return <Navigate to="/login" replace />;
  }

  // 如果已登录，显示子组件内容
  return <>{children}</>;
};

export default PrivateRoute;