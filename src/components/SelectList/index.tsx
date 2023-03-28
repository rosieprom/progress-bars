import styled from "styled-components";

type SelectListOptions = {
  key: any;
  value: any;
  label: string;
};

type SelectListProps = {
  selectName: string;
  selectId: any;
  value: any;
  onChange: (e: any) => void;
  selectOptions: SelectListOptions[];
};

const StyledSelect = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #313639;
  border-radius: 4px;
  color: #313639;
  margin: 2px;
  background-color: #fff;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
    border-color: blue;
  }
`;

const SelectList = ({
  selectName,
  selectId,
  selectOptions,
  value,
  onChange,
}: SelectListProps) => {
  return (
    <StyledSelect
      name={selectName}
      id={selectId}
      value={value}
      onChange={onChange}
    >
      {selectOptions.map((o, id) => (
        <option key={`${o.key}-${id}`} value={o.value}>
          {o.label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default SelectList;
