<template>
    <div class="Echarts">
      <div id="main" style="width: 600px;height:400px;"></div>
    </div>
  </template>
  
  <script>
  import * as echarts from "echarts";
  import { UniversalTransition } from 'echarts/features';
  echarts.use(UniversalTransition);
  import hangzhou from './mapData.json'
  import xihu from './西湖区.json'
  export default {
    name: 'Echarts',
    data(){
      return{
        placeToFocus:"",
      }
      
    },
    methods:{
    myEcharts(){
      var isRoam=false;
        // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'));
      echarts.registerMap('HZ', hangzhou);
      echarts.registerMap('xihu',xihu);
        // 指定图表的配置项和数据
      var option;
      myChart.showLoading();
        //2、 这个geoJson数据可以自己在网上找相关的浙江省的数据，或者从后端的接口来调用数据
      myChart.hideLoading();
        //下面这个geoJSON就是上面通过import 引入的自己制作的mapData.js文件
      
      option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} (分)'
        },
        visualMap: {
          show: true,
          x: 'left',
          y: '58%',//可以设置左边提示的位置；
          itemWidth: 12,
          itemHeight: 12,
          textStyle: {
            color: '#fff' // 值域文字颜色
          },
        },
        series: [
          {
            name: '杭州市地图',
            type: 'map',
            mapType: 'HZ', // 自定义扩展图表类型
            roam: isRoam, //支持拖拽缩放
            UniversalTransition: {
              enable: true,
              divideShape: 'split',
            },
            scaleLimit: {
          //滚轮缩放的极限控制
              min: 1, //缩放最小大小
              max: 4, //缩放最大大小
            },
            // 设置每一块中具体文字
            label: {
              normal: {
                show: true,
                formatter: function (params) {
                  return params.name + "\n" + params.value;
                },
                textStyle: {
                  fontWeight: 'normal',
                  fontSize: 12,
                  color: '#fff'
                },
              },
            },
            itemStyle: {
              //设置边框为白色
              normal: {
                borderWidth: 0.5,//边际线大小
                borderColor: '#fff',//边界线颜色
              },
            },
            data: [
               {
                name: '拱墅区',
                value: 87,
               },
              {
                name: '西湖区',
                value: 87,
                groupId: '西湖区',
               },
              {
                name: '上城区',
                value: 22,
               },
               {
                name: '钱塘区',
                value: 65,
               },
               {
                 name: '萧山区',
                 value: 43,
               },
               {
                 name: '滨江区',
                 value: 11,
               },
               {
                 name: '临平区',
                 value: 54,
               },
               {
                 name: '富阳区',
                 value: 33,
               },
               {
                 name: '临安区',
                 value: 56,
               },
               {
                 name: '余杭区',
                 value: 12,
               },
               {
                 name: '桐庐县',
                 value: 78,
               },
               {
                 name: '建德市',
                 value: 43,
               },
            {
                 name: '淳安县',
                 value: 43,
               },
             ],
          }
        ]
      };

      var optionXihu = {
        series: [
          {name: '西湖区地图',
            type: 'map',
            mapType: 'xihu',
            roam: true,
            universalTransition: {
              enabled: true,
              divideShape: 'split'
            },
            dataGroupId:"西湖区",
            data:[{'西湖区':1}],
            scaleLimit: {
              min:0.5,
              max:4,
            },
            itemStyle: {
              //设置边框为白色
              normal: {
                borderWidth: 0.5,//边际线大小
                borderColor: '#fff',//边界线颜色
              },
            },
          }
        ]
      };
  
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            myChart.on("mouseover",function(p){
                console.log(p.name);
                this.placeToFocus=p.name;
                myChart.setOption({series:[{roam:true}]})
            })
            myChart.on("georoam",function(params){
                console.log(params);
                const pointInPixel = [params.offsetX, params.offsetY]
                var _option=myChart.getOption();
                var _zoom = _option.series[0].zoom;
                console.log(_zoom);
                if(_zoom>=4&&this.placeToFocus=="西湖区"){
                  console.log("change")
                  myChart.setOption(optionXihu,true);
                }
               
   
            })
            myChart.on("mouseout",p=>{
              myChart.setOption({series:[{roam:false}]})
            })
            }
    },
    mounted() {
        this.myEcharts();
    }
  }
  </script>
  
  <style>
  
  </style>
  