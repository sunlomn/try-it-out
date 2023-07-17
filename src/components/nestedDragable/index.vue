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
  min-height: 20px;
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
  border: solid aliceblue 1px;
  background-color: rgb(240, 248, 255);
  margin: 5px 5px 5px 5px;
}
.el-card :deep(.el-card__body) {
  padding: 10px;
 
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
    <nestedDragable   :list="element.children" @itemunselected="unselectItem" />
    </el-card>
    <div v-else>
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
  <template #item="{element}">
    <el-checkbox class="item-sub" @change="unselectItem(element)" :checked="checked">{{ element.name }}</el-checkbox>
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
    console.log("itemunselected");
  },
  searchMethod(value){
    this.$emit("list-search",value);
  },
  cloneFunction(element){
    
    if(Object.keys(element).indexOf("children")!=-1){
      console.log(element);
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
    if(e.relatedContext.element){
       if(Object.keys(e.relatedContext.element).indexOf("children")!=-1){
      return false;
    }
    }
    return true;
  },
  onChoose(el){
    console.log(el.item.classList);
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
 
},

};
</script>