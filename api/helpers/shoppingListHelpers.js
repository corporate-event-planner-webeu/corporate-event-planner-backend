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

const notUndefined = (value) => value !== undefined;

const verifyAndCleanItem = (itemName, itemAcquired, eventId, itemPrice) => {
  if (!itemName && !notUndefined(itemAcquired) && !eventId && !itemPrice) {
    throw new Error('Invalid item');
  }

  if (!notUndefined(itemAcquired) && !itemName && !itemPrice) {
    return {
      event_id: eventId,
    };
  }

  if (!notUndefined(itemAcquired) && !eventId && !itemPrice) {
    return {
      item_name: itemName,
    };
  }

  if (!notUndefined(itemAcquired) && !eventId && !eventId) {
    return {
      item_price: itemPrice,
    };
  }

  if (!itemName && !eventId && !itemPrice) {
    return {
      item_acquired: itemAcquired,
    };
  }

  if (!itemName && !eventId && !notUndefined(itemAcquired)) {
    return {
      item_price: itemPrice,
    };
  }

  if (!itemName && !eventId) {
    return {
      item_price: itemPrice,
      item_acquired: itemAcquired,
    }
  }

  if (!itemName && !itemPrice) {
    return {
      event_id: eventId,
      item_acquired: itemAcquired,
    }
  }

  if (!itemName && !notUndefined(itemAcquired)) {
    return {
      item_price: itemPrice,
      event_id: eventId,
    }
  }

  if (!notUndefined(itemAcquired) && !eventId) {
    return {
      item_price: itemPrice,
      item_name: itemName,
    }
  }

  if (!notUndefined(itemAcquired) && !itemPrice) {
    return {
      event_id: eventId,
      item_name: itemName,
    }
  }

  if (!itemPrice && !eventId) {
    return {
      item_acquired: itemAcquired,
      item_name: itemName,
    }
  }

  if (!itemName) {
    return {
      item_acquired: itemAcquired,
      event_id: eventId,
      item_price: itemPrice,
    };
  }

  if (!eventId) {
    return {
      item_acquired: itemAcquired,
      item_name: itemName,
      item_price: itemPrice,
    };
  }

  if (!notUndefined(itemAcquired)) {
    return {
      item_name: itemName,
      event_id: eventId,
      item_price: itemPrice,
    };
  }

  if (!itemPrice) {
    return {
      item_name: itemName,
      event_id: eventId,
      item_acquired: itemAcquired,
    };
  }

  return {
    item_name: itemName,
    item_acquired: itemAcquired,
    event_id: eventId,
  };
};

module.exports = {
  getShoppingList,
  getItemById,
  getShoppingListForEvent,
  addItem,
  deleteItem,
  updateItem,
  notUndefined,
  verifyAndCleanItem,

};

