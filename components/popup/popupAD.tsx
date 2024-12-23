"use client"

import { Dialog } from "@reach/dialog";
import Image from "next/image";
import { useEffect, useState } from "react";
import TB from "../table/table"
import sample1 from "../../public/800x2560.png"
import sample2 from "../../public/800x1280.png"
import BarChart from "../chart/barchart";
const CustomDialogImage=({
    isOpen,
    onClose,
    tbData,
    contentsData,
    title,
    image
  }: any) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [contentsDatas, setcontentsDatas] = useState<any>( 
        {
          "콘텐츠명": "피트니스클럽 회원모집광고",
          "콘텐츠분류": "상업광고",
          "선택구좌": "보도측 (미사용 동편)",
          "구좌해상도": "800 x 1280",
          "표출시간": "15초",
          "광고기간": "2024. 06. ~ 2024. 12. (6개월)",
          "파일이름": "ABCD OO광고.MP4",
          "광고비용": "916,800원"
        }
      )
    const [ADchartTF, setADchartTF] = useState({AD1:[{}],AD2:[{}],AD3:[{}]})
    const [zoom, setZoom] = useState(1);

    const updateZoom = () => {
      // 1920px 기준으로 zoom 값 계산
      const scale = Math.max(0.8, Math.min(1, window.innerWidth / 1920)); // 1920px 기준
      setZoom(scale);
    };
    useEffect(() => {
        updateZoom(); // 초기 실행
        window.addEventListener('resize', updateZoom); // resize 이벤트 핸들러 추가
    
        // 컴포넌트가 언마운트 될 때 이벤트 핸들러 제거
        return () => {
          window.removeEventListener('resize', updateZoom);
        };
      }, []); // 처음 렌더링 시만 실행
// 드래그 시작
const startDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // 드래그 중
  const onDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  // 드래그 종료
  const endDrag = () => {
    setDragging(false);
  };

  return (
    isOpen==="상세보기" && (
      <div
        style={{
          top: position.y,
          left: position.x,
        }}
        className="fixed bg-black"
        onMouseMove={onDrag}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
      >
        <Dialog
          onDismiss={onClose}
          aria-label="Custom Dialog"
          className="z-[9999] fixed top-[5%] left-[5%] lg:left-[20%] w-[90%] lg:w-[60%] h-[90%] max-w-full p-0 m-0 bg-white rounded-lg shadow-lg flex flex-col overflow-hidden "
        >
          {/* 헤더 */}
          <div
            className="flex justify-between items-center bg-black text-white px-4 py-2 h-[2rem] rounded-t-lg cursor-move"
            onMouseDown={startDrag}
          >
            <span className="text-sm">INFO</span>
            <button
              onClick={onClose}
              className="text-xl font-bold bg-black text-white hover:text-gray-300"
            >
              &times;
            </button>
          </div>

          {/* 본문 */}
          <div className="px-[1rem] h-[100%] flex overflow-auto flex-col pb-[2rem]">
       
         
          <h2 className="text-lg lg:text-2xl font-bold w-full flex justify-start">{title}</h2>
          <div style={{zoom:zoom}} className="w-full flex flex-col justify-start items-center space-x-2 space-y-2 ">
            <TB headers={Object.keys(tbData)} data={[tbData]} className_header={`text-center text-xs`} className_item={"text-center text-xs"}/>
            </div>  

            <div className="grid grid-cols-1 lg:grid-cols-4 mt-[2%] gap-2 ">
  <div className="w-full h-full flex items-center justify-center">   
    <div className="p-2 w-full flex items-center justify-center bg-[#172731] aspect-square rounded-md">       
    <Image className={`object-contain h-auto w-[15rem] aspect-square`} alt="" src={sample1}/>
    </div>  
    </div>
  <div className="lg:col-span-3">
  <div className="w-full h-full flex items-center justify-start flex-col space-y-2"> 
    
        {Object.keys(contentsDatas).map((item)=>(<>
        <span className="w-full flex flex-row  justify-between text-start text-xs">
       <p className="bg-[#F0F0F0] text-center rounded-md  py-[0.3rem] px-[1rem] min-w-[4rem] font-medium m-0 text-nowrap">{item}</p>
    <p className="font-medium m-0 py-[0.3rem] px-[1rem] w-full justify-start items-center">{contentsDatas[item]}</p>  
       </span> 
        </>))}
   
   
    </div>
  </div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-6 gap-[1.5rem] mt-[1.5rem]">

<div style={{zoom:zoom}} className="lg:col-span-2 flex border border-solid min-h-[20rem] border-[#CCCCCC] rounded-md p-2 flex-col ">
    <p>내광고 게시 횟수</p>

<div className="bg-[#F0F0F0] border-sm w-full h-full flex items-center justify-center">
    <p>아직 광고운영 데이터가 없습니다.</p>
</div>
<div className="w-full flex justify-end">
<button className="bg-[#DEE8F1] py-[0.4rem] px-[1rem] rounded-md cursor-pointer max-w-[9rem] text-xs mt-[0.5rem]">데이터 내려받기</button>    
</div>

    </div> 
    <div style={{zoom:zoom}} className="lg:col-span-2 flex border border-solid min-h-[20rem] border-[#CCCCCC] rounded-md p-2 flex-col ">
    <p>내광고 노출 횟수</p>
    <BarChart/>
    <div className="w-full flex justify-end">
<button className="bg-[#DEE8F1] py-[0.4rem] px-[1rem] rounded-md cursor-pointer max-w-[9rem] text-xs pt-[0.2rem]">데이터 내려받기</button>    
</div>
    </div> 
    <div style={{zoom:zoom}} className="lg:col-span-2 flex border border-solid min-h-[20rem] border-[#CCCCCC] rounded-md p-2 flex-col ">
    <p>유동인구</p>
    <BarChart/>
    </div>    
    </div>
                
          </div>
         {/* 확인 버튼 */}
         <div className="h-[1px] w-full  bg-[#E3E3E3]"/>
               <div className="flex justify-center py-4">

            <button
              onClick={onClose}
              className="px-4 py-1 min-w-[5rem] bg-[#1292F5] text-white rounded shadow hover:bg-blue-600"
            >
              확인
            </button>
          </div>   


        </Dialog>
      </div>
    )
  );
};

export default CustomDialogImage