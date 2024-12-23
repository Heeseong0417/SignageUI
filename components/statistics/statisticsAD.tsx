"use client"

import { useState } from "react"

const statisticsAD=({}:any)=>{
    const [ADstatisticsList, setADstatisticsList] = useState( [{link:"",color:"#ffffff",bgcolor:"#31A9F1",title:"신규 광고신청",value:3},
        {link:"",color:"#ffffff",bgcolor:"#3D64E5",title:"광고 변경신청",value:1},
        {link:"",color:"#ffffff",bgcolor:"#1C0B8A",title:"광고 중단신청",value:2},
        {link:"",color:"#ffffff",bgcolor:"#63707C",title:"검수 진행·대기",value:1},   
        {link:"",color:"#ffffff",bgcolor:"#384958",title:"광고 종료예정",value:1},
        {link:"",color:"#6AE6FF",bgcolor:"#000000",title:"총 운영광고",value:24},

    ])
   
    return(<>
    <div className="w-full font-nanumsquare-neo mb-[2%]">
    <div className="h-[1px] bg-[#485C6D] w-[96%] mx-[2%]"/>
        <div className="h-full grid grid-cols-3 px-[2%]">
          
                {ADstatisticsList.map((item,index)=>(<>
                    <div className={`${index===0?"border-r-0":index%2===0?"border-l":index%3===0?"border-l-0":"border-l"} flex flex-col border-collapse border-b border-solid border-[#cccccc] justify-center items-center text-center mb-[0%] py-[2%] px-[20%] min-h-[10rem] text-xs lg:text-[0.9rem]`}>
                    <div className="w-full flex-row flex mb-[1rem] justify-center">
                     <p style={{color:item.bgcolor}} className={`font-bold text-[${item.bgcolor}] m-0 px-[0.2rem]`}>•</p> <p className={`m-0 font-bold`}>{item.title}</p> 
                    </div>
                   
<div style={{backgroundColor:item.bgcolor,color:item.color}} className={`w-full bg-[${item.bgcolor}] flex items-center justify-center text-[${item.color}] text-[2.5rem] font-medium rounded-[0.8rem] px-2 py-[0.6rem]`}>{item.value}</div>
</div>
</>))}
         

        </div></div>
        </>)
}

export default statisticsAD