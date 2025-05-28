/**
 * 给某个dom应用某个样式
 * @param {*} dom dom元素
 * @param {*} styles 样式对象
 */

//应用样式方法
export function applyStyles(dom,...styles){
  //处理styles中剩余的参数完成总的样式添加--第一个样式参数为公共样式，后续为典例参数
  let targetStyles = {};
  for(const style in styles){
    targetStyles = {
      ...targetStyles,
      ...style,//style为某个样式块中的内容，故同样需要使用...展开，同时遍历的styles的次数为剩余参数总数
    }
  }

  for(const key in targetStyles){//遍历对象的方式，其中key为属性名
    const value = targetStyles[key];//索引得到属性值  
    dom.style[key] = value;//向对象中添加新的键值对的方法
  }
}