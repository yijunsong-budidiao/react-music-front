import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';

// 引入antd 的样式文件
import 'antd/dist/antd.css';
// 引入http.js
import './utils/http'

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
