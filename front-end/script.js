const API_URL = "http://localhost:5000/notes/";
var notes = document.getElementById("notes");

var updateId = "";
var deleteId = "";

$('.close').click(()=>{
  $('.add-panel').hide();
  $('.update-panel').hide();
  $('.alert-panel').hide();
  $('.status-panel').hide();
});

$('.add-circle').click(() =>{
  $('.add-panel').show();
  console.log(updateId);
});

var settings = (typ, param = "") => {
  return {
    async: true,
    crossDomain: true,
    url: API_URL + param,
    method: typ,
  };
};

var getNotes = () => {
  notes.innerHTML = "";
  $.ajax(settings("GET")).done(function (response) {
    response.forEach((e) => {
      notes.innerHTML += note(e._id, e.title, e.content, e.status);
    });
  });
};getNotes();




$(document).on({
  ajaxStart: function () {
    $("body").addClass("loading");
  },
  ajaxStop: function () {
    $("body").removeClass("loading");

    $(".btn-primary").click((e) => {
      let item = e.target.parentElement.parentElement;
      let id = item.children[3].getAttribute("data-target");
      $.ajax({
        url: API_URL + id,
        type: "PUT",
        data: {
          "status" : false
        },
        success: function (data) {
          if(data==='OK'){
            $('.status-panel').show();
            getNotes();
            updateId = "";
          }
        },
      });
    });

    $(".btn-success").click((e) => {
      $('.update-panel').show();
      let item = e.target.parentElement.parentElement;
      $('#_title').val(item.children[0].innerText);
      $('#_note').val(item.children[2].innerText);
      let id = item.children[3].getAttribute("data-target");
      editNote(id);
    });

    $(".btn-danger").click((e) => {
      $('.alert-panel').show();
      deleteNote(e.target.parentElement
        .getAttribute("data-target"));
    });
    
    
  },
});

var note = (id, title, content, status) => {
  if (!status) {
    status = "readed";
  } else {
    status = "";
  }
  return `
  <div class="col-lg-4 col-md-6 col-sm-12">
  <div class="note">
  <div class="note-wrap ${status}">
      <h3 class="h3">${title}</h3>
      <hr>
      <p class="p">${content}</p>
      <div data-target="${id}">
          <button class="btn btn-primary">Okundu olarak işaretle</button>
          <br><button class="btn btn-success">Düzenle</button>
          <button class="btn btn-danger">Sil</button>
      </div>
  </div> 
  </div>
  </div>`;
};


// ADD NOTE
$('.btn-warning').click(()=>{
  $.ajax({
    url: API_URL,
    type: "POST",
    data: {
      "title": $('#title').val(),
      "content": $('#note').val(),
      "status" : true
    },
    success: function (data) {
      if(data==='OK'){
        $('.status-panel').show();
        getNotes();
      }
    },
  });
  $('.add-panel').hide();
})

// UPDATE NOTE
$('.btn-info').click(()=>{
  $.ajax({
    url: API_URL + updateId,
    type: "PUT",
    data: {
      "title": $('#_title').val(),
      "content": $('#_note').val(),
      "status" : true
    },
    success: function (data) {
      if(data==='OK'){
        $('.status-panel').show();
        getNotes();
        updateId = "";
      }
    },
  });
  $('.update-panel').hide();
})

// DELETE NOTE
$('.btn-secondary').click(()=>{
  $.ajax({
    url: API_URL + deleteId,
    type: "DELETE",
    success: function (data) {
      if(data==='OK'){
        $('.status-panel').show();
        getNotes();
        deleteId = "";
      }
    },
  });
  $('.alert-panel').hide();
})

var editNote = (id) => {
  updateId = id;
}

var deleteNote = (id) => {
  deleteId = id;
}

