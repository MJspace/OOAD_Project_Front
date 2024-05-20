import styled from "styled-components";

const Input = ({ onChange, value, placeholder, type }) => {
  return (
    <StyledInput onChange={onChange} value={value} placeholder={placeholder} type={type} />
  );
};

const StyledInput = styled.input`
  width: 300px;
  height: 40px;
  border-radius: 10px;
  border: none;
  outline: none;
  font-size: 20px;
  line-height: 14px;
  font-weight: 500;
  padding: 16px;
`;

export default Input;
