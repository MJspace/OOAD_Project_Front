import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CashModal = ({ isOpen, selectedTime, onClose }) => {
  const [cash, setCash] = useState(0); // 정수로 초기화
  const [error, setError] = useState(null); // 에러 상태 추가
  const navigate = useNavigate();

  const onChangeCash = (e) => {
    setCash(e.target.value);
  };

  useEffect(() => {
    if (selectedTime) {
      // 선택한 시간과 금액을 계산
      const hours = selectedTime / (60 * 60 * 1000);
      console.log(`Selected time: ${hours} hours`);
    }
  }, [selectedTime]);
  const handleCashInput = () => {
    const calculatedAmount = selectedTime / (60 * 60); // 이용 금액 계산
    if (cash == calculatedAmount) {
      alert("선택하신 시간이 입력되었습니다.");
      console.log(selectedTime);
      navigate(`/home${window.location.search}`);
    } else if (!cash) {
      setError("금액(숫자)을 입력해주세요");
      return;
    } else if (cash !== calculatedAmount) {
      setError("선택한 시간에 맞는 금액을 입력해주세요");
      return;
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setCash(); // 모달이 닫힐 때 cash 상태 초기화해줌. !!그전에는 초기화 안됐었음
    }
  }, [isOpen]);

  if (!isOpen) {
    return null; // 모달이 열려있지 않으면 아무것도 렌더링하지 않음 == 모달 닫기
  }

  return (
    <ModalContainer>
      <ModalBox style={{ display: isOpen ? "block" : "none" }}>
        <div>
          선택한 시간: {selectedTime / (60 * 60 * 1000)} 시간 / 이용 금액:{" "}
          {selectedTime / (60 * 60)}원{error && <ErrorText>{error}</ErrorText>}
        </div>
        <Input
          type="number" //숫자만 입력받게
          onChange={onChangeCash}
          value={cash}
          placeholder="숫자만 입력해주세요"
        />
        <ButtonWrapper>
          <Button onClick={handleCashInput}>금액 입력하기</Button>
          <Button onClick={onClose}>닫기</Button>
        </ButtonWrapper>
      </ModalBox>
      <Background />
    </ModalContainer>
  );
};
const ErrorText = styled.p`
  color: red;
  margin-bottom: 10px;
`;

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  background-color: #f6c6e0;
  padding: 50px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

const Input = styled.input`
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  border: none;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f6c6e0;
`;

const Button = styled.button`
  cursor: pointer;
  border-radius: 10px;
  padding: 15px 30px;
  font-size: 20px;
  border: none;
`;

//modal background blur처리
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
`;
export default CashModal;
