var Storage = {
  saveMapToStorage: function() {
    try {
      localStorage.setItem("data-test", $("#data-test").html());
      var serializedData = JSON.stringify(mapData);
      localStorage.setItem("gkhub-map", serializedData);
    } catch (error) {
      console.error("Unable to save map data to storage");
    }
  },

  loadMapFromStorage: function() {
    try {
      var html = localStorage.getItem("data-test");
      var dataFromStorage = JSON.parse(localStorage.getItem("gkhub-map"));
      return dataFromStorage || null;
    } catch (error) {
      console.error("Unable to retrieve map data from storage");
    }
  },

  clearMapDataInStorage: function() {
    localStorage.removeItem("gkhub-map");
  }
};
