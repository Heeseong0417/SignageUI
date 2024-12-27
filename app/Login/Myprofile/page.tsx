"use client"
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import {stepNav as StepNav,stepTitle as StepTtile} from "../../../components/navigation/stepNav"
import PU from "../../../components/popup/popup"
import { Dialog, } from "@reach/dialog";
import CustomDialog from "../../../components/popup/popup";
import { getAuthData } from "../../../config/cookies";
import { headersIP, IP } from "../../../config/IP";
import axios from "axios";
import { useRouter } from "next/navigation";
const Siteup=()=>{

const [user, setuser] = useState<any>({role:"",date:"2024년 10월 30일",affiliation:"",name:"",birth:"1989년 10월 12일",userId:"",phone:"",phoneAuth:"",email:"",password:"",repassword:""})
//const [changeProfile_user, setchangeProfile_user] = useState({phone:"",email:"",bn:"",brn:"",inderstry:""})
const [changeProfile_admin, setchangeProfile_admin] = useState({phone:"",email:"",bn:"",brn:"",inderstry:""})

const [changeProfile, setchangeProfile] = useState<any>({role:"",affiliation:"",name:"",birth:"",userId:"",phone:"", email:"",bn:"",brn:"",inderstry:""})
const [changePassword, setchangePassword] = useState<any>({password:"",repassword:""})


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
/** 
const [userConvertList, setuserConvertList] = useState<any>({
  role:{type:"none",title:"소속을 입력해주세요.",place:"소속"},
  affiliation:{type:"text",title:"소속을 입력해주세요.",place:"소속"},
  inderstry:{type:"text",title:"업종을 입력해주세요.",place:"소속"},
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
*/
const [userConvertList, setUserConvertList] = useState<any>({
  company: { type: "text", title: "회사명을 입력해주세요.", place: "회사명" },
  company_id_number: { type: "text", title: "회사 ID 번호를 입력해주세요.", place: "회사 ID 번호" },
  created_at: { type: "date", title: "가입일", place: "생성 날짜" },
  department: { type: "text", title: "부서", place: "부서" },
  dob: { type: "date", title: "생년월일", place: "YYYY-MM-DD" },
  email: { type: "email", title: "이메일", place: "이메일" },
  id: { type: "number", title: "사용자 ID", place: "ID" },
  industry_type: { type: "text", title: "업종", place: "업종" },
  is_active: { type: "checkbox", title: "활성화 상태", place: "" },
  last_login: { type: "date", title: "마지막 로그인 날짜", place: "마지막 로그인" },
  name: { type: "text", title: "이름", place: "이름" },
  nickname: { type: "text", title: "닉네임", place: "닉네임" },
  phone_number: { type: "text", title: "휴대폰 번호", place: "- 없이 번호 입력" },
  role: { type: "text", title: "역할", place: "역할" },
  updated_at: { type: "date", title: "업데이트 날짜", place: "업데이트 날짜" },
  user_type: { type: "text", title: "사용자 유형", place: "사용자 유형" },
  password:{type:"password",title:"비밀번호를 입력해주세요.",place:"영문+숫자조합 8자리 이상"},
  repassword:{type:"password",title:"비밀번호를 재입력해주세요.",place:"비밀번호 재입력"}
});
const InputText=(typename:any,value:any)=>{
  setchangeProfile_user((prev:any)=>{return{...prev,[typename]:value}})
}  
const InputText2=(typename:any,value:any)=>{
  setpassword((prev:any)=>{return{...prev,[typename]:value}})
}  
const [showDialog, setShowDialog] = useState(false);
const openDialog = () => setShowDialog(true);
const closeDialog = () => setShowDialog(false);
const [digText, setdigText] = useState("")
const [selectRole, setselectRole] = useState("회원정보 변경")
const [password, setpassword] = useState<any>({
  "password":"" ,
  "repassword":""
})
const [changeProfile_user, setchangeProfile_user] = useState<any>(
{
    "company": "string",
    "company_id_number": "string",
    "created_at": "2024-12-26T23:25:54.711Z",
    "department": "string",
    "dob": "2024-12-26",
    "email": "string",
    "id": 0,
    "industry_type": "string",
    "is_active": true,
    "last_login": "2024-12-26T23:25:54.711Z",
    "name": "string",
    "nickname": "string",
    "phone_number": "string",
    "role": "string",
    "updated_at": "2024-12-26T23:25:54.711Z",
    "user_type": "USER"
  
})

const allowedKeys = [
  "created_at",  // 가입일
  "dob",         // 생년월일
  "phone_number",       // 휴대폰
  "email",       // 이메일
  "company",          // 사업자명
  "company_id_number",         // 사업자번호
  "industry_type" // 업종
];
const passwordkey=[
"password",
"repassword"
]
const router = useRouter()
const sendApi=()=>{


  const auth = getAuthData()

  axios.get(IP+"/api/users/user_detail/"+auth.userId,{headers:headersIP(auth.accessToken)}).then((res: any)=>{
  
    if(res.data.result==="success"){

      setchangeProfile_user(()=>res.data?.user_info)
    }else{
      //alert("데이터 로드 실패")
    }
  }).catch((error)=>{
    //alert("데이터 로드 실패")
  })
}

const changeUserApi=()=>{
  const auth = getAuthData()
  const pw = {
  "new_password":password.password ,
  "nickname": changeProfile_user.nickname
}
if (password.password===password.repassword){
axios.post(IP+"/api/auth/change_pw/"+auth.userId,pw,{headers:headersIP(auth.accessToken)}).then((res: any)=>{

  if(res.data.result==="success"){

  alert("회원정보 변경이 완료되었습니다.")
  router.push("/")
  }else{
    alert("회원정보 변경에 실패하였습니다. 다시시도해주세요!")
  }
}).catch((error)=>{
  alert("데이터 로드 실패")
})   

}else{
alert("비밀번호와 비밀번호 확인값이 일치하지않습니다. 다시작성해주세요!")
}



}
const changePasswordApi=()=>{
  const auth = getAuthData()
    const pw = {
    "new_password":password.password ,
    "nickname": changeProfile_user.nickname
  }
  if (password.password===password.repassword){
  axios.post(IP+"/api/auth/change_pw/"+auth.userId,pw,{headers:headersIP(auth.accessToken)}).then((res: any)=>{
  
    if(res.data.result==="success"){

    alert("회원정보 변경이 완료되었습니다.")
    router.push("/")
    }else{
      alert("회원정보 변경에 실패하였습니다. 다시시도해주세요!")
    }
  }).catch((error)=>{
    alert("데이터 로드 실패")
  })   
 
}else{
  alert("비밀번호와 비밀번호 확인값이 일치하지않습니다. 다시작성해주세요!")
}

 

}

useEffect(() => {
  
  sendApi()
  return () => {
    
  }
}, [])



    return (<>

    <div className="h-full w-[90%] mx-[5%] lg:w-[70%] lg:mx-[15%] my-[5%] flex flex-col justify-center items-center ">
<StepTtile title={"내 정보"} subtitle={"내 정보를 변경하거나 최신화 합니다."} subtitlecolor={"#000000"}/>
      <StepNav list={["내정보",selectRole]}/>
      <div className="w-full items-center  justify-center flex flex-row mt-[5%]">
<button onClick={()=>{
  setselectRole(()=>"회원정보 변경")
}} className={`cursor-auto transition-all duration-300  min-w-[13rem] max-w-[19rem] text-lg font-bold ${selectRole==="회원정보 변경"?"bg-[#000000] text-white":"bg-[#E3E3E3] text-[#555555]"} py-[0.8rem] rounded-sm`}>회원정보 변경</button>
<button onClick={()=>{
  setselectRole(()=>"비밀번호 변경")
}} className={`cursor-auto transition-all duration-300 min-w-[200px] text-lg font-bold ${selectRole==="비밀번호 변경"?"bg-[#000000] text-white":"bg-[#E3E3E3] text-[#555555]"} py-[0.8rem] rounded-sm`}>비밀번호 변경</button>      
      </div>

      <div className="w-full bg-[#000000] h-[2px]"/> 

      {selectRole==="회원정보 변경"?<div className="w-[80%] mx-[10%] lg:w-[50%] lg:mx-[25%]  flex-col flex items-center justify-start">
      <div className="w-full flex flex-col items-center justify-center">
      {Object.keys(changeProfile).map((item:any)=>(<>
      
      
      </>))}
      <div className="w-full font-bold justify-between flex items-center text-xs pt-[3%] leading-[3rem]">
        <div className="w-full h-full items-center flex justify-around">
        <div className="flex space-x-2 items-center w-full justify-center">
          <span className="bg-[#62A0D6] rounded-xl px-5 py-3 text-lg text-white font-bold">
          {changeProfile_user.user_type==="USER"?"일반회원":"관리자"}</span>
          <span className="font-bold text-xl">{changeProfile_user.name}님.</span>
          </div>

          <div className="flex space-x-2 items-center w-full justify-center">
              <div className="h-10 bg-[#BCBCBC] w-[0.2px] mr-5"/>
              <span className="text-lg font-bold">
            등급
          </span>
          <span className="bg-[#004195] rounded-full px-4 py-1 text-lg text-white font-bold">
          {changeProfile_user.user_type==="USER"?"일반회원":"관리자"}
          </span>  
          </div>
      

          
        </div>
        <div>

        </div>
      </div>
      {Object.keys(changeProfile_user)
  .filter((key: any) => allowedKeys.includes(key) && userConvertList[key]["type"] !== "none")
  .map((key: any) => (
    <>
      <div className="w-full font-bold flex items-center text-xs pt-[3%] leading-[3rem]">
        {userConvertList[key]["title"]}
      </div>
      <div className="w-full h-full justify-between flex flex-row items-center space-x-2">
        <input
          value={changeProfile_user[key].split('T')[0]}
          onChange={(e) => InputText(key, e.target.value)}
          type={userConvertList[key]["type"]}
          placeholder={userConvertList[key]["place"]}
          className="px-[1rem] w-full right-[0px] bottom-[0px] left-[0px] rounded-8xs focus:ring-2 focus:ring-inset focus:ring-[#1292F5] focus:outline-none border-lightgray-100 border-[1px] border-solid box-border h-[2rem] lg:h-[3rem]"
        />

        {/* 특정 키에 대한 버튼 추가 */}
        {key === "phone" ? (
          <button
            onClick={() => {
              setdigText(() => "인증을 요청하였습니다!");
              openDialog();
            }}
            className="px-[1rem] py-[0.5rem] lg:py-[1rem] w-full max-w-[5rem] rounded-sm text-nowrap text-xs font-medium text-white bg-[#485C6D]"
          >
            전송
          </button>
        ) : key === "phoneAuth" ? (
          <button
            onClick={() => {
              setcheckbox((prev) => ({ ...prev, phonetf: true }));
              setdigText(() => "인증이 완료되었습니다!");
              openDialog();

            }}
            className={`px-[1rem] py-[0.5rem] lg:py-[1rem] w-full max-w-[5rem] rounded-sm ${
              checkbox.phonetf ? "text-[#A1A1A1] bg-[#F0F0F0]" : "text-white bg-[#485C6D]"
            } text-nowrap text-xs font-medium`}
          >
            {checkbox.phonetf ? "인증완료" : "인증"}
          </button>
        ) : null}
      </div>
    </>
  ))}
      </div>
      
      </div>:(<>
      
        {Object.keys(password)
  
  .map((key: any) => (
    <>
      <div className="w-full font-bold flex items-center text-xs pt-[3%] leading-[3rem]">
        {userConvertList[key]["title"]}
      </div>
      <div className="w-full h-full justify-between flex flex-row items-center space-x-2">
        <input
          value={password[key]}
          onChange={(e) => InputText2(key, e.target.value)}
          type={userConvertList[key]["type"]}
          placeholder={userConvertList[key]["place"]}
          className="px-[1rem] w-full right-[0px] bottom-[0px] left-[0px] rounded-8xs focus:ring-2 focus:ring-inset focus:ring-[#1292F5] focus:outline-none border-lightgray-100 border-[1px] border-solid box-border h-[2rem] lg:h-[3rem]"
        />

        {/* 특정 키에 대한 버튼 추가 */}
        {key === "phone" ? (
          <button
            onClick={() => {
              setdigText(() => "인증을 요청하였습니다!");
              openDialog();
            }}
            className="px-[1rem] py-[0.5rem] lg:py-[1rem] w-full max-w-[5rem] rounded-sm text-nowrap text-xs font-medium text-white bg-[#485C6D]"
          >
            전송
          </button>
        ) : key === "phoneAuth" ? (
          <button
            onClick={() => {
              setcheckbox((prev) => ({ ...prev, phonetf: true }));
              setdigText(() => "인증이 완료되었습니다!");
              openDialog();

            }}
            className={`px-[1rem] py-[0.5rem] lg:py-[1rem] w-full max-w-[5rem] rounded-sm ${
              checkbox.phonetf ? "text-[#A1A1A1] bg-[#F0F0F0]" : "text-white bg-[#485C6D]"
            } text-nowrap text-xs font-medium`}
          >
            {checkbox.phonetf ? "인증완료" : "인증"}
          </button>
        ) : null}
      </div>
    </>
  ))}
      </>)}
  
      <div className="w-full flex flex-row items-center justify-center">
      <button onClick={()=>selectRole==="회원정보 변경"?{}:changePasswordApi()} className={` bg-gradient-to-r rounded-md hover:scale-110 from-[#0F8EFD] to-[#3DD87A] hover:bg-[#0F8EFD] text-white w-[10rem] lg:min-w-[14rem] z-[55] px-[2rem] py-[0.8rem] my-[5%]  font-medium }`}>{selectRole==="회원정보 변경"?"변경내용 저장":"비밀번호변경하기"}</button>
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