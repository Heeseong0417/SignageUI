"use client"

import { JSXElementConstructor, ReactElement, useState } from "react";
import Image from "next/image"
import deimg from "../../public/800_2560.png"
import { useRouter } from "next/navigation";
const MyADtable=({headers,data,className_header,className_item,link}:any)=>{
const headername = ["썸네일","콘텐츠분류","콘텐츠명","선택구좌","진행상황","name","camp_id"]
const router =useRouter()
       
        
    
         
         
      

    return (
      
      <div className={`overflow-x-auto w-full`}>
      <table className={`min-w-full border-collapse   border-spacing-0 border-[#D8D8D8] font-thin`}>
        <thead>
          {/* 최상단 헤더 (보도측, 차도측) */}

          {/* 세부 헤더 */}
          <tr className={`bg-gray-500 text-black font-thin`}>
            {headers.map((header: any, index: any) => header!=="index"&&(
              <th key={`bo_${index}`} className={`border ${headers.length-1===index?"border-r-0":"border-l-0"} border-t-[#707070] border-t-2  border-solid text-nowrap text-center bg-[#F0F0F0] border-[#D8D8D8] border-collapse px-4 py-[1rem] font-semibold  ${className_header?className_header:"text-center text-[0.9rem]"}`}>
                {header}
              </th>
            ))}
           
          </tr>
        </thead>
        <tbody>
          {data.map((item: any,index:any) => (
            <tr onClick={()=>router.push(link+`?data=${encodeURIComponent(JSON.stringify(item))}`)} key={index} className={`hover:bg-gray-100`}>
              

       
              {Object.keys(item).map((tb_item,tb_key)=>tb_item==="index"?(<></>)
              :tb_item==="썸네일"||tb_item==="thumbnail"?(<>
                <td className={`${Object.keys(item).length-1===tb_key?"border-r-0":"border-l-0"} ${className_item?className_item:"text-center text-sm"} text-center text-sm border-t-0 border border-solid text-nowrap border-[#D8D8D8] border-collapse px-4 py-[1rem] font-font-medium flex justify-center items-center `}><img className={`${className_item}`} src={item[tb_item]} alt={""}/></td>   
              </>):headername.includes(tb_item)?(
            <>
              
                <td className={`${headername.at(-1)===tb_item?"border-r-0":"border-l-0"} ${className_item?className_item:" text-center text-xs flex justify-center items-center"} text-center text-lg border border-solid text-nowrap border-[#D8D8D8] border-collapse px-4 py-[1rem] font-font-medium `}>{item[tb_item]}<p className="m-0 text-[#1292F5]">{tb_item===headername.at(-1)&&item["state"]?item["state"]:""}</p></td>
                          </>   
                ):"")}


            </tr>
          ))}
        </tbody>
      </table>
    </div>

    );
  };
  

export default MyADtable
