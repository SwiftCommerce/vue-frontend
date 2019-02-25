export default {
  create: function (object) {
    var category = Object.create(object);
    category.raw = object;

    Object.defineProperty(category, 'subs', {
      value: category.subcategories || [],
      writable: false
    });

    return category;
  }
};
