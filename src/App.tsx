import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 0 auto;
  width: 70%;

  input {
    width: 300px;
    padding: 10px;
    font-size: 20px;
  }
  button {
    font-size: 20px;
    padding: 10px;
    margin-left: 10px;
  }
`;

function App() {
  const [rowdata, setRowdate] = useState("");
  const [name, setName] = useState("");
  const [pack, setPack] = useState("");
  const [costnumber, setNumber] = useState(0);
  const [date, setDate] = useState("");
  const [pick, setPick] = useState("");
  const [drop, setDrop] = useState("");
  const [cash, setCash] = useState(0);
  const [revCash, setRevCash] = useState(0);
  const [isCareer, setIsCarrer] = useState(false);

  const handleButtonClick = () => {
    const rowDataArrow = rowdata.split("\t");
    console.table(rowDataArrow);
    setName(rowDataArrow[2]);
    const number = Number(extractNumbers(rowDataArrow[5]));
    setNumber(number);
    const date = formatDate(rowDataArrow[6]);
    setDate(date);
    const pkg = rowDataArrow[4]; // 패키지 이름 추출
    setPack(pkg);
    setPick(rowDataArrow[7]);
    setDrop(rowDataArrow[8]);
    const cash = number * returnCash(pkg); // 패키지 이름 전달
    const revcash = number * returnRevCash(pkg);
    console.log(cash);
    setCash(cash);
    setRevCash(revcash);
    const isbox = containsAirport(rowDataArrow[7]);
    setIsCarrer(isbox);
    console.log(isCareer);
  };

  const returnCash = (pack: string) => {
    const trimpack = pack.trim();

    switch (trimpack) {
      case "오캐모팩":
        return 140;
      case "오캐팩 A코스":
        return 110;
      case "오캐팩 B코스":
        return 110;
      case "오모팩":
        return 100;
      case "오투팩":
        return 60;
      case "모캐팩":
        return 110;
      case "바디안캐녀닝 단품":
        return 90;
      default:
        return 0;
    }
  };

  const returnRevCash = (pack: string) => {
    const trimpack = pack.trim();

    switch (trimpack) {
      case "오캐모팩":
        return 3;
      case "오캐팩 A코스":
        return 3;
      case "오캐팩 B코스":
        return 3;
      case "오모팩":
        return 3;
      case "오투팩":
        return 3;
      case "모캐팩":
        return 2;
      case "바디안캐녀닝 단품":
        return 2;
      default:
        return 0;
    }
  };

  const isSolo = (pack: string) => {
    switch (pack) {
      case "바디안캐녀닝 단품 ":
        return true;
      case "모알보알 단품 ":
        return true;
      case "투썸호핑(단독 막탄호핑) ":
        return true;
      case "투썸호핑 + 막날팩옵션 (단독 막탄호핑+출국팩) ":
        return true;
      case "시티투어 ":
        return true;
      default:
        return false;
    }
  };

  function extractNumbers(str: string) {
    const numbers = str.match(/\d+/g);
    const result = numbers ? numbers.join("") : "";
    return result;
  }

  function formatDate(inputDateStr: string) {
    const inputDate = new Date(inputDateStr);

    const year = inputDate.getFullYear() - 2000; // 연도에서 2000을 뺀 값
    const month = inputDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
    const day = inputDate.getDate();

    const formattedDate = `${year}년 ${month}월 ${day}일`;
    return formattedDate;
  }

  function containsAirport(str: string) {
    return str.toLowerCase().includes("공항");
  }

  return (
    <Wrapper>
      <h1>세친구 투어 문구 생성기</h1>
      <input
        type="text"
        value={rowdata}
        onChange={(e) => {
          setRowdate(e.target.value);
          console.log(rowdata);
        }}
      />
      <button onClick={handleButtonClick}>버튼</button>
      <hr />
      <h1>예약 확정 안내문구</h1>
      {`${date} ${
        isSolo(pack) ? "단독투어" : "조인투어"
      } ${pack} ${costnumber}인 ${name}님`}
      <br />
      {`픽업 ${pick}`} <br />
      {`드랍 ${drop}`} <br />
      {`투어잔금 ${cash}달러 / ${isCareer ? `캐리어 ${costnumber}` : ""}`}
      <hr />
      <h1>예약 진행 안내문구</h1>
      안녕하세요 세친구투어입니다.
      <br />'{name}'님 예약신청서 접수되어 연락드려요~!
      <br />
      <br />
      {date} {pack} {isSolo(pack) ? "단독투어" : "조인투어"} {costnumber}인{" "}
      {name}님 <br /> <br />
      {pick} 픽업/ {drop} 드랍 <br />
      예약금 {revCash}만원 투어잔금 {cash} 달러 <br />
      예약 접수 내용 확인 부탁드리며 <br />
      한국시티은행 173-11270-26201 송정현 <br />
      예약금 입금 후 톡 보내주시면 예약 확정됩니다! <br />
      <br />
      투어/예약 관련 궁금한 점 있으시면 편하게 문의해주세요 ^^
    </Wrapper>
  );
}

export default App;
``;
