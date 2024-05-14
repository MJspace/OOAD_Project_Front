import styled from "styled-components";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const signupnavigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const onChangePw = (e) => {
    setPw(e.target.value);
  };
  const onClickSignup = () => {
    signupnavigate("/signup");
  };
  return (
    <Container>
      <Title>PC Management System</Title>
      <InputBox>
        {/* <label for="id">ID</label> */}
        <Wrapper>
          <TextWrapper>
            <Text>ID</Text>
            <Text>PW</Text>
          </TextWrapper>
          <BoxWrapper>
            <Input id="id" value={id} onChange={onChangeId} />
            <Input value={pw} onChange={onChangePw} />
            <ButtonWrapper>
              <Button>로그인</Button>
              <Button onClick={onClickSignup}>회원가입</Button>
            </ButtonWrapper>
          </BoxWrapper>
        </Wrapper>
      </InputBox>
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
  height: 420px;
  background-color: #96d5ef;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const Button = styled.button`
  height: 35px;
  width: 150px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 20px;
`;

export default LoginPage;
