# vptry

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
## vue.dragable 踩坑经验
### group属性的添加与使用  
group属性在vue.dragable的案例中存在通过option对象使用create方法注入的情况，但是在vuedragable.next实际使用中，发现在option对象中定义group会将group选项全部作为一个字符串进行使用，因而建议在dragable标签中使用：group进行传值。
