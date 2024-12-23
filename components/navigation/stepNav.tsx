"use client"
import Home from "../../public/nav-home.svg"
import Arrow from "../../public/arrow2.svg"
import Link from "next/link"

const stepTitle =({title,subtitle,subtitlecolor}:any)=>{
    return(<>
<div className="font-nanumsquare-neo w-full h-full flex flex-col justify-center items-center min-h-[4rem] pt-[4%] py-[2%] lg:py-[3%] lg:pt-[4%] ">
<h1 className=" text-[1.5rem] lg:text-[2.7rem] font-semibold m-0 mb-[1rem]">{title}</h1>
<p className={`text-[${subtitlecolor}] m-0 text-sm`}>{subtitle}</p>

</div>    
    </>)


}
const stepSelectButton =({list}:any)=>{
    return(<>
    <div className="font-nanumsquare-neo w-full h-full min-h-[3rem] flex px-2 flex-row items-center justify-start space-x-2 text-[#555555]">
        <div className="flex flex-row space-x-2">
       
        <Link href="/" className="flex items-center justify-center"><Home className="h-3 w-3"/></Link>
        <div className="flex items-center justify-center text-sm text-nowrap">홈</div>
        
        {list.map((item: string)=>(<>
            <Arrow className="h-5 w-5"/>    
        <div className="flex items-center justify-center text-sm text-nowrap">{item}</div>
        
        
        </>))}
    </div>
    </div> 
<div className="w-full bg-[#CCCCCC] h-[1px]"/>  
    </>)


}
const stepNav=({list}:any)=>{

    return(<>
    <div className="font-nanumsquare-neo w-full h-full min-h-[3rem] flex px-2 flex-row items-center justify-start space-x-2 text-[#555555]">
        <div className="flex flex-row space-x-2">
       
        <Link href="/" className="flex items-center justify-center"><Home className="h-3 w-3"/></Link>
        <div className="flex items-center justify-center text-sm text-nowrap">홈</div>
        
        {list.map((item: string)=>(<>
            <Arrow className="h-5 w-5"/>    
        <div className="flex items-center justify-center text-sm text-nowrap">{item}</div>
        
        
        </>))}
    </div>
    </div>
    <div className="w-full bg-[#CCCCCC] h-[1px]"/>
    </>)
}

export {stepNav,stepTitle,stepSelectButton}