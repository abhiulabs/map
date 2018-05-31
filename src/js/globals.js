const modalDOM = `<div class="modal fade" id="computerModal" tabindex="-1" role="dialog" aria-labelledby="computerModalTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Select a Computer</h5>
            <!-- <button type="button" id="removeComputerBtn" class="btn btn-sm btn-danger" data-dismiss="modal" aria-label="Close">
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
