let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
const toyList = document.getElementById("toy-collection")
fetch('http://localhost:3000/toys')
 .then(res => res.json())
 .then(toys => {
  //  console.log(toys);
   toys.forEach(toy => {
     console.log(toy);
         
      toyList.innerHTML += `<div class="card">
            <h2>${toy.name}</h2>
            <img src= ${toy.image} class="toy-avatar" alt = "loading..." />
            <p id = 'toy-likes'>${toy.likes}</p>
            <button class="like-btn" id="[toy_id]">Like ❤️</button>
          </div>`;
 })
 })

 document.querySelector('form').addEventListener('submit', (e)=>{
  e.preventDefault()
  const newImageName = document.getElementById('name').value
  const newImage = document.getElementById('image').value

  console.log(newImageName)
  console.log(newImageName)
  

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: newImageName, image: newImage, likes: 0})
  })
 .then(response => response.json())
 .then(response => {
  alert("image added successfully")
 })
})

// document.querySelector('button').addEventListener('click', (e)=>{
//   e.preventDefault()
//   function handleClick(){}
  

//   fetch(`http://localhost:3000/toys${id}`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({likes: 0})
//   })
//  .then(response => response.json())
//  .then(response => {
//   console.log('liked')
//  })
// })
function handleLikeClick(id) {
  // Send a PATCH request to update the likes for the specific item
  fetch(`http://localhost:3000/toys${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // Increment the likes property for the item
      likes: {
        _increment: 1,
      },
    }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update likes');
      }
      // Update the UI or perform other actions if needed
    })
    .catch(error => {
      console.error('Error updating likes:', error);
    });
}

// Example event listener for a specific item
const itemElement = document.getElementById('id');
itemElement.addEventListener('click', () => {
  handleLikeClick('toy-likes');
});