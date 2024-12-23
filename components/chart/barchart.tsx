"use client"
import Chart from "react-apexcharts";
const  options_default:any = {
    series: [{
    name: '게시수',
    data: [44, 55, 57, 56, 61, 58, 63]
  },
  {
    name: '실패수',
    data: [44, 55, 57, 56, 61, 58, 63]
  }
],
    chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      borderRadius: 5,
      borderRadiusApplication: 'end'
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['11/17', '11/17', '11/17', '11/17', '11/17', '11/17', '11/17'],
  },
  yaxis: {
    title: {
      text: '$ (thousands)'
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: function (val: string) {
        return "$ " + val + " thousands"
      }
    }
  }
  };
const BarChart = ({options=options_default}:any)=>{


    return(<>
    <div className="w-full h-full  flex flex-col items-center justify-center">
            <Chart
              options={options}
              series={options.series}
              type="bar"
              height="100%" // 높이를 부모 컨테이너에 맞춤
              width="100%"  // 너비를 부모 컨테이너에 맞춤
            />
          </div>
    
    </>)
}

export default BarChart