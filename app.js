const StorageCtrl = (() => {
  return {
    storeItem: newItem => {
      let items = [];

      if (localStorage.getItem('items') === null) {
      } else {
      }
    }
  };
})();

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
    getItemById: id => {
      let found = null;
      state.items.forEach(item => {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    updateItem: (name, calories) => {
      calories = parseInt(calories);

      let found = null;

      state.items.forEach(item => {
        if (item.id === state.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });

      return found;
    },
    deleteItem: id => {
      const ids = state.items.map(item => {
        return item.id;
      });
      const index = ids.indexOf(id);

      state.items.splice(index, 1);
    },
    clearAll: () => {
      state.items = [];
    },
    setCurrentItem: item => {
      state.currentItem = item;
    },
    getCurrentItem: () => {
      return state.currentItem;
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
    listItems: '#item-list li',
    clearBtn: '.clear-btn',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
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
      } Calories</em> <a href="#" class="edit-content">Edit Item </a>`;
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement('beforeend', li);
    },
    updateListItem: updatedItem => {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      listItems = Array.from(listItems);

      listItems.forEach(listItem => {
        const itemID = listItem.getAttribute('id');

        if (itemID === `item-${updatedItem.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${
            updatedItem.name
          }:</strong> <em>${
            updatedItem.calories
          } Calories</em> <a href="#" class="edit-item"> Edit Item</a>`;
        }
      });
    },
    deleteListItem: id => {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },
    clearInput: () => {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
      console.log('Clear Input');
    },
    addItemToForm: () => {
      document.querySelector(
        UISelectors.itemNameInput
      ).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(
        UISelectors.itemCaloriesInput
      ).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    removeAllItems: () => {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      listItems.Array.from(listItems);

      listItems.forEach(item => {
        item.remove();
      });
    },
    showTotalCalories: totals => {
      document.querySelector(UISelectors.totalCalories).textContent = totals;
    },
    getSelectors: () => {
      return UISelectors;
    },
    clearEditState: () => {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    showEditState: () => {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    }
  };
})();

const App = ((ItemCtrl, StorageCtrl, UICtrl) => {
  const loadEventListeners = () => {
    const UISelectors = UICtrl.getSelectors();
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener('click', itemAddSubmit);

    document.addEventListener('keypress', e => {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    document
      .querySelector(UISelectors.itemList)
      .addEventListener('click', itemEditClick);

    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener('click', itemUpdateSubmit);

    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener('click', itemDeleteSubmit);

    document
      .querySelector(UISelectors.backBtn)
      .addEventListener('click', goBackSubmit);

    document
      .querySelector(UISelectors.clearBtn)
      .addEventListener('click', clearAllItems);
  };

  const itemAddSubmit = e => {
    const input = UICtrl.getItemInput();

    if (input.name !== '' && input.calories !== '') {
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      UICtrl.addListItem(newItem);

      const totalCalories = ItemCtrl.getTotalCalories();

      UICtrl.showTotalCalories(totalCalories);

      StorageCtrl.storeItem(newItem);

      UICtrl.clearInput();
    }

    const totalCalories = ItemCtrl.getTotalCalories();

    UICtrl.showTotalCalories(totalCalories);
    e.preventDefault();
  };

  const itemEditClick = e => {
    if (e.target.classList.contains('edit-content')) {
      const listId = e.target.parentNode.id;
      const listArray = listId.split('-');
      const id = parseInt(listArray[1]);

      const itemToEdit = ItemCtrl.getItemById(id);
      ItemCtrl.setCurrentItem(itemToEdit);

      UICtrl.addItemToForm();
    }

    e.preventDefault();
  };

  const itemUpdateSubmit = e => {
    const input = UICtrl.getItemInput();
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    const totalCalories = ItemCtrl.getTotalCalories();

    UICtrl.updateListItem(updatedItem);

    UICtrl.showTotalCalories(totalCalories);
    UICtrl.clearEditState();
    e.preventDefault();
  };

  const itemDeleteSubmit = e => {
    const currentItem = ItemCtrl.getCurrentItem();

    ItemCtrl.deleteItem(currentItem.id);

    UICtrl.deleteListItem(currentItem.id);

    const totalCalories = ItemCtrl.getTotalCalories();

    UICtrl.showTotalCalories(totalCalories);
    UICtrl.clearEditState();

    e.preventDefault();
  };

  const clearAllItems = () => {
    ItemCtrl.clearAll();

    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.removeAllItems();
  };

  const goBackSubmit = e => {
    UICtrl.clearEditState();
    e.preventDefault();
  };

  return {
    init: () => {
      UICtrl.clearEditState();

      const items = ItemCtrl.getItems();
      UICtrl.populateItemList(items);

      loadEventListeners();
    }
  };
})(ItemCtrl, StorageCtrl, UICtrl);

App.init();
