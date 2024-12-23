"use client"
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import {stepNav as StepNav,stepTitle as StepTtile} from "../../../../components/navigation/stepNav"
import PU from "../../../../components/popup/popup"
import { Dialog, } from "@reach/dialog";
import CustomDialog from "../../../../components/popup/popup";
import { useRouter } from "next/navigation";
import ad from "../../../../public/adsample.jpeg"
import TA from "../../../../components/table/table"
import TI from "../../../../components/table/table_inputtext"
import { ADslotList, advertisementGuidelines, GroupList } from "../../../../config/list";

import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'

import { enUS, ko } from 'date-fns/locale';
import Pagination from "../../../../components/board/pagination";
import { GridTitle, GridTitleBetween } from "../../../../components/table/grid";
import { Darkgraybutton } from "../../../../components/button/Button";
import PopupCustom from "../../../../components/popup/schedules/popupCustom";
import PopupCustomBig from "../../../../components/popup/schedules/popupCustomBig";
const Page=()=>{
const [user, setuser] = useState<any>({password:"",repassword:""

})
const [zoom, setZoom] = useState(1);

const updateZoom = () => {
  // 1920px 기준으로 zoom 값 계산
  const scale = Math.max(0.8, Math.min(1, window.innerWidth / 1920)); // 1920px 기준
  setZoom(scale);
};
useEffect(() => {
    updateZoom(); // 초기 실행
    window.addEventListener('resize', updateZoom); // resize 이벤트 핸들러 추가

    // 컴포넌트가 언마운트 될 때 이벤트 핸들러 제거
    return () => {
      window.removeEventListener('resize', updateZoom);
    };
  }, []); // 처음 렌더링 시만 실행

function startCountdown(durationInSeconds: any) {
  let remainingTime = durationInSeconds;

  const interval = setInterval(() => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    // 시간을 "분:초" 형식으로 출력
    console.log(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);

    remainingTime--;

    if (remainingTime < 0) {
      clearInterval(interval); // 타이머 정지
      console.log("카운트다운 종료");
    }
  }, 1000); // 1초마다 실행
}

const [checkbox, setcheckbox] = useState({accept:false,idOverlab:false,phonetf:false})
const [spotTable, setspotTable] = useState([
  {"번호":"1","사이트":"미사역동편L","클라이언트":"TERM-01-01","디스플레이 해상도":"800x1200","연결상태":"O"},
  {"번호":"2","사이트":"미사역동편C","클라이언트":"TERM-01-01","디스플레이 해상도":"800x1200","연결상태":"X"},
  {"번호":"3","사이트":"미사역동편R","클라이언트":"TERM-01-01","디스플레이 해상도":"800x1200","연결상태":"X"}
])
const [contentsTable, setcontentsTable] = useState(
  [
    {"순번": 1, "광고주": "dnqls1", "콘텐츠명": "0000 할인광고", "유형": "이미지", "송출가온팅": "3회차"},
    {"순번": 2, "광고주": "dnqls2", "콘텐츠명": "0000 할인광고", "유형": "이미지", "송출가온팅": "3회차"},
    {"순번": 3, "광고주": "dnqls3", "콘텐츠명": "0000 할인광고", "유형": "이미지", "송출가온팅": "3회차"},
    {"순번": 4, "광고주": "dnqls4", "콘텐츠명": "0000 할인광고", "유형": "이미지", "송출가온팅": "3회차"},
    {"순번": 5, "광고주": "dnqls5", "콘텐츠명": "0000 할인광고", "유형": "이미지", "송출가온팅": "3회차"},
    {"순번": 6, "광고주": "dnqls6", "콘텐츠명": "0000 할인광고", "유형": "이미지", "송출가온팅": "3회차"}
]
)
const [ADslot, setADslot] = useState(
  [
  {"구분": "보도측 (미사업독편)", "시작시간(시)": 7, "종료시간(시)": 23, "광고주 수(명)": 24, "콘텐츠 시간(초)": 15, "일일송출횟수(회)": 160, "반복주기(초)": 360, "오차인정범위(%)": 5},
  {"구분": "보도측 (미사업서편)", "시작시간(시)": 7, "종료시간(시)": 23, "광고주 수(명)": 24, "콘텐츠 시간(초)": 15, "일일송출횟수(회)": 160, "반복주기(초)": 360, "오차인정범위(%)": 5},
  {"구분": "차도측", "시작시간(시)": 7, "종료시간(시)": 23, "광고주 수(명)": 24, "콘텐츠 시간(초)": 15, "일일송출횟수(회)": 160, "반복주기(초)": 360, "오차인정범위(%)": 5}
]
)
const router = useRouter()
const [showDialog, setShowDialog] = useState("0");
const openDialog = () => setShowDialog("0");
const closeDialog = () => setShowDialog("0");
const [selectDate, setselectDate] = useState({date:""})
const [digText, setdigText] = useState("")
const [selectRole, setselectRole] = useState("일반회원")
const [events, setevents] = useState([
  { title: 'Sample Event',type:"운영중", date: "2024-12-19" },
  // more events...
])
const [selectItemSpot, setselectItemSpot] = useState<any>({group:GroupList[0].group,one:GroupList[0].one[0]})
const [page, setpage] = useState(1)
    return (<>

    <div className="h-full w-[90%] mx-[5%] lg:w-[70%] lg:mx-[15%] my-[5%] flex flex-col justify-center items-center ">
<StepTtile title={"스케쥴러"} subtitle={"SCHEDULER"} subtitlecolor={"#1292F5"}/>
      <StepNav list={["콘텐츠 운영","스케쥴러"]}/>

      <div className="w-full flex flex-row justify-between items-center space-x-2">
      <p className="w-full font-bold text-[1.7rem] flex flex-row items-center h-full">사이트 선택</p>
    <Darkgraybutton onClick={()=>setShowDialog(()=>"1")} className={"text-nowrap"}>클라이언트 보기</Darkgraybutton>
        </div>
       <section className="w-full h-full">
        <div className="w-full border-bglgray border border-solid rounded-t-lg flex items-center border-b-0 justify-between">
        <div className="w-[10rem] min-h-[5rem]  h-full text-sm items-center justify-center flex  text-center font-bold bg-[#F0F0F0]">그룹</div>
        <div className="w-full items-center h-full flex justify-start flex-wrap p-2">
        {GroupList.map((item)=>(<>
        <button onClick={()=>setselectItemSpot((prev:any)=>{return{...prev,group:item.group}})} className={`mr-[1%] mb-[0.5%] py-[0.6rem] min-w-[12rem] text-sm lg:text-lg rounded-md px-[0.8rem]  font-medium ${selectItemSpot.group===item.group?"bg-black text-white":"text-[#63707C]"}`}>{item.group}</button>
        </>))}
   
        </div>
      </div>
      
      <div className="w-full border-bglgray border border-solid rounded-b-lg flex items-center justify-between ">
      <div className="w-[10rem] min-h-[5rem] py-[2%] text-sm  items-center justify-center flex text-center font-bold bg-[#F0F0F0]">개별</div>
      <div className="w-full items-center h-full flex justify-start flex-wrap p-2">
        {JSON.stringify(GroupList.find((find)=>find.group===selectItemSpot)?.["one"])}
        {GroupList.find((find)=>find.group===selectItemSpot.group)?.["one"].map((item)=>(<>
        <button  onClick={()=>{
          setselectItemSpot((prev:any)=>{return{...prev,one:item}})
          setShowDialog(()=>"2")
          }}  className={`mr-[1%] mb-[0.5%] py-[0.6rem] min-w-[12rem] text-sm lg:text-lg rounded-md px-[0.8rem]  font-medium ${selectItemSpot.one===item?"bg-black text-white":"text-[#63707C]"}`}>{item}</button>
        </>))}
   
        </div>
      </div> 
       </section>  
        <div className="w-full flex flex-wrap justify-center lg:justify-start items-center m py-[3%]">

        </div> 
    <div className=""></div>

{/**   <div className="w-full py-[5%] flex flex-col justify-start items-start text-start">
   {advertisementGuidelines.map((item)=>(<>
<p className="w-full text-start flex flex-row m-0 p-0 text-xs leading-[1.5rem]">• {item}</p>
</>))} 
  </div>
*/}
<div className="w-full h-full flex flex-col ">
   <FullCalendar 
   stickyFooterScrollbar

   plugins={[ dayGridPlugin, interactionPlugin ]}
       initialView="dayGridMonth" 
       moreLinkClick={(e)=>alert(String(e))}
       navLinkDayClick={(e)=>alert(String(e))}
       events={events} /*events 배열은 달력에 표시될 이벤트 목록이다.*/
      locale={"ko"}
      selectable={true} // 날짜 선택 활성화

      dayCellClassNames="relative"
      dateClick={e=>{
        setselectDate((prev)=>{return{...prev,date:e.dateStr}})
      setShowDialog(()=>"3")
      }}
      editable={true}
      dayCellContent={({ date }) => {

        
        // 이벤트 배열에서 현재 날짜에 해당하는 이벤트 찾기
        const isEventDay = events.some(event => new Date(event.date).getDate() === date.getDate());
    
        if (isEventDay) {
          return (
            <>
            <div className="flex flex-col w-full h-full">
             
              <span>{date.getDate()}</span> {/* 날짜 표시 */}
            </div>
           
            </>
          );
        }
    
        // 이벤트가 없는 날 "이벤트 없음" 삽입
        return (
          <>
          <div className="flex flex-col w-full h-full w-[5rem]  lg:min-w-[11rem] lg:min-h-[9rem] relative">
            <span className="w-full">{date.getDate()}</span>
           <div className="min-h-[0.5rem] lg:min-h-[1rem]"></div>
            <div className="w-full h-full flex justify-center items-center relative">
            <div className=" absolute top-[calc(50%_-)] left-[calc(50%_-)] text-nowrap bg-[#637FEF] items-center justify-center text-white rounded-xl px-[1rem] text-lg py-[0.2rem] max-w-[5rem]">여유</div>   
          </div></div>
         
 </>
);
      }}
      
      eventClassNames={({ event }) => {
        // 이벤트 객체의 "type"에 따라 클래스 설정
        switch (event.extendedProps.type) {
          case "운영중":
            return "bg-green-500 items-center justify-center text-white rounded-xl px-[1rem] text-lg py-[0.2rem] max-w-[5rem]";
          case "여유":
            return "bg-[#637FEF] items-center justify-center text-white rounded-xl px-[1rem] text-lg py-[0.2rem] max-w-[5rem]";
          default:
            return "bg-gray-500 items-center justify-center text-white rounded-xl px-[1rem] text-lg py-[0.2rem] max-w-[5rem]";
        }
      }}
      eventContent={({ event }) => (
        <div className="">
          <strong>{event.extendedProps.type}</strong>
        </div>
      )}

     />

</div>

<div className="w-full flex flex-col justify-start items-center space-x-2">
    
    <p className="w-full font-bold text-[1.7rem] flex flex-row items-center justify-between mb-[0.5rem]">광고 슬롯설정
      <Darkgraybutton onClick={(e: any)=>setShowDialog(()=>"4")}>수정하기</Darkgraybutton>
</p>
    <TA headers={Object.keys(ADslot[0])} data={ADslot }/>
    <div className=" text-nowrap border-2 border-black rounded-sm border-spacing-2 font-bold text-[1.7rem] flex flex-row items-center justify-center"></div>
    
    </div>
       
          </div>
    <div className="p-8">
      {/* 버튼 */}
      {selectItemSpot.group}
{selectItemSpot.one}
    
      {/* 다이얼로그 */}
      {showDialog==="1"?(<>
        <PopupCustom

        isOpen={showDialog}
        onClose={closeDialog}
        >
           <div className="w-full m-0 flex flex-row justify-between items-center space-x-2">
           <p className="w-full font-bold text-lg flex flex-row items-center m-0">{selectItemSpot.group}</p>
           </div>
<TA style={{zoom:zoom}} headers={["번호","사이트","클라이언트","디스플레이 해상도","연결상태"]} data={spotTable }        
className_header={"text-center font-bold py-0 text-sm"}
        className_item={"text-center text-xs py-0 py-2"}/>

        </PopupCustom>    
      </>):showDialog==="2"?(<>
        <PopupCustom

isOpen={showDialog}
onClose={closeDialog}
>
   <div className="w-full m-0 flex flex-row justify-between items-center space-x-2">
   <p className="w-full font-bold text-lg flex flex-row items-center m-0">{selectItemSpot.one}</p>
   </div>
<TA style={{zoom:zoom}} headers={["번호","사이트","클라이언트","디스플레이 해상도","연결상태"]} data={[{"번호":"1","사이트":"ooo초등학교","클라이언트":"TERM-01-01","디스플레이 해상도":"1920x1080","연결상태":"O"}] }        
className_header={"text-center font-bold py-0 text-sm"}
className_item={"text-center text-xs py-0 py-2"}/>

</PopupCustom>  
      </>):showDialog==="3"?(<>
        <PopupCustomBig

isOpen={showDialog}
onClose={closeDialog}
>




   <div className="w-full m-0 flex flex-col justify-between items-center space-x-2">
   <p className="w-full font-bold text-lg flex flex-row items-center m-0">스케쥴</p>
   <div className={`w-full h-[2px] bg-[#384958]  `}/>
   </div>
   <section className="grid grid-cols-1 w-full lg:grid-cols-2">
    <div className="flex flex-row items-center justify-center m-2">
    <span className="w-full flex flex-row  justify-between text-start text-sm ">
       <p className="bg-[#F0F0F0] text-center rounded-sm  py-[0.25rem] px-[1rem] min-w-[4rem] font-bold m-0 p-0 text-nowrap">구좌명</p>
    <p className="font-bold m-0 py-[0.3rem] px-[1rem] w-full justify-start items-center">{selectItemSpot.group}</p>  
       </span> 
    </div>

    <div className="flex flex-row items-center justify-center m-2">
    <span className="w-full flex flex-row  justify-between text-start text-sm ">
       <p className="bg-[#F0F0F0] text-center rounded-sm  py-[0.25rem] px-[1rem] min-w-[4rem] font-bold m-0 text-nowrap">광고주 수</p>
    <p className="font-bold m-0 py-[0.3rem] px-[1rem] w-full justify-start items-center">24/24(마감)</p>  
       </span> 
    </div>

      <div className="flex flex-row items-center justify-center m-2">
    <span className="w-full flex flex-row  justify-between text-start text-sm ">
       <p className="bg-[#F0F0F0] text-center rounded-sm  py-[0.25rem] px-[1rem] min-w-[4rem] font-bold m-0 text-nowrap">운영날짜</p>
    <p className="font-bold m-0 py-[0.3rem] px-[1rem] w-full justify-start items-center">{selectDate.date}</p>  
       </span> 
    </div>

       <div className="flex flex-row items-center justify-center m-2">
    <span className="w-full flex flex-row  justify-between text-start text-sm ">
       <p className="bg-[#F0F0F0] text-center rounded-sm  py-[0.25rem] px-[1rem] min-w-[4rem] font-bold m-0 text-nowrap">송출시간</p>
    <p className="font-bold m-0 py-[0.3rem] px-[1rem] w-full justify-start items-center">15초</p>  
       </span> 
    </div>

   </section>
   <div className={`w-full h-[1px] bg-[#D8D8D8]  `}/>
   <div className="w-full m-0 flex flex-col justify-between items-center space-x-2">
   <p className="w-full font-bold text-lg flex flex-row items-center">세부내역</p>
   </div>

 <div style={{zoom:zoom}} className="max-h-[30rem] w-full h-full overflow-auto">
<TA style={{zoom:zoom}} headers={["순번","광고주","콘텐츠명","유형","송출카운팅"]} data={contentsTable }        
className_header={"text-center font-bold py-0 text-sm"}
className_item={"text-center text-xs py-0 py-2"}/>
</div>
</PopupCustomBig>       
      </>):(<>
        <PopupCustom

isOpen={showDialog}
onClose={closeDialog}
>
   <div className="w-full m-0 flex flex-row justify-between items-center space-x-2">
   <p className="w-full font-bold text-lg flex flex-row items-center m-0">광고 슬롯 수정하기</p>
   </div>
   <div style={{zoom:zoom}} className="w-full flex justify-center items-center">
<TI  headers={["","시작시간(시)","종료시간(시)","광고주 수(명)","콘텐츠 시간(초)","일일송출횟수(회)","반복주기(초)","오차인정범위(%)"]} data={ADslot }        
className_header={"text-center font-bold py-0 text-sm"}
className_item={"text-center text-xs py-0 py-2 w-full"}
setData={setADslot}
/>
</div>
</PopupCustom>  
      </>)}




     
    </div>
    
</>
      );
    };


export default Page