const db = require('../../data/dbConfig');

const getShoppingList = () => db('shopping_list');

const getItemById = id => db('shopping_list')
    .where({ id })
    .first();

const getShoppingListForEvent = id => db('shopping_list').where({ event_id: id });

const addItem = (item) => db('shopping_list')
    .where({item_id: id })
    .insert(item)
    .then(ids => getItemById(ids[0]));

const deleteItem = id => db('shopping_list')
    .where({ id })
    .del();

const updateItem = (item, id) => db('shopping_list')
    .where({ id })
    .update(item);
