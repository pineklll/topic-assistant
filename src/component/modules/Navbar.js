import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

export default function NavBar() {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/" className="NavBar-link">
          导入试卷
        </Link>
        <Link to="/latex" className="NavBar-link">
          查找题目
        </Link>
        <Link to="/card" className="NavBar-link">
          修改题目
        </Link>
        <Link to="/paper" className="NavBar-link">
          编辑试卷
        </Link>
      </div>
    </nav>
  );
}
