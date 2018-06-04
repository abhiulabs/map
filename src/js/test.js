$(document).ready(function() {
  $("#btnSaveLayout").on("click", function(e) {
    var layout = $("#map-grid-container").clone();
    console.log(layout.html());
  });
  $("#btnStartRealTimeScans").on("click", function(e) {
    HALBERDS.startRealtimeMapping();
  });
});
