import s from "./Filter.module.css";

const Filter = ({ handleFilterChange, filter }) => {
  return (
    <select className={s.select} value={filter} onChange={handleFilterChange}>
      <option value="show all">Show All</option>
      <option value="follow">Follow</option>
      <option value="following">Following</option>
    </select>
  );
};

export default Filter;
