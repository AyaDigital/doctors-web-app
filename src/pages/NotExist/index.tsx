import React from 'react';
import './notExist.scss';

const NotExist: React.FC = () => {
  return (
    <div className="not-exist-layout">
      <div className='error'>404</div>
      <div className='message'>We're sorry, but the page you were looking for doesn't exist.</div>
    </div>
  );
};

export default NotExist;