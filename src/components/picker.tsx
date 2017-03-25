import * as React from 'react';

export default class Picker extends React.Component {
  public render() {
    const { value, onChange, options } = this.props;

    return (
      <span>
        <h1>{value}</h1>
        <select onChange={(e) => onChange(e.target.value)}
                value={value}>
          {options.map((option) =>
            <option value={option} key={option}>
              {option}
            </option>)
          }
        </select>
      </span>
    );
  }
};

Picker.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  options: React.PropTypes.arrayOf(
    React.PropTypes.string.isRequired,
  ).isRequired,
  value: React.PropTypes.string.isRequired,
};
