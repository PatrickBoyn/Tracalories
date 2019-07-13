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
    getItems: function() {
      return state.items;
    },
    logData: function() {
      return state;
    }
  };
})();

const UICtrl = (function() {
  return {
    populateItemList: function(items) {
      let html = '';
      items.forEach(function(item) {
        html += `<li id="item-${item.id}" class="collection-item"><strong>${
          item.name
        }</strong><em>${
          item.calories
        } Calories</em><a href="#" class="secondary-content">Edit Icon Goes Here</a></li>`;
      });
    }
  };
})();

const App = (function(ItemCtrl, UICtrl) {
  return {
    init: function() {
      console.log('Initializing application...');
      const items = ItemCtrl.getItems();

      UICtrl.populateItemList();

      console.log(items);
    }
  };
})(ItemCtrl, UICtrl);

App.init();
