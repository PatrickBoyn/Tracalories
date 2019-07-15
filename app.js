const ItemCtrl = (() => {
  const Item = (id, name, calories) => {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  const state = {
    items: [
      { id: 0, name: 'stake dinner', calories: 1200 },
      { id: 1, name: 'cookie', calories: 400 },
      { id: 2, name: 'eggs', calories: 300 }
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
  const UISelectors = {
    itemList: '#item-list'
  };
  return {
    populateItemList: items => {
      let html = '';

      items.forEach(item => {
        html += `<li class="collection-item" id="item-${item.id}">${
          item.name
        }: <em>${item.calories} Calories</em>
        <a href="#" class="edit-item">Edit Item</a></li>`;
      });
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getSelectors: () => {
      return UISelectors;
    }
  };
})();

const App = ((ItemCtrl, UICtrl) => {
  const loadEventListeners = () => {
    const UISelectors = UICtrl.getSelectors();
  };
  return {
    init: () => {
      const items = ItemCtrl.getItems();

      UICtrl.populateItemList(items);

      console.log(items);
    }
  };
})(ItemCtrl, UICtrl);

App.init();
