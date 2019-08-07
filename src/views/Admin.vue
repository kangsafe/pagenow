<template>
  <div class="layout">
    <Layout :style="{height: '100%'}">
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"></div>

        </Menu>
      </Header>

      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                管理
              </template>
              <MenuItem name="1-1"><router-link to="/admin/project_manage">工程管理</router-link></MenuItem>
              <MenuItem name="1-2"><router-link to="/admin/page_info_manage">页面管理</router-link></MenuItem>
              <MenuItem name="1-3"><router-link to="/admin/about">About</router-link></MenuItem>
            </Submenu>

          </Menu>
        </Sider>
        <Layout :style="{padding: '0 15px 15px', marginTop: '15px'}">
          <Content :style="{padding: '15px', minHeight: '280px', background: '#fff'}">
            <router-view/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
  <!--<a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider
        :trigger="null"
        collapsible
        v-model="collapsed">
      <div class="logo">

      </div>
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
        <a-menu-item key="1">
          <router-link to="/admin/page_info_manage">
            <a-icon type="laptop" />
            <span>页面管理</span>
          </router-link>
        </a-menu-item>

        <a-menu-item key="2">
          <router-link to="/admin/about">
            <a-icon type="video-camera"/>
            <span>About</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="upload"/>
          <span>布局方案管理</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="()=> collapsed = !collapsed"
        />
      </a-layout-header>
      <a-layout-content :style="{ margin: '15px 15px', padding: '15px', background: '#fff', minHeight: '280px' }">
        <router-view/>
      </a-layout-content>
    </a-layout>
  </a-layout>-->
</template>

<script>
  export default {
    name: 'Admin',
    data() {
      return {
        collapsed: false,
      }
    },
    mounted() {

    },
    methods: {},
    computed: {}
  }
</script>

<style scoped>
  .layout{
    height: 100%;
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
</style>
