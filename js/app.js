//if users add a note, add it to the local Storage
let addBtn = document.getElementById("addBtn");
showNotes();

addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes); // it basically converts the string to an object and stores it in notesObj
  }
  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  console.log(notesObj);
  showNotes();
});

//function to show notes
function showNotes() {
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
        <div class="card my-2 mx-2" style="width: 18rem;">
        <div class=" noteCard card-body">
            <h5 class="card-title">Note ${index + 1} </h5>
            <p class="card-text">${element}</p>
            <button id = ${index} onclick ="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>`;
  });

  let notesElement = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElement.innerHTML = html;
  } else {
    notesElement.innerHTML = `<h1 class="text-center">No Notes to Show</h1>`;
  }
}

//function to delete a note
function deleteNote(index) {

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let searchTxt = document.getElementById("searchTxt");
searchTxt.addEventListener("input", function (e) {
  let inputVal = searchTxt.value.toLowerCase();

  let noteCards = document.getElementsByClassName("card");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;

    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
