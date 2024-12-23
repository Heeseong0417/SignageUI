"use client"

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthData, setAuthData } from "../../../tool/redux/slice";
import { getAuthData, removeAuthData } from "../../../config/cookies";


const Header= ({children}:any)=>{
  const [user, setuser] = useState<any>({user_type:"",accessToken:"",userId:""})
  const menu = [
    {title:"대시보드",logintf:true,link:"/Home/ADuser/Dashboard",sub:[]},
    {title:"옥외광고",logintf:true,link:"/Home/data",sub:[{title:"광고소개",logintf:false,link:"/Home/ADuser/Introduction"},{title:"광고단가 및 약관안내",logintf:false,link:"/Home/ADuser/Price"},{title:"광고신청",logintf:true,link:"/Home/ADuser/Subscription"}]},
    {title:"빅데이터",logintf:true,link:"/Home/data",sub:[]},
    {title:"내 광고",logintf:true,link:"/Home/ADuser/MyAD",sub:[]},
    {title:"커뮤니티",logintf:true,link:"/Home/data",sub:[{title:"공지사항",logintf:true,link:""},{title:"Q&A 게시판",logintf:true,link:""}]}
  ]
  const ADMINmenu = [
    {title:"대시보드",logintf:true,link:"/Home/ADadmin/Dashboard",sub:[]},
    {title:"콘텐츠운영",logintf:true,link:"/Home/data",sub:[{title:"스케쥴러",logintf:true,link:"/Home/ADadmin/Scheduler"},{title:"광고관리",logintf:true,link:"/Home/ADadmin/Management"},{title:"콘텐츠관리",logintf:true,link:"/Home/ADadmin/Contents"}]},
    {title:"빅데이터",logintf:true,link:"/Home/data",sub:[]},
    {title:"시스템관리",logintf:true,link:"/Home/data",sub:[{title:"유저관리",logintf:true,link:"/Home/data"},{title:"사이트관리",logintf:true,link:"/Home/data"},{title:"매출관리",logintf:true,link:"/Home/data"},{title:"로그관리",logintf:true,link:"/Home/data"},{title:"광고안내관리",logintf:true,link:"/Home/data"}]},
    {title:"커뮤니티",logintf:true,link:"/Home/data",sub:[{title:"공지사항",logintf:true,link:""},{title:"Q&A 게시판",logintf:true,link:""}]}
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
    setuser({user_type:"USER"})
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
   
    <div className={`w-full h-full ${menutoggle?"fixed lg:bg-transparent bg-gray-600 lg:opacity-100 opacity-60":""}`}/>
    <header className={`w-full h-full ${menutoggle?"fixed":""}`}>
     <div className="h-[4.25rem] z-[9999] flex items-center justify-between w-[90%] px-[5%] lg:w-[70%] lg:mx-[15%] flex-row">

 <div onClick={()=>router.push("/")} className=" mx-2 flex flex-col lg:flex-row  items-center ">
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
            <div className="hidden lg:flex items-center space-x-2 cursor-pointer">
              <Image
                src="/person.svg"
                width={18}
                height={18}
                alt="Profile Icon"
                className="h-5 w-5"
              />
              <span onClick={()=>user?.userId?clickMenu(true,"/Login/Myprofile"):clickMenu(false,"/Login/Siteup")} className="font-extrabold text-nowrap">{user?.userId?"내 정보":"회원가입"}</span>
            </div>
            
            <div className="hidden lg:flex items-center space-x-2 cursor-pointer">
              <Image
                src="/rockon.svg"
                width={17}
                height={17}
                alt="Logout Icon"
                className="h-5 w-5"
              />
              <span onClick={()=>user?.userId?handleLogout():clickMenu(false,"/Login")} className="font-extrabold text-nowrap">{user?.userId?"로그아웃":"로그인"}</span>
            </div>
            <div className="hidden lg:flex items-center space-x-2 cursor-pointer">
              <Image
                src="/rockon.svg"
                width={17}
                height={17}
                alt="Logout Icon"
                className="h-5 w-5"
              />
              <span onClick={()=>handleLoginUser()} className="font-extrabold text-nowrap">{toggle_user?"관리자":"유저"}로 전환</span>
            </div>
            {/**********************모바일*********************** */}
            <div  className="lg:hidden justify-end flex items-center cursor-pointer z-50">
              <Image
              onClick={()=>setmenutoggle(()=>!menutoggle)}
                src="/line3.svg"
                width={17}
                height={17}
                alt="Logout Icon"
                className="h-5 w-5"
              />
              
              <div  className={`${menutoggle?"max-w-[80%] sm:max-w-[50%]":"max-w-0"} z-50 overflow-y-auto shadow absolute right-0 w-full top-[4.25rem] bg-white border-r-10 h-full  overflow-hidden flex transition-all duration-300 ease-in-out flex-col border-2`}>
         
              <span className=" py-[0.0rem] px-[5%]  w-[90%] h-[3rem] mr-10 flex flex-row items-center justify-between font-extrabold text-xs shadow">   
              <Image
              onClick={()=>setmenutoggle(()=>!menutoggle)}
                src="/logo.svg"
                width={80}
                height={80}
                alt="Logout Icon"
                className=""
              />
                   <div className="w-full h-full flex flex-row justify-end items-center">
                    <div className="flex lg:hidden items-center space-x-2 cursor-pointer mr-2">
              <Image
                src="/person.svg"
                width={18}
                height={18}
                alt="Profile Icon"
                className="h-5 w-5"
              />
              <span onClick={()=>user?.userId?clickMenu(true,"/Login/Myprofile"):clickMenu(false,"/Login/Siteup")} className="font-extrabold">{user?.userId?"내 정보":"회원가입"}</span>
            </div>
            <div className="flex lg:hidden items-center space-x-2 cursor-pointer">
              <Image
                src="/rockon.svg"
                width={17}
                height={17}
                alt="Logout Icon"
                className="h-5 w-5"
              />
              <span onClick={()=>user?.userId?handleLogout():clickMenu(true,"/Login")} className="font-extrabold">{user?.userId?"로그아웃":"로그인"}</span>
            </div>
       
</div>
           </span>
               <div className="w-full h-full flex flex-row justify-between">
                <div className="h-full bg-slate-100 ">
                {user?.user_type==="ADMIN"?ADMINmenu.map((item)=>(<>
                <div onClick={()=>item.sub.length>0?setSelectItems(()=>item.title):clickMenu(item.logintf,item.link)} className={` transition-all duration-300 px-[2rem]  flex flex-row text-center text-nowrap ${SelectItems===item.title?" bg-gradient-to-r rounded-r-xl scale-110 from-[#0F8EFD] to-[#3DD87A] text-white":""}  py-[1rem] text-md font-bold`}>{item.title}</div>
               </>)):menu.map((item)=>(<>
                <div onClick={()=>item.sub.length>0?setSelectItems(()=>item.title):clickMenu(item.logintf,item.link)} className={` transition-all duration-300 px-[2rem]  flex flex-row text-center text-nowrap ${SelectItems===item.title?" bg-gradient-to-r rounded-r-xl scale-110 from-[#0F8EFD] to-[#3DD87A] text-white":""}  py-[1rem] text-md font-bold`}>{item.title}</div>
               </>))}
</div>

<div className="w-full h-full">

{user?.user_type==="ADMIN"?ADMINmenu.find(item => item.title === SelectItems)?.sub.map((subitem)=>(<>
  <div onClick={()=>clickMenu(subitem.logintf,subitem.link)} className=" transition-all duration-300 px-[3rem] font-[500]  text-nowrap py-[1rem] w-full">{subitem.title}</div>
  <div className=" w-full  bg-gainsboro-200 h-[0.063rem]" />
</>)):menu.find(item => item.title === SelectItems)?.sub.map((subitem)=>(<>
  <div onClick={()=>clickMenu(subitem.logintf,subitem.link)} className=" transition-all duration-300 px-[3rem] font-[500]  text-nowrap py-[1rem] w-full">{subitem.title}</div>
  <div className=" w-full  bg-gainsboro-200 h-[0.063rem]" />
</>))}
</div>
                </div>

              </div>
            </div>
             {/**********************모바일*********************** */}
          </div>      
 </div>
 <div className=" w-full  bg-gainsboro-200 h-[0.063rem]" />
       <section className="w-full h-full group">
       <div className="hidden relative w-[70%] mx-[15%] lg:flex flex-row items-center justify-center h-[3.75rem] border-2  text-[1rem]  lg:text-[1.25rem] ">
        
       {user?.user_type==="ADMIN"?ADMINmenu.map((item)=>(<>
        <div className="  bg-gainsboro-200 w-[0.063rem] h-[1.25rem]"/>
        <div className="w-[16.5rem] text-center items-center justify-center ">
        <div className=" cursor-auto h-full top-[0rem] bottom-[0rem] left-[0rem] lg-text  max-w-[16.5rem]">
            <div onClick={()=>item.sub.length>0?"":clickMenu(item.logintf,item.link)} className={`hover:text-dodgerblue top-[calc(50%_-_17px)] left-[calc(50%_-_40px)] leading-[1.25rem] font-medium ${SelectItems===item.title?"text-dodgerblue":""}`}>
              {item.title}
            </div>
          </div>
        </div>
       </>)):menu.map((item)=>(<>
        <div className="  bg-gainsboro-200 w-[0.063rem] h-[1.25rem]"/>
        <div className="w-[16.5rem] text-center items-center justify-center ">
        <div className=" cursor-auto h-full top-[0rem] bottom-[0rem] left-[0rem] lg-text  max-w-[16.5rem]">
            <div onClick={()=>item.sub.length>0?"":clickMenu(item.logintf,item.link)} className={`hover:text-dodgerblue top-[calc(50%_-_17px)] left-[calc(50%_-_40px)] leading-[1.25rem] font-medium ${SelectItems===item.title?"text-dodgerblue":""}`}>
              {item.title}
            </div>
          </div>
        </div>
       </>))}
       
        <div className="  bg-gainsboro-200 w-[0.063rem] h-[1.25rem]" />
        
  
       </div>
       <section className="z-50 absolute shadow bg-white top-[7.5rem] left-0 group-hover:max-h-full overflow-hidden max-h-0 flex transition-all duration-300 ease-in-out w-full flex-row justify-center border-2  text-[0.8rem]  lg:text-[1rem] "> 
<div className="w-[70%] mx-[15%] pt-5 pb-10 cursor-pointer flex flex-row justify-center border-2  text-[0.8rem]  lg:text-[1rem] ">
{user?.user_type==="ADMIN"?ADMINmenu.map((item)=>(<>
        <div className=" bg-white w-[0.063rem] "/>
        <div className=" w-[16.5rem] text-center items-center justify-center">
        <div className=" h-full top-[0rem] bottom-[0rem] left-[0rem] lg-text flex flex-col max-w-[16.5rem]">
       
         {item.sub.map((subitem)=>(<>
          <div onClick={()=>clickMenu(subitem.logintf,subitem.link)} className={` hover:bg-gradient-to-r hover:rounded-xl hover:scale-110 hover:from-[#0F8EFD] hover:to-[#3DD87A] hover:text-white z-[55]  top-[calc(50%_-_17px)] left-[calc(50%_-_40px)]  leading-[3.25rem] font-medium ${SelectItems===item.title?"text-dodgerblue":""}`}>
              {subitem.title}
            </div>
         </>))}
          </div>
        </div>
       </>)):menu.map((item)=>(<>
        <div className=" bg-white w-[0.063rem] "/>
        <div className=" w-[16.5rem] text-center items-center justify-center">
        <div className=" h-full top-[0rem] bottom-[0rem] left-[0rem] lg-text flex flex-col max-w-[16.5rem]">
       
         {item.sub.map((subitem)=>(<>
          <div onClick={()=>clickMenu(subitem.logintf,subitem.link)} className={` hover:bg-gradient-to-r hover:rounded-xl hover:scale-110 hover:from-[#0F8EFD] hover:to-[#3DD87A] hover:text-white z-[55]  top-[calc(50%_-_17px)] left-[calc(50%_-_40px)]  leading-[3.25rem] font-medium ${SelectItems===item.title?"text-dodgerblue":""}`}>
              {subitem.title}
            </div>
         </>))}
          </div>
        </div>
       </>))}
</div>
  {/**<p className="mb-[3.125rem] text-dodgerblue text-[1.125rem]">광고소개</p>**/}
</section>

</section>


       <div className=" w-full  bg-gainsboro-200 h-[0.063rem]" />

           <div
      className="top-0 relative bg-white w-full h-full cursor-pointer text-left text-[1.25rem]  text-black font-nanumsquare-neo"

    >
<section className={`z-[11] absolute right-0 w-full h-full overflow-hidden ${menutoggle?"lg:bg-transparent bg-gray-600 lg:opacity-100 opacity-60":"hidden "}`}></section>



     {/**  <div className=" w-full h-[22.5rem]">

        <div className="absolute w-full right-[0rem] bottom-[0rem] left-[0rem] bg-white h-[12.5rem] text-center text-[1.125rem]">
          <div className="absolute w-full right-[0rem] bottom-[0rem] left-[0rem] bg-darkslategray-600 h-[0.063rem]" />
          <div className="absolute w-full top-[0rem] right-[0rem] left-[0rem] bg-gainsboro-200 h-[0.063rem]" />
          <div className="absolute top-[-0.062rem] left-[calc(50%_-_396px)] bg-dodgerblue w-[16.5rem] h-[0.125rem] hidden" />
          <b className="absolute top-[calc(50%_-_65px)] left-[calc(50%_-_350px)] leading-[3.125rem]">
            <p className="m-0 text-dodgerblue">광고소개</p>
            <p className="m-0">광고단가 및 약관안내</p>
            <p className="m-0">광고신청</p>
          </b>
          <b className="absolute top-[calc(50%_-_65px)] left-[calc(50%_+_478px)] leading-[3.125rem]">
            <p className="m-0">공지사항</p>
            <p className="m-0">{`Q&A 게시판`}</p>
          </b>
        </div>
      </div>*/}
     
            
        
       
    
    
     {children}
    </div>
  
    </header>
    </>)
}

export default Header