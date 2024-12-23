"use client"
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import {stepNav as StepNav,stepTitle as StepTtile} from "../../../components/navigation/stepNav"
import PU from "../../../components/popup/popup"
import { Dialog, } from "@reach/dialog";
import CustomDialog from "../../../components/popup/popup";
import axios from "axios";
import { headers, headersIP, IP } from "../../../config/IP";
import { useRouter } from "next/navigation";
const Siteup=()=>{
const [user, setuser] = useState<any>({role:"user",name:"",birth:"",userId:"",phone:"",phoneAuth:"",email:"",bn:"",brn:"",industry:"",password:"",repassword:""})
const [admin,setadmin] =useState<any>({role:"admin",affiliation:"",name:"",birth:"",userId:"",phone:"",phoneAuth:"",email:"",password:"",repassword:""})
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
  industry:{type:"text",title:"업종을 입력해주세요.",place:"업종"},
  name:{type:"text",title:"이름을 입력해주세요.",place:"이름"},
  birth:{type:"number",title:"생년월일을 입력하세요.",place:"생년월일 8자리"},
  userId:{type:"text",title:"아이디를 입력해주세요.",place:"아이디"},
  phone:{type:"number",title:"휴대폰번호를 입력하세요.",place:"-없이 휴대폰번호 입력"},
  phoneAuth:{type:"number",title:"",place:"인증번호 입력"},
  email:{type:"email",title:"이메일을 입력해주세요.",place:"이메일"},
  password:{type:"password",title:"비밀번호를 입력해주세요.",place:"영문+숫자조합 8자리 이상"},
  repassword:{type:"password",title:"비밀번호를 재입력해주세요.",place:"비밀번호 재입력"}
})

const InputText=(typename:any,value:any)=>{
  setuser((prev:any)=>{return{...prev,[typename]:value}})
}  
const [showDialog, setShowDialog] = useState(false);
const openDialog = () => setShowDialog(true);
const closeDialog = () => setShowDialog(false);
const [digText, setdigText] = useState("")
const [selectRole, setselectRole] = useState("일반회원")
   
const router = useRouter()
const sendApi=()=>{

  let users ={
    "name": user.name,
    "dob": user.birth,
    "nickname": user.userId,
    "phonenumber": user.phone, // E.164 형식: +821012345678
    "email": user.email,
    "company": user.bn,
    "industry_type": user.brn,
    "company_id_number": user.industry, // 선택 사항
    "password": user.password,
    "user_type": selectRole==="일반회원"?"GENERAL":"OPERATOR" // GENERAL, ADMIN, OPERATOR
  }

  axios.post(IP+"/api/auth/register",{users},{headers:headers}).then((res: any)=>{
    if(res.data.result==="success"){
      alert("회원가입이 완료되었습니다.")
      router.push("/")
    }else{
      alert("회원가입에 실패했습니다. 다시시도하세요!")
    }
  })
}
   return (<>

    <div className="h-full w-[90%] mx-[5%] lg:w-[70%] lg:mx-[15%] my-[5%] flex flex-col justify-center items-center ">
<StepTtile title={"회원가입"} subtitle={"회원가입을 위해 본인인증이 필요합니다."} subtitlecolor={"#000000"}/>
      <StepNav list={["회원가입",selectRole]}/>
      <div className="w-full items-center  justify-center flex flex-row mt-[5%]">
<button onClick={()=>{
  setselectRole(()=>"일반회원")
}} className={`cursor-auto transition-all duration-300  min-w-[13rem] max-w-[19rem] text-lg font-bold ${selectRole==="일반회원"?"bg-[#000000] text-white":"bg-[#E3E3E3] text-[#555555]"} py-[0.8rem] rounded-sm`}>일반회원</button>
<button onClick={()=>{
  setselectRole(()=>"공공회원")
}} className={`cursor-auto transition-all duration-300 min-w-[200px] text-lg font-bold ${selectRole==="공공회원"?"bg-[#000000] text-white":"bg-[#E3E3E3] text-[#555555]"} py-[0.8rem] rounded-sm`}>공공회원</button>      
      </div>

      <div className="w-full bg-[#000000] h-[2px]"/> 
      <div className="w-[80%] mx-[10%] lg:w-[50%] lg:mx-[25%]  flex-col flex items-center justify-start">
      <div className="w-full flex flex-col items-center justify-center">
      {Object.keys(user).map((keys:any)=>userConvertList[keys]["type"]!=="none"&&(<>
      <div className="w-full font-bold  flex items-center text-xs pt-[3%] leading-[3rem]">
        
        {userConvertList[keys]["title"]}</div>
      <div className="w-full h-full justify-between flex flex-row items-center space-x-2">
            <input value={user[keys]} onChange={(e)=>InputText(keys,e.target.value)} type={userConvertList[keys]["type"]} placeholder={userConvertList[keys]["place"]} className="px-[1rem] w-full right-[0px] bottom-[0px] left-[0px] rounded-8xs focus:ring-2 focus:ring-inset focus:ring-[#1292F5] focus:outline-none border-lightgray-100 border-[1px] border-solid box-border h-[2rem] lg:h-[3rem]" />
    
      {keys==="userId"?(<><button onClick={()=>{
        setcheckbox((prev)=>{return{...prev,idOverlab:true}})
        setdigText(()=>"사용 가능한 아이디입니다!")
        openDialog()
      }} className={`px-[1rem] py-[0.5rem] lg:py-[1rem] w-full max-w-[5rem] rounded-sm ${checkbox.idOverlab?"text-[#A1A1A1] bg-[#F0F0F0]":"text-white bg-[#485C6D]"} text-nowrap text-xs font-medium `}>{checkbox.idOverlab?"확인완료":"중복확인"}</button></>):
      keys==="phone"?(<><button onClick={()=>{
        setdigText(()=>"인증을 요청하였습니다!")
        openDialog()
        showDialog
      }} className={`px-[1rem] py-[0.5rem] lg:py-[1rem] w-full max-w-[5rem] rounded-sm  text-nowrap text-xs font-medium text-white bg-[#485C6D]`}>전송</button></>):
      keys==="phoneAuth"?(<><button onClick={()=>{
        setcheckbox((prev)=>{return{...prev,phonetf:true}})
        setdigText(()=>"인증이 완료되었습니다!")
        openDialog()
      }} className={`px-[1rem] py-[0.5rem] lg:py-[1rem] w-full max-w-[5rem] rounded-sm ${checkbox.phonetf?"text-[#A1A1A1] bg-[#F0F0F0]":"text-white bg-[#485C6D]"} text-nowrap text-xs font-medium`}>{checkbox.phonetf?"인증완료":"인증"}</button></>)
    :(<></>)}  
      </div>

      
      </>))}
      </div>
      <div className="w-full  text-xs py-[1%] space-y-2 flex flex-row items-center justify-start pr-[2rem] text-center "><input className="px-4 " checked={checkbox.accept} onChange={(e)=>setcheckbox((prev)=>{return{...prev, accept:e.target.checked}})} type="checkbox"/>본인은 회원가입 과정과 광고 신청 관련 주요 안내사항을 문자 메시지 또는 이메일로 수신 하는 것에 동의합니다.</div>
      </div>
      
      <div className="w-full flex flex-row items-center justify-center">
      <button onClick={()=>sendApi()} className={` bg-gradient-to-r rounded-md hover:scale-110 from-[#0F8EFD] to-[#3DD87A] hover:bg-[#0F8EFD] text-white w-[10rem] lg:min-w-[14rem] z-[55] px-[2rem] py-[0.8rem] my-[5%]  font-medium }`}>가입요청</button>
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


export default Siteup