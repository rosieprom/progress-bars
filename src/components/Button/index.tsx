import styled from "styled-components";

const StyledButton = styled.button`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #313639;
  border-radius: 4px;
  color: #313639;
  background-color: #fff;
  margin: 2px;
  &:hover {
    cursor: pointer;
    color: #fff;
    background-color: #313639;
  }
  &:focus {
    outline: none;
    border-color: blue;
  }
`;

type ButtonProps = {
  label: string;
  onClick: () => void;
};

const Button = ({ label, onClick }: ButtonProps) => {
  return <StyledButton onClick={onClick}>{label}</StyledButton>;
};

export default Button;
