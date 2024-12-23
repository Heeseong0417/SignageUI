
import Image from "next/image";
const Footer = ()=>{


    return(<>
     <div className="relative  bg-gray-300 w-full h-full overflow-hidden lg:h-[15.625rem] text-[0.875rem] text-white">
     


  <div className="lg:w-[70%] lg:mx-[15%] p-[5%] lg:px-0 h-full    pt-[0.1rem] flex flex-col lg:flex-row items-center justify-center lg:justify-between">
    <div className="px-[2.1rem] py-[5%] lg:py-0  w-full  tracking-[0.7px] leading-[1.5rem] ">
    <Image
            className=" max-w-full overflow-hidden max-h-full"
            width={103}
            height={27}
            alt=""
            src="/logowhite.svg"
            />
       <p className="pt-[0.5rem]">
            우) 12951 경기도 하남시 대청로 10 (신장동) 하남시청
          </p>
          <p className="">© HANAM CITY. ALL RIGHTS RESERVED.</p>   
    </div>
    <div className="px-[2.1rem] w-full tracking-[0.7px] leading-[1.5rem] items-left flex flex-col">
    <div className="text-[1.313rem] pb-[5%] tracking-[1.05px] leading-[1.5rem] font-extrabold ">
          고객센터
        
        </div>

        <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between pt-[0.5rem]">
            <div className="flex flex-col w-full lg:w-auto">
   <b className=" top-[calc(50%_+_2px)] left-[calc(50%_+_70px)] lg:pb-[10%]">
          문의전화
        </b>   
        <div className="text-[1.5rem] tracking-[1.2px] leading-[1.5rem]">
          031-790-6114
        </div>            
            </div>
            <div className="top-[calc(50%_+_5px)] left-[calc(50%_+_330px)] bg-gray-300 lg:bg-darkslategray-300 w-[0.063rem] h-[3.75rem]" />
            <div className="flex flex-col  w-full lg:w-auto ">
          <b className=" top-[calc(50%_+_2px)] left-[calc(50%_+_370px)] lg:pb-[10%]">
          운영시간 (평일)
        </b>
               <div className=" text-[1.5rem] tracking-[1.2px] leading-[1.5rem]">
          09:00 ~ 18:00
        </div> 
        </div>
        </div>
        
      
      

    </div>
    </div>

       {/**  <b className="absolute top-[calc(50%_+_2px)] left-[calc(50%_+_70px)]">
          문의전화
        </b>
        <b className="absolute top-[calc(50%_+_2px)] left-[calc(50%_+_370px)]">
          운영시간 (평일)
        </b>
        <div className="absolute top-[calc(50%_+_31px)] left-[calc(50%_+_70px)] text-[1.5rem] tracking-[1.2px] leading-[1.5rem]">
          031-790-6114
        </div>
        <div className="absolute top-[calc(50%_+_31px)] left-[calc(50%_+_370px)] text-[1.5rem] tracking-[1.2px] leading-[1.5rem]">
          09:00 ~ 18:00
        </div>
        <div className="absolute top-[calc(50%_-_70px)] left-[calc(50%_+_70px)] text-[1.313rem] tracking-[1.05px] leading-[1.5rem] font-extrabold">
          고객센터
        </div>
        <div className="absolute top-[calc(50%_+_5px)] left-[calc(50%_+_330px)] bg-darkslategray-300 w-[0.063rem] h-[3.75rem]" />*/}
      </div>
    </>)
}

export default Footer;
