<template>
<!--input file打开文件选择框，获取文件信息，并传参给readWorkbookFromLocalFile函数-->
<form>
    <el-radio-group v-model="chartType" >
        <el-radio-button label="饼图" />
        <el-radio-button label="折线图" />
        <el-radio-button label="堆叠面积图" />
        <el-radio-button label="关系图" />
    </el-radio-group>

    <label class="upload btn" for="upload">上传文件</label><span>{{ fileName }}</span>
    <input type="file" id="upload" style="display:none" ref="file" @change="readWorkbook()"/>
</form>
<div v-if="isShow" ref="chartplace" style="width:800px, height:400px">
</div>
<div v-else style="width: 800px;height: 400px;"><el-empty >暂无数据</el-empty></div>

</template>

<script>
import XLSX from "xlsx";
import * as echarts from "echarts";
export default{
data(){
    return({
        data1:[],
        data2:[],
        time:0,
        fileName:"",
        chartType:"折线图",
        haveData: false,
        isShow:false,
        myChart:null,

    })
},
methods:{
    readWorkbook(){
        var file=this.$refs.file.files[0];
        this.fileName=file.name;
        console.log(file);
        this.isShow = true;
        switch(this.chartType){
            case "折线图":
            this.readWorkbookFromLocalFileLine(file).then(result=>{
            this.chartInit(result,this.chartType);})
            break;
            case "饼图":
            this.readWorkbookFromLocalFilePie(file).then(result=>{
                this.chartInit(result,this.chartType);
            })
            break;
            case "堆叠面积图":
            this.readWorkbookFromLocalStack(file).then(result=>{

            })
            
        }
        
        this.$refs.file.value=null;
    },
    readWorkbookFromLocalFileLine(file) {
        return new Promise((resolve,rejects)=>{
            var reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = function(e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, {type: 'binary'});
            console.log(workbook);
            var chartName=workbook.SheetNames[0];
            // 处理excel文件
            var datas = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
            console.log(datas);
            var result;
            var title=[];
            var data1=[];
            if(datas.length > 0){
                for(var index in datas){ // datas数组，index为索引
                    for(var key in datas[index]){ // datas[index]对象,key为键
                        if (-1 === title.indexOf(key)) {
                            title.push(key);
                        }
                    }
                }
                console.log(title);
                for(var i=0;i<datas.length;i++){
                    var a=datas[i].time*24;
                    var b=(a-parseInt(a))*60;
                    var c=(b-parseInt(b))*60;
                    var time="";
                    var sum;
                    time=parseInt(a).toString()+":"+parseInt(b).toString()+":"+parseInt(c).toString();
                    sum=datas[i].sum;
                    var item={"time":time,"sum":sum};
                    data1.push(item);
                }
                result={"chartname":chartName,'data':data1}
                resolve(result);
            }
            };
        })
    },
    readWorkbookFromLocalFileStack(file) {
        return new Promise((resolve,rejects)=>{
            var reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = function(e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, {type: 'binary'});
            console.log(workbook);
            var chartName=workbook.SheetNames[0];
            // 处理excel文件
            var datas = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
            console.log(datas);
            var result;
            var title=[];
            var data1=[];
            if(datas.length > 0){
                for(var index in datas){ // datas数组，index为索引
                    for(var key in datas[index]){ // datas[index]对象,key为键
                        if (-1 === title.indexOf(key)) {
                            title.push(key);
                        }
                    }
                }
                console.log(title);
                for(var i=0;i<datas.length;i++){
                    var a=datas[i].time*24;
                    var b=(a-parseInt(a))*60;
                    var c=(b-parseInt(b))*60;
                    var time="";
                    var sum;
                    time=parseInt(a).toString()+":"+parseInt(b).toString()+":"+parseInt(c).toString();
                    sum=datas[i].sum;
                    var item={"time":time,"sum":sum};
                    data1.push(item);
                }
                result={"chartname":chartName,'data':data1}
                resolve(result);
            }
            };
        })
    },
    readWorkbookFromLocalFilePie(file) {
        return new Promise((resolve,rejects)=>{
            var reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = function(e) {
            var data = e.target.result;
            var fileResult = XLSX.read(data, {type: 'binary'});
            console.log(fileResult);
            var chartName=fileResult.SheetNames[0];
            // 处理excel文件
            var datas = XLSX.utils.sheet_to_json(fileResult.Sheets[fileResult.SheetNames[0]]);
            console.log(datas);
            var result;
            var title=[];
            var data1=[];
            if(datas.length > 0){
                for(var index in datas){ // datas数组，index为索引
                    for(var key in datas[index]){ // datas[index]对象,key为键
                        if (-1 === title.indexOf(key)) {
                            title.push(key);
                        }
                    }
                }
                console.log(title);
                for(var i=0;i<datas.length;i++){
                    var companyName = datas[i].companyName
                    var outcome = datas[i].Outcome;
                    var item = {"companyName":companyName,"outcome":outcome};
                    data1.push(item);
                }
                result={"chartname":chartName,'data':data1}
                resolve(result);
            }
            };
        })
    },
    chartInit(result,type){
        if(!this.haveData){
            this.$refs.chartplace.style.height="400px";
            this.$refs.chartplace.style.width="800px";
            this.myChart = echarts.init(this.$refs.chartplace);
            this.myChart.resize();
            this.haveData=true;
        }
        switch(type){
            case "折线图":
                this.chartLine(result,type);
                break;
            case "饼图":
                this.chartPie(result,type);
                break;

        }  
    },
    chartLine(result){
        var data=result.data;
        console.log(data);
        var timeList = [];
        var sumList = [];
        var time=data.forEach(element => {
            timeList.push(element.time);
            sumList.push(element.sum);
        });
        
        this.time++;
        console.log(this.time);
       
        var option = {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                left: 'center',
                text:result.chartname,
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: timeList,
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%']
            },
            series: [
                {
                    name: '人流量',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
 
                    itemStyle: {
                        color: 'rgb(255, 70, 131)'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgb(255, 158, 68)'
                        }, {
                            offset: 1,
                            color: 'rgb(255, 70, 131)'
                        }])
                    },
                    data: sumList,
                }
            ]
        };
        console.log(option);
        this.myChart.setOption(option,true);
    },

    chartPie(result){
        var data=result.data;
        var companyList = [];
        var placeholder = 0;
        data.forEach(element => {
            console.log(element);
            var item={"name":element.companyName, "value" : element.outcome};
            companyList.push(item);
            placeholder += element.outcome;
        });
        companyList.push({
          value: placeholder,
          itemStyle: {
            // stop the chart from rendering this piece
            color: 'none',
            decal: {
              symbol: 'none'
            }
          },
          label: {
            show: false
          }
        });
        var option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center',
                // doesn't perfectly work with our tricks, disable it
                selectedMode: false
            },
            toolbox: {
                feature: {
                  
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [
                {
                name: '产出情况',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '70%'],
                // adjust the start angle
                startAngle: 180,
                itemStyle:{
                    borderRadius:10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    formatter(param) {
                    // correct the percentage
                    return param.name + ' (' + param.percent * 2 + '%)';
                    }
                },
                data: companyList,
                }
            ]
        };
        console.log(option);
        this.myChart.setOption(option,true);
        
    }

}
}
</script>

<style scoped>
.btn{
    border-radius: 20px;
    background-color: aliceblue;
    border-color: null;
    padding : 10px;
}
form{
    display:flex;
    align-items: center;
}
</style>