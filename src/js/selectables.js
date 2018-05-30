$(document).ready(function() {
  $("#btnRemoveGridBorders").on("click", function(e) {
    $(".map-grid .ui-selected").css("border", "none");
  });

  $("#btnShowGridBorders").on("click", function(e) {
    $(".map-grid .ui-selected").css("border", "");
  });

  var ids = "";
  $(".map-grid").selectable({
    stop: function() {
      // $(".ui-selected", this).each(function() {
      //   ids = ids + $(this).attr("id") + "\n";
      // });
      // console.log(ids);
      ids = "";
    }
  });
});
