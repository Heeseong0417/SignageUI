"use client"

import { Dialog } from "@reach/dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CustomDialogImage=({
    isOpen,
    onClose,
    title = 'Custom Dialog',
    content ,
    image1,
    image2,
    optimization,
    setDetailToggle,
    ratio
  }: any) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const router = useRouter()
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
  const [size2, setSize2] = useState({ width: 0, height: 0 });
  const handleImageLoad = (event: any) => {
    const { naturalWidth, naturalHeight } = event.target;
    setSize({ width: naturalWidth, height: naturalHeight });
  };
  const handleImageLoad2 = (event: any) => {
    const { naturalWidth, naturalHeight } = event.target;
    setSize2({ width: naturalWidth, height: naturalHeight });
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
  
  const x1 = size.width*calculatePercentage(ratio[0],ratio[1]).w
  const y1 = size.width*calculatePercentage(ratio[0],ratio[1]).h
  const lxy1 = calculatePercentage(x1,y1)

  const x2 = size.width*calculatePercentage(ratio[0],ratio[1]).w
  const y2 = size.width*calculatePercentage(ratio[0],ratio[1]).h
  const lxy2 = calculatePercentage(x2,y2)

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
          className="z-[9999] fixed top-[5%]  left-[5%] lg:left-[35%] w-[90%] lg:w-[30%] h-[80%] max-w-full p-0 m-0 bg-white rounded-lg shadow-lg flex flex-col overflow-hidden "
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
             <div className="p-6 h-full w-[calc(100%_-3rem)] flex flex-col items-center justify-center text-center overflow-auto">

            <h2 className="text-sm font-bold mb-4">{title}</h2>
            
            <div className="w-full py-[10%] h-[60%] flex flex-col items-center justify-center bg-darknavy">
            <div style={{width:200,height:400}} className={`flex flex-col justify-center items-center bg-white`}>
             <img 
             onLoad={handleImageLoad} 
             style={{width:`100%`,height:`${ratio[0]}%`,objectFit:optimization==="최대화"?"cover":optimization==="최소화"?"scale-down":"contain"}} className={`bg-white `} alt="" src={image1}/> 
                          <img 
             onLoad={handleImageLoad2}
             style={{display:ratio[1]===0?"hidden":"", width:`100%`,height:`${ratio[1]}%`,objectFit:optimization==="최대화"?"cover":optimization==="최소화"?"scale-down":"contain"}} className={`bg-white`} alt="" src={image2}/>
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
              onClick={()=>{
                onClose()
                //setDetailToggle(()=>true)
                
                //router.push(`/Home/ADadmin/Contents/Detail?data=${JSON.stringify(content)}`)
                
              }}
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