"use client"
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import {stepNav as StepNav,stepTitle as StepTtile} from "../../../components/navigation/stepNav"
import PU from "../../../components/popup/popup"
import { Dialog, } from "@reach/dialog";
import CustomDialog from "../../../components/popup/popup";
import { useRouter } from "next/navigation";

const Page=()=>{
const [user, setuser] = useState<any>({password:"",repassword:""

})
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
    return (<>

    <div className="h-full w-[90%] mx-[5%] lg:w-[70%] lg:mx-[15%] my-[5%] flex flex-col justify-center items-center ">
<StepTtile title={"비밀번호 변경"} subtitle={"회원님의 비밀번호를 새롭게 변경합니다."} subtitlecolor={"#000000"}/>
      <StepNav list={["비밀번호 변경"]}/>


      <div className="w-full bg-[#000000] h-[2px]"/> 
      <div className="w-[80%] mx-[10%] lg:w-[50%] lg:mx-[25%] flex-col flex items-center justify-start">
      <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full h-full justify-between flex pt-[3%] flex-row items-center space-x-2">
      <div className="w-full flex flex-row font-bold flex items-center text-xs pt-[3%] leading-[3rem]">
        
        아이디</div>
        <div className="w-full bg-[#E9F6FF] text-[#004195] py-[0.7rem] px-[2rem] flex flex-row text-center justify-center text-sm font-bold">아이디샘플</div>
        </div>
      <div className="h-[1px] bg-black w-full"/>
      {Object.keys(user).map((keys:any)=>userConvertList[keys]["type"]!=="none"&&(<>
      <div className="w-full font-bold flex items-center text-xs pt-[3%] leading-[3rem]">
        
        {userConvertList[keys]["title"]}</div>
      <div className="w-full h-full justify-between flex flex-row items-center space-x-2">
            <input value={user[keys]} onChange={(e)=>InputText(keys,e.target.value)} type={userConvertList[keys]["type"]} placeholder={userConvertList[keys]["place"]} className="px-[1rem] w-full right-[0px] bottom-[0px] left-[0px] rounded-8xs focus:ring-2 focus:ring-inset focus:ring-[#1292F5] focus:outline-none border-lightgray-100 border-[1px] border-solid box-border h-[2rem] lg:h-[3rem]" />
    
      {keys==="userId2"?(<><button onClick={()=>{
        setcheckbox((prev)=>{return{...prev,idOverlab:true}})
        setdigText(()=>"사용 가능한 아이디입니다!")
        openDialog()
      }} className={`px-[1rem] py-[0.5rem] lg:py-[1rem] w-full max-w-[5rem] rounded-sm ${checkbox.idOverlab?"text-[#A1A1A1] bg-[#F0F0F0]":"text-white bg-[#485C6D]"} text-nowrap text-xs font-medium `}>{checkbox.idOverlab?"확인완료":"중복확인"}</button></>):
      keys==="phone"?(<><button onClick={()=>{
        setdigText(()=>"인증을 요청하였습니다!")
        
        openDialog()
        showDialog
      }} className={`px-[1rem] py-[0.5rem] lg:py-[1rem] w-full max-w-[5rem] rounded-sm  text-nowrap text-xs font-medium text-white bg-[#485C6D]`}>중복확인</button></>):
      keys==="phoneAuth"?(<><button onClick={()=>{
        setcheckbox((prev)=>{return{...prev,phonetf:true}})
        setdigText(()=>"인증이 완료되었습니다!")
        openDialog()
      }} className={`px-[1rem] py-[0.5rem] lg:py-[1rem] w-full max-w-[5rem] rounded-sm ${checkbox.phonetf?"text-[#A1A1A1] bg-[#F0F0F0]":"text-white bg-[#485C6D]"} text-nowrap text-xs font-medium`}>{checkbox.phonetf?"인증완료":"인증"}</button></>)
    :(<></>)}  
      </div>

      
      </>))}
      </div>
     
      </div>
      
      <div className="w-full flex flex-row items-center justify-center">
      <button onClick={()=>{
        setdigText(()=>"비밀번호를 잘못 입력하셨습니다.\n 다시확인해주세요!")
        openDialog()
        }} className={` bg-gradient-to-r rounded-md hover:scale-110 from-[#0F8EFD] to-[#3DD87A] hover:bg-[#0F8EFD] text-white w-[10rem] lg:min-w-[14rem] z-[55] px-[2rem] py-[0.8rem] my-[5%]  font-medium }`}>비밀번호 변경</button>
      
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