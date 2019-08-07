<template>
  <div class="hello">
    hello {{parentLocation}}
    <a-button type="primary" @click="sayHello">按钮</a-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    location: {
      type: String
    }
  },
  data () {
    return {
      parentLocation: ''
    }
  },
  mounted () {
    console.log(this.location)
    this.parentLocation = this.location;
  },
  methods: {
    sayHello () {
      alert('hello');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .hello {
    width: 100%;
    height: 100%;
    background-color: red;
    padding: 10px;
    box-sizing: border-box;
  }
</style>
