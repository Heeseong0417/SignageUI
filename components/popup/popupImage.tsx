"use client"

import { Dialog } from "@reach/dialog";
import Image from "next/image";
import { useState } from "react";

const CustomDialogImage=({
    isOpen,
    onClose,
    title = 'Custom Dialog',
    content,
    image,
    optimization,
    ratio
  }: any) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

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
  const [size, setSize] = useState({ width: 0, height: 0 });

  const handleImageLoad = (event: any) => {
    const { naturalWidth, naturalHeight } = event.target;
    setSize({ width: naturalWidth, height: naturalHeight });
  };
  function calculatePercentage(width: number, height: number) {
    const total = width + height;
  
    const wPercent = (width / total) ;
    const hPercent = (height / total) ;
  
    return {
      w: parseFloat(wPercent.toFixed(2)),
      h: parseFloat(hPercent.toFixed(2))
    };
  }
  
  const x = size.width*calculatePercentage(ratio[0],ratio[1]).w
  const y = size.height*calculatePercentage(ratio[0],ratio[1]).h
  const lxy = calculatePercentage(x,y)
  return (
    isOpen && (
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
          className="z-[9999] fixed top-[5%]  left-[5%] lg:left-[35%] w-[90%] lg:w-[30%]  min-h-[500px] h-[80%] max-w-full p-0 m-0 bg-white rounded-lg shadow-lg flex flex-col overflow-auto "
        >
          {/* 헤더 */}
          <div
            className="flex justify-between items-center bg-black text-white px-4 py-1 rounded-t-lg cursor-move"
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
          
          <div className="p-6 h-full w-[calc(100%_-3rem)] flex flex-col items-center justify-center text-center over-flow-auto">
   
            <h2 className="text-sm font-bold mb-4">{title}</h2>
            <div className="w-full h-full flex flex-col items-center justify-center bg-darknavy ">
            <div style={{width:ratio[0]*(ratio[1]>2000?0.1: 0.3), height:ratio[1]*(ratio[1]>2000?0.1: 0.3)}} className={`overflow-y-auto flex justify-center items-center bg-white`}>
             <img 
             onLoad={handleImageLoad}

             style={{/**width:`${lxy.w*100}%`,height:`${lxy.h*100}%`,**/objectFit:optimization==="최대화"?"cover":optimization==="최소화"?"scale-down":"contain"}} className={`bg-white w-full h-full`} alt="" src={image}/>  
            </div>
            </div>
            <p>*실제 디스플레이에 표시될 콘텐츠의 비율입니다.</p>
 
          </div>

          {/* 확인 버튼 */}

          <div className="flex justify-center py-2 space-x-2">
          <button
              onClick={onClose}
              className="px-4 py-1 min-w-[5rem] bg-[#63707C] text-white rounded shadow hover:bg-[#2e3339]"
            >
              취소
            </button>
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