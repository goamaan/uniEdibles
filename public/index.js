var title1 = document.querySelector("#title1");
var title2 = document.querySelector("#title2");
var title3 = document.querySelector("#title3");
var myURL1 = document.querySelector("#myURL1");
var myURL2 = document.querySelector("#myURL2");
var myURL3 = document.querySelector("#myURL3");
var link1 = document.getElementById("link1");
var link2 = document.getElementById("link2");
var link3 = document.getElementById("link3");
var linkMain = "https://spoonacular.com/recipes/";

window.onload = function() {
  var button = document.getElementById("submit");
  button.onclick = addItem;
};
var arrayFinal = [];
function addItem() {
  var textInput = document.getElementById("inputText"); //getting text input
  var text = textInput.value; //getting value of text input element
  var ul = document.getElementById("ul"); //getting element <ul> to add element to
  var li = document.createElement("li"); //creating li element to add
  li.innerHTML = text; //inserting text into newly created <li> element
  li.onclick = function() {
    this.parentNode.removeChild(this);
    arrayFinal.pop(text);
  };
  if (ul.childElementCount == 0) {
    //using if/else statement to add items to top of list
    ul.appendChild(li); // will add if count of ul children is 0 otherwise add before first item
  } else {
    ul.insertBefore(li, ul.firstChild);
  }
  arrayFinal.push(text);
}

function refresh() {
  // var listItems = document.querySelectorAll("#ul>li");
  // for (var i = listItems.length >>> 0; i--; ) {
  //   arrayFinal.push;
  // }
  // var INGREDIENT_LIST = ["honey", "eggs", "milk", "bread"];
  var requestString =
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&limitLicense=true&ignorePantry=false&ingredients=";
  var ingredientString = arrayFinal.map(ingredient => ingredient);
  requestString = requestString + ingredientString;

  fetch(requestString, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "x-rapidapi-key": "caddc77217mshc12f21534dbb099p19cbccjsnfe01e4dfc081"
    }
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      const { title, image } = data;
      var str1 = data["0"].title;
      var str2 = data["1"].title;
      var str3 = data["2"].title;
      str1 =
        linkMain +
        str1
          .replace(/\s+/g, "-")
          .toLowerCase()
          .concat("-", data["0"].id);
      str2 =
        linkMain +
        str2
          .replace(/\s+/g, "-")
          .toLowerCase()
          .concat("-", data["1"].id);
      str3 =
        linkMain +
        str3
          .replace(/\s+/g, "-")
          .toLowerCase()
          .concat("-", data["2"].id);
      title1.textContent = data["0"].title;
      title2.textContent = data["1"].title;
      title3.textContent = data["2"].title;
      myURL1.src = data["0"].image;
      myURL2.src = data["1"].image;
      myURL3.src = data["2"].image;
      link1.href = str1;
      link2.href = str2;
      link3.href = str3;
    });
}

function search() {
  var requestString =
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?number=1&offset=0&type=main%20course&limitLicense=true&query=burgers";
  var searchText = document.getElementById("searchInput").value;
  var recipeString = requestString + searchText;
  fetch(requestString, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "x-rapidapi-key": "caddc77217mshc12f21534dbb099p19cbccjsnfe01e4dfc081"
    }
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
    });
}

// unirest
//   .get(requestString)
//   .header("caddc77217mshc12f21534dbb099p19cbccjsnfe01e4dfc081", API_KEY)
//   .end(function(result) {
//     if (result.status === 200) {
//       getRecipeData(result.body);
//     }
//   });
// console.log(ingredientString);
// var req = unirest(
//   "GET",
//   "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients"
// );

// req.query({
//   number: "5",
//   ranking: "1",
//   ignorePantry: "false",
//   ingredients: ingredientString
// });

// req.headers({
//   "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
//   "x-rapidapi-key": "caddc77217mshc12f21534dbb099p19cbccjsnfe01e4dfc081"
// });

// req.end(function(res) {
//   if (res.error) throw new Error(res.error);
//   console.log(res.body);
// });
