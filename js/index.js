'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mainApp;
var defaultRecipes = [{ 'imageSrc': 'http://rasamalaysia.com/wp-content/uploads/2010/03/cha_gio1.jpg',
  'recipeName': 'Vietnamese Spring Rolls',
  'ingredientList': ['6 oz. ground pork', '2 oz. small shrimp minced', '1 oz. crab meat', 'Some shredded carrots', '1 oz. mung bean noodles/cellophane noodles/glass noodles – soaked in hot water for 30 minutes or until they turn very soft', '1 clove garlic minced', '1 shallot minced', '3 big dashes ground black pepper', '1 teaspoon fish sauce', 'Salt to taste', '1 small egg lightly beaten (use only half)', 'Vietnamese rice paper'],
  'id': '1'
}, { 'imageSrc': 'http://www.seriouseats.com/images/20120112-popeyes-refried-chicken-6.jpg',
  'recipeName': 'Fried Chicken',
  'ingredientList': ['1 (4 pound) chicken', '1 cup buttermilk', '2 cups all-purpose flour for coating', '1 teaspoon paprika', 'salt and pepper to taste', '2 quarts vegetable oil for frying'],
  'id': '2'
}, { 'imageSrc': 'http://thewoksoflife.com/wp-content/uploads/2015/03/beef-pepper-stir-fry-7.jpg',
  'recipeName': 'Pepper Beef Stir Fry',
  'ingredientList': ['12 oz. flank steak', '1/4 teaspoon baking soda (optional tenderizer)', '2 teaspoons soy sauce', '1/2 teaspoon sesame oil', '1 tablespoon cornstarch', '1 teaspoon oil', '2 tablespoons oil', '3 cloves garlic, sliced', '8 long hot green pepperss', '1 long hot red pepper', '1 tablespoon Shaoxing wine', '1/2 teaspoon salt', '1/2 teaspoon sugar', '1 tablespoon soy sauce', '1 teaspoon dark soy sauce', 'Fresh ground white pepper'],
  'id': '3'
}];

var recipes = getRecipes();

// close modal window when clicked outside of the form area
window.onclick = function (event) {
  var doesInclude = event.target.className.includes('centerDiv modal');
  if (doesInclude) {
    var element = document.getElementById(event.target.id);
    element.style.display = "none";
  }
};
// check to see if it's a new user to site,
// create localstorage with default recipes if it's a new user
// otherwise get local storage recipes
function getRecipes() {
  var isNewUser = localStorage.length === 0 ? true : false;
  if (!isNewUser) {
    // parse local storage string into json
    var recipes = JSON.parse(localStorage.userRecipe);
  } else {
    var recipes = defaultRecipes;
    //turn json object to string and store it in local storage
    localStorage.userRecipe = JSON.stringify(defaultRecipes);
  }
  return recipes;
}
// reset the forms data
function clearFormData() {
  document.getElementById('imageSrcBox').value = '';
  document.getElementById('recipeNameBox').value = '';
  document.getElementById('ingredientListBox').value = '';
}

// close modal window
function closeModal(id) {
  id.style.display = 'none';
}

// show modal window
function showEditModal(id) {
  var element = document.getElementById(id);
  element.style.display = 'block';
}

//show the new blank recipe Modal window
function showNewModal() {
  var element = document.getElementById('newModal');
  element.style.display = 'block';
}

// delete recipes from local storage
function deleteRecipe(id) {
  var toDelete = confirm('Are you sure you want to delete this recipe?');
  if (toDelete) {
    var indexToDelete = parseInt(id) - 1;
    recipes.splice(indexToDelete, 1);
    for (var i in recipes) {
      recipes[i].id = parseInt(i) + 1 + '';
    }
    //close modal window
    closeModal(document.getElementById(id));
    // update local storage;
    localStorage.userRecipe = JSON.stringify(recipes);
    // rerender the page to show the change
    mainApp.forceUpdate();
  }
}

// modify and set localUser recipes
function modifyRecipe(elementID) {
  var element = document.getElementById(elementID);
  var item = recipes[parseInt(elementID) - 1];
  var newImageSource = document.getElementById('editImageSrcBox' + elementID).value;
  var newRecipeName = document.getElementById('editRecipeNameBox' + elementID).value;
  var newIngredientList = document.getElementById('editIngredientListBox' + elementID).value.split(',');
  newIngredientList = newIngredientList.map(function (word) {
    return word.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  });
  item.imageSrc = newImageSource;
  item.recipeName = newRecipeName;
  item.ingredientList = newIngredientList;
  recipes[parseInt(elementID) - 1] = item;
  localStorage.userRecipe = JSON.stringify(recipes);
  closeModal(element);
  mainApp.forceUpdate();
}

// save new recipes and save it to local storage
function saveNewRecipe(elementID) {
  var element = document.getElementById(elementID);
  var imageSource = document.getElementById('imageSrcBox').value;
  var recipeName = document.getElementById('recipeNameBox').value;
  var ingredientList = document.getElementById('ingredientListBox').value.split(',');
  ingredientList = ingredientList.map(function (word) {
    return word.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  });
  var id = recipes.length + 1 + '';
  var recipesObj = {
    'imageSrc': imageSource,
    'recipeName': recipeName,
    'ingredientList': ingredientList,
    'id': id
  };
  recipes.push(recipesObj);
  localStorage.userRecipe = JSON.stringify(recipes);
  closeModal(element);
  clearFormData();
  mainApp.forceUpdate();
}

// create a modal window for adding new recipes
// hidden on load, will show when user click on add new item button in the recipe ingredient list
function NewModal() {
  return React.createElement(
    'div',
    { className: 'centerDiv modal', id: 'newModal' },
    React.createElement(
      'div',
      { className: 'modal-content' },
      React.createElement(
        'form',
        null,
        React.createElement(
          'h3',
          null,
          React.createElement(
            'strong',
            null,
            'Image link:'
          )
        ),
        React.createElement('input', { className: 'imageSrcInput',
          type: 'text',
          placeholder: 'Image link source',
          id: 'imageSrcBox' }),
        React.createElement('br', null)
      ),
      React.createElement(
        'form',
        null,
        React.createElement(
          'h3',
          null,
          React.createElement(
            'strong',
            null,
            'Recipe Name:'
          )
        ),
        React.createElement('input', { className: 'recipeNameInput',
          type: 'text',
          placeholder: 'Recipe name',
          id: 'recipeNameBox' }),
        React.createElement('br', null)
      ),
      React.createElement(
        'div',
        null,
        React.createElement(
          'h3',
          null,
          React.createElement(
            'strong',
            null,
            'Ingredient List:'
          )
        ),
        React.createElement('textarea', { id: 'ingredientListBox',
          className: 'ingredientList',
          type: 'text',
          placeholder: 'Recipe ingredients seperated by comma. I.e. pork, beef, chicken' })
      ),
      React.createElement(
        'button',
        { className: 'saveBtn', id: 'saveBtn', onClick: function onClick() {
            saveNewRecipe('newModal');
          } },
        React.createElement('i', { className: 'fa fa-floppy-o', 'aria-hidden': 'true' })
      )
    )
  );
}

// create edit modal windows for recipes in local storage
// hidden on load, will show when user click on edit icon in the recipe ingredient list
function EditModalContent(props) {
  var ingredientList = props.recipeObject.ingredientList.join(', ');
  ingredientList = ingredientList.replace(/, /g, ',\r\n');
  return React.createElement(
    'div',
    { className: 'centerDiv modal', id: props.recipeObject.id },
    React.createElement(
      'div',
      { className: 'modal-content' },
      React.createElement(
        'form',
        null,
        React.createElement(
          'h3',
          null,
          React.createElement(
            'strong',
            null,
            'Image link:'
          )
        ),
        React.createElement('input', { className: 'imageSrcInput',
          id: "editImageSrcBox" + props.recipeObject.id,
          type: 'text',
          defaultValue: props.recipeObject.imageSrc }),
        React.createElement('br', null)
      ),
      React.createElement(
        'form',
        null,
        React.createElement(
          'h3',
          null,
          React.createElement(
            'strong',
            null,
            'Recipe Name:'
          )
        ),
        React.createElement('input', { className: 'recipeNameInput',
          id: "editRecipeNameBox" + props.recipeObject.id,
          type: 'text',
          defaultValue: props.recipeObject.recipeName }),
        React.createElement('br', null)
      ),
      React.createElement(
        'div',
        null,
        React.createElement(
          'h3',
          null,
          React.createElement(
            'strong',
            null,
            'Ingredient List:'
          )
        ),
        React.createElement('textarea', { className: 'ingredientList',
          type: 'text',
          id: "editIngredientListBox" + props.recipeObject.id,
          defaultValue: ingredientList })
      ),
      React.createElement(
        'button',
        { className: 'saveBtn',
          onClick: function onClick() {
            modifyRecipe(props.recipeObject.id);
          } },
        React.createElement('i', { className: 'fa fa-floppy-o', 'aria-hidden': 'true' })
      ),
      React.createElement(
        'button',
        { className: 'deleteBtn',
          onClick: function onClick() {
            deleteRecipe(props.recipeObject.id);
          } },
        React.createElement('i', { className: 'fa fa-trash-o', 'aria-hidden': 'true' })
      )
    )
  );
}

// returns an imageDiv for recipe images   
function Image(props) {
  return React.createElement(
    'div',
    { className: 'centerDiv' },
    React.createElement('img', { src: props.imageSrc, alt: 'No images', className: 'images' })
  );
}

// createa a bootstrap accordion panel with collapsible panels
function RecipeNameAccordion(props) {
  return React.createElement(
    'div',
    { className: 'panel panel-default accordion-group' },
    React.createElement(
      'div',
      { className: 'panel-heading' },
      React.createElement(
        'h3',
        { className: 'panel-title panel-header-text' },
        React.createElement(
          'a',
          { 'data-toggle': 'collapse', href: "#collapse" + props.recipeObject.id },
          props.recipeObject.recipeName ? props.recipeObject.recipeName : 'no recipe name'
        )
      )
    ),
    React.createElement(
      'div',
      { className: 'panel-collapse collapse', id: "collapse" + props.recipeObject.id },
      React.createElement(
        'div',
        { className: 'panel-body' },
        React.createElement(
          'ul',
          null,
          props.recipeObject.ingredientList.map(function (item) {
            return React.createElement(
              'li',
              null,
              item ? item : 'no ingredients'
            );
          })
        )
      ),
      React.createElement(
        'div',
        { className: 'panel-footer alignRight' },
        React.createElement(EditButton, { objectID: props.recipeObject.id })
      )
    )
  );
}

// returns the add new item div
function AddNewRecipe() {
  return React.createElement(
    'div',
    { className: 'centerDiv col-md-6 item' },
    React.createElement(
      'div',
      { className: 'addNewRecipeDiv borderSolidBlue' },
      React.createElement(
        'button',
        { id: 'newItemBtn', onClick: function onClick() {
            showNewModal();
          } },
        React.createElement('i', { className: 'fa fa-plus bigIcon', 'aria-hidden': 'true' })
      ),
      React.createElement(
        'div',
        { className: 'addNewDiv' },
        React.createElement(
          'h3',
          { id: 'addNewHeading' },
          'Add new item'
        )
      )
    )
  );
}

// returns the edit button
function EditButton(props) {
  return React.createElement(
    'button',
    { id: 'editBtn', onClick: function onClick() {
        return showEditModal(props.objectID);
      } },
    React.createElement('i', { className: 'fa fa-pencil-square-o', 'aria-hidden': 'true' })
  );
}

// renders each recipe component

var Recipe = function (_React$Component) {
  _inherits(Recipe, _React$Component);

  function Recipe() {
    _classCallCheck(this, Recipe);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Recipe.prototype.render = function render() {
    return React.createElement(
      'div',
      { id: this.props.recipeObject.recipeName },
      React.createElement(Image, { imageSrc: this.props.recipeObject.imageSrc }),
      React.createElement(
        'div',
        { className: 'panel-group' },
        React.createElement(RecipeNameAccordion, { recipeObject: this.props.recipeObject })
      )
    );
  };

  return Recipe;
}(React.Component);

// render the whole recipe app

var App = function (_React$Component2) {
  _inherits(App, _React$Component2);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  App.prototype.render = function render() {
    mainApp = this;
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'row' },
        recipes.map(function (item) {
          return React.createElement(
            'div',
            { className: 'col-md-6 item' },
            React.createElement(Recipe, { recipeObject: item })
          );
        }),
        React.createElement(AddNewRecipe, null)
      ),
      React.createElement(
        'div',
        null,
        recipes.map(function (item) {
          return React.createElement(
            'div',
            null,
            React.createElement(EditModalContent, { recipeObject: item })
          );
        }),
        React.createElement(
          'div',
          null,
          React.createElement(NewModal, null)
        )
      )
    );
  };

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('container'));