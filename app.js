const StorageCtrl = (() => {})();
// -----------------------------------------------
const ItemCtrl = (() => {
  // Don't change, item constructor.
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  const data = {
    items: [],
    // This should be null.
    currentItem: null,
    totalCalories: 0
  };
  return {
    getItems: () => {
      return data.items;
    },
    addItem: (name, calories) => {
      let ID;
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      calories = parseInt(calories);

      newItem = new Item(ID, name, calories);

      data.items.push(newItem);

      return newItem;
    },
    getItemById: id => {
      let found = null;

      data.items.forEach(item => {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    updateItem: (name, calories) => {
      calories = parseInt(calories);

      let found = null;

      data.items.forEach(item => {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });

      return found;
    },
    deleteItem: id => {
      const ids = data.items.map(item => {
        return item.id;
      });

      const index = ids.indexOf(id);

      data.items.splice(index, 1);
    },
    clearItems: () => {
      data.items = [];
    },
    setCurrentItem: item => (data.currentItem = item),
    getCurrentItem: () => {
      return data.currentItem;
    },
    getTotalCalories: () => {
      let total = 0;

      data.items.forEach(item => {
        total += item.calories;
      });

      data.totalCalories = total;

      return data.totalCalories;
    },
    logData: () => {
      return data;
    }
  };
})();
// -----------------------------------------------------
const UICtrl = (() => {
  const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
  };
  return {
    populateItemList: items => {
      let html = '';

      items.forEach(item => {
        html += `<li id="item-${item.id}" class="collection-item"><strong>${
          item.name
        }</strong> <em>${
          item.calories
        } Calories</em> <a href="#" class="edit-item">Edit Item</a></li>`;
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
      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      li.innerHTML = `<strong>${item.name}: </strong> <em>${
        item.calories
      }</em> <a href="#" class="edit-item">Edit Item</a>`;

      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement('beforeend', li);
    },
    updateListItem: item => {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      listItems = Array.from(listItems);

      listItems.forEach(listItem => {
        const itemID = listItem.getAttribute('id');
        if (itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${
            item.name
          }: </strong> <em> ${
            item.calories
          }</em> <a href="#" class="edit-item">Edit item</a>`;
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
    showTotalCalories: total => {
      document.querySelector(UISelectors.totalCalories).textContent = total;
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
    },
    getSelectors: () => {
      return UISelectors;
    }
  };
})();
// -------------------------------------------------
const App = ((ItemCtrl, UICtrl) => {
  // TODO delete when finished with the app. For testing purposes.
  console.log(ItemCtrl.logData());
  const items = ItemCtrl.getItems();
  console.log(items);

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
      .addEventListener('click', itemEdit);

    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener('click', itemDeleteSubmit);

    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener('click', itemUpdateSubmit);

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

      UICtrl.clearInput();
    }

    e.preventDefault();
  };

  const itemEdit = e => {
    if (e.target.classList.contains('edit-item')) {
      const listId = e.target.parentNode.id;

      const listIdArr = listId.split('-');

      const id = parseInt(listIdArr[1]);

      const itemToEdit = ItemCtrl.getItemById(id);

      ItemCtrl.setCurrentItem(itemToEdit);

      UICtrl.addItemToForm();
    }
    e.preventDefault();
  };

  const itemUpdateSubmit = e => {
    const input = UICtrl.getItemInput();

    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    UICtrl.updateListItem(updatedItem);

    const totalCalories = ItemCtrl.getTotalCalories();

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
    ItemCtrl.clearItems();
  };

  // This has to be done because the default behaviour has to be prevented.
  const goBackSubmit = e => {
    UICtrl.clearEditState();

    e.preventDefault();
  };

  return {
    init: () => {
      UICtrl.clearEditState();

      const items = ItemCtrl.getItems();
      UICtrl.populateItemList(items);

      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.showTotalCalories(totalCalories);

      loadEventListeners();
    }
  };
})(ItemCtrl, UICtrl);

App.init();
