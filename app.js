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

      items.forEach(item => {
        html += `<li class="collection-item" id="item-${item.id}">${
          item.name
        }: <em>${item.calories} Calories</em>
        <a href="#" class="edit-item">Edit Item</a></li>`;
      });
      document.querySelector('#item-list').innerHTML = html;
    }
  };
})();

const App = (function(ItemCtrl, UICtrl) {
  return {
    init: function() {
      console.log('Initializing application...');
      const items = ItemCtrl.getItems();

      UICtrl.populateItemList(items);

      console.log(items);
    }
  };
})(ItemCtrl, UICtrl);

App.init();
