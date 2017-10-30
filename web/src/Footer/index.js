import React from 'react';
import { Link } from 'react-router-dom'

// lightweight component declaration style
const Footer = () => (
  <section className="section">
    <footer>
      <div className="content">
        <h1>pages:</h1>
        <ul>
          <li><Link to="/">home page</Link></li>
          <li><Link to="/profile">profile page</Link></li>
          <li><Link to="/example-query">example query</Link></li>
          <li><a href="/upload">file upload (TODO)</a></li>
          <li><a href="/protected">protected page (TODO)</a></li>
        </ul>
      </div>
    </footer>
  </section>
);

export default Footer;
