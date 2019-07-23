const StorageCtrl = (() => {
  return {
    storeItem: item => {
      let items;
      if (localStorage.getItem('items') === null) {
        items = [];

        items.push(item);

        localStorage.setItem('items', JSON.stringify(items));
      } else {
        items = JSON.parse(localStorage.getItem('items'));

        items.push(item);

        localStorage.setItem('items', JSON.stringify(items));
      }
    }
  };
})();
