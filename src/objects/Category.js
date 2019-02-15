export default {
  create: function (object) {
    var category = Object.create(object);
    category.raw = object;

    Object.defineProperty(category, 'hasSubCategories', {
      value: (category.subcategories || []).length > 0,
      writable: false
    });

    return category;
  }
};
