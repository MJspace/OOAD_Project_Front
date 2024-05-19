import styled from "styled-components";
import { useState, useEffect } from "react";
import CashModal from "../components/CashModal";

const CashPage = ({ webSocketClient }) => {
  const [selectedTime, setSelectedTime] = useState(null); // 선택된 시간 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달창 열림 상태 추가
  const [time, setTime] = useState(0); //시간 상태 설정

  const PurchaseTime = (time) => {
    //시간 서버로 보내는 것
    webSocketClient.send({
      type: "product",
      data: {
        type: time,
        amount: time,
      },
    });
    //시간 더미 데이터
    messageEventHandler(
      JSON.stringify({
        type: "time",
        data: {
          leftTime: 30,
        },
      })
    );
  };

  const messageEventHandler = (message) => {
    console.log("서버에서 데이터 받았음");

    const eventData = JSON.parse(message);
    console.log(eventData);

    if (eventData["type"] === "time") {
      setTime(eventData["data"]["leftTime"]);
    }
  };
  //최초 1회 실행 렌더링
  useEffect(() => {
    webSocketClient.addEventListener("message", messageEventHandler);
  }, []);

  // 시간 버튼 클릭 이벤트 핸들러(모달창)
  const handleTimeButtonClick = (hours) => {
    const milliseconds = hours * 60 * 60 * 1000;
    setSelectedTime(milliseconds);
    setIsModalOpen(true); // 모달창 열기
    console.log(setIsModalOpen);
    PurchaseTime(milliseconds); // 선택한 시간을 서버로 보냄
  };

  return (
    <Container>
      <CashWrapper>
        <span style={{ fontWeight: "bold", fontSize: "20px" }}>
          ✔원하는 시간 옵션을 클릭해주세요
        </span>
        {time}
        {/* map으로 더 간결하게 함수 만들어서 숏코딩 가능하긴 함 + 문자열에서 ms 정수로 타입 변형 */}
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
