'use client';


const priceTable=()=>{
    const data = {
        categories: ["보도측 광고 단가", "차도측 광고 단가"],
        headers: ["", "상업광고", "공익광고", "단위", "비고"],
        headers2: [ "상업광고", "공익광고", "단위", "비고"],
        rows: [
          {
            category: "보도측 광고 단가",
            items: [
              { duration: "10일 단기광고", commercial: "90,000", public: "45,000", unit: "원", note: "부과세별도" },
              { duration: "1개월 광고", commercial: "216,000", public: "108,000", unit: "원", note: "부과세별도" },
              { duration: "3개월 광고", commercial: "518,000", public: "259,000", unit: "원", note: "부과세별도" },
              { duration: "6개월 광고", commercial: "828,000", public: "414,000", unit: "원", note: "부과세별도" },
              { duration: "12개월 광고", commercial: "1,324,000", public: "662,000", unit: "원", note: "부과세별도" },
              { duration: "접수수수료 (신청건당 1회성 발생)", commercial: "6,000", public: "-", unit: "원", note: "부과세없음" },
            ],
          },
          {
            category: "차도측 광고 단가",
            items: [
              { duration: "10일 단기광고", commercial: "150,000", public: "75,000", unit: "원", note: "부과세별도" },
              { duration: "1개월 광고", commercial: "360,000", public: "180,000", unit: "원", note: "부과세별도" },
              { duration: "3개월 광고", commercial: "864,000", public: "432,000", unit: "원", note: "부과세별도" },
              { duration: "6개월 광고", commercial: "1,382,000", public: "691,000", unit: "원", note: "부과세별도" },
              { duration: "12개월 광고", commercial: "2,211,000", public: "1,105,000", unit: "원", note: "부과세별도" },
              { duration: "검수수수료 <br/> (신청건당 1회성 발생)", commercial: "6,000", public: "-", unit: "원", note: "부과세없음" },
            ],
          },
        ],
      };
      return (
        
        <div className={`overflow-x-auto w-full`}>
        <table className={`min-w-full border-collapse   border-spacing-0 border-[#D8D8D8] font-thin`}>
          <thead>
            {/* 최상단 헤더 (보도측, 차도측) */}
            <tr className={`bg-[#63707C] text-white`}>
            <th colSpan={1} className={`text-center border border-[#384958] border-collapse px-4 py-[1rem] font-semibold`}>
                
              </th>
              <th colSpan={4.5} className={`border-r border-solid text-center text-[1rem] border-[#384958] border-collapse px-4 py-[1rem] font-semibold`}>
                보도측 광고 단가
              </th>
              <th colSpan={4.5} className={`  text-nowrap text-[1rem] text-center border-[#384958] border-collapse px-4 py-[1rem] font-semibold`}>
                차도측 광고 단가
              </th>
            </tr>
            {/* 세부 헤더 */}
            <tr className={`bg-gray-500 text-black font-thin`}>
              {data.headers.map((header, index) => (
                <th key={`bo_${index}`} className={`border border-l-0  border-solid text-nowrap text-center bg-[#F0F0F0] border-[#D8D8D8] border-collapse px-4 py-[1rem] font-thin text-[0.9rem]`}>
                  {header}
                </th>
              ))}
              {data.headers2.map((header, index) => (
                <th key={`cha_${index}`} className={`border border-r-0  border-solid text-nowrap text-center bg-[#F0F0F0] border-[#D8D8D8] border-collapse px-4 py-[1rem] font-thin text-[0.9rem]`}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows[0].items.map((item, index) => (
              <tr key={index} className={`hover:bg-gray-100`}>
                {/* 보도측 데이터 */}
                <td className={`border border-l-0 border-solid ${item.duration.includes("수수료")?"":"text-nowrap"}max-w-[100px] border-[#D8D8D8] border-collapse px-4 py-[1rem] bg-[#F0F0F0] text-[0.9rem] text-center`}>{item.duration}</td>
                <td className={`border border-solid text-nowrap border-[#D8D8D8] border-collapse px-4 py-[1rem] font-extrabold text-sm text-end`}>{item.commercial}</td>
                <td className={`border border-solid text-nowrap border-[#D8D8D8] border-collapse px-4 py-[1rem] font-extrabold text-sm text-end`}>{item.public}</td>
                <td className={`border border-solid text-nowrap border-[#D8D8D8] border-collapse px-4 py-[1rem] font-extrabold text-sm text-center`}>{item.unit}</td>
                <td className={`border border-solid text-nowrap border-[#D8D8D8] border-collapse px-4 py-[1rem] font-extrabold text-sm text-center`}>{item.note}</td>
                {/* 차도측 데이터 */}
                <td className={`border border-solid text-nowrap border-[#D8D8D8] border-collapse px-4 py-[1rem] font-extrabold text-sm text-end`}>{data.rows[1].items[index].commercial}</td>
                <td className={`border border-solid text-nowrap border-[#D8D8D8] border-collapse px-4 py-[1rem] font-extrabold text-sm text-end`}>{data.rows[1].items[index].public}</td>
                <td className={`border border-solid text-nowrap border-[#D8D8D8] border-collapse px-4 py-[1rem] font-extrabold text-sm text-center`}>{data.rows[1].items[index].unit}</td>
                <td className={`border border-r-0 border-solid text-nowrap border-[#D8D8D8] border-collapse px-4 py-[1rem] font-extrabold text-sm text-center`}>{data.rows[1].items[index].note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      );
    };
export default priceTable