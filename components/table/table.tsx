'use client';
import { ReactElement, JSXElementConstructor, ReactNode, AwaitedReactNode, ReactPortal, Key } from "react";


const Table=({headers,data,className_header,className_item}:any)=>{

       
       
        
    
         
         
      

      return (
        
        <div className={`overflow-x-auto w-full`}>
        <table className={`min-w-full border-collapse   border-spacing-0 border-[#D8D8D8] font-thin`}>
          <thead>
            {/* 최상단 헤더 (보도측, 차도측) */}

            {/* 세부 헤더 */}
            <tr className={`bg-gray-500 text-black font-thin`}>
              {headers.map((header: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined, index: any) => header!=="index"&&(
                <th key={`bo_${index}`} className={`border ${headers.length-1===index?"border-r-0":"border-l-0"} border-t-[#707070] border-t-2  border-solid text-nowrap text-center bg-[#F0F0F0] border-[#D8D8D8] border-collapse px-4 py-[1rem] font-semibold  ${className_header?className_header:"text-end text-[0.9rem]"}`}>
                  {header}
                </th>
              ))}
             
            </tr>
          </thead>
          <tbody>
            {data.map((item: { [x: string]: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; },index: Key | null | undefined) => (
              <tr key={index} className={`hover:bg-gray-100`}>
               
                {Object.keys(item).map((tb_item,tb_key)=>tb_item!=="index"&&(<td className={`${Object.keys(item).length-1===tb_key?"border-r-0":"border-l-0"} ${className_item?className_item:"text-end text-sm"} border border-solid text-nowrap border-[#D8D8D8] border-collapse px-4 py-[1rem] font-font-medium `}>{item[tb_item]}</td>))}

               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      );
    };
export default Table