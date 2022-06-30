function TableHeader({ columns, action }) {
  return (
    <thead>
      <tr key={0}>{columns.map((item, i) => (
        <th key={i} onClick={(e) => {
          if (typeof item === 'string') {
            action(item)
          } else {
            action(item.props.name)
          }
        }}>{item}</th>)
      )}
      </tr>
    </thead>
  );
}

export default TableHeader;
