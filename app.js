const ItemCtrl = (function() {
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };
})();

const UICtrl = (function() {
  console.log('UI Controller');
})();

const App = (function(ItemCtrl, UICtrl) {
  console.log('App controller.');
})(ItemCtrl, UICtrl);
