import Vue from 'vue';

Vue.directive('drag', {
  bind(el, binding) {
    let op = el;  //当前元素

    let self = this; //上下文

    op.onmousedown = function (e) {

      //鼠标按下，计算当前元素距离可视区的距离

      let disX = e.clientX - op.offsetLeft;

      let disY = e.clientY - op.offsetTop;

      document.onmousemove = function (e) {

        //通过事件委托，计算移动的距离

        let l = e.clientX - disX;

        let t = e.clientY - disY;

        //移动当前元素

        op.style.left = l + 'px';

        op.style.top = t + 'px';

        //将此时的位置传出去

        console.log(e.pageX + ',' + e.pageY);
        //binding.value({x:e.pageX,y:e.pageY})

      };

      document.onmouseup = function (e) {


        document.onmousemove = null;

        document.onmouseup = null;

      };

    };
  }
});
