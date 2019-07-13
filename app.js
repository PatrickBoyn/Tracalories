const ItemCtrl = (function() {
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  const state = {
    items: [
      { id: 0, name: 'stake dinner', calories: 1200 },
      { id: 2, name: 'cookie', calories: 400 },
      { id: 3, name: 'eggs', calories: 300 }
    ],
    currentItem: null,
    totalCalories: 0
  };
  return {
    logData: function() {
      return data;
    }
  };
})();

const UICtrl = (function() {
  console.log('UI Controller');
})();

const App = (function(ItemCtrl, UICtrl) {
  console.log('App controller.');
})(ItemCtrl, UICtrl);
