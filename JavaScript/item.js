// This is currently working like it should.
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
