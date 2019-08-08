

<template>
  <div class="page-form-for-designer">
    <Form :label-width="80">
      <FormItem label="ID">
        <Input size="small" v-model="id" disabled/>
      </FormItem>

      <FormItem label="页面名称">
        <Input size="small" v-model="name"/>
      </FormItem>
      <FormItem label="页面路径">
        <Input size="small" v-model="path"/>
      </FormItem>
      <FormItem label="页面标题">
        <Input size="small" v-model="title"/>
      </FormItem>
      <FormItem label="备注">
        <Input size="small" v-model="remark"/>
      </FormItem>
      <FormItem label="布局方案">
        <Select size="small" v-model="developCanvas" @on-change="developCanvasChangeHandle">
          <Option v-for="item in layoutSchemes" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="操作">

      </FormItem>
    </Form>
  </div>
</template>

<script>
  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'designer/getField',
    mutationType: 'designer/updateField',
  });

  export default {
    name: 'PageFormForDesigner',
    data() {
      return {
        layoutSchemes: [
          {
            label: '栅格布局',
            value: 'ReactiveLayoutCanvas'
          },
          {
            label: '绝对布局',
            value: 'AbsoluteLayoutCanvas'
          }
        ]
      }
    },
    mounted() {

    },
    methods: {
      developCanvasChangeHandle (value) {
        this.$store.commit('designer/resetDesigner');
        if(value === 'ReactiveLayoutCanvas') {
          let layoutConfigData = {
            width: '100%',
            height: '100%',
            backgroundColor: 'antiquewhite',
            padding: '10px',
            rows: []
          };
          this.$store.commit('designer/setLayoutConfigData', layoutConfigData)
        }else if(value === 'AbsoluteLayoutCanvas') {
          let layoutConfigData = {
            width: '1200px',
            height: '600px',
            backgroundColor: 'antiquewhite'
          };
          this.$store.commit('designer/setLayoutConfigData', layoutConfigData)
        }
      }
    },
    computed: {
      ...mapFields({
        id: 'pageMetadata.id',
        name: 'pageMetadata.name',
        path: 'pageMetadata.path',
        title: 'pageMetadata.title',
        remark: 'pageMetadata.remark',
        developCanvas: 'pageMetadata.layout.developCanvas'
      })
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
