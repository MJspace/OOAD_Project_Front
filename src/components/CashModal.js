import styled from "styled-components";
import { useState } from "react";
//캐시 페이지에서 선택한 시간을 돈으로 계산해서 모달창에 선택한 시간 + 계산된 돈을 보여줘야 함

const CashModal = ({ isOpen }) => {
  const [cash, setCash] = useState(0); //정수로 초기화
  const onChangeCash = (e) => {
    setCash(e.target.value);
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <MondalBox>
      {isOpen ? "block" : "none"}
      <Input onChange={onChangeCash} placeholder="숫자만 입력해주세요" />
      <ButtonWrapper>
        <Button>금액 입력하기</Button>
        <Button onClick={closeModal}>닫기</Button>
      </ButtonWrapper>
    </MondalBox>
  );
};

const MondalBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  background-color: #f6c6e0;
  padding: 50px;
`;

const Input = styled.input`
  padding: 50px;
  border-radius: 10px;
  margin-bottom: 30px;
  border: none;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
`;

const ButtonWrapper = styled.button`
  display: flex;
  border: none;
  margin: auto;
  gap: 65px;
  background-color: #f6c6e0;
`;

const Button = styled.button`
  cursor: pointer;
  border-radius: 10px;
  padding: 15px 30px;
  font-size: 20px;
  border: none;
`;

export default CashModal;
