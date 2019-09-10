
const borderStyles = [
  {
    label: '实线',
    value: 'solid'
  },
  {
    label: '虚线',
    value: 'dashed'
  },
  {
    label: '点线',
    value: 'dotted'
  },
  {
    label: '空',
    value: 'none'
  },
];

const display = [
  {
    label: '显示',
    value: 'block'
  },
  {
    label: '隐藏',
    value: 'none'
  }
];

const layoutSchemes = [
  {
    label: '响应式栅格布局',
    value: 'ReactiveLayoutCanvas'
  },
  {
    label: '绝对布局',
    value: 'AbsoluteLayoutCanvas'
  }
];

const cursor = [
  {
    label: '默认',
    value: 'default'
  },
  {
    label: '指针',
    value: 'pointer'
  }
];

const animationDelayClass = [
  {
    label: '1秒',
    value: 'delay-1s'
  },
  {
    label: '2秒',
    value: 'delay-2s'
  },
  {
    label: '3秒',
    value: 'delay-3s'
  },
  {
    label: '4秒',
    value: 'delay-4s'
  },
  {
    label: '5秒',
    value: 'delay-5s'
  },
];

const inAnimations = [
  {
    label: 'bounceIn',
    value: 'bounceIn'
  },
  {
    label: 'bounceInDown',
    value: 'bounceInDown'
  },
  {
    label: 'bounceInLeft',
    value: 'bounceInLeft'
  },
  {
    label: 'bounceInRight',
    value: 'bounceInRight'
  },
  {
    label: 'bounceInUp',
    value: 'bounceInUp'
  },
  {
    label: 'fadeIn',
    value: 'fadeIn'
  },
  {
    label: 'fadeInDown',
    value: 'fadeInDown'
  },
  {
    label: 'fadeInDownBig',
    value: 'fadeInDownBig'
  },
  {
    label: 'fadeInLeft',
    value: 'fadeInLeft'
  },
  {
    label: 'fadeInLeftBig',
    value: 'fadeInLeftBig'
  },
  {
    label: 'fadeInRight',
    value: 'fadeInRight'
  },
  {
    label: 'fadeInRightBig',
    value: 'fadeInRightBig'
  },
  {
    label: 'fadeInUp',
    value: 'fadeInUp'
  },
  {
    label: 'fadeInUpBig',
    value: 'fadeInUpBig'
  },
  {
    label: 'rotateIn',
    value: 'rotateIn'
  },
  {
    label: 'rotateInDownLeft',
    value: 'rotateInDownLeft'
  },
  {
    label: 'rotateInDownRight',
    value: 'rotateInDownRight'
  },
  {
    label: 'rotateInUpLeft',
    value: 'rotateInUpLeft'
  },
  {
    label: 'rotateInUpRight',
    value: 'rotateInUpRight'
  },
  {
    label: 'rollIn',
    value: 'rollIn'
  },
  {
    label: 'zoomIn',
    value: 'zoomIn'
  },
  {
    label: 'zoomInLeft',
    value: 'zoomInLeft'
  },
  {
    label: 'zoomInRight',
    value: 'zoomInRight'
  },
  {
    label: 'zoomInUp',
    value: 'zoomInUp'
  },
  {
    label: 'slideInDown',
    value: 'slideInDown'
  },
  {
    label: 'slideInLeft',
    value: 'slideInLeft'
  },
  {
    label: 'slideInRight',
    value: 'slideInRight'
  },
  {
    label: 'slideInUp',
    value: 'slideInUp'
  }
];

const outAnimations = [
  {
    label: 'bounceOut',
    value: 'bounceOut'
  },
  {
    label: 'bounceOutDown',
    value: 'bounceOutDown'
  },
  {
    label: 'bounceOutLeft',
    value: 'bounceOutLeft'
  },
  {
    label: 'bounceOutRight',
    value: 'bounceOutRight'
  },
  {
    label: 'bounceOutUp',
    value: 'bounceOutUp'
  },
  {
    label: 'fadeOut',
    value: 'fadeOut'
  },
  {
    label: 'fadeOutDown',
    value: 'fadeOutDown'
  },
  {
    label: 'fadeOutDownBig',
    value: 'fadeOutDownBig'
  },
  {
    label: 'fadeOutLeft',
    value: 'fadeOutLeft'
  },
  {
    label: 'fadeOutLeftBig',
    value: 'fadeOutLeftBig'
  },
  {
    label: 'fadeOutRight',
    value: 'fadeOutRight'
  },
  {
    label: 'fadeOutRightBig',
    value: 'fadeOutRightBig'
  },
  {
    label: 'fadeOutUp',
    value: 'fadeOutUp'
  },
  {
    label: 'fadeOutUpBig',
    value: 'fadeOutUpBig'
  },
  {
    label: 'rotateOut',
    value: 'rotateOut'
  },
  {
    label: 'rotateOutDownLeft',
    value: 'rotateOutDownLeft'
  },
  {
    label: 'rotateOutDownRight',
    value: 'rotateOutDownRight'
  },
  {
    label: 'rotateOutUpLeft',
    value: 'rotateOutUpLeft'
  },
  {
    label: 'rotateOutUpRight',
    value: 'rotateOutUpRight'
  },
  {
    label: 'rollOut',
    value: 'rollOut'
  },
  {
    label: 'zoomOut',
    value: 'zoomOut'
  },
  {
    label: 'zoomOutLeft',
    value: 'zoomOutLeft'
  },
  {
    label: 'zoomOutRight',
    value: 'zoomOutRight'
  },
  {
    label: 'zoomOutUp',
    value: 'zoomOutUp'
  },
  {
    label: 'slideOutDown',
    value: 'slideOutDown'
  },
  {
    label: 'slideOutLeft',
    value: 'slideOutLeft'
  },
  {
    label: 'slideOutRight',
    value: 'slideOutRight'
  },
  {
    label: 'slideOutUp',
    value: 'slideOutUp'
  }
];

const canvasGridClass = [
  {
    label: '5px * 5px 白色',
    value: 'canvas-grid-white-5px5px'
  },
  {
    label: '5px * 5px 黑色',
    value: 'canvas-grid-black-5px5px'
  },
  {
    label: '10px * 10px 白色',
    value: 'canvas-grid-white-10px10px'
  },
  {
    label: '10px * 10px 黑色',
    value: 'canvas-grid-black-10px10px'
  },
  {
    label: '20px * 20px 白色',
    value: 'canvas-grid-white-20px20px'
  },
  {
    label: '20px * 20px 黑色',
    value: 'canvas-grid-black-20px20px'
  }
];

const pixelUnits = [
  {
    label: 'px',
    value: 'px'
  },
  {
    label: '%',
    value: '%'
  },
  {
    label: 'em',
    value: 'em'
  },
  {
    label: 'rem',
    value: 'rem'
  },
];

export default {
  borderStyles,
  display,
  layoutSchemes,
  cursor,
  animationDelayClass,
  inAnimations,
  outAnimations,
  canvasGridClass,
  pixelUnits
}
