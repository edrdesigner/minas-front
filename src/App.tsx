import React from 'react';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/es/locale/pt_BR';
import GlobalStyle from './styles/global';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => (
  <ConfigProvider locale={ptBR}>
    <GlobalStyle />
    <Dashboard />
  </ConfigProvider>
);

export default App;
