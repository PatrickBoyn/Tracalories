const ItemCtrl = (function() {
  console.log('Item controller  ');
})();

const UICtrl = (function() {
  console.log('UI Controller');
})();

const App = (function(ItemCtrl, UICtrl) {
  console.log('App controller.');
})(ItemCtrl, UICtrl);
