import * as React from 'react';

interface IPickerProps extends React.Props<any> {
  onChange: (value: string) => void;
  options: Array<any>;
  value: string;
};

export default class Picker extends React.Component<IPickerProps, void> {
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
