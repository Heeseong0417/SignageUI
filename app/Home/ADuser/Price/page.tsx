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
import PT from "../../../../components/table/priceTable"
const Page=()=>{
const [user, setuser] = useState<any>({password:"",repassword:""

})
const [ADslot, setADslot] = useState({header:["시작시간","종료시간",]})
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
const [showDialog, setShowDialog] = useState(false);
const openDialog = () => setShowDialog(true);
const closeDialog = () => setShowDialog(false);
const [digText, setdigText] = useState("")
const [selectRole, setselectRole] = useState("일반회원")
const   advertisementGuidelines= [
  "광고 신청은 '회원가입'부터 하신 후 로그인하셔야 합니다.",
  "광고 게시 시간은 매일 06-24시이며, 1구좌 당 15초씩 표출됩니다. (차도측은 30초씩 표출)",
  "신규 광고 게시 시작일은 매월 1일이며 전월 20일까지 신청 가능합니다.",
  "광고 기간 및 게시는 단기 10일, 장기 1/3/6/12개월로 광고 신청하실 수 있습니다.",
  "광고 게시는 광고 내용 검토를 거친 후 '이메일'과 '문자' 전송으로 통보하여 드립니다.",
  "광고 신청 비용 중 수수료는 세금계산서 발행 항목에서 제외됩니다.",
  "라이브러리를 통해 광고 인증 사진 요청 시 표출 중 사진을 '이메일'과 '문자'로 전달드립니다.",
  "단, 단기 광고(10일)에 한해서는 광고 게시 보고 사진은 전달드리지 않사오니 양해 바랍니다.",
  "정해진 기간 내 광고료를 입금하지 않으면 다음 차례 광고주로 넘어갑니다.",
  "단기/장기 기간 및 금액은 월수(28~31일)에 상관없이 동일합니다.",
  "세금계산서는 신청 시 등록된 사업자등록번호로만 발행하며, 발행 일자는 게시 시작일 기준입니다.",
  "옥외광고물 등의 관리와 옥외광고산업 진흥에 관한 법률 제 5조에 규정한 금지광고물, 특정 개인 또는 단체를 비방하는 목적의 광고, 기타 공중도덕이나 사회윤리를 침해할 우려가 있는 광고 등은 광고 송출이 불가합니다.",
  "광고 신청 접수 시 자체 제작 이미지, 동영상을 업로드하여 주시기 바랍니다.",
  "자체 이미지 사용으로 인한 지적재산권 침해는 광고주에게 책임이 있습니다."
]
    return (<>

    <div className="h-full w-[90%] mx-[5%] lg:w-[70%] lg:mx-[15%] my-[5%] flex flex-col justify-center items-center ">
<StepTtile title={"광고단가 및 약관 안내"} subtitle={"AD POLICY GUIDE"} subtitlecolor={"#1292F5"}/>
      <StepNav list={["옥외광고","광고단가 및 약관 안내"]}/>



  <div className="w-full flex flex-col justify-start items-center space-x-2">
    
<p className="w-full font-bold text-[1.7rem] flex flex-row items-center">하남시 DOOH 운영 조건 및 단가</p>
<PT/>
<div className=" text-nowrap border-2 border-black rounded-sm border-spacing-2 font-bold text-[1.7rem] bg-red-500"></div>
</div>

  <div className="w-full py-[5%] flex flex-col justify-start items-start text-start">
   {advertisementGuidelines.map((item)=>(<>
<p className="w-full text-start flex flex-row m-0 p-0 text-xs leading-[1.5rem]">• {item}</p>
</>))} 
  </div>

 
          </div>
    <div className="p-8">
      {/* 버튼 */}


      {/* 다이얼로그 */}
      <CustomDialog
        isOpen={showDialog}
        onClose={closeDialog}
        title={digText}
        content=""
      />



     
    </div>
    
</>
      );
    };


export default Page