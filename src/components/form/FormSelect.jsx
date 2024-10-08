import PropTypes from 'prop-types'

const FormSelect = ({ label, name, list, defaultValue }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="capitalize label-text">{label}</span>
      </label>
      <select
        name={name}
        className="select select-bordered"
        value={defaultValue}
      >
        {list.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  )
}

FormSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  defaultValue: PropTypes.string,
}

export default FormSelect
