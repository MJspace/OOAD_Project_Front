import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Main from "../assets/main.svg";
import ProfileImg from "../assets/profile.svg";

const HomePage = ({
  webSocketClient,
  selectedTime,
  setSelectedTime,
  userName,
}) => {
  const navigate = useNavigate();
  const [remainTime, setRemainTime] = useState(selectedTime);
  const signupnavigate = useNavigate(); //로그아웃하면 첫 화면인 로그인페이지로 돌아감
  const [loggingOut, setLoggingOut] = useState(false); // 로그인아웃 중 여부 상태
  const onClickLogout = () => {
    //로그아웃 버튼 온클릭
    setLoggingOut(true); // 로그아웃 중 상태로 설정
    webSocketClient.send(
      JSON.stringify({
        type: "logout",
        data: {},
      })
    );
    setHelpMessage(""); // 메세지 초기화
  };

  const LogoutEventHandler = (message) => {
    console.log("서버에서 데이터 받았음");

    const eventData = JSON.parse(message);
    console.log(eventData);

    if (eventData["type"] === "account") {
      if (eventData["data"]["loggedIn"] === false) {
        signupnavigate("/");
      } else {
        setLoggingOut(false); // 로그아웃 중 상태 해제
      }
    }
  };

  //서버에게 남은 시간 업데이트 받음
  const messageEventHandler = (message) => {
    const eventData = JSON.parse(message);
    if (eventData["type"] === "time") {
      setRemainTime(eventData["data"]["leftTime"]);
    }
  };

  useEffect(() => {
    const handleEvent = (event) => {
      LogoutEventHandler(event.data);
      messageEventHandler(event.data);
    };

    webSocketClient.addEventListener("message", handleEvent);
  }, [webSocketClient]);
  //selectedTime 변경될 때마다 remainTime 갱신
  useEffect(() => {
    setRemainTime(selectedTime);
  }, [selectedTime]);

  useEffect(() => {
    if (remainTime > 0) {
      const interval = setInterval(() => {
        setRemainTime((prevTime) => Math.max(prevTime - 1000, 0));
      }, 1000);
      return () => clearInterval(interval);
    } else {
      //시간 0이면 시간 구입 페이지로 넘어가게
      navigate("/cash");
    }
  }, [remainTime]);

  //직원 호출하기
  const [helpMessage, setHelpMessage] = useState("");
  const onChangeMessage = (e) => {
    if (e.target && typeof e.target.value === "string") {
      setHelpMessage(e.target.value);
    }
  };
  //메세지 서버로 보냄
  const Call = (helpMessage) => {
    if (helpMessage.trim() === "") {
      alert("메세지를 입력해주세요");
      return;
    }
    webSocketClient.send(
      JSON.stringify({
        type: "call",
        data: {
          message: helpMessage,
        },
      })
    );
    alert("메세지가 성공적으로 전송되었습니다");
    setHelpMessage(""); // 입력창 초기화
  };
  //remainTime 형식 시:분:초로 변경
  const formatTime = (timeInMillis) => {
    const seconds = Math.floor(timeInMillis / 1000); // 밀리초를 초로 변환
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };
  return (
    <Container>
      <BackgroundContainer>
        <BackgroundImage src={Main} />
      </BackgroundContainer>
      <Content>
        <ProfileWrapper>
          <ProfileImage src={ProfileImg} />
          {userName}님의 남은시간은 {formatTime(remainTime)} 입니다.
        </ProfileWrapper>
        <MessageContainer>
          <MessageBox>
            <Message
              value={helpMessage}
              onChange={onChangeMessage}
              placeholder="메세지를 입력해주세요"
            />
            <Button onClick={() => Call(helpMessage)}>직원 호출하기</Button>
          </MessageBox>
          <LogoutButton onClick={onClickLogout} disabled={loggingOut}>
            {loggingOut ? "로그아웃 중..." : "로그아웃 하기"}
          </LogoutButton>
        </MessageContainer>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 화면 전체 높이 */
`;

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

const ProfileWrapper = styled.div`
  width: 1300px;
  padding: 20px;
  background-color: #96d5ef;
  border-radius: 10px;
  border: solid 3px;
  font-size: 25px;
`;

const ProfileImage = styled.img`
  width: 35px;
  margin-right: 20px;
`;

const MessageContainer = styled.div`
  display: flex;
  margin-top: 15%;
  margin-left: 85%;
  flex-direction: column;
  align-items: end;
  margin-right: 10%;
`;

const MessageBox = styled.div`
  width: 250px;
  padding: 20px 0px;
  background-color: #96d5ef;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
`;

const Message = styled.textarea`
  width: 200px;
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
  width: 200px;
  background-color: #fff;
  border: none;
`;

const LogoutButton = styled.button`
  margin-top: 30px;
  width: 250px;
  padding: 15px 0px;
  background-color: #96d5ef;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 700;
  border: none;
  cursor: pointer;
`;

export default HomePage;
