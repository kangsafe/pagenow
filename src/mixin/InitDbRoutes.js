const InitDbRoutes = {
  created() {

    this.$PnApi.PageApi.getAllPage().then(result => {
      let dbRoutes = result.data.data;
      let routes = [];
      dbRoutes.forEach((item) => {

        let route = {};
        route.path = item.path;
        route.name = item.name;
        route.component = resolve => require(['@/components/layout/' + item.component + '.vue'], resolve);
        route.meta = {
          id: item.id,
          title: item.title
        };

        routes.push(route);
      });

      this.$router.addRoutes(routes)
    })

  }
};

export default InitDbRoutes
