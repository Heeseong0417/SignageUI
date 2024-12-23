'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Loading from "../../public/loading.svg"
const LoadingOverlay = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 경로가 변경되면 로딩 활성화
    setLoading(true);
    // 페이지 전환 완료 후 로딩 제거
    const timeout = setTimeout(() => {
        setLoading(false);
      }, 500); // 전환 완료 후 500ms 동안 로딩 표시 (필요에 따라 조정 가능)
  
      return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0  flex items-center justify-center z-50">
          <div className="text-white text-lg  flex items-center justify-center"><Loading className={`w-[5rem] h-[5rem]`}/></div>
        </div>
      )}
    </>
  );
};

export default LoadingOverlay;