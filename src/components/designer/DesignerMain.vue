<!--设计器主控件-->

<template>
  <div class="designer-main">
    <Layout>
      <!--顶部栏，固定布局-->
      <DesignerHeader></DesignerHeader>

      <Layout :style="{paddingTop: '48px'}">

        <!--左侧边栏-->
        <Sider :width="300"
               :style="{
                 backgroundColor: '#FFF',
                 borderRight: '1px solid #999',
                 position: 'fixed',
                 height: 'calc(100% - 48px)',
                 left: 0,
                 overflow: 'auto',
                 zIndex: 2
               }" @click.stop.native="clearKeyDownAndUp">
          <Tabs size="small" value="project_tab">
            <TabPane label="工程信息" name="project_tab" :style="{padding: '0px 10px 0px 10px'}">

              <div>
                <Button size="small" type="primary" style="margin-right: 5px;"
                        @click="createPageDrawerVisible = !createPageDrawerVisible">新建页面</Button>

                <Drawer
                    title="新建页面"
                    v-model="createPageDrawerVisible"
                    width="450"
                    :mask-closable="false">
                  <PageForm ref="pageForm"></PageForm>
                  <DrawerFooter>
                    <Button style="margin-right: 8px" @click="createPageDrawerVisible = false">关闭</Button>
                    <Button type="primary" @click="submitPageForm">提交</Button>
                  </DrawerFooter>
                </Drawer>
              </div>
              <Divider/>
              <Tree :data="pageTreeData" @on-select-change="pageTreeSelectChangeHandle"></Tree>

              <!--<span>currentSelectLayoutItemId: {{this.$store.state.designer.currentSelectLayoutItemId}}</span>-->
            </TabPane>
            <TabPane label="组件库" name="comp_tab"
                     :style="{
                     padding: '10px',
                     width: '100%',
                     height: '100%',
                     position: 'relative'}">

              <!--<Collapse simple :style="{marginTop: '-17px'}">
                <Panel name="1">
                  功能组件
                  <div slot="content">
                    <div class="comp-card">
                      <p>Hello</p>
                    </div>
                  </div>
                </Panel>

              </Collapse>-->

              <div style="margin-top: -16px;">
                <div class="comp-card">
                  <p>Hello</p>
                </div>
                <div class="comp-card" >
                  <p>TestBarChart</p>
                </div>
                <div class="comp-card" >
                  <p>TestBarChart2</p>
                </div>
                <div class="comp-card" >
                  <p>TestChinaMapChart</p>
                </div>
                <div class="comp-card" >
                  <p>ImageComp</p>
                </div>
                <div class="comp-card" >
                  <p>AComp</p>
                </div>
                <div class="comp-card" >
                  <p>HelloWorld</p>
                </div>
                <div class="comp-card" >
                  <p>TextComp</p>
                </div>
              </div>



            </TabPane>
          </Tabs>

        </Sider>

        <!--中间内容区-->
        <Content
            :style="{
              marginRight: '300px',
              marginLeft: '300px',
              padding: '10px',
              backgroundColor: '#B0B0B0'
            }">
          <div :style="{
                width: '100%',
                height: 'calc(100% - 48px)',
                overflow: 'auto',
                backgroundColor: '#FFF',
                backgroundImage: 'url('+require('../../assets/bkgd.png')+')',
                backgroundRepeat: 'repeat'
               }">
            <component ref="targetComp" :is="pageMetadata.developCanvas"></component>
          </div>
        </Content>


        <!--右侧边栏，固定布局-->
        <Sider :width="300"
               :style="{
                 backgroundColor: '#FFF',
                 borderLeft: '1px solid #999',
                 position: 'fixed',
                 height: 'calc(100% - 48px)',
                 right: 0,
                 overflow: 'auto',
                 zIndex: 2
               }" @click.stop.native="clearKeyDownAndUp">
          <Tabs size="small" value="setting_tab">
            <TabPane label="配置管理" name="setting_tab" :style="{padding: '0px'}">
              <Collapse simple v-model="collapseDefaultName" :style="{marginTop: '-17px'}">
                <Panel name="page_config">
                  页面信息
                  <p slot="content">
                    <component :is="this.$store.state.designer.rightSidebarPageConfigFormName"></component>
                  </p>
                </Panel>
                <Panel name="canvas_config">
                  画布配置
                  <p slot="content">
                    <component :is="canvasConfigCompName"></component>
                  </p>
                </Panel>
                <Panel name="layoutItem_config">
                  布局块配置
                  <p slot="content">
                    <component :is="this.$store.state.designer.rightSidebarLayoutItemConfigFormName"></component>
                  </p>
                </Panel>
                <Panel name="comp_config">
                  组件配置
                  <p slot="content">
                    <component :is="this.$store.state.designer.rightSidebarFuncCompConfigFormName"></component>
                  </p>

                </Panel>
              </Collapse>
            </TabPane>
            <TabPane label="结构树" name="structure_tree_tab" :style="{padding: '0px'}">
              <Table highlight-row size="small" :style="{marginTop: '-17px'}"
                     :columns="structureTreeColumns" :data="structureTreeData"></Table>
            </TabPane>
          </Tabs>

        </Sider>

        <DesignerFooter></DesignerFooter>
      </Layout>
    </Layout>

  </div>
</template>

<script>
  import StructureTreeTableExpand from './StructureTreeTableExpand'

  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'designer/getField',
    mutationType: 'designer/updateField',
  });

  export default {
    name: 'DesignerMain',
    data() {
      return {

        collapseDefaultName: ['page_config', 'canvas_config', 'layoutItem_config', 'comp_config'],

        createPageDrawerVisible: false,

        pageTreeData: [], // 左侧边栏页面信息树
        currentSelectPageId: '', // 当前选中页面的ID

        structureTreeColumns: [ // 结构树表头数据
          {
            type: 'expand',
            width: 30,
            render: (h, params) => {
              return h(StructureTreeTableExpand, {
                props: {
                  row: params.row
                }
              })
            }
          },
          {
            title: '名称',
            key: 'layoutItemId',
            render: (h, params) => {
              return h('span', {}, '布局块('+params.row.layoutItemId.substring(0, 5)+'..)')
            }
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 120,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'default',
                    size: 'small',
                    icon: 'md-eye'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {

                    }
                  }
                }),h('Button', {
                  props: {
                    type: 'default',
                    size: 'small',
                    icon: 'md-locate'
                  },
                  attrs: {
                    title: '定位布局块'
                  },
                  style: {

                  },
                  on: {
                    click: () => {
                      this.locationTargetLayoutItem(params.row)
                    }
                  }
                })
              ]);
            }
          }
        ]

      }
    },
    mounted() {

      this.initPageTreeData();

      $(".comp-card").draggable({
        zIndex: 999,
        revert: "invalid",
        helper: 'clone',
        containment: 'body',
        appendTo: 'body',
        scope: 'layoutItemScope'
      });

    },
    methods: {

      /**
       * 注销键盘监听
       */
      clearKeyDownAndUp () {
        $(document).unbind('keydown');
        $(document).unbind('keyup');
      },

      /**
       * 初始化页面信息树数据
       */
      initPageTreeData () {

        this.$PnApi.ProjectApi.getProjectById(this.$route.query.project_id).then(result => {
          let project = result.data.data;

          this.pageTreeData = [
            {
              key: project.id,
              title: project.name,
              expand: true,
              disabled: true,
              children: []
            }
          ];

          this.$PnApi.PageApi.getPagesByProjectId(this.$route.query.project_id).then(result => {
            let pages = result.data.data;
            if(pages.length > 0) {
              pages.forEach(item => {
                let page = {
                  key: item.id,
                  title: item.name,
                  render: (h, {root, node, data}) => {
                    return h('span', [
                      h('Icon', {
                        props: {
                          type: 'md-browsers'
                        }
                      }),
                      h('span', {

                      }, '--('+data.title+')--'),

                      h('a', {
                        attrs: {title: '打开'},
                        on: {
                          click: () => {
                            this.openPageToDesigner(data.key)
                          }
                        }
                      }, [
                        h('Icon', {
                          props: {
                            type: 'md-create',
                          }
                        })
                      ]),
                      // h('a', {
                      //   attrs: {title: '拷贝'},
                      //   on: {
                      //     click: () => {
                      //       this.copyPage(data.key)
                      //     }
                      //   }
                      // }, [
                      //   h('Icon', {
                      //     props: {
                      //       type: 'md-copy'
                      //     }
                      //   })
                      // ]),
                      h('a', {
                        attrs: {title: '删除'},
                        style: {
                          color: '#ed4014'
                        },
                        on: {
                          click: () => {
                            this.deletePage(data.key)
                          }
                        }
                      }, [
                        h('Icon', {
                          props: {
                            type: 'md-trash'
                          }
                        })
                      ])
                    ])
                  }
                };
                this.pageTreeData[0].children.push(page)
              });
            }
          })

        })
      },

      submitPageForm () {
        this.$refs.pageForm.$refs.form.validate((valid) => {
          if (valid) {
            let pageFormData = this.$refs.pageForm.formData;
            pageFormData.project_id = this.$route.query.project_id; // 赋值工程ID

            let layout = {
              id: this.$PnUtil.uuid(),
              layoutConfigData: {},
              layoutItems: []
            };
            if (pageFormData.developCanvas === 'ReactiveLayoutCanvas') {
              layout.layoutConfigData = this.$PnDesigner.buildReactiveLayoutConfigData()
            }else if (pageFormData.developCanvas === 'AbsoluteLayoutCanvas') {
              layout.layoutConfigData = this.$PnDesigner.buildAbsoluteLayoutConfigData()
            }

            pageFormData.layout = JSON.stringify(layout);

            this.$PnApi.PageApi.savePage(pageFormData).then((result)=>{
              if(result.data.code == 1) {
                //this.$Message.success('保存成功');
                this.$refs.pageForm.$refs.form.resetFields();
                this.createPageDrawerVisible = false;
                this.initPageTreeData();
              }else if (result.data.code == 0) {
                this.$Message.error(result.data.msg)
              }
            });
          }
        });
      },

      pageTreeSelectChangeHandle (selectPages) {
        if(selectPages.length > 0) {
          this.currentSelectPageId = selectPages[0].key
        }else {
          this.currentSelectPageId = ''
        }
      },


      openPageToDesigner (pageId) {
        this.$store.commit('designer/setRightSidebarPageConfigFormName', 'PageFormForDesigner');
        this.$store.commit('designer/resetDesigner');
        this.$store.dispatch('designer/loadPage', pageId);

        this.currentSelectPageId = pageId;
      },

      deletePage(pageId) {
        this.$Modal.confirm({
          title: '提醒',
          content: '确认删除此页面吗？',
          onOk: () => {
            this.$PnApi.PageApi.deletePage(pageId).then(result=>{
              if(result.data.code != 1) {
                this.$Message.error(result.data.msg)
              }else {
                this.initPageTreeData();
              }
            })
          }
        });

      },

      /****************结构树表格相关操作****************/
      structureTreeTableRowClick (row, index) {
        // 如果当前点击的布局块没有关联组件，那么就清空rightSidebarFuncCompConfigFormName状态
        if (!row.componentId) {
          this.$store.commit('designer/setRightSidebarFuncCompConfigFormName', '');
        }else {
          this.$store.commit('designer/setRightSidebarFuncCompConfigFormName', row.componentName + 'Form');
        }

        if(this.pageMetadata.developCanvas == 'AbsoluteLayoutCanvas') {

          this.$store.commit('designer/setRightSidebarLayoutItemConfigFormName', 'AbsoluteLayoutItemForm');
        }else if(this.pageMetadata.developCanvas == 'ReactiveLayoutCanvas') {

          this.$store.commit('designer/setRightSidebarLayoutItemConfigFormName', 'ReactiveLayoutItemForm');
        }
        this.$store.commit('designer/setCurrentSelectLayoutItemId', row.layoutItemId)
      },

      locationTargetLayoutItem (row) {
        this.$store.commit('designer/setCurrentSelectLayoutItemId', row.layoutItemId)
      }

    },
    computed: {
      ...mapFields({
        pageMetadata: 'pageMetadata',
        currentSelectLayoutItemId: 'currentSelectLayoutItemId'
      }),
      // 根据developCanvas返回不同的画布配置表单
      canvasConfigCompName () {
        if(this.$store.state.designer.pageMetadata.developCanvas === 'ReactiveLayoutCanvas') {
          return 'ReactiveLayoutConfigDataForm'
        }else if(this.$store.state.designer.pageMetadata.developCanvas === 'AbsoluteLayoutCanvas') {
          return 'AbsoluteLayoutConfigDataForm'
        }
        return ''
      },
      structureTreeData () {
        let layoutItems = [];
        this.pageMetadata.layout.layoutItems.forEach((item)=>{
          let layoutItem = {
            layoutItemId: item.id,
            componentId: item.component.id,
            componentName: item.component.name,
            _expanded: true
          };

          // if(this.currentSelectLayoutItemId == item.id) {
          //   layoutItem._highlight = true
          // }else {
          //   layoutItem._highlight = false
          // }

          layoutItems.push(layoutItem)
        });
        return layoutItems;
      }
    },
    watch: {
      'pageMetadata.id': function () { // 监听页面源数据的ID是否改变，改变了说明切换编辑的页面
        //localStorage.removeItem('layoutCache'); // 清空草稿
      }
    }
  }
</script>

<style scoped>

  .ivu-divider-horizontal {
    margin: 10px 0px;
  }

  >>> td.ivu-table-expanded-cell {
    padding: 10px;
  }

  .comp-card {
    width: 60px;
    height: 60px;
    background-color: red;
    float: left;
    cursor: move;
    word-break: break-all;
  }

  .designer-main {
    height: 100%;
  }

  .designer-main .ivu-layout {
    height: 100%;
  }

</style>
