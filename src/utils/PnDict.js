
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

export default {
  borderStyles,
  display,
  layoutSchemes
}
