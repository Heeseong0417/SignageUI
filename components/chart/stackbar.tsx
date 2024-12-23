import React from "react";
import ReactApexChart from "react-apexcharts";

const StackedBarChart = () => {
  const options: any = {
    chart: {
      type: "bar",
      stacked: true, // 스택형 막대그래프 활성화
    },
    plotOptions: {
      bar: {
        horizontal: false, // 세로 막대
        columnWidth: '20%',
        borderRadius: 5,

      },
    },
    colors: ["#2E3A59", "#BCC6D7", "#FF6B6B"], // 네트워크 장애, 하드웨어 장애, 시스템 장애 색상
    dataLabels: {
      enabled: true, // 막대 위에 값 표시
      style: {
        fontSize: "12px",
        fontWeight: "bold",
        colors: ["#cccccc"], // 텍스트 색상 (검정색)
      },
      background: {
        enabled: true,
        foreColor: ["#000000"], //
        borderWidth: 0,
        
        padding: 2, // 내부 여백
      },
    },
    xaxis: {
      categories: ["10/7", "10/8", "10/9", "10/10", "10/11", "10/12", "10/13"], // 날짜 라벨
    },
    yaxis: {
      min: 0,
      max: 5, // y축 범위 설정
    },
    legend: {
      position: "top", // 범례 위치
      horizontalAlign: "center",
      labels: {
        colors: ["#2E3A59"], // 범례 텍스트 색상
      },
    },
  };

  const series = [
    {
      name: "네트워크 장애",
      data: [1, 0, 0, 0, 0, 0, 0], // 첫 번째 데이터
    },
    {
      name: "하드웨어 장애",
      data: [3, 0, 0, 2, 1, 0, 1], // 두 번째 데이터
    },
    {
      name: "시스템 장애",
      data: [1, 1, 0, 1, 0, 0, 1], // 세 번째 데이터
    },
  ];

  return (
    <div>
      <h2>장애 통계</h2>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        width={500}
        height={350}
      />
    </div>
  );
};

export default StackedBarChart;