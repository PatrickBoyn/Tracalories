const StorageCtrl = (() => {
  return {
    storeItem: item => {
      let items;
      if (localStorage.getItem('items') === null) {
        items = [];

        items.push(item);
      } else {
      }
    }
  };
})();
