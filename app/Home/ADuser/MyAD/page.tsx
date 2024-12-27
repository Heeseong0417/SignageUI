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
import { GridTitle } from "../../../../components/table/grid";
import i2560 from "../../../../public/800x2560.png"
import i1280 from "../../../../public/800x1280.png"
import Icon_movie from "../../../../public/icon_movie.svg"
import Icon_image from "../../../../public/icon_image.svg"
import MyADtable from "../../../../components/table/myad_table";
import { headersIP, IP } from "../../../../config/IP";
import axios from "axios";
import { getAuthData } from "../../../../config/cookies";

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
/**
const [contentsDatas2, setcontentsDatas2] = useState<any>( 
  [
    {
      "썸네일": i2560.src,
      "확장자": "image",
      "콘텐츠분류": "옥외광고",
      "콘텐츠명": "의류 할인광고",
      "선택구좌": "보도측 (미사용 동편)",
      "구좌해상도":"800x1280",
      "표출시간":"15초",
      "광고기간": "2024. 06. ~ 2024. 12. (6개월)",
      "파일이름":"샘플.jpg",
      "광고비용": "916,800원",
      "진행상황": "심의중",
      "state": ""
    },
    {
      "썸네일": i1280.src,
      "확장자": "mp4",
      "콘텐츠분류": "상업광고",
      "콘텐츠명": "oo동 oo사거리 피트니스 광고",
      "선택구좌": "차도측",
      "구좌해상도":"800x1280",
      "표출시간":"15초",
      "광고기간": "2024. 06. ~ 2024. 12. (6개월)",
      "파일이름":"샘플.jpg",
      "광고비용": "916,800원",
      "진행상황": "신청완료",
      "state": "(21일 심의시작)"
    },
    {
      "썸네일": i1280.src,
      "확장자": "mp4",
      "콘텐츠분류": "상업광고",
      "콘텐츠명": "oo치킨 프로모션 광고",
      "선택구좌": "보도측 (미사역 서편)",
      "구좌해상도":"800x1280",
      "표출시간":"15초",
      "광고기간": "2024. 06. ~ 2024. 12. (6개월)",
      "파일이름":"샘플.jpg",
      "광고비용": "916,800원",
      "진행상황": "반려",
      "state": "(삭제 예정)"
    },
    {
      "썸네일": i1280.src,
      "확장자": "mp4",
      "콘텐츠분류": "상업광고",
      "콘텐츠명": "ABC마트 하반기 초특가 세일 광고",
      "선택구좌": "보도측 (미사역 동편)",
      "구좌해상도":"800x1280",
      "표출시간":"15초",
      "광고기간": "2024. 06. ~ 2024. 12. (6개월)",
      "파일이름":"샘플.jpg",
      "광고비용": "916,800원",
      "진행상황": "입금대기",
      "state": "(25일까지)"
    },
    {
      "썸네일": i1280.src,
      "확장자": "mp4",
      "콘텐츠분류": "상업광고",
      "콘텐츠명": "ABC마트 하반기 초특가 세일 광고",
      "선택구좌": "보도측 (미사역 동편)",
      "구좌해상도":"800x1280",
      "표출시간":"15초",
      "광고기간": "2024. 06. ~ 2024. 12. (6개월)",
      "파일이름":"샘플.jpg",
      "광고비용": "916,800원",
      "진행상황": "광고예정",
      "state": "(25일까지)"
    }
  ]

) **/  
const [contentsDatas2, setcontentsDatas2] = useState<any>( 
  [
    {
      "name": "광고1",
      "camp_id": "1"
    },
    {
      "name": "광고2",
      "camp_id": "camp_id"
    }
 
  ]

)  
let findlist={
    "name": "콘텐츠명", // 콘텐츠명
    "category": "콘텐츠분류", // 콘텐츠분류
    "display_type": "확장자", // 확장자
    "asset_url": "썸네일", // 썸네일
    "fit_type": "확장자", // 확장자
    "start_date": "광고 시작일", // 시작일
    "end_date": "광고 종료일", // 종료일
    "status": "진행상황" // 진행상황
}
const [userStatistics, setuserStatistics] = useState([{title:"내 광고 게시 횟수",state:true},{title:"내 광고 노출 횟수",state:true},{title:"유동인구",state:true}])
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
const [selectSpot, setselectSpot] = useState(spot[0].title)
function paginateArray(array: string | any[], page: number, pageSize = 10) {
  // Start and end index for slicing the array
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Return the sliced portion of the array
  return array.slice(startIndex, endIndex);
}

const sendApi=()=>{


  const auth = getAuthData()
  let pagedata  ={
    "page": page,
    "per_page": 10
}


axios.request({
  method: 'GET',
  url: IP+"/api/camp/list/"+auth.userId,
  data: pagedata,
  headers:headersIP(auth.accessToken)
}).then(res => {
  if(res.data.result==="success"){

    setcontentsDatas2(()=>res.data?.campaigns)
    }else{
      alert("데이터 로드 실패")
    }
}).catch(error => {
  alert("데이터 로드 실패")
});


}

useEffect(() => {
  
  sendApi()
  return () => {
    
  }
}, [])

    return (<>

    <div className="font-nanumsquare-neo h-full w-[90%] mx-[5%] lg:w-[70%] lg:mx-[15%] my-[5%] flex flex-col justify-center items-center">
<StepTtile title={"내 광고"} subtitle={"MY ADVERTISEMENT"} subtitlecolor={"#1292F5"}/>
      <StepNav list={["내 광고"]}/>
      <GridTitle title={"내 광고"}/>
    <MyADtable link={"/Home/ADuser/MyAD/MyADdetail"} headers={["콘텐츠명","광고아이디"]/**["썸네일","콘텐츠분류","콘텐츠명","선택구좌","진행상황"]**/} data={
      contentsDatas2} className_item={"h-[10rem] text-sm"}/>



<div className="w-full mt-[3%]">
<Pagination totalPages={Math.floor(contentsDatas2.length/10+1)} currentPage={page} onPageChange={setpage} pageLimit={5} />  
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