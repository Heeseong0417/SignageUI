import React, { useState } from 'react';
import { Dialog } from '@reach/dialog';
import { GridContainer, GridInputText, GridItem, GridItemCN, GridTitle } from '../table/grid';

const CustomDialog = ({
  isOpen,
  onClose,
  title = 'Custom Dialog',
  content = 'This is a custom dialog.',
}: any) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [page, setpage] = useState(0)
const [exists, setexists] = useState(true)
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
    isOpen==="승인" && page===0? (
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
          className="z-[9999] fixed top-[30%] left-[5%] lg:left-[37.5%] w-[90%] lg:w-[25%] min-w-[20rem]  max-w-full p-0 m-0 bg-white rounded-lg shadow-lg flex flex-col overflow-hidden"
        >
          {/* 헤더 */}
          <div
            className="flex justify-between items-center bg-black text-white px-4 py-2 rounded-t-lg cursor-move"
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
          <div className="p-6 w-[calc(100%_-3rem)] flex flex-col items-center justify-center text-center overflow-auto">
            <h2 className="text-sm font-bold mb-4 py-[3%]">{title}</h2>
            

<GridContainer>

  <GridItemCN title={"알림"} className_title={"border-t-2 border-t-solid border-t-[#384958] flex items-center text-xs px-[1rem] bg-[#F0F0F0] justify-center"} className_item={"border-t-2 border-t-solid border-t-[#384958] items-center"}>
<div className='w-full flex flex-row space-x-2'>
<div className=' flex flex-row justify-around space-x-2 items-center'><input type='checkbox'/><p className='m-0 text-xs'>이메일</p></div>
<div className='flex flex-row justify-around space-x-2 items-center'><input type='checkbox'/><p className='m-0 text-xs'>문자메세지</p></div>  
   </div>
   </GridItemCN>

   
  </GridContainer>
  
          </div>

          {/* 확인 버튼 */}
          <div className="h-[1px] w-full  bg-[#E3E3E3]"/>
          <div className="flex justify-center py-4 space-x-2">
          <button
              onClick={onClose}
              className="px-4 py-1 min-w-[5rem] bg-[#63707C] text-white rounded shadow hover:bg-[#2e3339]"
            >
              취소
            </button>

            <button
              onClick={()=>exists?setpage(1):onClose}
               className="px-4 py-1 min-w-[5rem] bg-[#1292F5] text-white rounded shadow hover:bg-blue-600"
            >
              확인
            </button>
          </div>
        </Dialog>
      </div>
    ):isOpen==="승인" && page===1?(<>
 
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
          className="z-[9999] fixed top-[30%] left-[5%] lg:left-[37.5%] w-[90%] lg:w-[25%] min-w-[20rem]  max-w-full p-0 m-0 bg-white rounded-lg shadow-lg flex flex-col overflow-hidden"
        >
          {/* 헤더 */}
          <div
            className="flex justify-between items-center bg-black text-white px-4 py-2 rounded-t-lg cursor-move"
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
          <div className="p-6 w-[calc(100%_-3rem)] flex flex-col items-center justify-center text-center overflow-auto">
            <h2 className="text-sm font-bold mb-4 py-[3%]">{title}</h2>
            

<GridContainer>

  <GridItemCN title={"알림"} className_title={"border-t-2 border-t-solid border-t-[#384958] flex items-center text-xs px-[1rem] bg-[#F0F0F0] justify-center"} className_item={"border-t-2 border-t-solid border-t-[#384958] items-center"}>
<div className='w-full flex flex-row space-x-2'>
<div className=' flex flex-row justify-around space-x-2 items-center'><input type='checkbox'/><p className='m-0 text-xs'>이메일</p></div>
<div className='flex flex-row justify-around space-x-2 items-center'><input type='checkbox'/><p className='m-0 text-xs'>문자메세지</p></div>  
   </div>

  </GridItemCN>
  </GridContainer>

          </div>

          {/* 확인 버튼 */}
          <div className="h-[1px] w-full  bg-[#E3E3E3]"/>
          <div className="flex justify-center py-4 space-x-2">
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
    </>):(<></>)
  );
};

export default CustomDialog;