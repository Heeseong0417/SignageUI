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
import { GridInputText, GridContainer, GridItem, GridTitle, GridInputSelect, GridSlider, GridImageCheckbox, GridInputFile, GridCheckboxList, GridInputFileHorizontal, GridTitleBetween } from "../../../../components/table/grid";
import CustomDialogImage2 from "../../../../components/popup/popupImage2";
import DatePicker from "react-datepicker"

import 가로 from "../../../../public/contents/가로.png"
import 가로1_2 from "../../../../public/contents/가로1_2.png"
import 가로2_1 from "../../../../public/contents/가로2_1.png"
import 가로1_1 from "../../../../public/contents/가로1_1.png"
import 세로 from "../../../../public/contents/세로.png"
import 세로1_2 from "../../../../public/contents/세로1_2.png"
import 세로2_1 from "../../../../public/contents/세로2_1.png"
import 세로1_1 from "../../../../public/contents/세로1_1.png"
import VI from "../../../../public/icon_movie.svg"
import II from "../../../../public/icon_image.svg"
import AddFile from "../../../../public/contents/첨부파일.svg"

import 라이브러리선택 from "../../../../public/contents/라이브러리선택.png"
import { hasNoEmptyValues } from "../../../../config/tool";
import "react-datepicker/dist/react-datepicker.css";
import DialogLink from "../../../../components/popup/popuplink";
import { Bluebutton, Darkgraybutton } from "../../../../components/button/Button";
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
const [option, setoption] = useState<any>({site:"",client:"",contentsclass:"",name:"",contentstemplate:boxlist[0].title,optimization:contentslist[0].title,date:{},file1:[],file2:[],thumbnail1:[],thumbnail2:[]})



const InputText=(typename:any,value:any)=>{
  setuser((prev:any)=>{return{...prev,[typename]:value}})
}  
const router = useRouter()
const [showDialog, setShowDialog] = useState(false);
const [showDialog2, setShowDialog2] = useState("0");

const closeDialog = () => setShowDialog(false);
const closeDialog2 = () => setShowDialog2("0");
const [digText, setdigText] = useState("")
const [selectRole, setselectRole] = useState("일반회원")
const [Imagelist, setImagelist] = useState<any>([]);
const [Imagelist2, setImagelist2] = useState<any>([]);
const [thumbnail, setThumbnail] = useState([])
const [thumbnail2, setThumbnail2] = useState([])
const [DetailToggle, setDetailToggle] = useState(false)



const handleDateChange = (dates: [any, any]) => {
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

  // 종료 날짜가 없을 경우, 시작 날짜 기준으로 10일 후로 자동 설정
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

  // 종료 날짜가 있는 경우 범위를 확인
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

  }
};


const xy:any = {
  "세로":{btn1:"",btn2:"hidden"},
  "세로 1:1":{btn1:"top-[15%] left-[calc(50%_-)]",btn2:"top-[60%] left-[colc(50%_-)]"},
  "세로 1:2":{btn1:"top-[5%] left-[calc(50%_-)]",btn2:"top-[48%] left-[colc(50%_-)]"},
  "세로 2:1":{btn1:"top-[28%] left-[calc(50%_-)]",btn2:"bottom-[5%] left-[colc(50%_-)]"},
}

    return !DetailToggle?(<>
{(Imagelist[0]?.type)}

    <div className="h-full w-[90%] mx-[5%] lg:w-[70%] lg:mx-[15%] my-[5%] flex flex-col justify-center items-center ">
<StepTtile title={"콘텐츠 관리"} subtitle={"CONTENT MANAGEMENT"} subtitlecolor={"#1292F5"}/>
      <StepNav list={["콘텐츠운영","콘텐츠관리"]}/>

      <GridTitle title={"콘텐츠 생성"}/>
<GridContainer>
  <GridItem title={"사이트"}>
  <GridInputSelect defaultText={"사이트를 선택해 주세요."} onChange={(e: any)=>setoption((prev: any)=>{return{...prev,site:e}})} className={"w-[16rem]"} value={option.name}>
  <option  value={"콘텐츠1"}>콘텐츠1</option>
<option value={"콘텐츠2"}>콘텐츠2</option>
<option value={"콘텐츠3"}>콘텐츠3</option>
  </GridInputSelect>
  </GridItem>
  <GridItem title={"클라이언트"}>
  <GridInputSelect defaultText={"클라이언트를 선택해주세요."} onChange={(e: any)=>setoption((prev: any)=>{return{...prev,client:e}})}  className={"w-[16rem]"} value={option.name} >
  <option  value={"디스플레이1"}>디스플레이1</option>
<option value={"디스플레이2"}>디스플레이2</option>
<option value={"디스플레이3"}>디스플레이3</option>
    </GridInputSelect>
  </GridItem>
  <GridItem title={"콘텐츠 분류 선택"}>
  <GridInputSelect defaultText={"콘텐츠 분류를 선택해주세요."} onChange={(e: any)=>setoption((prev: any)=>{return{...prev,contentsclass:e}})}  className={"w-[16rem]"} value={option.name} >
  <option  value={"공익광고"}>공익광고</option>
<option value={"기업광고"}>기업광고</option>
<option value={"기타"}>기타</option>
</GridInputSelect>
  </GridItem>
  <GridItem title={"콘텐츠명"}>
  <GridInputText defaultText={"사이트를 선택해 주세요."} onChange={(e: any)=>setoption((prev: any)=>{return{...prev,name:e}})} placeholder="입력하세요." className={""} value={option.name}/>  
    </GridItem>

  <GridItem title={"콘텐츠 템플릿 설정"}>
    <div className="w-full h-full ">

<GridImageCheckbox checknum={"1"} classTitle={"text-xs"} classImage={"w-[4.8rem] h-[4.8rem] py-[0.2rem]"} className={"bg-[#C7C9CB]"} onChange={(e:any)=>setoption((prev: any)=>{return{...prev,contentstemplate:e}})} boxlist={boxlist}/>
    </div>
  </GridItem>
  <GridItem title={"라이브러리 선택"}>

    <GridInputFileHorizontal select_templete={option.contentstemplate} select_image={boxlist.find((find)=>find.title===option.contentstemplate)?.image} saveTumbnail1={setThumbnail} saveTumbnail2={setThumbnail2} saveFile1={setImagelist} saveFile2={setImagelist2}>

    </GridInputFileHorizontal>


   
  </GridItem>
  <GridItem title={"콘텐츠 최적화"}>
      <GridImageCheckbox checknum={"2"} onChange={(e:any)=>setoption((prev: any)=>{return{...prev,optimization:e}})} classImage={"p-[0.4rem]"} className={"bg-[#C7C9CB] h-[6rem] w-[5rem]"} boxlist={contentslist}/>
  </GridItem>
  <GridItem title={"기간 설정"}>
    
    <div className="w-full h-full flex-row">
  <div className="w-full h-full flex flex-row justify-start items-center">
  
  <DatePicker 
    showIcon={true} 
    className="min-w-[15rem]"
    placeholderText="날짜 선택"
    locale={ko}
    minDate={new Date()}
    selected={option.date.start} // 시작 날짜
    dateFormat="yyyy년MM월dd일"
    onChange={handleDateChange} // 날짜 변경 이벤트 핸들러
    startDate={option.date.start}
    selectsRange
    endDate={option.date.end}
           
/>
    
  
  {/**<GridCheckboxList checknum={"3"} onChange={(e: any)=>setoption((prev)=>{return{...prev,date:e}})} boxlist={
  
  [
    {title:"1개월",subtitle:"",image:Max},
    {title:"3개월",subtitle:"",image:Min},
    {title:"6개월",subtitle:"",image:Fix},
    {title:"12개월",subtitle:"",image:Fix}
    ]
  }

    ></GridCheckboxList>**/}
  </div>


</div>
    
  </GridItem>

</GridContainer>
<div className="flex flex-row w-full justify-end items-center mt-[2%] space-x-2">
      <Bluebutton onClick={()=>setShowDialog(()=>true)} className="bg-bgblue flex items-center justify-center cursor-pointer text-white px-[2rem] py-[0.4rem] text-center rounded-md">미리보기</Bluebutton> 
      <Darkgraybutton      
      onClick={()=>{
      if(hasNoEmptyValues(option)){
        setoption((prev: any)=>{return {...prev,file1:Imagelist,file2:Imagelist2,thumbnail1:thumbnail,thumbnail2:thumbnail2}})
     
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
      <CustomDialogImage2
        
        isOpen={showDialog}
        onClose={closeDialog}
        title={digText}
        ratio={boxlist.find((i: { title: string; })=>i.title===option.contentstemplate )?.["ratio"]}
        optimization={option.optimization}
        image1={thumbnail[0]}
        image2={thumbnail2[0]}
        content={option}

      />



     
    </div>
    
</>
      ):(<>
        <div className="h-full w-[90%] mx-[5%] lg:w-[70%] lg:mx-[15%] my-[5%] flex flex-col justify-center items-center ">
<StepTtile title={"콘텐츠 관리"} subtitle={"CONTENT MANAGEMENT"} subtitlecolor={"#1292F5"}/>
      <StepNav list={["콘텐츠운영","콘텐츠관리"]}/>

      <GridTitleBetween title={"상세내용보기"}>
      <div className="flex flex-row space-x-2">
      <Darkgraybutton onClick={()=>alert("수정")}>수정</Darkgraybutton>
      <Darkgraybutton onClick={()=>alert("수정")}>저장</Darkgraybutton> 
      </div>
              </GridTitleBetween>
<GridContainer>
  <GridItem title={"사이트"}>
<div className="text-[#004195] text-lg">{String(option.site)}</div>
  </GridItem>
  <GridItem title={"클라이언트"}>
<div className="text-[#004195] text-lg">{String(option.client)}</div>
  </GridItem>
  <GridItem title={"콘텐츠분류"}>
<div className="text-[#004195] text-lg">{String(option.contentsclass)}</div>
  </GridItem>

  <GridItem title={"콘텐츠템플릿"}>
<div className="text-[#004195] text-lg">



<section className="w-full h-full flex flex-row justify-between items-center font-bold">
<section className="py-[1rem] justify-center items-center flex flex-col">
           <div className="flex justify-center items-center flex-col ">
            <div className="relative flex items-center justify-center aspect-square bg-[rgb(191,213,233)] border-sm py-[1rem] px-[3rem]">
           <img className={`object-contain lg:w-[20rem] lg:h-[20rem] `} src={String(boxlist.find((f)=>f.title===option.contentstemplate)?.["image"].src)} alt={""}/>
           

           <label
              //htmlFor="fileInput"        
       
        className={` absolute ${xy[option.contentstemplate]["btn1"]} text-white px-4 py-2 max-w-[8rem] text-sm rounded-md `}>

          {option.file1?.[0].type==="video/mp4"? <VI className={`w-[4.5rem] h-[4.5rem]`}/>:<II className={`w-[4.5rem] h-[4.5rem]`}/>}
        </label>
        <label
              //htmlFor="fileInput2"        
               
        className={` absolute ${xy[option.contentstemplate]["btn2"]}  text-white px-4 py-2 max-w-[8rem] text-sm rounded-md `}>
          {option.file1?.[0].type==="video/mp4"? <VI className={`w-[4.5rem] h-[4.5rem]`}/>:<II className={`w-[4.5rem] h-[4.5rem]`}/>}
        </label>         
            </div>
            <div className="mt-[1rem] bg-black text-sm text-center w-[5rem] text-white px-[0.7rem] rounded-xl py-[0.3rem]">{option.contentstemplate}</div>
            </div>
            </section>  
            <section className="space-y-4  w-full h-full font-bold  flex flex-col items-center justify-center">
<div className=" w-[80%] px-[10%] flex space-x-4 flex-row justify-start items-center ">{option.file1?.[0].type==="video/mp4"? <VI className={`w-[4.5rem] h-[4.5rem]`}/>:<II className={`w-[4.5rem] h-[4.5rem]`}/>}<div className=" rounded-full p-2 justify-center items-center flex bg-[#E8E8E8]"><AddFile className={"w-6 h-6 "}/></div><p>{option.file1?.[0].name}</p></div>
<div className=" w-[80%] px-[10%] flex space-x-4 flex-row justify-start items-center ">{option.file2?.[0].type==="video/mp4"? <VI className={`w-[4.5rem] h-[4.5rem]`}/>:<II className={`w-[4.5rem] h-[4.5rem]`}/>}<div className=" rounded-full p-2 justify-center items-center flex bg-[#E8E8E8]"><AddFile className={"w-6 h-6 "}/></div><p>{option.file2?.[0].name}</p></div>
            </section>
</section>
</div>
  </GridItem>
  <GridItem title={"스케쥴"}>
<div className="text-[#004195] text-lg">일정 : {format(option.date.start, 'yyyy년 MM월 dd일')} ~ {format(option.date.end, 'yyyy년 MM월 dd일')}</div>
  </GridItem>
  </GridContainer>
  <div className="flex flex-row w-full justify-end items-center mt-[2%] space-x-2">
      <Bluebutton onClick={()=>setShowDialog2(()=>"1")} >게시</Bluebutton> 
      </div>
  </div>
  <DialogLink
        isOpen={showDialog2}
        onClose={closeDialog2}
        title={"신규콘텐츠가 게시되었습니다."}
        content={"신규콘텐츠가 게시되었습니다."}
        functions={()=>alert("게시실행")}

      />


      </>);
    };


export default Page