import React from 'react';

import './loader.css';

function Loader(props) {
  return props.loading && <div className="loader" />;
}

export default Loader;
