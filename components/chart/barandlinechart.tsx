"use client"
import Chart from "react-apexcharts";

const  options_default:any =  {
  series: [{
  name: 'Income',
  type: 'column',
  data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
}, {
  name: 'Cashflow',
  type: 'column',
  data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
}, {
  name: 'Revenue',
  type: 'line',
  data: [20, 29, 37, 36, 44, 45, 50, 58]
}],
  chart: {
  height: 350,
  type: 'line',
  stacked: false
},
colors: ["#31A9F1","#AFB7BE","#FF8000"],
plotOptions: {
  bar: {
    dataLabels: {
      position: "top", // 데이터 레이블 위치 설정 ("top" 또는 "center")
      style: {
        colors: ["#000"], // 텍스트 색상
        
      }
    }, 
    horizontal: false,
    columnWidth: '55%',
    borderRadius: 5,
    borderRadiusApplication: 'end'
  },
},
dataLabels: {
  enabled: true,
  offsetY: -20, 
  formatter: (val: any, { seriesIndex, w }: any) => {
    // 시리즈 타입이 "bar"인 경우에만 레이블 표시
    const seriesType = w.config.series[seriesIndex].type;
    return seriesType === "column" ? val : "";
  },
  style: {
    fontSize: "12px",
    fontWeight: "bold",
    
  },

  background: {
    enabled: true, // 백그라운드 활성화
    foreColor: ["#31A9F1"], // 텍스트 색상 (백그라운드 설정에서 사용)
    color: ["#007bff"],  //
    
    padding: 4, // 내부 여백
    
    dropShadow: {
      enabled: true, // 그림자 활성화
      top: 1,
      left: 1,
      blur: 2,
      color: "rgba(0, 0, 0, 0.25)", // 그림자 색상
      opacity: 1,
    },
  }

},
stroke: {
  width: [1, 1, 4]
},
title: {
  text: 'XYZ - Stock Analysis (2009 - 2016)',
  align: 'left',
  offsetX: 110
},
xaxis: {
  categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
},
yaxis: [
  {
    seriesName: 'Income',
    axisTicks: {
      show: true,
    },
    axisBorder: {
      show: true,
     
    },
    labels: {
      style: {
       
      }
    },

    
    tooltip: {
      enabled: true
    }
  },
  {
    seriesName: 'Cashflow',
    opposite: true,
  



  },
  {
    seriesName: 'Revenue',
    opposite: false,
 


  },
],
tooltip: {
  fixed: {
    enabled: true,
    position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
    offsetY: 30,
    offsetX: 60
  },
},
legend: {
  horizontalAlign: 'left',
  offsetX: 40
}
};
const BarAndLineChart = ({options=options_default}:any)=>{


    return(<>
    <div className="overflow-hidden flex flex-col items-center justify-center">
            <Chart
              options={options}
              series={options.series}
              type="bar"
              height="380" // 높이를 부모 컨테이너에 맞춤
              width="550"  // 너비를 부모 컨테이너에 맞춤
            />
          </div>
    
    </>)
}

export default BarAndLineChart