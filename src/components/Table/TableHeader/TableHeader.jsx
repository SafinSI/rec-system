function TableHeader({ columns }) {
  return (
    <thead>
      <tr key={0}>{columns.map((item, i) => (
        <th key={i}>{item}</th>)
      )}
      </tr>
    </thead>
  );
}

export default TableHeader;
