import styled from "styled-components";

const Input = ({ onChange, value, placeholder }) => {
  return (
    <StyledInput onChange={onChange} value={value} placeholder={placeholder} />
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
