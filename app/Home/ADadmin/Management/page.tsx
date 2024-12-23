"use client"
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import {stepNav as StepNav,stepTitle as StepTtile} from "../../../../components/navigation/stepNav"
import PU from "../../../../components/popup/popup"

import DialogAD from "../../../../components/popup/popupAD";
import DialogADreject from "../../../../components/popup/popupADreject";
import DialogADapprove from "../../../../components/popup/popupADapprove";
import DialogADconfirm from "../../../../components/popup/popupADconfirm";
import DialogADinterruption from "../../../../components/popup/popupADinterruption";

import { useRouter } from "next/navigation";
import ad from "../../../../public/adsample.jpeg"
import TA from "../../../../components/table/table"
import { ADslotList, advertisementGuidelines ,ManagementList} from "../../../../config/list";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { enUS, ko } from 'date-fns/locale';
import Pagination from "../../../../components/board/pagination";
import TC from "../../../../components/table/table_checkbox"
const Page=()=>{
  
const [user, setuser] = useState<any>({password:"",repassword:""

})
const [zoom, setZoom] = useState(1);

const updateZoom = () => {
  // 1920px 기준으로 zoom 값 계산
  const scale = Math.max(0.1, Math.min(1, window.innerWidth / 1920)); // 1920px 기준
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
const [userConvertList, setuserConvertList] = useState<any>({
  role:{type:"none",title:"소속을 입력해주세요.",place:"소속"},
  affiliation:{type:"text",title:"소속을 입력해주세요.",place:"소속"},
  bn:{type:"text",title:"사업자명을 입력해주세요.",place:"사업자명"},
  brn:{type:"text",title:"사업자등록번호를 입력해주세요.",place:"사업자등록번호"},
  name:{type:"text",title:"이름을 입력해주세요.",place:"이름"},
  birth:{type:"number",title:"생년월일을 입력하세요.",place:"생년월일 8자리"},
  userId:{type:"text",title:"아이디를 입력해주세요.",place:"아이디"},
  phone:{type:"number",title:"휴대폰번호를 입력하세요.",place:"-없이 휴대폰번호 입력"},
  phoneAuth:{type:"number",title:"",place:"인증번호 입력"},
  email:{type:"email",title:"이메일을 입력해주세요.",place:"이메일"},
  password:{type:"text",title:"비밀번호를 입력해주세요.",place:"영문+숫자조합 8자리 이상"},
  repassword:{type:"text",title:"비밀번호를 재입력해주세요.",place:"비밀번호 재입력"}
})

const InputText=(typename:any,value:any)=>{
  setuser((prev:any)=>{return{...prev,[typename]:value}})
}  
const router = useRouter()
const [showDialog, setShowDialog] = useState("false");
const closeDialog = () => setShowDialog("false");
const [digText, setdigText] = useState("")
const [selectRole, setselectRole] = useState("일반회원")
const [events, setevents] = useState([
  { title: 'Sample Event',type:"운영중", date: "2024-12-19" },
  // more events...
])
const [page, setpage] = useState(1)
const [SelectCheck, setSelectCheck] = useState()
const [buttonlist, setbuttonlist] = useState<any>({상세보기:{state:true},반려:{state:true},승인:{state:true},입금확인:{state:true},중단:{state:false}})
const [check_data, setcheck_data] = useState({})
function paginateArray(array: string | any[], page: number, pageSize = 10) {
  // Start and end index for slicing the array
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Return the sliced portion of the array
  return array.slice(startIndex, endIndex);
}
    return (<>

    <div className="h-full w-[90%] mx-[5%] lg:w-[70%] lg:mx-[15%] my-[5%] flex flex-col justify-center items-center ">
<StepTtile title={"광고관리"} subtitle={"AD MANAGEMENT"} subtitlecolor={"#1292F5"}/>
      <StepNav list={["콘텐츠 운영","광고관리"]}/>

      <div className="w-full flex flex-col sm:flex-row justify-start sm:justify-between items-center space-x-2 mt-[4%] mb-[1%] sm:mb-0">
      <p className="w-full font-bold text-[1.7rem] flex flex-row items-center ">광고리스트</p>
<div className="w-full h-full justify-end space-x-2 items-center flex flex-row ">
{Object.keys(buttonlist).map((item,index)=>(<>
<button onClick={()=>setShowDialog(()=>item)} className={` cursor-pointer transition-all duration-100 hover:scale-105 font-semibold rounded-[0.3rem] font-sm lg:font-lg text-nowrap text-xs lg:text-sm px-[0.8rem] py-[0.2rem] lg:px-[2rem] lg:py-[0.5rem] ${buttonlist[item]["state"]?" bg-[#485C6D]  hover:bg-[#1292F5]  text-white":" bg-[#D8D8D8] text-[#A1A1A1]"}`}>{item}</button>
</>))}
</div>

        </div>

  <div style={{zoom:zoom}} className="w-full flex flex-col h-full justify-start items-center space-x-2 space-y-2">


<TC headers={Object.keys(ManagementList[0])} data={paginateArray(ManagementList,page) } check_now={SelectCheck} check_set={setSelectCheck} check_data={setcheck_data}/>



</div>
<div className="w-full mt-[3%]">
<Pagination totalPages={Math.floor(ManagementList.length/10+1)} currentPage={page} onPageChange={setpage} pageLimit={5} />  
</div>
          </div>
    <div className="p-8">
      {/* 버튼 */}
      {/* 다이얼로그 */}
      
      <DialogAD
        isOpen={showDialog}
        onClose={closeDialog}
        title={"광고 상세보기"}
        tbData={check_data}
        contentsData={[]}

      />

<DialogADreject
        isOpen={showDialog}
        onClose={closeDialog}
        title={"이 광고를 반려하시겠습니까?"}
        tbData={check_data}
        contentsData={[]}

      />
<DialogADapprove
        isOpen={showDialog}
        onClose={closeDialog}
        title={"이 광고를 승인하시겠습니까?"}
        tbData={check_data}
        contentsData={[]}

      />
 <DialogADconfirm
        isOpen={showDialog}
        onClose={closeDialog}
        title={"이 광고에 대해 입금확인 하셨습니까?"}
        tbData={check_data}
        contentsData={[]}

      />   
  <DialogADinterruption
        isOpen={showDialog}
        onClose={closeDialog}
        title={"이 광고에 대해 송출을 중단하시겠습니까?"}
        tbData={check_data}
        contentsData={[]}

      /> 
    </div>
    
</>
      );
    };


export default Page