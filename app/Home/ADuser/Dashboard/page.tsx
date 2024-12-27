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
import axios from "axios";
import { headers, IP } from "../../../../config/IP";
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
const [contentsDatas, setcontentsDatas] = useState<any>( 
  {
    "썸네일":"",
    "확장자":"image",
    "콘텐츠명": "피트니스클럽 회원모집광고",
    "콘텐츠분류": "옥외광고",
    "선택구좌": "보도측 (미사용 동편)",
    "계약기간": "2024. 06. ~ 2024. 12. (6개월)",
    "계약금액": "916,800원",
    "진행상태" : "입금대기"
  }
)
/** 
const [contentsDatas2, setcontentsDatas2] = useState<any>( 
 [ {
  "썸네일":i2560.src,
  "확장자":"image",
    "콘텐츠명": "피트니스클럽 회원모집광고",
    "콘텐츠분류": "옥외광고",
    "선택구좌": "보도측 (미사용 동편)",
    "계약기간": "2024. 06. ~ 2024. 12. (6개월)",
    "계약금액": "916,800원",
    "진행상태" : "입금대기"
  },
  {
    "썸네일":i1280.src,
    "확장자":"mp4",
    "콘텐츠명": "피트니스클럽 회원모집광고",
    "콘텐츠분류": "옥외광고",
    "선택구좌": "차도측",
    "계약기간": "2024. 06. ~ 2024. 12. (6개월)",
    "계약금액": "916,800원",
    "진행상태" : "입금대기"
  }
]
)
*/
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
let findlist:any={
  "name": "콘텐츠명", // 콘텐츠명
  "category": "콘텐츠분류", // 콘텐츠분류
  "display_type": "확장자", // 확장자
  "asset_url": "썸네일", // 썸네일
  "fit_type": "확장자", // 확장자
  "start_date": "광고 시작일", // 시작일
  "end_date": "광고 종료일", // 종료일
  "status": "진행상황" // 진행상황
}
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
      <GridTitle title={"내 광고 목록"}/>
    
  <section className="w-full flex flex-col min-h-[20rem]">
{/**contentsDatas2.map((items:any)=>(<>
      <div style={{zoom:zoom}} className="grid grid-cols-5 mt-[2%] w-full ">
  <div className="w-full h-full flex items-center justify-center">   
    <div className="p-2 w-full flex items-center justify-center bg-[#172731] py-[5%] rounded-md">       
    <Image className={`object-contain w-[12rem] h-[17rem] `} alt="" src={i2560}/>
    </div>  
    </div>
  <div className="col-span-4  flex justify-between">

  <div className="w-[96%] px-[2%] h-full flex items-center justify-start flex-col space-y-2 "> 
    <p className="w-full flex flex-row  justify-start text-start text-2xl font-bold"><p className="">• {items["선택구좌"]}</p> <p className="pl-[2%] pr-[2%] text-[#CCCCCC]"> | </p> <p className="">옥외광고</p> <div/></p>
        {Object.keys(items).map((item)=>item!=="썸네일"&&item!=="확장자"&&item!=="콘텐츠분류"&&item!=="선택구좌"&&(<>
        <span className="w-full flex flex-row  justify-between text-start text-sm">
       <p className="bg-[#F0F0F0] text-center rounded-sm  py-[0.5rem] px-[1rem] min-w-[4rem] font-bold m-0 text-nowrap">{item}</p>
    <p className="font-bold m-0 py-[0.3rem] px-[1rem] w-full justify-start items-center">{items[item]}</p>  
       </span> 
        </>))}
   
   
    </div>
    <div className="  flex justify-start px-[4%] flex-col">
      <button className="text-[white] bg-[#485C6D] mb-[20%] items-center text-center justify-center py-[0.6rem] px-[1rem] text-[1rem] rounded-md min-w-[8rem] mr-[2%] mt-[2%]">상세내역</button>
      <div className="w-full flex justify-end ">
       { items["확장자"]==="image"? <Icon_image className={"h-12 w-12 object-cover"}/>:<Icon_movie className={"h-12 w-12 object-cover"}/>  }
      </div> 
      </div>
  </div>
</div>
</>))**/}
{contentsDatas2.map((items:any)=>(<>
      <div style={{zoom:zoom}} className="grid grid-cols-5 mt-[2%] w-full ">
  <div className="w-full h-full flex items-center justify-center">   
    <div className="p-2 w-full flex items-center justify-center bg-[#172731] py-[5%] rounded-md">       
    <Image className={`object-contain w-[12rem] h-[17rem] `} alt="" src={i2560}/>
    </div>  
    </div>
  <div className="col-span-4  flex justify-between">

  <div className="w-[96%] px-[2%] h-full flex items-center justify-start flex-col space-y-2 "> 
    <p className="w-full flex flex-row  justify-start text-start text-2xl font-bold"><p className="">• {items["name"]}</p> <p className="pl-[2%] pr-[2%] text-[#CCCCCC]"> | </p> <p className="">옥외광고</p> <div/></p>
        {Object.keys(items).map((item)=>item!=="썸네일"&&item!=="확장자"&&item!=="콘텐츠분류"&&item!=="선택구좌"&&item!=="camp_id"&&(<>
        <span className="w-full flex flex-row  justify-between text-start text-sm">
       <p className="bg-[#F0F0F0] text-center rounded-sm  py-[0.5rem] px-[1rem] min-w-[4rem] font-bold m-0 text-nowrap">{findlist[item]}</p>
    <p className="font-bold m-0 py-[0.3rem] px-[1rem] w-full justify-start items-center">{items[item]}</p>  
       </span> 
        </>))}
   
   
    </div>
    <div className="  flex justify-start px-[4%] flex-col">
      <button onClick={()=>router.push("/Home/ADuser/MyAD/MyADdetail"+`?data=${encodeURIComponent(JSON.stringify(items))}`)} className="text-[white] bg-[#485C6D] mb-[20%] items-center text-center justify-center py-[0.6rem] px-[1rem] text-[1rem] rounded-md min-w-[8rem] mr-[2%] mt-[2%]">상세내역</button>
      <div className="w-full flex justify-end ">
       { items["확장자"]==="image"? <Icon_image className={"h-12 w-12 object-cover"}/>:<Icon_movie className={"h-12 w-12 object-cover"}/>  }
      </div> 
      </div>
  </div>
</div>
</>))}
</section>


<div className="w-full mt-[3%]">
<Pagination totalPages={Math.floor(contentsDatas2.length/10+1)} currentPage={page} onPageChange={setpage} pageLimit={5} />  
</div>


<div className=" grid grid-cols-1  bg-[#F0F0F0] lg:grid-cols-3  p-[2%] lg:gap-[2%] w-[96%] mt-[5%]">
  {userStatistics.map((item)=>item.state?(<>
    <div className=" h-[100%] rounded-md border flex flex-col justify-center border-[#CCCCCC] bg-white border-solid items-center">
      <div className="flex w-[96%]  text-lg justify-between px-[2%] font-extrabold"><p>{item.title}</p> {item.title==="광고 통계"?<p className="font-bold">*{formattedDate} 기준 </p>:""}</div>
      <div className="w-full  flex items-center justify-center">
{item.title==="회원 통계"?<BarAndLineChart/>:item.title==="광고 통계"?<StatisticsAD/>:item.title==="장애 통계"?<StackedBarChart/>:<div style={{zoom:0.7}}><BarAndLineChart/></div>}
       
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