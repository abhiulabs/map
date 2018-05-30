$(document).ready(function() {
  var currentDraggingItem = "";
  var itemIds = [];
  var counter = 0;
  var computerList = [
    "Computer 1",
    "Computer 2",
    "Computer 3",
    "Computer 4",
    "Computer 5",
    "SVP-DESKTOP",
    "SID-VM-WIN10",
    "SAI's COMPUTER"
  ];

  var assignedComputerList = [];

  // You can clone only from the palette, once dropped inside tiles
  var isInsideTile = false;

  // ---- Global Variabls End ----

  // Define Functions here

  // Clone the computer/item when dragged from palette
  function getClone(selector, ui) {
    // var copy = $(selector).clone();
    var copy = $(ui.draggable).clone();
    var currentComputer = counter++;
    var currentComputerId = "computer-" + currentComputer;
    copy.attr("id", currentComputerId);
    copy.attr("data-toggle", "modal");
    copy.attr("data-target", "#computerModal");
    copy.addClass("deletable");

    // copy.css("position", "relative");
    copy.on("click", function(e) {
      $(this).css("background-color", "lightblue");

      createComputerModal(currentComputerId);
    });
    copy.on("dblclick", function(e) {
      $(this).remove();
    });

    // Even the dropped item should be draggable
    copy.draggable({
      // helper: "clone",
      containment: ".droppable",
      cancel: false,
      scope: "grid",
      revert: true,
      revertDuration: 10,
      drag: function(ev, ui) {
        isInsideTile = true;
        // $(this).css("z-index", 99);
        currentDraggingItem = ev.target.id;
      }
    });

    return copy;
  }
  function createDraggable(selector) {
    $(selector).draggable({
      helper: "clone",
      containment: ".droppable",
      cancel: false,
      scope: "grid",
      revert: true,
      revertDuration: 10,
      drag: function(ev, ui) {
        isInsideTile = false;
        // $(this).css("z-index", 1);
        currentDraggingItem = ev.target.id;
        // console.log(currentDraggingItem);
      }
    });
  }

  // Function to create modal window to add computer to after dropped in map tile
  function createComputerModal(currentComputer) {
    // Assign computer to the computer icon
    function assignComputer(computer) {
      $("#" + currentComputer).data("computer", computer);
      // Close modal after assigning computer
      $("#computerModal").modal("hide");
      assignedComputerList.push(computer);
    }

    // The computer button in modal list
    function createComputerButton(computer) {
      var newBtn = $("<button></button>");
      newBtn.text(computer);
      newBtn.addClass("list-group-item list-group-item-action");
      newBtn.on("click", function() {
        assignComputer(computer);
      });

      return newBtn;
    }

    function updateComputerListOnSearch(searchTerm) {
      var cmpBtnContainer = $("<div></div>");
      // var output = "";
      if (searchTerm === "") {
        computerList.forEach(function(computer, i) {
          if (!assignedComputerList.includes(computer)) {
            var newButton = createComputerButton(computer);
            cmpBtnContainer.append(newButton);
          }
        });
      } else {
        computerList.forEach(function(computer, i) {
          if (!assignedComputerList.includes(computer)) {
            if (computer.toLowerCase().includes(searchTerm.toLowerCase())) {
              var newButton = createComputerButton(computer);
              cmpBtnContainer.append(newButton);
            }
          }
        });
      }
      // console.log(output);

      $("#modalComputerList").empty();

      $("#modalComputerList").append(cmpBtnContainer);
      // return output;
    }

    const modalDOM = `<div class="modal fade" id="computerModal" tabindex="-1" role="dialog" aria-labelledby="computerModalTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Select a Computer</h5>
            <!-- <button type="button" id="removeComputerBtn" class="btn btn-sm btn-danger" data-dismiss="modal" aria-label="Close" onclick="deleteComputer(${currentComputer});">
              <span aria-hidden="true">Remove Computer</span>
            </button> -->
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="searchComputerModalForm" class="my-2" autocomplete="off">
              <input id="computerInput" class="form-control" type="text" placeholder="Search for Computer" autofocus="true" />
            </form>
            <div id="modalComputerList" class="list-group"></div>
          </div>
        </div>
      </div>
    </div>`;

    // Empty previous modals and recreate after every new click
    $("#item-modal").empty();
    $("#item-modal").append(modalDOM);
    updateComputerListOnSearch("");

    var form = $("#searchComputerModalForm");

    // Automatically focus computer search input
    $("#computerModal").on("shown.bs.modal", function() {
      $("#computerInput").trigger("focus");
    });

    $("#computerInput").on("input", function(e) {
      e.preventDefault();
      var searchTerm = $("#computerInput").val();
      updateComputerListOnSearch(searchTerm);
    });

    // Computer list should narrow down upon submit (Press Enter) or on input change
    form.on("submit", function(e) {
      e.preventDefault();
      var searchTerm = $("#computerInput").val();
      updateComputerListOnSearch(searchTerm);
    });
    // return modalDOM;
  }

  // Show computerModal after dropping into tile

  function showComputerModal(computer) {
    var computerId = computer.attr("id");
    createComputerModal(computerId);
    $("#computerModal").modal({
      show: true
    });
  }

  // create item draggable..
  // Pass different selectors for different items

  createDraggable("#computer");

  $(".droppable-tile").droppable({
    greedy: true,
    // accept: "#rectCopy",
    scope: "grid",
    classes: {
      "ui-droppable-active": "ui-state-active",
      "ui-droppable-hover": "ui-state-hover"
    },
    drop: function(ev, ui) {
      ev.preventDefault();
      // Cloning should be done only when dragging from the item palette
      if (!isInsideTile) {
        var copy = getClone("#computer", ui);
        $(this)
          // .css("z-index", 1)
          .append(copy);
        // Show computer modal after dropping first
        showComputerModal(copy);
      } else {
        $(this)
          // .css("z-index", 1)
          .append(ui.draggable);
      }
    }
  });
});
