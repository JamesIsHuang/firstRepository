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
  for(var date in chartData){
    color = '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);
    switch(pageState.nowGraTime){
      case 'day':
        width = 10;
        break;
      case 'week':
        width = 20;
        break;
      default:
        width = 50;
        break;  
    }
    var div = "<div style = \"height:"+chartData[date]+"px;background-color:"+color+";width:"+width+"px;margin:10px 2px\" title='"+date+":"+chartData[date]+"'></div>";
    b += div;
  }
  chart.innerHTML = b;
}
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  var a = document.getElementsByName('gra-time');
  var value = null;
  for(var i=0;i<a.length;i++){
    if(a[i].checked){
      value = a[i].value
    }
  }
  if(value!=pageState.nowGraTime){
    switch(pageState.nowSelectCity){
          case '北京':
            citydata = aqiSourceData['北京'];
            break;
          case '上海':
            citydata = aqiSourceData['上海'];
            break; 
          case '广州':
            citydata = aqiSourceData['广州'];
            break;
          case '深圳':
            citydata = aqiSourceData['深圳'];
            break;
          case '成都':
            citydata = aqiSourceData['成都'];
            break;
          case '西安':
            citydata = aqiSourceData['西安'];
            break;  
          case '福州':
            citydata = aqiSourceData['福州'];
            break;
          case '厦门':
            citydata = aqiSourceData['厦门'];
            break;
          case '沈阳':
            citydata = aqiSourceData['沈阳'];
            break;         
        }
    switch(value){
      case 'day':
        chartData = citydata;
        pageState.nowGraTime = 'day';
        break;
      case 'week':
        dataprocess.week(citydata);
        pageState.nowGraTime = 'week';
        break;
      case 'month':
        dataprocess.month(citydata);
        pageState.nowGraTime = 'month';
        break;  
    }
    renderChart();
  }
  
  // 确定是否选项发生了变化 

  // 设置对应数据

  // 调用图表渲染函数
  
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(value) {
  // 确定是否选项发生了变化 
  if(value!=pageState.nowSelectCity){
    switch(value){
      case '北京':
      chartData = aqiSourceData['北京'];
      pageState.nowSelectCity = "北京";
      break;
      case '上海':
      chartData = aqiSourceData['上海'];
      pageState.nowSelectCity = "上海";
      break;
      case '广州':
      chartData = aqiSourceData['广州'];
      pageState.nowSelectCity = "广州";
      break; 
      case '深圳':
      chartData = aqiSourceData['深圳'];
      pageState.nowSelectCity = "深圳";
      break; 
      case '成都':
      chartData = aqiSourceData['成都'];
      pageState.nowSelectCity = "成都";
      break; 
      case '西安':
      chartData = aqiSourceData['西安'];
      pageState.nowSelectCity = "西安";
      break;
      case '福州':
      chartData = aqiSourceData['福州'];
      pageState.nowSelectCity = "福州";
      break;
      case '厦门':
      chartData = aqiSourceData['厦门'];
      pageState.nowSelectCity = "厦门";
      break;
      case '沈阳':
      chartData = aqiSourceData['沈阳'];
      pageState.nowSelectCity = "沈阳";
      break; 
    }
    switch(pageState.nowGraTime){
      case 'day':
        chartData = chartData;
        break;
      case 'week':
        dataprocess.week(chartData);
        break;
      case 'month':
        dataprocess.month(chartData);
        break;    
    }
    renderChart();
  }
  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  document.getElementById('form-gra-time').addEventListener('click',function(event){
    if(event.target.nodeName.toLowerCase()==='input'){
      graTimeChange();
    }
  })
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  var select = document.querySelectorAll('#city-select option');
  document.getElementById('city-select').addEventListener('click',function(event){
      citySelectChange(event.target.value);
  })
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

  // 给select设置事件，当选项发生变化时调用函数citySelectChange

}

/**
 * 初始化图表需要的数据格式
 */
var dataprocess = {
  week : function(data){
          var b = {},
              i = 5,
              j = 1;
          for(var k = 1; k<15; k++){
            b["第"+k+"周"] = 0;
          }
          for(var date in data){
            b["第"+j+"周"] += parseInt(data[date]);
            i = i + 1;
            if(i == 8){
              i = 1;
              j = j + 1;
            }
          }
          b["第1周"] = parseInt(b["第1周"]/3);
          b["第14周"] = parseInt(b["第14周"]/4);
          for(var k= 2;k<14;k++){
            b["第"+k+"周"] = parseInt(b["第"+k+"周"]/7);
          }
          chartData = b;
        },
  month : function(data){
          var a = new Array(),
              b = {
                  "2016年1月" : 0,
                  "2016年2月" : 0,
                  "2016年3月" : 0
              },
              i = 1,
              j = 1;
          for(var date in data){
            a[j] = parseInt(data[date]);
            j = j + 1;
          }
         
          for(var i=1;i<=31;i++){
            b["2016年1月"] += a[i];
          }
          for(var i=32;i<=60;i++){
            b["2016年2月"] += a[i];
          }
          for(var i=61;i<=91;i++){
            b["2016年3月"] += a[i];
          }
          b["2016年1月"] = parseInt(b["2016年1月"]/31);
          b["2016年2月"] = parseInt(b["2016年2月"]/29);
          b["2016年3月"] = parseInt(b["2016年3月"]/31);
          chartData = b;
          console.log(chartData);
  }
} 
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  chartData = aqiSourceData['北京'];
  renderChart();
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();