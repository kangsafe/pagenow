<!--设计器主控件-->

<template>
  <div class="designer-main">
    <Layout>
      <!--顶部栏，固定布局-->
      <DesignerHeader></DesignerHeader>

      <Layout :style="{paddingTop: '48px'}">

        <!--组件库模态窗，收起左侧边栏时弹出-->
        <Modal title="组件库"
               draggable
               footer-hide
               width="300"
               :z-index="3"
               v-model="leftSidebarCollapsed"
               @on-cancel="collapsedLeftSidebar">
          <p slot="header">
            <span>组件库</span>
          </p>
          <div style="margin: -16px;">
            <Collapse simple :style="{marginTop: '-17px', borderRadius: '6px'}">
              <Panel v-for="lib in componentLibrary" :key="lib.id">
                {{lib.name}}
                <div slot="content">
                  <Row :gutter="5">
                    <i-col span="8" v-for="compinfo in lib.compinfos" :key="compinfo.id">
                      <Poptip :transfer="true" :word-wrap="true" title="组件信息" placement="right-start">
                        <div title="单击可以显示组件信息" class="comp-card" :data-component="compinfo.name">
                          <p>{{compinfo.aliasName}}</p>
                        </div>
                        <div class="api" slot="content">
                          <span>{{compinfo.remark}}</span>
                        </div>
                      </Poptip>
                    </i-col>

                  </Row>
                </div>
              </Panel>

            </Collapse>
          </div>

        </Modal>

        <!--左侧边栏-->
        <Sider ref="leftSidebar"
               :width="300"
               hide-trigger
               collapsible
               collapsed-width="1"
               v-model="leftSidebarCollapsed"
               :style="{
                 backgroundColor: '#FFF',
                 borderRight: '1px solid #999',
                 position: 'fixed',
                 height: 'calc(100% - 48px)',
                 left: 0,
                 overflow: 'auto',
                 zIndex: 2
               }" @click.stop.native="clearKeyDownAndUp">
          <div title="收展侧边栏" class="left-sidebar-collapse-btn" :class="{active: leftSidebarCollapsed}" @click.stop="collapsedLeftSidebar">
            <Icon :type="leftSidebarCollapsed ? 'md-arrow-dropright': 'md-arrow-dropleft'" />
          </div>

          <Tabs size="small" value="project_tab" @on-click="registerComponentLibraryDrag">
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
                     padding: '0px',
                     width: '100%',
                     height: '100%',
                     position: 'relative'}">

              <Collapse simple :style="{marginTop: '-17px'}">
                <Panel v-for="lib in componentLibrary" :key="lib.id">
                  {{lib.name}}
                  <div slot="content">
                    <Row :gutter="5">
                      <i-col span="8" v-for="compinfo in lib.compinfos" :key="compinfo.id">
                        <Poptip :transfer="true" :word-wrap="true" title="组件信息" placement="right-start">
                          <div title="单击可以显示组件信息" class="comp-card" :data-component="compinfo.name">
                            <p>{{compinfo.aliasName}}</p>
                          </div>
                          <div class="api" slot="content">
                            <span>{{compinfo.remark}}</span>
                          </div>
                        </Poptip>
                      </i-col>

                    </Row>
                  </div>
                </Panel>

              </Collapse>

            </TabPane>
          </Tabs>

        </Sider>

        <!--中间内容区-->
        <Content
            :style="{
              marginRight: '330px',
              marginLeft: contentMarginLeft,
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
        <Sider :width="330"
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
              <Collapse simple v-model="rightCollapseDefaultName" :style="{marginTop: '-17px'}">
                <Panel name="project_config">
                  <span style="font-weight: bold; color: #33CC66;">---工程信息---</span>
                  <p slot="content">
                    <component :is="'ProjectFormForDesigner'"></component>
                  </p>
                </Panel>
                <Panel name="page_config">
                  <span style="font-weight: bold; color: #33CC66;">---页面信息---</span>
                  <p slot="content">
                    <component :is="this.$store.state.designer.rightSidebarPageConfigFormName"></component>
                  </p>
                </Panel>
                <Panel name="canvas_config">
                  <span style="font-weight: bold; color: #33CC66;">---画布配置---</span>
                  <p slot="content">
                    <component :is="canvasConfigCompName"></component>
                  </p>
                </Panel>
                <Panel name="layoutItem_config">
                  <span style="font-weight: bold; color: #33CC66;">---布局块配置---</span>
                  <p slot="content">
                    <component :is="this.$store.state.designer.rightSidebarLayoutItemConfigFormName"></component>
                  </p>
                </Panel>
                <Panel name="comp_config">
                  <span style="font-weight: bold; color: #33CC66;">---组件配置---</span>
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
        leftSidebarCollapsed: false,
        contentMarginLeft: '300px',

        rightCollapseDefaultName: ['page_config', 'canvas_config', 'layoutItem_config', 'comp_config'],

        createPageDrawerVisible: false,

        componentLibrary: [],

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
    /**
     * 初始化加载顺序：
     * 1、先根据当前设计器路径的URL参数project_id获取工程信息
     * 2、判断工程是否设置了全局的图表主题，如果设置了，那么加载对应的主题JSON数据存储在vuex中
     * 3、初始化左侧边栏的工程页面树
     * 4、加载组件库数据
     */
    mounted() {

      this.loadProjectInfo().then(()=>{
        this.initEchartThemeJsonText();
        this.initPageTreeData();
      });

      this.loadComponentLibrary();

    },
    methods: {

      collapsedLeftSidebar () {
        this.$refs.leftSidebar.toggleCollapse();
        if(this.leftSidebarCollapsed) {
          this.contentMarginLeft = '0px';
          this.registerComponentLibraryDrag()
        }else {
          this.contentMarginLeft = '300px'
        }
      },

      /**
       * 注销键盘监听
       */
      clearKeyDownAndUp () {
        $(document).unbind('keydown');
        $(document).unbind('keyup');
      },

      /**
       * 注册组件库拖拽事件
       */
      registerComponentLibraryDrag () {
        if($('.comp-card').draggable()) {
          $('.comp-card').draggable('destroy');
        }
        $('.comp-card').draggable({
          zIndex: 999,
          revert: "invalid",
          helper: 'clone',
          containment: 'body',
          appendTo: 'body',
          scope: 'layoutItemScope'
        });
      },

      /**
       * 加载组件库数据
       */
      loadComponentLibrary () {
        this.$PnApi.CompinfoApi.buildComponentLibrary().then(result=>{
          this.componentLibrary = result.data.data;
        })
      },

      /**
       * 加载工程信息并存入vuex
       */
      async loadProjectInfo () {
        return await this.$PnApi.ProjectApi.getProjectById(this.$route.query.project_id).then(result=>{
          this.$store.commit('designer/setProjectInfo', result.data.data);
        })
      },

      /**
       * 初始化工程信息中的主题JSON数据并存储vuex
       */
      initEchartThemeJsonText () {
        let tmpProjectInfo = Object.assign({}, this.projectInfo);
        if(tmpProjectInfo.echartThemeId) {
          this.$PnApi.EchartThemeApi.getEchartThemeById(tmpProjectInfo.echartThemeId).then(result=>{
            let tmpEchartTheme = result.data.data;
            tmpProjectInfo.echartThemeJsonText = tmpEchartTheme.jsonText;
            this.$store.commit('designer/setProjectInfo', tmpProjectInfo);
          });
        }
      },

      /**
       * 初始化页面信息树数据
       */
      initPageTreeData () {

        this.pageTreeData = [
          {
            key: this.projectInfo.id,
            title: this.projectInfo.name,
            expand: true,
            disabled: true,
            children: []
          }
        ];

        this.$PnApi.PageApi.getPagesByProjectId(this.projectInfo.id).then(result => {
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

      /**
       * 打开页面并编辑，在这里将会初始化vuex中的pageMetadata数据
       */
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
        this.$store.commit('designer/setCurrentSelectLayoutItemId', row.layoutItemId);
        this.$store.commit('designer/setRightSidebarFuncCompConfigFormName', '');
      }

    },
    computed: {
      ...mapFields({
        projectInfo: 'projectInfo',
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
      'pageMetadata.layout': {
        // 监听源数据layout对象是否发生改变，发生改变将记录存储在本地源数据布局存储中，以便提供给撤回操作的原始数据
        handler: function (val, oldVal) {
          //localStorage.removeItem('layoutCache'); // 清空草稿（暂时弃用）

          // 将布局信息存储在本地存储中，变量数组中只存两个对象，新进后出原则，再撤回操作中，永远只读第0个元素对象即为上一步操作
          if(!localStorage.getItem('PageMetadataLayoutLocalRecord')) {
            localStorage.setItem('PageMetadataLayoutLocalRecord', JSON.stringify([]))
          }else {
            let PageMetadataLayoutLocalRecord = JSON.parse(localStorage.getItem('PageMetadataLayoutLocalRecord'));
            if (PageMetadataLayoutLocalRecord.length >= 2) {
              PageMetadataLayoutLocalRecord = PageMetadataLayoutLocalRecord.slice(1)
            }
            PageMetadataLayoutLocalRecord.push(val);
            localStorage.setItem('PageMetadataLayoutLocalRecord', JSON.stringify(PageMetadataLayoutLocalRecord))
          }
        },
        deep: true
      }
    }
  }
</script>

<style scoped>

  .left-sidebar-collapse-btn {
    position: fixed;
    width: 10px;
    height: 80px;
    background-color: #CCCCCC;
    border-top: 1px solid rgb(153, 153, 153);
    border-right: 1px solid rgb(153, 153, 153);
    border-bottom: 1px solid rgb(153, 153, 153);
    left: 300px;
    top: 50%;
    margin-top: -40px;
    cursor: pointer;
  }

  .left-sidebar-collapse-btn i {
    font-size: 17px;
    margin-left: -5px;
    top: 50%;
    position: absolute;
    margin-top: -10px;
  }

  .left-sidebar-collapse-btn:hover {
    background-color: #BBBBBB;
  }

  .left-sidebar-collapse-btn.active {
    left: 0px;
  }

  .ivu-divider-horizontal {
    margin: 10px 0px;
  }

  >>> td.ivu-table-expanded-cell {
    padding: 10px;
  }

  .comp-card {
    width: 85px;
    height: 50px;
    background-color: #BBBBBB;
    border-radius: 4px;
    padding: 10px;
    cursor: move;
    word-break:break-all;
    margin-bottom: 5px;
  }

  .designer-main {
    height: 100%;
  }

  .designer-main .ivu-layout {
    height: 100%;
  }

</style>
