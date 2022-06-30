import React from 'react';
import selectStyle from './SelectStyle.module.css';

function Select({ options, valueField='id', ...props }) {
  return (
    <select className={selectStyle.select} {...props}>
      {
        options.map(item => (
          <option key={item.id} className={selectStyle.option}
          value={item[valueField]}>{item.name}</option>))
      }
    </select>
  );
}

export default Select;
