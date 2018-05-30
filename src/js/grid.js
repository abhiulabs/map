$(document).ready(function() {
  var x = 20;
  var y = 20;
  var containerWidth = 1000;
  var containerHeight = 500;
  var tileWidth = containerWidth / x;
  var tileHeight = containerHeight / x;

  // ---- End of Variable definitions

  // ---- Start Function definitions

  function createGrid() {
    (function createGridContainer() {
      $("#map-grid-container")
        .addClass("droppable map-grid")
        .css({
          display: "flex",
          "flex-direction": "column",
          height: containerHeight,
          width: containerWidth,
          // background is added for testing, when tiles don't fit the container, it'll show red
          background: "red"
        });
    })();

    function addTileToRow(i, j) {
      var d = $(`<div></div>`);
      d
        .attr("id", i + "x" + j)
        .css({
          width: tileWidth,
          height: tileHeight
        })
        .addClass("ui-widget-content droppable-tile bg-white");

      $(`#row-${i}`).append(d);
    }

    function addRowToGrid(i) {
      var row = $(`<div></div>`);
      row.attr("id", `row-${i}`).css({
        display: "flex",
        height: containerHeight / y,
        width: containerWidth
      });
      $("#map-grid-container").append(row);
    }

    for (var i = 0; i < x; i++) {
      addRowToGrid(i);
      for (var j = 0; j < y; j++) {
        addTileToRow(i, j);
      }
    }
  }

  // ---- End of Function definitions

  // 1... Create Grid
  createGrid();
});
