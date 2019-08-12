<template>
  <div class="reactive-row-col-form">
    <Button @click="addRow" type="primary">添加行(ROW)</Button>
    <Divider :style="{margin: '10px 0px'}"/>
    <Alert>提示：可拖拽行(ROW)数据排序</Alert>
    <Table draggable :columns="columns" :data="rows" @on-drag-drop="dragDropHandle"></Table>
  </div>
</template>

<script>
  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'designer/getField',
    mutationType: 'designer/updateField',
  });

  export default {
    name: 'ReactiveRowColForm',
    data() {
      return {
        columns: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '列间隔',
            key: 'gutter',
            render: (h, params) => {
              return h('Slider', {
                props: {
                  min: 0,
                  max: 20,
                  value: this.rows[params.index].gutter,
                  showInput: true
                  //size: 'small'
                },
                on: {
                  'on-change': (val) => {
                    // this.rows[params.index].gutter = event.target.value
                    this.$store.commit('designer/setRowGutter', {rowId: params.row.id, gutter: val})
                  }
                }
              })
            }
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.addCol(params.row.id)
                    }
                  }
                }, '添加列(COL)'),
                h('Button', {
                  attrs: {
                    title: '删除此行'
                  },
                  props: {
                    type: 'error',
                    icon: 'md-trash'
                  },
                  on: {
                    click: () => {
                      this.deleteRow(params.row.id)
                    }
                  }
                })
              ]);
            }
          }
        ],
      }
    },
    mounted() {

    },
    methods: {

      addRow () {
        let rowId = this.$PnUtil.uuid();
        let row = {
          id: rowId,
          gutter: 10
        };
        let layoutItem = {
          id: this.$PnUtil.uuid(),
          layoutItemConfigData: {
            rowId: rowId,
            sort: 1,
            height: '80px',
            backgroundColor: '#66CCFF'
          },
          component: {
            id: '',
            name: '',
            compConfigData: {

            }
          }
        };
        this.$store.commit('designer/addRow', row);
        this.$store.commit('designer/addLayoutItem', layoutItem);
      },

      deleteRow (rowId) {
        this.$Modal.confirm({
          title: '提醒',
          content: '删除行将会级联删除行内所关联的列与组件数据，您确认要删除吗？',
          onOk: () => {
            this.$store.commit('designer/deleteRow', rowId);
            this.$store.commit('designer/setRightSidebarLayoutItemConfigFormName', '')
          }
        });
      },

      addCol (rowId) {
        let layoutItem = {
          id: this.$PnUtil.uuid(),
          layoutItemConfigData: {
            rowId: rowId,
            sort: 1,
            height: '80px',
            backgroundColor: '#66CCFF'
          },
          component: {
            id: '',
            name: '',
            compConfigData: {

            }
          }
        };
        this.$store.commit('designer/addLayoutItem', layoutItem);
      },

      dragDropHandle (index1, index2) {
        let newRows = [...this.rows];
        newRows[index1] = newRows.splice(index2, 1, newRows[index1])[0];
        this.$store.commit('designer/setRows', newRows)
      }
    },
    computed: {
      ...mapFields({
        rows: 'pageMetadata.layout.layoutConfigData.rows'
      })
    },

  }
</script>

<style scoped>
  .ivu-tooltip-popper {
    display: none;
  }
</style>
