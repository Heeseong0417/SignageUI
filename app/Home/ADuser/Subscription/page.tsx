"use client"
import type { NextPage } from "next";
import Image from "next/image";
import { addDays, format, previousMonday } from 'date-fns'; // date-fns에서 날짜 계산을 위한 함수
import { enUS, ko } from 'date-fns/locale'; // `date-fns`에서 로케일 임포트
import { useEffect, useState } from "react";
import {stepNav as StepNav,stepTitle as StepTtile} from "../../../../components/navigation/stepNav"
import PU from "../../../../components/popup/popup"
import { Dialog, } from "@reach/dialog";
import CustomDialog from "../../../../components/popup/popup";
import { useRouter } from "next/navigation";
import ad from "../../../../public/adsample.jpeg"
import i2560 from "../../../../public/800x2560.png"
import i1280 from "../../../../public/800x1280.png"
import Fix from "../../../../public/fixsize.svg"
import Min from "../../../../public/minsize.svg"
import Max from "../../../../public/maximize.svg"
import { DateRange, RangeKeyDict  } from 'react-date-range';
import { GridInputText, GridContainer, GridItem, GridTitle, GridInputSelect, GridSlider, GridImageCheckbox, GridInputFile, GridCheckboxList, GridTitleBetween } from "../../../../components/table/grid";
import CustomDialogImage from "../../../../components/popup/popupImage";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { hasNoEmptyValues } from "../../../../config/tool";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { Bluebutton, Darkgraybutton } from "../../../../components/button/Button";
import DialogLink from "../../../../components/popup/popuplink";
import { getAuthData } from "../../../../config/cookies";
import { headersIP, IP } from "../../../../config/IP";
import axios from "axios";
const boxlist:any =   [
  {title:"보도측(미사역 서편)",subtitle:"800 x 1280px",image:i1280,ratio:[800,1280]},
  {title:"보도측(미사역 동편)",subtitle:"800 x 1280px",image:i1280,ratio:[800,1280]},
  {title:"차도측",subtitle:"800 x 2560px",image:i2560,ratio:[800,2580]}
  ]

  let findlist:any = {"display_type":{
    "보도측(미사역 서편)":{title:"WEST_SIDE"},
    "보도측(미사역 동편)":{title:"EAST_SIDE"},
    "차도측":{title:"ROAD_SIDE"}
  },
  "fit_type":{
    "최소화":{title:"ORIGINAL"},
    "화면맞춤":{title:"FIT_TO_RATIO"},
    "최대화":{title:"FIT_TO_SCREEN"}
  }}
const optimizationlist =   [
  {title:"최대화",subtitle:"",image:Max},
  {title:"최소화",subtitle:"",image:Min},
  {title:"화면 맞춤",subtitle:"",image:Fix}
  ]
const Page=()=>{
const [user, setuser] = useState<any>({password:"",repassword:""

})
const [option, setoption] = useState<any>({name:"",class:"",inventory:boxlist[0].title,selectfile:[],optimization:optimizationlist[0].title,date:{start:"",end:"",range:""},file:[],thumbnail:[]})

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

const [zoom, setZoom] = useState(1);

const updateZoom = () => {
  // 1920px 기준으로 zoom 값 계산
  const scale = Math.max(0.5, Math.min(1, window.innerWidth / 1920)); // 1920px 기준
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
const router = useRouter()
const [showDialog, setShowDialog] = useState(false);
const [showDialog2, setShowDialog2] = useState("0");

const closeDialog = () => setShowDialog(false);
const closeDialog2 = () => setShowDialog2("0");
const [digText, setdigText] = useState("")
const [selectRole, setselectRole] = useState("일반회원")
const [Imagelist, setImagelist] = useState<any[]>([]);
const [thumbnail, setThumbnail] = useState<any[]>([])
const [DetailToggle, setDetailToggle] = useState(false)
let ratio = boxlist.find((i: { title: string; })=>i.title===option.inventory )?.["ratio"]
const [date_range, setdate_range] = useState([
  {
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: 'selection'
  }
]);
const handleDateChange = (dates: [any, any],range?:any) => {
  const [start, end] = dates; // 선택한 시작 날짜와 종료 날짜

  // 날짜 유효성 검사
  if (!start || isNaN(new Date(start).getTime())) {
    alert("유효하지 않은 시작 날짜입니다.");
    return;
  }

  if (end && isNaN(new Date(end).getTime())) {
    alert("유효하지 않은 종료 날짜입니다.");
    return;
  }

  if (range){
    if (start && !end) {
      const autoEnd = new Date(start);
      autoEnd.setMonth(autoEnd.getMonth() + range);
  
      // 상태 업데이트
      setoption((prev: any) => ({
        ...prev,
        date: {
          start: start,
          end: autoEnd,
          range:""
        },
      }));
  
     
      return;
    }
  }else{
  if (start && !end) {
    const autoEnd = new Date(start);
    autoEnd.setDate(autoEnd.getDate() + 10); // 시작 날짜 기준 10일 후

    // 상태 업데이트
    setoption((prev: any) => ({
      ...prev,
      date: {
        start: start,
        end: autoEnd,
      },
    }));

   
    return;
  }   
  }
  // 종료 날짜가 없을 경우, 시작 날짜 기준으로 10일 후로 자동 설정
 

  // 종료 날짜가 있는 경우 범위를 확인
/**
  if (start && end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const dayDifference = Math.abs((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    if (dayDifference > 10) {
      alert("날짜 범위는 최대 10일까지만 선택 가능합니다.");
      return;
    }

    // 상태 업데이트
    setoption((prev:any)=>{return{...prev, date: {
      start: (format(startDate, 'yyyy년 MM월 dd일')),
      end: (format(endDate, 'yyyy년 MM월 dd일')),
    }}})

  } */
};
const sendApi=()=>{


  const auth = getAuthData()
  let stdate =new Date(option.date.start)
  let eddate =new Date(option.date.end)
  let form = {
    "name": option.name,
    "category": option.class, // One of Category Enum values
    "display_type": findlist.display_type[option.inventory], // One of Display Type Enum values
    "asset": option.file[0], // Image or MP4 file
    "fit_type": findlist.display_type[option.optimization], // One of Fit Type Enum values
    "start_date": {
    "year": stdate.getFullYear(),
    "month": stdate.getMonth()+1,
    "day": stdate.getDate(),
    "hour": stdate.getHours()
    },
    "end_date": {
      "year": eddate.getFullYear(),
      "month": eddate.getMonth()+1,
      "day": eddate.getDate(),
      "hour": eddate.getHours()
    }
    }
    console.log(form)   
  axios.post(IP+"/api/camp/new/"+auth.userId,form,{headers:headersIP(auth.accessToken)}).then((res: any)=>{
    if(res.data.result==="success"){
    
      setShowDialog2(()=>"1")
      router.push("/"

      )
    }else{
      alert("광고신청에 실패하셨습니다. 다시시도하세요!")
    }
  }).catch((error)=>{
    alert("광고신청에 실패하셨습니다. 다시시도하세요!")
  })
}

    return !DetailToggle?(<>

    <div className="h-full w-[90%] mx-[5%] lg:w-[70%] lg:mx-[15%] my-[5%] flex flex-col justify-center items-center ">
<StepTtile title={"광고신청"} subtitle={"APPLICATION FOR AD"} subtitlecolor={"#1292F5"}/>
      <StepNav list={["옥외광고","광고신청"]}/>

      <GridTitle title={"광고정보 입력"}/>
<GridContainer>
  <GridItem title={"이름"}>
  <GridInputText onChange={(e: any)=>setoption((prev: any)=>{return{...prev,name:e}})} placeholder="입력하세요." className={""} value={option.name} />

  </GridItem>
  <GridItem title={"콘텐츠 분류"}>
   
   <GridInputSelect value={option.class} onChange={(e:any)=>setoption((prev: any)=>{return{...prev,class:e}})}>
<option  value={"콘텐츠1"}>콘텐츠1</option>
<option value={"콘텐츠2"}>콘텐츠2</option>
<option value={"콘텐츠3"}>콘텐츠3</option>
    </GridInputSelect>
  </GridItem>
  <GridItem title={"구좌선택"}>
    <div className="w-full h-full ">

<GridImageCheckbox checknum={"2"} classImage={"w-[9rem] h-[11.8rem] py-[0.2rem]"} onChange={(e:any)=>setoption((prev: any)=>{return{...prev,inventory:e}})} boxlist={
boxlist}  />
    </div>
  </GridItem>
  <GridItem title={"파일선택"}>
    <GridInputFile  saveTumbnail={setThumbnail}  saveFile={setImagelist}></GridInputFile>


   
  </GridItem>
  <GridItem title={"콘텐츠 최적화"}>


  <GridImageCheckbox onChange={(e:any)=>setoption((prev: any)=>{return{...prev,optimization:e}})} classImage={"p-[0.4rem]"} className={"bg-[#C7C9CB] h-[6rem] w-[5rem]"} boxlist={
optimizationlist}/>
  </GridItem>
  <GridItem title={"기간 설정"}>

    <div className="w-full h-full flex-row">
  <div className="w-full h-full flex items-center flex-row justify-between">
  <DatePicker 
    showIcon={true} 
    className="min-w-[15rem]"
    placeholderText="날짜 선택"
    locale={ko}
    minDate={new Date()}
    selected={option.date.start} // 시작 날짜
    dateFormat="yyyy년MM월dd일"
    onChange={(e)=>handleDateChange(e)} // 날짜 변경 이벤트 핸들러
    startDate={option.date.start}
    selectsRange
    endDate={option.date.end}
           
/>
  <GridCheckboxList onChange={(e: any)=>{
    setoption((prev: any)=>{return{...prev,date:{range:e}}})
    handleDateChange([new Date(),""],e==="1개월"?1:e==="3개월"?3:e==="6개월"?6:e==="12개월"?12:0)
  }} checknum={"3"} boxlist={
  
  [
    {title:"1개월",subtitle:"",image:Max},
    {title:"3개월",subtitle:"",image:Min},
    {title:"6개월",subtitle:"",image:Fix},
    {title:"12개월",subtitle:"",image:Fix}
    ]}></GridCheckboxList> 
  </div>


</div>

  </GridItem>
</GridContainer>
<div className="flex flex-row w-full justify-end items-center mt-[2%] space-x-2">
      <Bluebutton onClick={()=>setShowDialog(()=>true)} className="bg-bgblue flex items-center justify-center cursor-pointer text-white px-[2rem] py-[0.4rem] text-center rounded-md">미리보기</Bluebutton> 
      <Darkgraybutton      
          onClick={()=>{
                      if(hasNoEmptyValues(option)){
                        setoption((prev: any)=>{return {...prev,file:Imagelist,thumbnail:thumbnail}})
                        setDetailToggle(()=>true)
                       
                      }else{
                alert("모든 값을 입력해주세요!")
                      }
                      
                    }}>확인</Darkgraybutton> 
      </div>
      
  

 
          </div>
    <div className="p-8">
      {/* 버튼 */}


      {/* 다이얼로그 */}
      <CustomDialogImage
     
        isOpen={showDialog}
        onClose={closeDialog}
        title={digText}
        ratio={boxlist.find((i: { title: string; })=>i.title===option.inventory )?.["ratio"]}
        optimization={option.optimization}
        image={thumbnail[0]}
        content=""
      />



     
    </div>
    
</>
      ):(<>

        <div className="h-full w-[90%] mx-[5%] lg:w-[70%] lg:mx-[15%] my-[5%] flex flex-col justify-center items-center ">
        <StepTtile title={"광고신청"} subtitle={"APPLICATION FOR AD"} subtitlecolor={"#1292F5"}/>
        <StepNav list={["옥외광고","광고신청"]}/>
     
      <GridTitleBetween title={"광고신청서"}></GridTitleBetween>
     
      <section className="w-full flex flex-col min-h-[20rem]">
      <div style={{zoom:zoom}} className="grid grid-cols-5 mt-[3%] w-full ">
      <div className="w-full h-full flex flex-col items-center justify-center bg-darknavy ">
            <div style={{width:ratio[0]*(ratio[1]>2000?0.1: 0.3), height:ratio[1]*(ratio[1]>2000?0.1: 0.3)}} className={`overflow-y-auto flex justify-center items-center bg-white`}>
             <img 
           

             style={{/**width:`${lxy.w*100}%`,height:`${lxy.h*100}%`,**/objectFit:option.optimization==="최대화"?"cover":option.optimization==="최소화"?"scale-down":"contain"}} className={`bg-white w-full h-full`} alt="" src={option.thumbnail[0]}/>  
            </div>
            </div>
  <div className="col-span-4  flex justify-between">

  <div className="w-[96%] px-[2%] h-full flex items-center justify-start flex-col space-y-2 "> 
   
       
        <span className="w-full flex flex-row  justify-between text-start text-sm">
       <p className="bg-[#F0F0F0] text-center rounded-sm  py-[0.25rem] px-[1rem] min-w-[4rem] font-bold m-0 text-nowrap">콘텐츠명</p>
    <p className="font-bold m-0 py-[0.3rem] px-[1rem] w-full justify-start items-center">{option.name}</p>  
       </span> 

       <span className="w-full flex flex-row  justify-between text-start text-sm">
       <p className="bg-[#F0F0F0] text-center rounded-sm  py-[0.25rem] px-[1rem] min-w-[4rem] font-bold m-0 text-nowrap">콘텐츠 분류</p>
    <p className="font-bold m-0 py-[0.3rem] px-[1rem] w-full justify-start items-center">{option.class}</p>  
       </span> 

       <span className="w-full flex flex-row  justify-between text-start text-sm">
       <p className="bg-[#F0F0F0] text-center rounded-sm  py-[0.25rem] px-[1rem] min-w-[4rem] font-bold m-0 text-nowrap">선택구좌</p>
    <p className="font-bold m-0 py-[0.3rem] px-[1rem] w-full justify-start items-center">{option.inventory}</p>  
       </span> 

       <span className="w-full flex flex-row  justify-between text-start text-sm">
       <p className="bg-[#F0F0F0] text-center rounded-sm  py-[0.25rem] px-[1rem] min-w-[4rem] font-bold m-0 text-nowrap">신청기간</p>
    <p className="font-bold m-0 py-[0.3rem] px-[1rem] w-full justify-start items-center">{format(option.date?.start, 'yyyy. MM.')} ~ {format(option.date?.end, 'yyyy. MM.')} {option.date.range&&`(${option.date.range})`}</p>  
       </span> 

       <span className="w-full flex flex-row  justify-between text-start text-sm">
       <p className="bg-[#F0F0F0] text-center rounded-sm  py-[0.25rem] px-[1rem] min-w-[4rem] font-bold m-0 text-nowrap">파일이름</p>
    <p className="font-bold m-0 py-[0.3rem] px-[1rem] w-full justify-start items-center">{option.file?.[0].name}</p>  
       </span> 
       
   
   
    </div>

  </div>
</div>
<div  style={{ whiteSpace: "pre-line" }} className=" leading-10 text-center my-[3%] w-full h-[200px] flex items-center justify-center rounded-md text-[#004195] font-bold bg-[#E9F6FF]">
회원님의 광고비용은 916,800원 입니다.
  </div>
</section>
      <div className="flex flex-row w-full justify-end items-center mt-[2%] space-x-2">
      <Darkgraybutton      
          onClick={()=>setDetailToggle(()=>false)}>이전</Darkgraybutton> 
      <Bluebutton onClick={()=>{
        sendApi()
        }} >신청</Bluebutton> 

      </div>
      <DialogLink
        isOpen={showDialog2}
        onClose={closeDialog2}
        title={"광고신청이 완료되었습니다.\n 감사합니다."}
        content={"신규콘텐츠가 게시되었습니다."}
        functions={()=>alert("게시실행")}

      />
      </div>
      </>);
    };


export default Page


