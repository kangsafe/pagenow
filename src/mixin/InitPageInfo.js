

const InitPageInfo = {
  created () {

    this.$PnApi.PageInfoApi.getPageInfos().then((result)=>{
      let dbRoutes = result.data.data;
      let routes = [];
      dbRoutes.forEach(function (item) {

        let route = {};
        route.path = item.path;
        route.name = item.name;
        route.component = resolve => require(['@/components/layout/' + item.component + '.vue'], resolve);

        routes.push(route);
      });

      this.$router.addRoutes(routes);
    });

  }
};

export default InitPageInfo
