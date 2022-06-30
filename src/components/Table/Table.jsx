import React from "react";
import TableRow from "./TableRow/TableRow";
import TableHeader from "./TableHeader/TableHeader";
import tableStyle from "./TableStyle.module.css";


function Table({ data, dataSelector, choiseRows, columns, action }) {
  console.log('render table')
  return (
    <div className={tableStyle['table-wrapper']}>
      <table className={tableStyle.table}>
        <TableHeader columns={columns} action={action}/>
        <tbody>
          {
            (data.length > 0)?
              data.map(item => (
                <TableRow key={item.id} 
                  className={tableStyle.row}
                  data={ dataSelector ? dataSelector(item) : item } 
                  onClick={(event) => {
                    const eltColor = event.currentTarget.style.backgroundColor;
                    event.currentTarget.style.backgroundColor = (eltColor) ? '' : '#DBDBDB';
                    choiseRows(item.id)}
                  }
                />
              ))
            :
            <tr key={1} className={tableStyle.row}>
              <td colSpan="100" style={{width:'100%'}}>В таблице отсутствуют данные</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  );
}

export default React.memo(Table);
