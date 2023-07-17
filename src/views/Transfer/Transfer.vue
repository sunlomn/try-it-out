<template>
    <div>{{ list }}</div>
    <div>{{ list2 }}</div>
    <el-row >
      <el-col :span="6">
        <h3>Nested draggable</h3>
        <nested-draggable :list="list" :subitemClass="selectedItems" :isOutside="isOUtside" :currentChosen="currentChosen" 
        @itemselected="itemupdateleft" @itemunselected="itemunselectedleft" @itemChosen="itemChosenLeft" @itemUnchosen="itemUnchosen" @chooseAll="chooseHandleLeft"
        @list-search="listSearchleft"/>
      </el-col>
      <div style="align-items: center;display: flex;margin: 10px;flex-flow: column">
        <el-row style="margin:10px"><el-button type="primary" @click.native="l2r"><el-icon><DArrowRight /></el-icon></el-button>  </el-row>
        <el-row><el-button type="primary" @click.native="r2l"><el-icon><DArrowLeft /></el-icon></el-button> </el-row>
      </div>
      <el-col  :span="6">
        <h3>Nested draggable</h3>
        <nested-draggable :list="list2" :subitemClass="selectedItems" :isOutside="isOUtside" :currentChosen="currentChosen" 
        @itemselected="itemupdateRight" @itemunselected="itemunselectedRight" @itemChosen="itemChosenRight" 
        @itemUnchosen="itemUnchosen" @chooseAll="chooseHandleRight" @list-search="listSearchRight"/>
      </el-col>
    </el-row>
  </template>
  
  <script>
  import nestedDraggable from "@/components/nestedDragable/index.vue";
  import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'
  export default {
    name: "nested-example",
    display: "Nested",
    order: 15,
    components: {
      nestedDraggable
    },
    data() {
      return {
        currentChosen:{
          currentSide:-1,
          isSelected:false,
        },
        isOUtside:true,
        selectedItems:"selectedItems item",
        list: [
          {
            name: "选中标签",
            children: [
              {name: "贪玩蓝月",id:3},
              {name: "task 4",id:4},
              
            ]
          },
          {
            name: "task 3",id:1,
          },
          {
            name: "贪吃蛇",id:9,
          },
          {
            name: "贪心鼠",id:19,
          },
          {
            name: "task 5",id:2,
           
          }
        ],
        list2: [
        {
            name: "选中标签",
            children: [
              {name: "task 7"},
              {name: "task 12"},
              {name: "task 11"},
              {name: "task 13"},
            ]
          },
          {
            name: "task 6",
            
          },
          {
            name: "task 8",
          },
          {
            name: "task 10",
           
          }
        ]
      };
    },
    methods:{
      itemupdateleft(el){
        console.log(JSON.stringify(el));
        var indexRule=(element)=>element.name==el.name&&element.id==el.id;
        var index=this.list.findIndex(indexRule)
        console.log(index);
         this.list[0].children.push(this.list[index]);
         this.list.splice(index,1);
      },
      itemunselectedleft(el){
        var indexRule=(element)=>element.name==el.name&&element.id==el.id;
        var index=this.list[0].children.findIndex(indexRule)
        console.log(index);
         this.list.push(this.list[0].children[index]);
         this.list[0].children.splice(index,1);
      },
      itemupdateRight(el){
        console.log(JSON.stringify(el));
        var indexRule=(element)=>element.name==el.name&&element.id==el.id;
        var index=this.list2.findIndex(indexRule)
        console.log(index);
         this.list2[0].children.push(this.list2[index]);
         this.list2.splice(index,1);
      },
      itemunselectedRight(el){
        var indexRule=(element)=>element.name==el.name&&element.id==el.id;
        var index=this.list2[0].children.findIndex(indexRule)
        console.log(index);
         this.list2.push(this.list2[0].children[index]);
         this.list2[0].children.splice(index,1);
      },
      itemChosenLeft(isSelected){
        this.currentChosen.currentSide=0;
        this.currentChosen.isSelected=isSelected;
        console.log(this.currentChosen);
      },
      itemChosenRight(isSelected){
        this.currentChosen.currentSide=1;
        this.currentChosen.isSelected=isSelected;
        console.log(this.currentChosen);
      },
      itemUnchosen(isSameList){
        console.log(this.currentChosen);
        if(this.currentChosen.isSelected&&!isSameList){
          if(this.currentChosen.currentSide==0){
            this.list[0].children.splice(0,this.list[0].children.length);
          }
          if(this.currentChosen.currentSide==1){this.list2[0].children.splice(0,this.list2[0].children.length);}
        }
        this.currentChosen.currentSide=-1;
        this.currentChosen.isSelected=false;
      },
      chooseHandleLeft(checked){
        if(checked){
        for(var i=1;i<this.list.length;i++){
         this.list[0].children.push(this.list[i]);
        }
        this.list.splice(1,this.list.length-1);
        }
        else{
        for(var i=0;i<this.list[0].children.length;i++){
         this.list.push(this.list[0].children[i]);
        }
        this.list[0].children.splice(0,this.list[0].children.length);
        }
      },
      chooseHandleRight(checked){
        if(checked){
        for(var i=1;i<this.list2.length;i++){
         this.list2[0].children.push(this.list2[i]);
        }
        this.list2.splice(1,this.list2.length-1);
        }
        else{
        for(var i=0;i<this.list2[0].children.length;i++){
         this.list2.push(this.list2[0].children[i]);
        }
        this.list2[0].children.splice(0,this.list2[0].children.length);
        }
      },
      l2r(){
        console.log("l2r");
        for(var i=0;i<this.list[0].children.length;i++){
          this.list2.push(this.list[0].children[i]);
        }
        this.list[0].children.splice(0,this.list[0].children.length);
      },
      r2l(){
        for(var i=0;i<this.list2[0].children.length;i++){
          this.list.push(this.list2[0].children[i]);
        }
        this.list2[0].children.splice(0,this.list2[0].children.length);
      },
      listSearchleft(value){
        var newList=[];
       
        for(var i=1;i<this.list.length;i++){
          if(this.list[i].name.includes(value)){
            newList.unshift(this.list[i]);
          }
          else{
            newList.push(this.list[i]);
          }
        }
        newList.unshift(this.list[0]);
        this.list=newList;
      },
      listSearchRight(value){
        var newList=[];
       
        for(var i=1;i<this.list2.length;i++){
          if(this.list2[i].name.includes(value)){
            newList.unshift(this.list2[i]);
          }
          else{
            newList.push(this.list2[i]);
          }
        }
        newList.unshift(this.list2[0]);
        this.list2=newList;
      }
    },
    watch:{
      list2:{
        handler(newVal,oldVal){
          console.log("list2");
          var index=0;
          for(;index<newVal.length;index++){
           
            if(Array.isArray(newVal[index])){
              console.log(newVal[index]);
              var oldArray=newVal[index];
              newVal.splice(index,1);
              var i=0;
              for(;i<oldArray.length;i++){
                newVal.splice(index,0,oldArray[i]);
              }
            }
          }
        },
        deep:true,
      },
      list:{
        handler(newVal,oldVal){
          console.log("list1");
          var index=0;
          for(;index<newVal.length;index++){
           
            if(Array.isArray(newVal[index])){
              console.log(newVal[index]);
              var oldArray=newVal[index];
              newVal.splice(index,1);
              var i=0;
              for(;i<oldArray.length;i++){
                newVal.splice(index,0,oldArray[i]);
              }
            }
          }
        },
        deep:true,
      },
    }
  };
  </script>
<style scoped>
.row{
    display: flex;
    flex-direction: row;
}
</style>


<!-- 
<template>
<div class="container">
<div id="outer-list" class="sortable-list">
    <el-checkbox
    v-model="checkAll"
    :indeterminate="isIndeterminate"
    @change="handleCheckAllChange"
    >全选</el-checkbox>
    <el-divider />
    <div class="incheck sortable-item">
        已选择
        <div id="inner-list" class="checkedList">
            <el-checkbox class="sortable-item" v-for="(item,index) in checkedListLeft" :label="item.name" @change="uncheckLeft(index)" ></el-checkbox>
        </div>
    </div>
  <el-checkbox class="sortable-item" v-for="(item,index) in unCheckedListLeft" :label="item.name" @change="checkLeft(index)" :checked="item.checked" ref="uncheckedItems" ></el-checkbox>
  <div class="sortable-item">Item 2</div>
  <div class="sortable-item">Item 3</div>
  <div class="sortable-item">
    Item 4 (Nested)
    <div id="inner-list" class="sortable-list inner">
      <div class="sortable-item">Nested Item 1</div>
      <div class="sortable-item">Nested Item 2</div>
      <div class="sortable-item">Nested Item 3</div>
    </div> 
  </div>
</div>
<div id="outer-list2" class="sortable-list">
  <div class="sortable-item">Item 1</div>
  <div class="sortable-item">Item 2</div>
  <div class="sortable-item">Item 3</div>
  <div class="sortable-item">
    Item 4 (Nested)
    <div id="inner-list2" class="sortable-list inner">
      <div class="sortable-item">Nested Item 1</div>
      <div class="sortable-item">Nested Item 2</div>
      <div class="sortable-item">Nested Item 3</div>
    </div>
  </div>
</div>
</div>



</template>

<script>
import Sortable from 'sortablejs'
export default {
    data() {
        return {
           isIndeterminate:false,
           checkAll:false,
           checkedListLeft:[],
           unCheckedListLeft:[
            {name:"nninn","checked":false},{name:"onoiin","checked":false},{name:"asd","checked":false}],
            coral:"#ff7f50"
        }
    },
    mounted () {
        const outerList = document.getElementById('outer-list');
        const innerList = document.getElementById('inner-list');
        const outerList2 = document.getElementById('outer-list2');
        const innerList2 = document.getElementById('inner-list2');
        new Sortable(outerList, {
        group: 'shared',
        nested: true,
        animation: 1000,
        onAdd:function(event){
            var nodes=event.item.childNodes[1];
            console.log(nodes.childNodes);
            for(var i=0;i<nodes.childNodes.length;i++){
                console.log(nodes.childNodes[i]);
                outerList.insertBefore(nodes.childNodes[i].cloneNode(true),outerList.childNodes[event.newIndex+i]);
            }
            outerList.removeChild(event.item);

        }
        });
        new Sortable(outerList2, {
        group: 'shared',
        nested: true,
        animation: 1000,
        onAdd:function(event){
            var nodes=event.item.childNodes[1];
            console.log(nodes.childNodes);
            for(var i=0;i<nodes.childNodes.length;i++){
                console.log(nodes.childNodes[i]);
                outerList.insertBefore(nodes.childNodes[i].cloneNode(true),outerList.childNodes[event.newIndex+i]);
                
            }
            console.log(event.item);
            outerList2.removeChild(event.item);

        }
        });
        new Sortable(innerList, {
        group: 'shared',
        });
        new Sortable(innerList2, {
        group: 'shared',
        });
        },
    methods:{
        checkLeft(index){
            this.checkedListLeft.push(this.unCheckedListLeft[index]);
            this.$refs.uncheckedItems[index].$el.style="display:none";
            // this.unCheckedListLeft[index].checked=false;
            // this.unCheckedListLeft.splice(index,1);

        }
    }
}
</script>
<style scoped>
.sortable-list {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #ccc;
  width: 200px;
}
.sortable-item {
  padding: 10px;
  margin-bottom: 5px;
  background-color: #f0f0f0;
}
.incheck{
    border: 5px;
    border-radius: 5px;
    background-color: bisque;
    border:solid;
    border-color: #ff7f50;
    color: coral;
    min-height: 60px;
}
.inner{
    width:180px;
}

.container{
    display: flex;
    flex-direction: row;
    margin:20px;
}
</style> -->