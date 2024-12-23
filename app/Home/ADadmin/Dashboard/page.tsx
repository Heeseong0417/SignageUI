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
import Carousel from "../../../../components/carousel/carousel";
import BarChart from "../../../../components/chart/barchart";
import StatisticsAD from "../../../../components/statistics/statisticsAD"
import Ping from "../../../../public/ping.svg"
import BarAndLineChart from "../../../../components/chart/barandlinechart";
import StackedBarChart from "../../../../components/chart/stackbar";
import i2560 from "../../../../public/800_2560.png"
import i25602 from "../../../../public/800x1280.png"
const Page=()=>{
  // 현재 날짜 가져오기
const today = new Date();

// 날짜 구성하기
const year = today.getFullYear();
const month = today.getMonth() + 1; // 월은 0부터 시작하므로 +1
const date = today.getDate();

// 원하는 형식으로 출력
const formattedDate = `${year}년 ${month}월 ${date}일`;

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

const [spot, setSpot] = useState([
  { title:"미사강변동로 동편 L", list:[{title:"포토존 서비스 콘텐츠",screen:"보도측 LCD",admin:"admin123",link:"",play:true,thumbnail:"https://www.wevity.com/upload/contest/20240719042505_4e4d63f2.jpg"},{title:"옥외광고",screen:"보도측 LED",admin:"admin123",link:"",play:true,thumbnail:"https://www.wevity.com/upload/contest/20240719042505_4e4d63f2.jpg"},{title:"미디어 아트",screen:"차도측 LED",admin:"admin123",link:"",play:false,thumbnail:"https://www.wevity.com/upload/contest/20240719042505_4e4d63f2.jpg"},]},
  { title:"미사강변동로 동편 C",list: [{title:"포토존 서비스 콘텐츠",screen:"보도측 LCD",admin:"admin123",link:"",play:false,thumbnail:"https://www.wevity.com/upload/contest/20240719042505_4e4d63f2.jpg"},{title:"옥외광고",screen:"보도측 LED",admin:"admin123",link:"",play:false,thumbnail:"https://www.wevity.com/upload/contest/20240719042505_4e4d63f2.jpg"},{title:"미디어 아트",screen:"차도측 LED",admin:"admin123",link:"",play:false,thumbnail:"https://www.wevity.com/upload/contest/20240719042505_4e4d63f2.jpg"}] },
  { title:"미사강변동로 동편 R",list: [{title:"포토존 서비스 콘텐츠",screen:"보도측 LCD",admin:"admin123",link:"",play:false,thumbnail:"https://www.wevity.com/upload/contest/20240719042505_4e4d63f2.jpg"},{title:"옥외광고",screen:"보도측 LED",admin:"admin123",link:"",play:false,thumbnail:"https://www.wevity.com/upload/contest/20240719042505_4e4d63f2.jpg"},{title:"미디어 아트",screen:"차도측 LED",admin:"admin123",link:"",play:false,thumbnail:"https://www.wevity.com/upload/contest/20240719042505_4e4d63f2.jpg"}] },
  { title:"행정게시판 1",list:[{title:"포토존 서비스 콘텐츠",screen:"보도측 LCD",admin:"admin123",link:"",play:false,thumbnail:"https://www.wevity.com/upload/contest/20240719042505_4e4d63f2.jpg"},{title:"옥외광고",screen:"보도측 LED",admin:"admin123",link:"",play:false,thumbnail:"https://www.wevity.com/upload/contest/20240719042505_4e4d63f2.jpg"},{title:"미디어 아트",screen:"차도측 LED",admin:"admin123",link:"",play:false,thumbnail:"https://www.wevity.com/upload/contest/20240719042505_4e4d63f2.jpg"}] },
  { title:"행정게시판 2",list:[{title:"포토존 서비스 콘텐츠",screen:"보도측 LCD",admin:"admin123",link:"",play:false,thumbnail:"https://www.wevity.com/upload/contest/20240719042505_4e4d63f2.jpg"},{title:"옥외광고",screen:"보도측 LED",admin:"admin123",link:"",play:false,thumbnail:"https://www.wevity.com/upload/contest/20240719042505_4e4d63f2.jpg"},{title:"미디어 아트",screen:"차도측 LED",admin:"admin123",link:"",play:false,thumbnail:"https://www.wevity.com/upload/contest/20240719042505_4e4d63f2.jpg"}] },
  { title:"행정게시판 3",list:[{title:"포토존 서비스 콘텐츠",screen:"보도측 LCD",admin:"admin123",link:"",play:false,thumbnail:"https://www.wevity.com/upload/contest/20240719042505_4e4d63f2.jpg"},{title:"옥외광고",screen:"보도측 LED",admin:"admin123",link:"",play:false,thumbnail:"https://www.wevity.com/upload/contest/20240719042505_4e4d63f2.jpg"},{title:"미디어 아트",screen:"차도측 LED",admin:"admin123",link:"",play:false,thumbnail:"https://www.wevity.com/upload/contest/20240719042505_4e4d63f2.jpg"}] },
  { title:"행정게시판 4",list:[{title:"포토존 서비스 콘텐츠",screen:"보도측 LCD",admin:"admin123",link:"",play:false,thumbnail:"https://www.wevity.com/upload/contest/20240719042505_4e4d63f2.jpg"},{title:"옥외광고",screen:"보도측 LED",admin:"admin123",link:"",play:false,thumbnail:"https://www.wevity.com/upload/contest/20240719042505_4e4d63f2.jpg"},{title:"미디어 아트",screen:"차도측 LED",admin:"admin123",link:"",play:false,thumbnail:"https://www.wevity.com/upload/contest/20240719042505_4e4d63f2.jpg"}] }
])

const [userStatistics, setuserStatistics] = useState([{title:"회원 통계",state:true},{title:"광고 통계",state:true},{title:"장애 통계",state:true},{title:"수익 통계",state:true}])
const InputText=(typename:any,value:any)=>{
  setuser((prev:any)=>{return{...prev,[typename]:value}})
}  
const router = useRouter()
const [showDialog, setShowDialog] = useState("false");
const closeDialog = () => setShowDialog("false");
const [digText, setdigText] = useState("")
const [selectRole, setselectRole] = useState("일반회원")

const [page, setpage] = useState(1)
const [SelectCheck, setSelectCheck] = useState()
const [buttonlist, setbuttonlist] = useState<any>({상세보기:{state:true},반려:{state:true},승인:{state:true},입금확인:{state:true},중단:{state:false}})
const [check_data, setcheck_data] = useState({})
const [selectSpot, setselectSpot] = useState(spot[0].title)
function paginateArray(array: string | any[], page: number, pageSize = 10) {
  // Start and end index for slicing the array
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Return the sliced portion of the array
  return array.slice(startIndex, endIndex);
}
    return (<>

    <div className="font-nanumsquare-neo h-full w-[90%] mx-[5%] lg:w-[70%] lg:mx-[15%] my-[5%] flex flex-col justify-center items-center ">
<StepTtile title={"대시보드"} subtitle={"DASHBOARD"} subtitlecolor={"#1292F5"}/>
      <StepNav list={["대시보드"]}/>

      <div className="w-full flex flex-wrap justify-center lg:justify-start items-center m py-[3%]">
        {spot.map((item)=>(<>
        <button onClick={()=>setselectSpot(()=>item.title)} className={`mr-[0.5%] mb-[0.5%] py-[0.8rem] min-w-[13rem] text-sm lg:text-lg rounded-md px-[0.8rem]  font-medium ${selectSpot===item.title?"bg-black text-white":"text-[#63707C]"}`}>{item.title}</button>
        </>))}
        </div> 

<div className="w-full h-full mt-2">
  <div className="w-full rounded-t-2xl border-t-2 border-solid border-l-2 border-r-2 border-b-0 mb-10 py-[1rem] text-2xl flex items-center justify-center font-bold"><Ping className={"h-6 w-6 mr-2"}/>{selectSpot}</div>
  <Carousel data={spot.find(item => item.title === selectSpot)?.list} />
</div>

<div className="h-[100%] grid grid-cols-1  bg-[#F0F0F0] lg:grid-cols-2  p-[2%] lg:gap-[2%] w-[96%] mt-[5%]">
  {userStatistics.map((item)=>item.state?(<>
    <div className=" h-[100%] rounded-md border flex flex-col justify-center border-[#CCCCCC] bg-white border-solid items-center">
      <div className="flex w-[96%]  text-lg justify-between px-[2%] font-extrabold"><p>{item.title}</p> {item.title==="광고 통계"?<p className="font-bold">*{formattedDate} 기준 </p>:""}</div>
      <div className="w-full min-h-[20rem] flex items-center justify-center">
{item.title==="회원 통계"?<BarAndLineChart/>:item.title==="광고 통계"?<StatisticsAD/>:item.title==="장애 통계"?<StackedBarChart/>:<div className=""><BarAndLineChart/></div>}
       
      </div>
      </div> 

  </>):(<>
    <div className="w-[96%] p-[2%] h-[92%] rounded-md border border-[#CCCCCC] bg-white border-solid items-center">
      <div className="w-full flex py-[1rem] text-sm justify-between">{item.title}</div>
      
      <div className="w-full h-full flex items-center justify-center text-md font-bold">데이터가 존재하지 않습니다.</div>
     
      </div>  
  </>))}

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