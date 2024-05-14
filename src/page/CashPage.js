import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CashModal from "../components/CashModal";

const CashPage = () => {
  const signupnavigate = useNavigate(); //로그아웃하면 첫 화면인 로그인페이지로 돌아감
  const onClickLogout = () => {
    signupnavigate("/");
  };

  const [selectedTime, setSelectedTime] = useState(null); // 선택된 시간 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달창 열림 상태 추가
  // 시간 버튼 클릭 이벤트 핸들러
  const handleTimeButtonClick = (time) => {
    setSelectedTime(time);
    setIsModalOpen(true); // 모달창 열기
    console.log(setIsModalOpen);
  };

  const [message, setMessage] = useState("");
  const onChangeMessage = (e) => {
    setMessage(e.target.value);
  };
  return (
    <Container>
      <CashWrapper>
        <span style={{ fontWeight: "bold", fontSize: "20px" }}>
          ✔원하는 시간 옵션을 클릭해주세요
        </span>
        {/* map으로 더 간결하게 함수 만들어서 숏코딩 가능하긴 함 */}
        <TimeButton onClick={() => handleTimeButtonClick("1시간")}>
          1시간
        </TimeButton>
        <TimeButton onClick={() => handleTimeButtonClick("2시간")}>
          2시간
        </TimeButton>
        <TimeButton onClick={() => handleTimeButtonClick("3시간")}>
          3시간
        </TimeButton>
        <TimeButton onClick={() => handleTimeButtonClick("4시간")}>
          4시간
        </TimeButton>
        <TimeButton onClick={() => handleTimeButtonClick("5시간")}>
          5시간
        </TimeButton>
        <TimeButton onClick={() => handleTimeButtonClick("6시간")}>
          6시간
        </TimeButton>
      </CashWrapper>
      <CashModal
        isOpen={isModalOpen}
        selectedTime={selectedTime}
        onClose={() => setIsModalOpen(false)}
      />
      <RightWrapper>
        <MessageBox>
          <Message
            onChange={onChangeMessage}
            placeholder="메세지를 입력해주세요"
          />
          <Button>직원 호출하기</Button>
        </MessageBox>
        <LogoutButton onClick={onClickLogout}>로그아웃 하기</LogoutButton>
      </RightWrapper>
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

const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageBox = styled.div`
  width: 450px;
  padding: 50px 0px 50px 0px;
  background-color: #96d5ef;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
`;

const Message = styled.textarea`
  width: 250px;
  height: 150px;
  font-size: 15px;
  padding: 10px;
`;

const Button = styled.button`
  cursor: pointer;
  margin-top: 20px;
  font-size: 20px;
  font-weight: 700;
  padding: 10px;
  width: 250px;
  background-color: #fff;
  border: none;
`;

const LogoutButton = styled.button`
  margin-top: 60px;
  width: 450px;
  padding: 50px 0px 50px 0px;
  background-color: #96d5ef;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  font-size: 25px;
  font-weight: 700;
  border: none;
  cursor: pointer;
`;

export default CashPage;
