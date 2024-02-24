const Filter = ({ handleFilterChange, filter }) => {
  return (
    <select value={filter} onChange={handleFilterChange}>
      <option value="show all">Show All</option>
      <option value="follow">Follow</option>
      <option value="following">Following</option>
    </select>
  );
};

export default Filter;
