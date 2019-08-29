
const borderStyles = [
  {
    label: 'solid',
    value: 'solid'
  },
  {
    label: 'dashed',
    value: 'dashed'
  },
  {
    label: 'dotted',
    value: 'dotted'
  },
  {
    label: 'none',
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
