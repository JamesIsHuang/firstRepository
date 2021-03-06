/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: '北京',
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
var chart = document.getElementsByClassName('aqi-chart-wrap')[0]; 
function renderChart() {
  var b = "",
      color = null,
      width = 10;
  switch(pageState.nowGraTime){
      case 'day':
        width = 10;
        break;
      case 'week':
        width = 40;
        break;
      default:
        width = 80;
        break;  
    }    
  for(var date in chartData){
    color = '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);
    var div = "<div style = \"height:"+chartData[date]+"px;background-color:"+color+";width:"+width+"px;margin:10px 2px\" title='"+date+":"+chartData[date]+"'></div>";
    b += div;
  }
  chart.innerHTML = b;
}
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(value) {
  // 确定是否选项发生了变化 

  // 设置对应数据

  // 调用图表渲染函数
  if(value!=pageState.nowGraTime){
    pageState.nowGraTime = value;
    console.log(pageState.nowGraTime);
    initAqiChartData(); 
    renderChart();
  }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(value) {
  // 确定是否选项发生了变化
   // 设置对应数据
  // 调用图表渲染函数 
  if(value!=pageState.nowSelectCity){
    pageState.nowSelectCity = value;
    initAqiChartData();
    renderChart();
  }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  document.getElementById('form-gra-time').addEventListener('click',function(event){
      graTimeChange(event.target.value);
  })
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  document.getElementById('city-select').addEventListener('click',function(event){
      citySelectChange(event.target.value);
  })
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var nowCityData = aqiSourceData[pageState.nowSelectCity];
  switch(pageState.nowGraTime){
    case 'day':
      chartData = nowCityData;
      break;
    case 'week':
      chartData = {};
      var countSum=0, daySum=0, week=0;
      for(var item in nowCityData){
          countSum += nowCityData[item];
          daySum ++;
          if ((new Date(item)).getDay() == 6 ) {
            week ++;
            chartData['第'+week+'周'] = Math.floor(countSum/daySum);;
            countSum = 0;
            daySum = 0;
          }        
      }
      if (daySum!=0) {
          week ++;
          chartData['第'+week+'周'] = Math.floor(countSum/daySum);
      }
      break;  
    case 'month':
      chartData = {};
      var countSum = 0,daySum = 0, month = 0;
      for(var item in nowCityData){
         countSum += nowCityData[item];
         daySum ++;
         if ((new Date(item)).getMonth() !== month) {
            month ++;
            chartData['第'+month+'月'] = Math.floor(countSum/daySum);
            countSum = 0
            daySum = 0;
         }
      }
      if(daySum!=0){
         month++;
         chartData['第'+month+'月'] = Math.floor(countSum/daySum);
      }
      break;
  }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();