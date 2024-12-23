"use client"
import type { NextPage } from "next";
import Image from "next/image";
import Ba from "../../public/banner_main.svg"
import Bg from "../../public/bg_cloud.svg"
import Bu from "../../public/bubble.svg"
import { GridButton, GrildBox } from "../../components/button/GridButton"
import I1 from "../../public/icon_m1.png"
import I2 from "../../public/icon_m2.png"
import I3 from "../../public/icon_m3.png"
import I4 from "../../public/icon_m4.png"
import MOV from "../../public/icon_movies.svg"
import IMG from "../../public/icon_img.svg"
import DIS from "../../public/icon_display.svg"
import { useState } from "react";
import BGIMG from "../../public/banner2bg.png"
import { useRouter } from "next/navigation";
const Component1: NextPage = () => {

  const router = useRouter()
    const [gridlist, setgridlist] = useState([
        {mini:"AD MEDIA",title:"광고매체 소개",subtitle:"광고위치와 전자게시대 형태를 확인하고 나만의 광고를신청해보세요!",img:I1,link:"/Home/ADuser/Introduction"},
        {mini:"AD UNIT PRICE",title:"광고단가 안내",subtitle:"빅데이터 기반 스마트 옥외광고 상품별 단가를 한눈에 확인하세요!",img:I2,link:"/Home/ADuser/Price"},
        {mini:"BIG DATA",title:"빅데이터 보기",subtitle:"최신 빅데이터 리포트를 통해 트렌드를 파악하고 광고 전략을 세워보세요!",img:I3,link:"/"},
        {mini:"NOTICE BOARD",title:"Q&A 게시판",subtitle:"광고 위치 및 형태를 확인하고 효과적인 광고 계획을 세워보세요!",img:I4,link:"/"}
    ])
   
  return (<>
  
    <div className="w-full h-full min-h-[20rem] items-center justify-center font-nanumsquare-neo"> 

<div className="w-full h-full relative">

  <Bg className="w-full h-full overflow-hidden mt-[-0.375rem]" />
  <Bu className="z-10 transition-all scale-[70%] hover:scale-100 duration-300 z-999 absolute top-0 w-full h-full flex flex-col  drawCircle" />
  <b className="absolute top-0 w-full h-full flex flex-col text-[1.5rem] sm:text-[2rem] lg:text-[2.25rem] xl:text-[3.25rem] items-center justify-center">
    <p className="m-0 text-center text-[1rem] xs:text-[1.2rem] sm:text-[2rem] lg:text-[2.25rem] xl:text-[3rem] font-semibold ">빅데이터 기반</p>
    <p className="m-0 text-center text-[1rem] xs:text-[1.2rem] sm:text-[2rem] lg:text-[2.25rem] xl:text-[3rem] font-semibold">스마트 옥외광고</p>
    <p className="text-[0.5rem] xs:text-[0.6rem] sm:text-xl lg:text-2xl lg:pt-[1rem] text-center font-medium">
      더정확한 더똑똑한, 옥외광고서비스를 경험해보세요.
    </p>
    <button onClick={()=>router.push("Home/ADuser/Subscription")} className="z-20 transition-all hover:scale-110 duration-300 cursor-pointer text-xs sm:text-lg lg:text-xl px-[0.5rem] lg:px-[3rem] py-[0.3rem] lg:py-[1rem] mt-[1%] lg:mt-[5%] text-white font-bold rounded-[1.7rem] bg-gradient-to-r from-[#0F8EFD] to-[#3DD87A] hover:opacity-90 ">
      광고신청하기
    </button>
  </b>  

</div>
<GrildBox>

  {gridlist.map((item)=>(<>
  <GridButton mini={item.mini} title ={item.title} subtitle={item.subtitle} img={item.img} link={item.link} ></GridButton>
  </>))}
</GrildBox>
<section className=" relative h-full w-full  bg-royalblue-300" >
<Image src={BGIMG} alt="bg" className="w-full h-full overflow-hidden absolute top-0 bg-cover scale-x-90" />
    <div className="xl:px-[15%] xl:w-[70%] w-[96%] px-[2%] h-full flex flex-col sm:flex-row py-[5%] sm:py-0 justify-start sm:justify-between items-center ">
       
       <span className="w-full flex flex-col  sm:px-0 items-start  justify-center ">

        <div className=" leading-[1.475rem] ">

        <h1 className="text-[#B7DFFE] text-[0.7rem] m-0 ml-[5%] sm:m-0">GUIDE</h1>
        <h1 className="font-bold text-xl text-white m-0 ml-[5%] sm:m-0 min-w-[10rem]">광고규격안내</h1>
        </div>
        <div></div>
        </span> 

        <span className="w-full flex flex-col sm:flex-row items-center justify-end py-[3%]  ">
        <div className="sm:min-h-[15rem]  sm:h-full sm:w-[1px] w-[95%] h-[1px]   bg-[#7EA1F9]  my-[3%] sm:my-0"/>
        <div className="min-w-auto xl:min-w-[13rem] w-full h-full flex flex-col items-center justify-center">
            <IMG className="leading-[1.475rem] flex items-center justify-center w-[80px] h-[80px]  sm:w-[40px] sm:h-[40px]"/>
 <p className="text-white font-[100] underline text-[1rem] pt-[10%] pb-[5%]">DISPLAY</p>
 <p className="  text-white m-0 text-[0.8rem]">· 보도측 800 x 1280</p>
 <p className="  text-white m-0 text-[0.8rem]">· 차도측 800 x 2560</p>
        </div>
        <div className="sm:min-h-[15rem]  sm:h-full sm:w-[1px] w-[95%] h-[1px]   bg-[#7EA1F9]  my-[3%] sm:my-0"/>
        <div className="min-w-auto xl:min-w-[13rem] w-full h-full flex flex-col items-center justify-center">
            <MOV className="flex items-center justify-center w-[80px] h-[80px]  sm:w-[40px] sm:h-[40px]"/>
            <p className="text-white font-[100] underline text-[1rem] pt-[10%] pb-[5%]">IMAGE</p>
            <p className="  text-white m-0 text-[0.8rem]">· jpge</p>
            <p className="  text-white m-0 text-[0.8rem]">· 최대 6MB</p>
        </div>
        <div className="sm:min-h-[15rem]  sm:h-full sm:w-[1px] w-[95%] h-[1px]   bg-[#7EA1F9]  my-[3%] sm:my-0"/>
        <div className="min-w-auto xl:min-w-[13rem] w-full h-full flex flex-col items-center justify-center">
            <DIS className="flex items-center justify-center w-[80px] h-[80px]  sm:w-[40px] sm:h-[40px]"/>
            <p className="text-white font-[100] underline text-[1rem] pt-[10%] pb-[5%]">MOVIE</p>
            <p className="  text-white m-0 text-[0.8rem]">· mp4</p>
            <p className="  text-white m-0 text-[0.8rem]">· 최대 300MB</p>
        </div>
        <div className="sm:min-h-[15rem]  sm:h-full sm:w-[1px] w-[95%] h-[1px]   bg-[#7EA1F9]  my-[3%] sm:my-0"/>
        </span>
    </div>


</section>

<div className=" h-full w-full  bg-royalblue-200">
              <div className=" h-full w-full ">
                <div className=" relative h-full w-full  bg-royalblue-300" />

                <div className=" h-full w-full  [background:linear-gradient(92.26deg,_#436cdc,_#436cdb_83.98%,_rgba(67,_108,_219,_0))]" />
                <div className=" h-full w-full  [background:linear-gradient(92.46deg,_rgba(67,_108,_220,_0),_#436cdb_6.54%,_#436cdb)]" />
              </div>
            </div>
   </div></>
  );
};

export default Component1;
