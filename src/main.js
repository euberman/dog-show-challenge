// 'use strict'
const dogUrl = 'http://localhost:3000/dogs';
let tableBody;
let dogForm;
let current_dog_id;

document.addEventListener('DOMContentLoaded', () => {
      tableBody = document.getElementById('table-body');
      dogForm = document.getElementById('dog-form');
      fetchDogs();
      prepareFormEvents(); 
});

// Fetch all dogs from db.json and refresh data
function fetchDogs() {
  fetch(dogUrl)
    .then(resp => resp.json())
    .then(json => {
      console.log(json);
      renderDogs(json)
    })
}

function renderDogs(dogs){
  tableBody.innerHTML = "";
  dogs.forEach(dog => renderDog(dog));
}

function renderDog(dog) {
  const tableRow = document.createElement("tr");
  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit Dog";
  tableBody.append(tableRow);
  tableRow.innerHTML = `<td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td>`
  tableRow.append(editBtn);
  editBtn.addEventListener("click", function(event) {
      //let dogInfo = document.querySelector("#dog-form")
      current_dog_id = dog.id;
      dogForm.name.value = dog.name;
      dogForm.breed.value = dog.breed;
      dogForm.sex.value = dog.sex;
      console.log(dogForm);
  });
}

function prepareFormEvents(){
  dogForm.addEventListener('submit', function(event){
    const dog = {
      name: event.target.name.value, 
      breed: event.target.breed.value, 
      sex: event.target.sex.value
    };
    const dUrl = ;
    const configObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(dog)
    };
    fetch(dogUrl, configObject)
      .then(resp => resp.json())
      .then(json => renderDogs(json))
  });
}