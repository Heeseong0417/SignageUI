"use client"

import Image from "next/image"
import Link from "next/link"


const GrildBox = ({children}:any)=>{

    return(<>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 p-10 lg:px-[15%]">
        {children}
    </div>
    </>)
}
const GridButton =({mini,title,subtitle,link,img,children}:any)=>{
    return(<>
    <section className="transition-all hover:scale-105 duration-300 w-full h-full flex flex-row items-center justify-between ">
        
       <div className="w-full py-[10%] ">

       <div className="w-full text-[#1292F5] text-xs">
        {mini}
        </div>
       <div className="w-full text-[1.5rem] lg:text-[2rem] font-semibold py-[1rem]">{title}</div>
       <div className="pb-4 text-[0.7rem] lg:text-[1rem] pr-2">{subtitle}</div>
   
       <Link href={link} className="text-black transition-all text-xs duration-300 px-[1.2rem] py-[0.3rem] lg:px-[2rem] lg:py-[0.5rem] bg-[#D2E6FC] rounded-xl hover:bg-gradient-to-r hover:rounded-xl hover:scale-110 hover:from-[#5D5DFF] hover:to-[#0F8EFD] hover:text-white font-bold no-underline">
  바로가기
</Link>
       </div>

       <div className="w-full h-full flex flex-row items-center ml-[10%] lg:mr-0 justify-center mb-[5%] font-bold">

<Image className="  w-[80px] h-[70px] lg:w-[120px] lg:h-[100px]" src={img} alt={""}/>        
       </div>

       
    </section> {children}
    </>)
}

export  {GridButton,GrildBox}