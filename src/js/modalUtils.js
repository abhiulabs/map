var modalUtils = (function() {
  var computerElement = "";

  var assignComputer = function(computerName) {
    // Check if there is already a computer assigned
    var existingComputer = computerElement.data().computer;

    if (existingComputer !== undefined) {
      console.log("Already has a computer " + existingComputer);
      console.log("Reassigning to " + computerName);
      DATA.addComputerBack(existingComputer);
    }

    computerElement.data("computer", computerName);
    // Close modal after assigning computer
    $("#computerModal").modal("hide");
    DATA.addComputerToAssignedList(computerName);
  };

  var createComputerButton = function(computerName) {
    var newBtn = $("<button></button>");
    newBtn.text(computerName);
    newBtn.addClass("list-group-item list-group-item-action");
    newBtn.on("click", function() {
      assignComputer(computerName);
    });

    return newBtn;
  };

  var updateComputerListOnSearch = function(searchTerm) {
    var cmpBtnContainer = $("<div></div>");
    if (searchTerm === "") {
      $.each(DATA.getComputerList(), function(i, computer) {
        var newButton = createComputerButton(computer);
        cmpBtnContainer.append(newButton);
      });
    } else {
      $.each(DATA.getComputerList(), function(i, computer) {
        if (computer.toLowerCase().includes(searchTerm.toLowerCase())) {
          var newButton = createComputerButton(computer);
          cmpBtnContainer.append(newButton);
        }
      });
    }

    $("#modalComputerList").empty();
    $("#modalComputerList").append(cmpBtnContainer);
    // return output;
  };

  var createComputerModal = function() {
    // Delete any previous DOM in modal
    $("#item-modal").empty();
    // modalDom is defined in globals.js
    $("#item-modal").append(modalDOM);

    // Build modal form without any searchTerm
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
  };

  var showComputerModal = function(computer) {
    computerElement = computer;
    createComputerModal();
    $("#computerModal").modal({ show: true });
  };

  var showComputerModalOnClick = function(computer) {
    computerElement = computer;
    createComputerModal();
  };

  return {
    showComputerModal: showComputerModal,
    showComputerModalOnClick: showComputerModalOnClick
  };
})();
