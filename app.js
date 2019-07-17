const ItemCtrl = (() => {
  // Apparently in order to be a constructor
  // This must be a "function", and not an arrow function.
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  const state = {
    items: [],
    // Should be null for now.
    currentItem: null,
    totalCalories: 0
  };
  return {
    getItems: () => {
      return state.items;
    },
    addItem: (name, calories) => {
      let ID;
      if (state.items.length > 0) {
        ID = state.items[state.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      calories = parseInt(calories);

      newItem = new Item(ID, name, calories);

      state.items.push(newItem);
      console.log(state);
      return newItem;
    },
    getTotalCalories: () => {
      let total = 0;

      state.items.forEach(item => {
        total += item.calories;
      });

      state.totalCalories = total;

      return state.totalCalories;
    },
    logData: () => {
      return state;
    }
  };
})();

const UICtrl = (() => {
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
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
    getItemInput: () => {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      };
    },
    addListItem: item => {
      const li = document.createElement('li');
      document.querySelector(UISelectors.itemNameInput).style.display = 'block';
      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      li.innerHTML = `<strong>${item.name}: </strong> <em>${
        item.calories
      } Calories</em> <a href="#" class="secondary-content">Edit Item </a>`;
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement('beforeend', li);
    },
    clearInput: () => {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    showTotalCalories: totals => {
      document.querySelector(UISelectors.totalCalories).textContent = totals;
    },
    getSelectors: () => {
      return UISelectors;
    }
  };
})();

const App = ((ItemCtrl, UICtrl) => {
  const loadEventListeners = () => {
    const UISelectors = UICtrl.getSelectors();
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener('click', itemAddSubmit);
  };

  const itemAddSubmit = e => {
    const input = UICtrl.getItemInput();

    if (input.name !== '' && input.calories !== '') {
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      UICtrl.addListItem(newItem);

      const totalCalories = ItemCtrl.getTotalCalories();

      UICtrl.showTotalCalories(totalCalories);

      UICtrl.clearInput();
    }

    const totalCalories = ItemCtrl.getTotalCalories();

    UICtrl.showTotalCalories(totalCalories);

    e.preventDefault();
  };
  return {
    init: () => {
      const items = ItemCtrl.getItems();
      UICtrl.populateItemList(items);

      loadEventListeners();
    }
  };
})(ItemCtrl, UICtrl);

App.init();
