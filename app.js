document.addEventListener("DOMContentLoaded", () => {
  fetch("https://swapi.dev/api/people/")
    .then((response) => response.json())
    .then((data) => {
      loadUsers(data);
      eachUserDetail(data);
    })
    .catch(e => {
        console.log(e);
        return e;
    });
});

//displays "fetching data" and disappears after the data is fetched.
const characters = document.querySelector("#list");
characters.innerHTML =
  "<div id='nodatadiv'><h2 id='nodata'>Fetching Data...</h2></div>";

//this function displays a dummy images, immediate after loading the document, along side with the corresponding name user
let loadUsers = (data) => {
  let results = data.results;
  let usersHtml = "";
  results.forEach(function (Name, id) {
    usersHtml += `<div class='char'>
            <div class='imagName'>
            <img class='imag' src="images/teacher${id}.jpg" >
            <p class='name' data-id='${id}' style="color: inherit" type="text">
            <h4 id='clickablename' data-id='${id}'>${Name.name}</h4></p>
            </div>
            </div><hr>`;
  });
  characters.innerHTML = usersHtml;
};

//This function uses the output from the user class the display uer detail when any user's name is clicked.
let eachUserDetail = (data) => {
  //adding event listener to all the 'clickablename' class(user name)
  document.querySelector("#list").addEventListener("click", function (event) {
    if (event.target.id === "clickablename") {
      let id = parseInt(event.target.dataset.id, 10);
      let characterData = data.results[id];
      //calling the static 'getUserProperty' of the 'User' class. Hence, creating a new instance of class "User" 
      const db = User.getUserInstance();
      const result = db.getUserProperty(characterData);
      result.then((user) => {
        //creating a tamplate to fill in the user detail
        let userHtml1 = `<div class='genderHeight' data-id=${id}>
                    <div class='hide' data-id=${id}>
                    Height: ${user.Height}
                    </div>
                    <p class='hide' data-id=${id}>
                    Gender: ${user.Gender}
                    </p>
                    <p class='tobehidden' data-id=${id}>
                    Name: ${user.Name}
                    </p>
                    </div>`;

        event.target.parentNode.innerHTML = userHtml1;
      });
    }
  });
};

//toggles between hide and show user details
document.querySelector("#list").addEventListener("click", function (event) {
  if(event.target.className == 'tobehidden'){
    let hide=event.target.parentNode.childNodes;
    if(hide[1].style.display==""){
      hide[1].style.display="none";
      hide[3].style.display="none";
    }else if(hide[1].style.display=="block"){
      hide[1].style.display="none";
      hide[3].style.display="none";
    }else{
      hide[1].style.display="block";
      hide[3].style.display="block";
    }
    console.log(hide[1]);
    console.log(hide);
  } 
});

// a class with a method(property) that takes a single user details and resolve the user's name, height andb gender.
const instance = null;
class User {
  //returns a new instance of the class.
  static getUserInstance() {
    return instance ? instance : new User();
  }
  //resolves the needed user detail
  async getUserProperty(singleUserDetails) {
    try {
      const response = new Promise((resolve, reject) => {
        if (singleUserDetails) {
          resolve({
            Height: singleUserDetails.height,
            Gender: singleUserDetails.gender,
            Name: singleUserDetails.name,
          });
        } else {
          reject(new Error(err.message));
        }
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
