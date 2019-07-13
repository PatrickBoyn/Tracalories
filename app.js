const ItemCtrl = (() => {
  const Item = (id, name, calories) => {
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
    getItems: () => {
      return state.items;
    },
    logData: () => {
      return state;
    }
  };
})();

const UICtrl = (() => {
  return {
    populateItemList: items => {
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

const App = ((ItemCtrl, UICtrl) => {
  return {
    init: () => {
      console.log('Initializing application...');
      const items = ItemCtrl.getItems();

      UICtrl.populateItemList(items);

      console.log(items);
    }
  };
})(ItemCtrl, UICtrl);

App.init();
