<style scoped>
.box-card {
  width: 100%;
  height: 20rem;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  background-color: #F5F6FA;
  border-radius:5px;
  box-shadow: 3px 2px 5px -1px rgba(128, 131, 135, 0.36);
}
.item-innercontainer {
  min-height: 20px;width: 100%;
}

.item {
  padding: 0.5rem;
  border: solid black 1px;
  margin: 5px;
  width: 95%;
  border-radius: 4px;
}
.item-sub {
    border: solid rgb(0, 128, 255) 1px;
    padding: 0.5rem;
    margin-top:5px;
    border-radius: 4px;
    width:100%;
}
.selectedContainer{
  border-radius: 4px;
  border: solid rgb(0, 102, 255) 1px;
  background-color: rgb(240, 248, 255);
  margin: 5px 5px 5px 5px;
  box-shadow: 2px,2px,2px,grey;
}
.el-card :deep(.el-card__body) {
  padding: 10px;
}
.sub-else{
  display: flex;
  flex-direction: row;
}
.tagsub{
  margin-right: 5px;
}
</style>

<template>
  <div :class="containerStyle">
  <draggable
    v-if="isOutside"
    v-bind="dragOptions"
    tag="div"
    
    item-key="name"
    :list="list"
    :clone="cloneFunction"
    :move="onMove"
    :group="{name:'description',pull:pullfunction,put:putfunction}"
    @choose="onChoose"
    @end="onEnd"
  >
  <template #item="{element}" >
    <el-card v-if="element.name=='选中标签'" class="selectedContainer" shadow="never"  >
    <div>{{ element.name }}</div>
    <el-checkbox v-model="allChecked" @change="checkAllHandle"  :indeterminate="isIndeterminate" >全选</el-checkbox>
    <el-input v-model="searchStuff" clearable class="w-50 m-2" placeholder="搜索" @input="searchMethod">
        <template #prefix>
          <el-icon class="el-input__icon"><search /></el-icon>
        </template>
      </el-input>
    <el-divider />
   
    <nestedDragable   :list="element.children" @itemunselected="unselectItem"  @childExtand="childExtand"/>
    <div v-if="extand" style="display: flex;flex-direction: column;align-items: center;margin-top: 5px;">
    <el-icon @click="shortenChild"><ArrowUpBold /></el-icon></div>
    </el-card>
    <div v-else class="normalItem">
        <el-checkbox class="item"  @change="selectedItem(element)">{{ element.name }}</el-checkbox>
    </div>
  </template>
  </draggable>
  <draggable
    v-else
    v-bind="draginsideOptions"
    tag="div"
    class="item-innercontainer"
    item-key="name"
    :list="list"
    :move="onMove"
    :group="{name:'description',pull:pullfunction,put:putfunction}"
    @choose="onChoose"
    @end="onEnd"
  >
  <template #item="{element}" >
    <div v-if="element.else" class="item-sub sub-else">
    <div style="display:flex;flex-direction:row;align-items: start;width:70%">
      <div v-for="item in findformer(element.else,3,'array')">
        <el-tag class="ml-2 tagsub"  type="info">{{item.name}}</el-tag>
      </div>
      <el-tag class="ml-2 tagsub" v-if="findformer(element.else,3,'num')>0" type="info">+{{findformer(element.else,3,'num')}}</el-tag>
    </div>
    <div style="display:flex;flex-direction:column;align-items: end;width: 30%;">
      <el-icon @click="childExtand"><ArrowDownBold /></el-icon>
    </div>
    </div>
    <el-checkbox v-else class="item-sub" @change="unselectItem(element)" :checked="checked">{{ element.name }}</el-checkbox>
  </template>
  </draggable>
</div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "nestedDragable",
  components: {
    draggable
  },
  mounted(){
    if(this.isOutside){
      this.ismiddle();
    }
    
  },
  computed: {
    dragOptions() {
      return {
        animation: 100,
        disabled: false,
        ghostClass: "ghost",
        
      };
    },
    draginsideOptions() {
      return {
        animation:100,
       
        disabled: false,
        ghostClass: "ghost"
      };
    },
    // this.value when input = v-model
    // this.list  when input != v-model
    containerStyle() {
      return this.isOutside ? "box-card" : "";
    },
  },
  watch:{
    list:{
      handler(newVal,oldVal){
        if(this.isOutside){
          if(!this.isStoreed){
            this.originList=newVal;
            this.isStoreed=true
          }
          if(newVal[0].children.length>0&&newVal.length>1){
            this.isIndeterminate=true;
          }
          if(newVal.length==1&&newVal[0].children.length>0){
            this.isIndeterminate=false;
            this.allChecked=true;
          }
          if(newVal[0].children.length==0){
            this.isIndeterminate=false;
            this.allChecked=false;
          }
        }
      },
      deep:true,
    },
    
  },
  props: {
    extand:false,
    list: {
      required: false,
      type: Array,
      default: null
    },
    isOutside:false,
    currentChosen:{},
  },
  
  data(){
    return({
        childrenIsoutside:false,
        shallSort:true,
        checked:true,
        isIndeterminate:false,
        allChecked:false,
        searchStuff:"",
        originList:[],
        isStoreed:false,
    })
    
  },
methods:{
  findformer(array,num,type){
    if(array.length<=num&&type=='array'){
      return array;
    }
    if(array.length>num&&type=='array'){
      return array.slice(0,num);
    }
    if(array.length>num&&type=='num'){
      console.log(array.length-num)
      return array.length-num;
    }
    else{
      return 0;
    }
  },
  ismiddle(){
    console.log(this.list);
    if(this.list[0].children.length>0&&this.list.length>1){
      this.isIndeterminate=true;
    }
  },
  selectedItem(element){
    this.$emit("itemselected",element);
  },
  unselectItem(element){
    this.$emit("itemunselected",element);
  },
  searchMethod(value){
    this.$emit("list-search",value);
  },
  cloneFunction(element){
    
    if(Object.keys(element).indexOf("children")!=-1){
        return element.children;
    }
    else{
      return element;
    }
  },

  onMove(e, originalEvent){
    console.log(e)
    if(e.dragged.classList.contains("selectedContainer")){
      if(e.to.classList.contains("item-innercontainer")){return false;}
      if(e.from==e.to){
        return false;
      }
    }
    if(e.to!=e.from&&e.to.classList.contains("item-innercontainer")&&e.dragged.classList.contains("normalItem")){return false;}
    if(e.dragged.classList.contains("item-sub")){
      if(e.to.classList.contains("item-innercontainer")){return false;}
    }
    if(e.relatedContext.element){
       if(Object.keys(e.relatedContext.element).indexOf("children")!=-1){
      return false;
    }
    }
    return true;
  },
  onChoose(el){
    if((el.item.classList).contains("selectedContainer")){
      console.log("选择的是选中框")
      this.$emit("itemChosen",true);
    }
    else{
      this.$emit("itemChosen",false);
    }
  },
  onEnd(el){
    var isChangeList=(el.to==el.from);
    console.log(el);
    this.$emit("itemUnchosen",isChangeList);
  },
  checkAllHandle(){
    if(this.list.length>1){this.$emit("chooseAll",true);this.isIndeterminate=false}
    else{
      if(this.list[0].children.length>0){this.$emit("chooseAll",false);this.isIndeterminate=false;}
    }
  },
  pullfunction(){
      if(this.isOutside==true&&this.currentChosen.isSelected){
        return "clone";
      }
      return true;
  },
  putfunction(){
    return true;
  },
  childExtand(){
    this.$emit("childExtand")
  },
  shortenChild(){
    this.$emit("shortenChild");
  }
},
};
</script>