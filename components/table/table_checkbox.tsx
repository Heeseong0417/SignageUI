'use client';
import { useState } from "react";

const TableCheckbox = ({ headers, data,check_now,check_set,check_data }: any) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null); // 선택된 행의 인덱스를 상태로 관리

  const handleCheckboxChange = (index: number, item: any) => {
    check_data(()=>item)
    check_set(index === check_now ? null : index); // 같은 행을 클릭하면 선택 해제
  };
  const index_key = "index"
  return (
    <div className={`overflow-x-auto w-full`}>
      <table
        className={`min-w-full border-collapse border-spacing-0 border-[#D8D8D8] font-thin`}
      >
        <thead>
          {/* 최상단 헤더 */}
          <tr className={`bg-gray-500 text-black font-thin`}>
            <th
              className={`border border-l-0 border-t-[#707070] border-t-2 border-solid text-nowrap text-center bg-[#F0F0F0] border-[#D8D8D8] border-collapse px-4 py-[1rem] font-semibold text-[0.9rem]`}
            >
              선택
            </th>
            {headers.map((header: string, index: number) => index_key!==header&&(
              <th
                key={`bo_${index}`}
                className={`border ${
                  headers.length - 1 === index ? "border-r-0" : "border-l-0"
                } border-t-[#707070] border-t-2 border-solid text-nowrap text-center bg-[#F0F0F0] border-[#D8D8D8] border-collapse px-4 py-[1rem] font-semibold text-[0.9rem]`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index: number) => (
            <tr key={index} className={`hover:bg-gray-100`}>
              <td
                className={`border-l-0 border border-solid text-nowrap border-[#D8D8D8] border-collapse px-4 py-[1rem] font-font-medium text-sm text-end`}
              >
                <input
                  type="checkbox"
                  checked={check_now === index} // 현재 행이 선택된 상태인지 확인
                  onChange={() => handleCheckboxChange(index,item)} // 체크박스 변경 핸들러
                />
              </td>
              {Object.keys(item).map((tb_item, tb_key) => tb_item!==index_key&&(
                <td
                  key={tb_key}
                  className={`${
                    Object.keys(item).length - 1 === tb_key
                      ? "border-r-0"
                      : "border-l-0"
                  } border border-solid text-nowrap border-[#D8D8D8] border-collapse px-4 py-[1rem] font-font-medium text-sm text-end`}
                >
                  {item[tb_item]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableCheckbox;
