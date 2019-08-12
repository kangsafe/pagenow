const InitGlobalConfigData = {
  created() {

    let globalConfigData = {
      autoSave: false
    };

    if(!localStorage.getItem('globalConfigData')) {
      localStorage.setItem('globalConfigData', JSON.stringify(globalConfigData))
    }

  }
};

export default InitGlobalConfigData
