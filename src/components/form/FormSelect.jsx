/* eslint-disable react/prop-types */
const FormSelect = ({ label, name, list, defaultValue }) => {
  return (
    <label className="form-control">
      <label className="label">
        <span className="capitalize label-text">{label}</span>
      </label>
      <select
        name={name}
        className="select select-bordered"
        defaultValue={defaultValue}
      >
        {list.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  )
}

export default FormSelect
