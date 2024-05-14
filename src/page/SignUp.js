import styled from "styled-components";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPage = ({webSocketClient, loginName}) => {
  const signupnavigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const onChangePw = (e) => {
    setPw(e.target.value);
  };
  const onClickSignup = () => {
    signupnavigate("/");
  };
  return (
    <Container>
      <Title>회원가입 정보</Title>
      <InputBox>
        <Wrapper>
          <TextWrapper>
            <Text>이름</Text>
            <Text>ID</Text>
            <Text>PW</Text>
          </TextWrapper>
          <BoxWrapper>
            <Input value={name} onChange={onChangeName} />
            <Input value={id} onChange={onChangeId} />
            <Input value={pw} onChange={onChangePw} />
          </BoxWrapper>
        </Wrapper>
      </InputBox>
      <Button onClick={onClickSignup}>회원가입하기</Button>
    </Container>
  );
};

const Title = styled.div`
  font-weight: 700;
  font-size: 40px;
  margin-bottom: 50px;
`;

const Text = styled.text`
  font-weight: 500;
  font-size: 35px;
  margin-top: 15px;
`;

const TextWrapper = styled.div`
  display: flex;
  gap: 60px;
  flex-direction: column;
  margin-right: 30px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  margin: 80px;
`;

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

const InputBox = styled.div`
  width: 625px;
  background-color: #96d5ef;
`;

const Button = styled.button`
  cursor: pointer;
  margin-top: 20px;
  font-size: 25px;
  font-weight: 700;
  padding: 20px;
  width: 625px;
  background-color: #96d5ef;
  border: none;
`;

export default LoginPage;
