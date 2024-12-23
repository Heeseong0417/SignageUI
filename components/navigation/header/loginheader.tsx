"use client"

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthData, setAuthData } from "../../../tool/redux/slice";
import { getAuthData, removeAuthData } from "../../../config/cookies";

const Header= ({children}:any)=>{
  const [user, setuser] = useState<any>({user_type:null})
  const menu = [
    {title:"대시보드",link:"/Home/data",sub:[]},
    {title:"옥외광고",link:"/Home/data",sub:[{title:"광고소개",link:"/Home/data"},{title:"광고단가 및 약관안내",link:"/Home/data"},{title:"광고신청",link:"/Home/data"}]},
    {title:"빅데이터",link:"/Home/data",sub:[]},
    {title:"내 광고",link:"/Home/data",sub:[]},
    {title:"커뮤니티",link:"/Home/data",sub:[{title:"공지사항",link:""},{title:"Q&A 게시판",link:""}]}
  ]
  const ADMINmenu = [
    {title:"대시보드",link:"/Home/data",sub:[{title:"돌아가기",link:"/"}]},
    {title:"콘텐츠운영",link:"/Home/data",sub:[{title:"스케쥴러",link:"/Home/data"},{title:"광고관리",link:"/Home/data"},{title:"콘텐츠관리",link:"/Home/data"}]},
    {title:"빅데이터",link:"/Home/data",sub:[]},
    {title:"시스템관리",link:"/Home/data",sub:[{title:"유저관리",link:"/Home/data"},{title:"사이트관리",link:"/Home/data"},{title:"매출관리",link:"/Home/data"},{title:"로그관리",link:"/Home/data"},{title:"광고안내관리",link:"/Home/data"}]},
    {title:"커뮤니티",link:"/Home/data",sub:[{title:"공지사항",link:""},{title:"Q&A 게시판",link:""}]}
  ]





  const [SelectItems, setSelectItems] = useState("홈")
  const router = useRouter()
  const [menutoggle, setmenutoggle] = useState(false)
  const dispatch = useDispatch();
  const userdata = getAuthData()
  const [toggle_user, settoggle_user] = useState(false)
  //let auth = useSelector((state:any) => state.auth);

  const handleLoginUser = () => {
    
    settoggle_user(!toggle_user)
    
    let tf = toggle_user
    setuser((prev: any)=>{return{...prev,userId:tf?"ADMIN":"user"}})
    // 로그인 성공 후 데이터를 저장
    dispatch(
      setAuthData({
        token: 'example-token',
        refreshToken: 'example-refresh-token',
        userId: 'user123',
        role:tf?"ADMIN":"user"
      })
    );
  };
  
  const handleLoginAdmin = () => {
    // 로그인 성공 후 데이터를 저장
    dispatch(
      setAuthData({
        token: 'example-token',
        refreshToken: 'example-refresh-token',
        userId: 'user123',
        role:"user"
      })
    );
  };
  const handleLogout = () => {
    
    // 로그아웃 시 데이터 초기화
    //dispatch(clearAuthData());
    //alert("dfdfdf")
    //setuser(()=>{return {role:null,userId:null}})
    removeAuthData()
    setuser({user_type:null})
    router.replace("/")
  };

  useEffect(() => {
    //handleLoginAdmin(); // 컴포넌트가 마운트될 때 로그인 처리

    // auth가 업데이트될 때마다 user 상태 업데이트
  }, [userdata]); // 이곳에서 dispatch만 의존성 배열에 넣을 수 있음, 로그인 처리 자체는 여기서 실행

  useEffect(() => {
    // auth 값이 변경될 때마다 setUser 업데이트
    let auth = getAuthData()
  
      setuser(auth); // auth 데이터를 user 상태에 반영
    
  
  }, []); // auth가 변경될 때마다 실행
  
  const clickMenu = (logintf:any,link:any)=>{
    if (user?.user_type==="ADMIN"||user?.user_type==="GENERAL"||user?.user_type==="OPERATOR" || logintf===false){
      setSelectItems(()=>"홈")
    setmenutoggle(()=>false)
    router.push(link)    
    }else{
 alert("로그인이 필요한 서비스입니다!")
    }

  }

  
    return(<>
    <header className="">
     <div className="h-[4.25rem]  flex items-center justify-between w-[90%] px-[5%] lg:w-[70%] lg:mx-[15%] flex-row">

 <div onClick={()=>router.push("/")} className=" cursor-pointer mx-2 flex flex-col lg:flex-row  items-center ">
            <Image
              className="w-[calc(100%_-_5.3px)]  max-w-full overflow-hidden max-h-full"
              width={99}
              height={26}
              alt=""
              src="/logo.svg"
            />
                <Image
              className="hidden w-[1rem] pt-1 lg:flex items-center justify-center mx-4 overflow-hidden max-h-full"
              width={5}
              height={5}
              alt=""
              src="/blit-01.svg"
            />
            <p className=" lg:text-nowrap font-bold text-[0.6rem] pt-[0.1rem] lg:text-[1.25rem]">빅데이터 기반스마트 옥외광고</p>
            <div className={`flex-nowrap max-w-[3rem] min-w-[3rem] hidden lg:flex ml-4 justify-center rounded-xl px-1 py-1 text-xs bg-black text-white ${user?.user_type==="ADMIN"?"":"lg:hidden"}`}>{user?.user_type==="ADMIN"?"관리자":""}</div>             
          </div>
          <div className={`flex-nowrap max-w-[3rem] absolute left-[45%] sm:left-[27%] lg:hidden lg:none rounded-xl px-1 py-1 text-xs bg-black text-white ${user?.user_type==="ADMIN"?"":"hidden"}`}>{user?.user_type==="ADMIN"?"관리자":""}</div>           
          <div className=" justify-end lg:justify-between flex lg:text-[1rem] space-x-3 lg:space-x-6 text-xs md:text-base text-dimgray-200 min-w-[10rem] lg:ml-20">
            <div className=" lg:flex items-center space-x-1 lg:space-x-2 cursor-pointer">
              <Image
                src="/person.svg"
                width={18}
                height={18}
                alt="Profile Icon"
                className="h-4 w-4 lg:h-5 lg:w-5"
              />
              <span onClick={()=>user?.userId?clickMenu(true,"/Login/Myprofile"):clickMenu(false,"/Login/Siteup")} className="text-xs lg:text-sm font-extrabold text-nowrap">{user?.userId?"내 정보":"회원가입"}</span>
            </div>
            <div className=" lg:flex items-center space-x-1 lg:space-x-2 cursor-pointer">
              <Image
                src="/rockon.svg"
                width={17}
                height={17}
                alt="Logout Icon"
                className="h-4 w-4 lg:h-5 lg:w-5"
              />
              <span onClick={()=>user?.userId?handleLogout():clickMenu(FontFaceSetLoadEvent,"/Login")} className="text-xs lg:text-sm font-extrabold text-nowrap">{user?.userId?"로그아웃":"로그인"}</span>
            </div>
            
            {/**********************모바일*********************** */}
          
             {/**********************모바일*********************** */}
          </div>      
 </div>
 <div className=" w-full  bg-gainsboro-200 h-[0.063rem]" />
       <div className=" w-full  bg-gainsboro-200 h-[0.063rem]" />
           <div
      className="top-0 relative bg-white w-full h-full cursor-pointer text-left text-[1.25rem]  text-black font-nanumsquare-neo"

    >

     
            
        
       
    
    
     {children}
    </div>
  
    </header>
    </>)
}

export default Header