$(document).ready(function() {
  var currentDraggingItem = "";
  var itemIds = [];
  var counter = 0;

  var assignedComputerList = [];

  // You can clone only from the palette, once dropped inside tiles
  var isInsideTile = false;

  // ---- Global Variabls End ----

  // Define Functions here

  // Clone the computer/item when dragged from palette
  function getClone(ui) {
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
      // createComputerModal(copy);
      modalUtils.showComputerModalOnClick(copy);
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

  // // Function to create modal window to add computer to after dropped in map tile
  // function createComputerModal(currentComputer) {
  //   // Assign computer to the computer icon
  //   function assignComputer(computerName) {
  //     // Check if there is already a computer assigned
  //     var existingComputer = currentComputer.data().computer;

  //     if (existingComputer !== undefined) {
  //       console.log("Already has a computer " + existingComputer);
  //       console.log("Reassigning to " + computer);
  //       DATA.addComputerBack(existingComputer);
  //     }

  //     currentComputer.data("computer", computerName);
  //     // Close modal after assigning computer
  //     $("#computerModal").modal("hide");
  //     // assignedComputerList.push(computer);
  //     DATA.addComputerToAssignedList(computerName);
  //   }

  //   // The computer button in modal list
  //   function createComputerButton(computerName) {
  //     var newBtn = $("<button></button>");
  //     newBtn.text(computerName);
  //     newBtn.addClass("list-group-item list-group-item-action");
  //     newBtn.on("click", function() {
  //       assignComputer(computerName);
  //     });

  //     return newBtn;
  //   }

  //   function updateComputerListOnSearch(searchTerm) {
  //     var cmpBtnContainer = $("<div></div>");
  //     // var output = "";
  //     if (searchTerm === "") {
  //       $.each(DATA.getComputerList(), function(i, computer) {
  //         // if (!assignedComputerList.includes(computer)) {
  //         var newButton = createComputerButton(computer);
  //         cmpBtnContainer.append(newButton);
  //         // }
  //       });
  //     } else {
  //       $.each(DATA.getComputerList(), function(i, computer) {
  //         // if (!assignedComputerList.includes(computer)) {
  //         if (computer.toLowerCase().includes(searchTerm.toLowerCase())) {
  //           var newButton = createComputerButton(computer);
  //           cmpBtnContainer.append(newButton);
  //         }
  //         // }
  //       });
  //     }

  //     $("#modalComputerList").empty();

  //     $("#modalComputerList").append(cmpBtnContainer);
  //     // return output;
  //   }

  //   // Empty previous modals and recreate after every new click
  //   $("#item-modal").empty();
  //   $("#item-modal").append(modalDOM);
  //   updateComputerListOnSearch("");

  //   var form = $("#searchComputerModalForm");

  //   // Automatically focus computer search input
  //   $("#computerModal").on("shown.bs.modal", function() {
  //     $("#computerInput").trigger("focus");
  //   });

  //   $("#computerInput").on("input", function(e) {
  //     e.preventDefault();
  //     var searchTerm = $("#computerInput").val();
  //     updateComputerListOnSearch(searchTerm);
  //   });

  //   // Computer list should narrow down upon submit (Press Enter) or on input change
  //   form.on("submit", function(e) {
  //     e.preventDefault();
  //     var searchTerm = $("#computerInput").val();
  //     updateComputerListOnSearch(searchTerm);
  //   });
  //   // return modalDOM;
  // }

  // // Show computerModal after dropping into tile

  // function showComputerModal(computer) {
  //   var computerId = computer.attr("id");
  //   // createComputerModal(computerId);
  //   createComputerModal(computer);
  //   $("#computerModal").modal({
  //     show: true
  //   });
  // }

  // function addToolTipToComputer(computer) {
  //   console.log(computer);

  //   // console.log(computer);
  //   computer.tooltip({
  //     html: true,
  //     placement: "right",
  //     title: `
  //       <h2>${computer.data().computer}</h2>
  //     `
  //   });
  // }

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
        var copy = getClone(ui);
        $(this)
          // .css("z-index", 1)
          .append(copy);

        // Show computer modal after dropping first
        modalUtils.showComputerModal(copy);
        // addToolTipToComputer(copy);
      } else {
        $(this).append(ui.draggable);
        // addToolTipToComputer(ui.draggable);
      }
    }
  });
});
