<!--设计器主控件-->

<template>
  <div class="designer-main">
    <Layout>
      <Header>
        <Button size="small" type="primary" style="margin-right: 5px;">保存</Button>
        <Button size="small" type="primary" @click="addLayoutItem" style="margin-right: 5px;">添加布局块</Button>
        <Button size="small" type="primary"
                @click="globalConfigDataDrawerVisible = !globalConfigDataDrawerVisible">全局配置</Button>
        <Drawer
            title="全局配置"
            v-model="globalConfigDataDrawerVisible"
            width="450"
            :mask-closable="true">
          <GlobalConfigDataForm></GlobalConfigDataForm>
        </Drawer>

      </Header>
      <Layout>
        <!--左侧边栏-->
        <Sider :width="300" :style="{borderRight: '1px solid #999'}">
          <Tabs size="small" value="project_tab">
            <TabPane label="工程信息" name="project_tab" :style="{padding: '0px 10px 0px 10px'}">

              <div>
                <Button size="small" type="primary" style="margin-right: 5px;"
                        @click="createPageDrawerVisible = !createPageDrawerVisible">新建页面</Button>
                <Button size="small" type="error">删除</Button>
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
                     padding: '0px 10px 0px 10px',
                     backgroundColor: 'blue',
                     width: '100%',
                     height: '100%',
                     position: 'relative'}">

              <div class="comp-card">
                <p>Hello</p>
              </div>

            </TabPane>
          </Tabs>

        </Sider>

        <Content>
          <TargetComponentContainer>
            <component ref="targetComp" :is="pageInfo.layoutData.layoutCompName"></component>
          </TargetComponentContainer>
        </Content>
        <Sider :width="300" :style="{borderLeft: '1px solid #999'}">
          <Collapse simple>
            <Panel name="1">
              布局块配置
              <p slot="content">
                <component :is="this.$store.state.designer.rightSidebarComponentName"></component>
              </p>
            </Panel>
            <Panel name="2">
              组件配置
              <p slot="content">
                <component :is="this.$store.state.designer.rightSidebarFuncCompConfigFormName"></component>
              </p>

            </Panel>
          </Collapse>
        </Sider>
      </Layout>
    </Layout>
    <!--<a-layout>

      <a-layout-footer>

        <AbsoluteLayoutDataForm :style="{float: 'right'}"/>
      </a-layout-footer>

    </a-layout>-->
  </div>
</template>

<script>
  import $ from 'jquery'

  require('webpack-jquery-ui');
  require('webpack-jquery-ui/css');

  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'designer/getField',
    mutationType: 'designer/updateField',
  });

  import VueGridLayout from 'vue-grid-layout';

  export default {
    name: 'DesignerMain',
    components: {
      GridLayout: VueGridLayout.GridLayout,
      GridItem: VueGridLayout.GridItem
    },
    data() {
      return {

        globalConfigDataDrawerVisible: false,

        createPageDrawerVisible: false,
        // 页面信息树
        pageTreeData: [
          {
            title: '交易中心大屏项目',
            expand: true,
            disabled: true,
            children: [
              {
                title: '页面一'
              },
              {
                title: '页面二'
              }
            ]
          }
        ],



        loadLayoutSchemeModalVisible: false,


        layout: [],

        targetComponentName: '',


        rightSiderComponentName: '',
        currentSelectLayoutItem: {}

      }
    },
    mounted() {

      //this.$store.commit('setCurrentEditPageInfo', this.pageInfo)

      $(".comp-card").draggable({
        zIndex: 999,
        revert: true,
        // helper: function () {
        //   let clone = $('<div class="comp-card">' + $(".comp-card").html() + '</div>');
        //   clone.appendTo('body');
        //   return clone;
        // },
        helper: 'clone',
        containment: 'body',
        appendTo: 'body'
      });

    },
    methods: {

      submitPageForm () {
        this.$refs.pageForm.$refs.form.validate((valid) => {
          if (valid) {

          }
        });
      },

      pageTreeSelectChangeHandle (e) {
        console.log(e)
      },


      addLayoutItem () {
        let newLayoutItem = {
          id: this.$PnUtil.uuid(),
          width: '200px',
          height: '200px',
          left: '600px',
          top: '200px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: '#000',
          backgroundColor: 'yellow',
          zIndex: '1',
          component: {
            id: '',
            name: '',
            configData: {

            }
          }
        };
        this.$store.commit('designer/addLayoutItem', newLayoutItem);
      },

      saveCurrentPageInfo () {
        console.log(this.$refs.targetComp.page);
      },


      handleCancel (_target) {
        this[_target] = false;
      },

      test () {
        this.pageInfo.layoutData.width = '1000px';
        //this.$refs.targetComp.layout.push({"x": 4, "y": 0, "w": 4, "h": 4, "i": "2", "location": "1wefef", "component": "HelloWorld"});
        //this.$refs.targetComp.sayHello();

        //this.$refs.targetComp.compData.containerBackgroundColor = 'red'
      },


    },
    computed: {
      ...mapFields({
        pageInfo: 'currentEditPageInfo'
      })
    }
  }
</script>

<style scoped>

  .ivu-divider-horizontal {
    margin: 10px 0px;
  }

  .comp-card {
    width: 100px;
    height: 100px;
    background-color: red;
    position: absolute;
    cursor: move;
  }

  .designer-main {
    height: 100%;
  }

  .designer-main .ivu-layout {
    height: 100%;
  }

  .designer-main .ivu-layout-header {
    background: #00152A;
    color: #fff;
    height: 48px;
    line-height: 48px;
    padding: 0 20px;
  }

  .designer-main .ivu-layout-sider {
    background: #FFF;
  }
  .designer-main .ivu-layout-content {
    padding: 10px;
    background-color: #B0B0B0;
  }


  .vue-grid-item {
    background-color: aliceblue;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
</style>
