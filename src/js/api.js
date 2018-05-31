var DATA = {
  computers: [],
  sortComputersByName: function() {
    DATA.computers.sort();
  },
  getComputerList: function() {
    DATA.computers = DATA.computers.length
      ? DATA.computers
      : [
          "Computer 1",
          "Computer 2",
          "Computer 3",
          "Computer 4",
          "Computer 5",
          "SVP-DESKTOP",
          "SID-VM-WIN10",
          "SAI's COMPUTER"
        ].slice();
    DATA.sortComputersByName();
    return DATA.computers;
  },
  addComputerToAssignedList: function(computer) {
    DATA.computers = DATA.computers.filter(function(cmp) {
      return cmp !== computer;
    });
    DATA.sortComputersByName();
  },
  addComputerBack: function(computer) {
    DATA.computers.push(computer);
    DATA.sortComputersByName();
  }
};
