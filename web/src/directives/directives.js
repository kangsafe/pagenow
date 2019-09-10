import Vue from 'vue';

Vue.directive('resize', {
  bind(el, binding) {
    let width = '', height = '';

    function get() {
      const style = document.defaultView.getComputedStyle(el);
      if (width !== style.width || height !== style.height) {
        binding.value({width, height});
      }
      width = style.width;
      height = style.height;
    }

    el.__vueReize__ = setInterval(get, 100);
  },
  unbind(el) {
    clearInterval(el.__vueReize__);
  },
});
