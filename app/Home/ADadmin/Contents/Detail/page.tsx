"use client"
import type { NextPage } from "next";
import Image from "next/image";
import { addDays, previousMonday } from 'date-fns'; // date-fns에서 날짜 계산을 위한 함수
import { enUS, ko } from 'date-fns/locale'; // `date-fns`에서 로케일 임포트
import { useEffect, useState } from "react";
import {stepNav as StepNav,stepTitle as StepTtile} from "../../../../../components/navigation/stepNav"
import PU from "../../../../../components/popup/popup"
import { Dialog, } from "@reach/dialog";
import CustomDialog from "../../../../../components/popup/popup";
import { useRouter } from "next/navigation";
import ad from "../../../../../public/adsample.jpeg"
import i2560 from "../../../../../public/800x2560.png"
import i1280 from "../../../../../public/800x1280.png"
import Fix from "../../../../../public/fixsize.svg"
import Min from "../../../../../public/minsize.svg"
import Max from "../../../../../public/maximize.svg"
import { DateRange, RangeKeyDict  } from 'react-date-range';
import { GridInputText, GridContainer, GridItem, GridTitle, GridInputSelect, GridSlider, GridImageCheckbox, GridInputFile, GridCheckboxList, GridInputFileHorizontal } from "../../../../../components/table/grid";
import CustomDialogImage2 from "../../../../../components/popup/popupImage2";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import 가로 from "../../../../../public/contents/가로.png"
import 가로1_2 from "../../../../../public/contents/가로1_2.png"
import 가로2_1 from "../../../../../public/contents/가로2_1.png"
import 가로1_1 from "../../../../../public/contents/가로1_1.png"
import 세로 from "../../../../../public/contents/세로.png"
import 세로1_2 from "../../../../../public/contents/세로1_2.png"
import 세로2_1 from "../../../../../public/contents/세로2_1.png"
import 세로1_1 from "../../../../../public/contents/세로1_1.png"
import 라이브러리선택 from "../../../../../public/contents/라이브러리선택.png"
const boxlist = 
[
  {title:"세로",subtitle:"",image:세로,ratio:[100,0]},
  {title:"세로 1:1",subtitle:"",image:세로1_1,ratio:[50,50]},
  {title:"세로 1:2",subtitle:"",image:세로1_2,ratio:[33.333,66.666]},
  {title:"세로 2:1",subtitle:"",image:세로2_1,ratio:[66.666,33.333]},
  {title:"가로",subtitle:"",image:가로,tf:false,ratio:[0,0]},
  {title:"가로 1:1",subtitle:"",image:가로1_1,tf:false,ratio:[0,0]},
  {title:"가로 1:2",subtitle:"",image:가로1_2,tf:false,ratio:[0,0]},
  {title:"가로 2:1",subtitle:"",image:가로2_1,tf:false,ratio:[0,0]}
  ]

  const contentslist = 
  [
    {title:"최대화",subtitle:"",image:Max},
    {title:"최소화",subtitle:"",image:Min},
    {title:"화면 맞춤",subtitle:"",image:Fix}
    ]
const Page=()=>{
const [user, setuser] = useState<any>({password:"",repassword:""

})
const [option, setoption] = useState({site:"",client:"",contentsclass:"",name:"",contentstemplate:boxlist[0].title,optimization:contentslist[0].title,date:"",datarange:[
  {
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: 'selection'
  }
]})



const InputText=(typename:any,value:any)=>{
  setuser((prev:any)=>{return{...prev,[typename]:value}})
}  
const router = useRouter()
const [showDialog, setShowDialog] = useState(false);
const openDialog = () => setShowDialog(true);
const closeDialog = () => setShowDialog(false);
const [digText, setdigText] = useState("")
const [selectRole, setselectRole] = useState("일반회원")
const [Imagelist, setImagelist] = useState<any[]>([]);
const [Imagelist2, setImagelist2] = useState<any[]>([]);
const [date_range, setdate_range] = useState([
  {
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: 'selection'
  }
]);



    return (<>

    <div className="h-full w-[90%] mx-[5%] lg:w-[70%] lg:mx-[15%] my-[5%] flex flex-col justify-center items-center ">
<StepTtile title={"콘텐츠 관리"} subtitle={"CONTENT MANAGEMENT"} subtitlecolor={"#1292F5"}/>
<StepNav list={["콘텐츠운영","콘텐츠관리"]}/>

      <GridTitle title={"상세내용보기"}/>
<GridContainer>
  <GridItem title={"사이트"}>
  <GridInputSelect defaultText={"사이트를 선택해 주세요."} onChange={(e: any)=>setoption((prev)=>{return{...prev,site:e}})} className={"w-[16rem]"} value={option.name}>
  <option  value={"콘텐츠1"}>콘텐츠1</option>
<option value={"콘텐츠2"}>콘텐츠2</option>
<option value={"콘텐츠3"}>콘텐츠3</option>
  </GridInputSelect>
  </GridItem>
  <GridItem title={"클라이언트"}>
  <GridInputSelect defaultText={"클라이언트를 선택해주세요."} onChange={(e: any)=>setoption((prev)=>{return{...prev,client:e}})}  className={"w-[16rem]"} value={option.name} >
  <option  value={"콘텐츠1"}>콘텐츠1</option>
<option value={"콘텐츠2"}>콘텐츠2</option>
<option value={"콘텐츠3"}>콘텐츠3</option>
    </GridInputSelect>
  </GridItem>
  <GridItem title={"콘텐츠 분류 선택"}>
  <GridInputSelect defaultText={"콘텐츠 분류를 선택해주세요."} onChange={(e: any)=>setoption((prev)=>{return{...prev,contentsclass:e}})}  className={"w-[16rem]"} value={option.name} >
  <option  value={"콘텐츠1"}>콘텐츠1</option>
<option value={"콘텐츠2"}>콘텐츠2</option>
<option value={"콘텐츠3"}>콘텐츠3</option>
</GridInputSelect>
  </GridItem>
  <GridItem title={"콘텐츠명"}>
  <GridInputText defaultText={"사이트를 선택해 주세요."} onChange={(e: any)=>setoption((prev)=>{return{...prev,name:e}})} placeholder="입력하세요." className={""} value={option.name}/>  
    </GridItem>

  <GridItem title={"콘텐츠 템플릿 설정"}>
    <div className="w-full h-full ">

<GridImageCheckbox checknum={"1"} classTitle={"text-xs"} classImage={"w-[4.8rem] h-[4.8rem] py-[0.2rem]"} className={"bg-[#C7C9CB]"} onChange={(e:any)=>setoption((prev)=>{return{...prev,contentstemplate:e}})} boxlist={boxlist}/>
    </div>
  </GridItem>
  <GridItem title={"라이브러리 선택"}>

    <GridInputFileHorizontal select_templete={option.contentstemplate} select_image={boxlist.find((find)=>find.title===option.contentstemplate)?.image} saveFile={setImagelist} saveFile2={setImagelist2}></GridInputFileHorizontal>


   
  </GridItem>
  <GridItem title={"콘텐츠 최적화"}>


  <GridImageCheckbox checknum={"2"} onChange={(e:any)=>setoption((prev)=>{return{...prev,optimization:e}})} classImage={"p-[0.4rem]"} className={"bg-[#C7C9CB] h-[6rem] w-[5rem]"} boxlist={contentslist}/>
  </GridItem>
  <GridItem title={"기간 설정"}>

    <div className="w-full h-full flex-row">
  <div className="w-full h-full flex-row justify-between">
    <input type="date" onChange={(e)=>setoption((prev)=>{return{...prev,date:e.target.value}})}/>
  <GridCheckboxList onChange={(e: any)=>setoption((prev)=>{return{...prev,date:e}})} boxlist={
  
  [
    {title:"1개월",subtitle:"",image:Max},
    {title:"3개월",subtitle:"",image:Min},
    {title:"6개월",subtitle:"",image:Fix},
    {title:"12개월",subtitle:"",image:Fix}
    ]}

    ></GridCheckboxList> 
  </div>


</div>
    
  </GridItem>

</GridContainer>
<button
     onClick={()=>setShowDialog(()=>true)}
     className="my-2 px-4 py-1 min-w-[5rem] bg-[#1292F5] text-white rounded shadow hover:bg-blue-600"
   >
     확인
   </button>   

 
          </div>
    <div className="p-8">
      {/* 버튼 */}


      {/* 다이얼로그 */}
      <CustomDialogImage2
     
        isOpen={showDialog}
        onClose={closeDialog}
        title={digText}
        ratio={boxlist.find((i: { title: string; })=>i.title===option.contentstemplate )?.["ratio"]}
        optimization={option.optimization}
        image1={Imagelist[0]}
        image2={Imagelist2[0]}
        content=""
      />



     
    </div>
    
</>
      );
    };


export default Page