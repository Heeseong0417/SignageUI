import React, { useState } from 'react';
import { Dialog } from '@reach/dialog';

const CustomDialog = ({
  isOpen,
  onClose,
  title = 'Custom Dialog',
  content = 'This is a custom dialog.',
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
          className="fixed top-[30%] left-[calc(50%_-12rem)] w-[15rem] lg:w-[24rem] max-w-full p-0 m-0 bg-white rounded-lg shadow-lg"
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
          <div className="p-6 w-[calc(100%_-3rem)] flex flex-col items-center justify-center text-center">
            <h2 className="text-sm font-bold mb-4">{title}</h2>
            <p className="text-gray-700 mb-4">{content}</p>
          </div>

          {/* 확인 버튼 */}
          <div className="h-[1px] w-full  bg-[#E3E3E3]"/>
          <div className="flex justify-center py-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
            >
              확인
            </button>
          </div>
        </Dialog>
      </div>
    )
  );
};

export default CustomDialog;