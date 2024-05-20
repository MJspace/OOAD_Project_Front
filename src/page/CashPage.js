import styled from "styled-components";
import { useState, useEffect } from "react";
import CashModal from "../components/CashModal";

const CashPage = ({
  webSocketClient,
  selectedTime,
  setSelectedTime,
  remainTime
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달창 열림 상태 추가

  const PurchaseTime = (time) => {
    //시간 서버로 보내는 것
    webSocketClient.send(JSON.stringify({
      type: "product",
      data: {
        type: "time",
        amount: time
      },
    }));
  };


  // 시간 버튼 클릭 이벤트 핸들러(모달창)
  const handleTimeButtonClick = (hours) => {
    const milliseconds = hours * 60 * 60 * 1000;
    setSelectedTime(milliseconds); //selectedTime 밀리초 단위
    setIsModalOpen(true); // 모달창 열기
    PurchaseTime(milliseconds); // 선택한 시간을 서버로 보냄
  };

  return (
    <Container>
      <CashWrapper>
        <span style={{ fontWeight: "bold", fontSize: "20px" }}>
          ✔원하는 시간 옵션을 클릭해주세요
        </span>
        {/* map으로 더 간결하게 함수 만들어서 숏코딩 가능하긴 함 + 문자열에서 ms 정수로 타입 변형 */}
        <TimeButton onClick={() => handleTimeButtonClick(0.01)}>36초</TimeButton>
        <TimeButton onClick={() => handleTimeButtonClick(1)}>1시간</TimeButton>
        <TimeButton onClick={() => handleTimeButtonClick(2)}>2시간</TimeButton>
        <TimeButton onClick={() => handleTimeButtonClick(3)}>3시간</TimeButton>
        <TimeButton onClick={() => handleTimeButtonClick(4)}>4시간</TimeButton>
        <TimeButton onClick={() => handleTimeButtonClick(5)}>5시간</TimeButton>
        <TimeButton onClick={() => handleTimeButtonClick(6)}>6시간</TimeButton>
      </CashWrapper>
      <CashModal
        isOpen={isModalOpen}
        selectedTime={selectedTime}
        onClose={() => setIsModalOpen(false)}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  height: 100vh;
`;

const CashWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

const TimeButton = styled.div`
  width: 450px;
  padding: 20px;
  border-radius: 10px;
  background-color: #96d5ef;
  cursor: pointer;
  font-size: 25px;
  font-weight: 500;
`;

export default CashPage;
