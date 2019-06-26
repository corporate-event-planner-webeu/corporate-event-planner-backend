const express = require('express');
const bcrypt = require('bcryptjs');
const { restricted } = require('../middleware/restricted');

const router = express.Router();
const db = require('../data/dbConfig');
const errorMessage = require('../utils/errorMessage');
const responseMessage = require('../utils/responseMessage');


const ShoppingList = require('../api/helpers/shoppingListHelpers');
const Events = require('../api/helpers/eventsHelpers');

// [GET] shopping list for event
router.get('/', (req, res) => {
  if (req.query && req.query.event_id) {
    ShoppingList.getShoppingListForEvent(req.query.event_id)
        .then((items) => {
          if (!items) {
            res.status(404).json(errorMessage.shoppingListNotFound);
          } else {
            res.status(200).json(items);
          }
        })
        .catch((error) => {
          res.status(500).json(errorMessage.shoppingListNotRetrieved);
        });
  } else {
    ShoppingList.getShoppingList()
        .then((items) => {
          res.status(200).json(items);
        })
        .catch((error) => {
          res.status(500).json(errorMessage.shoppingListNotRetrieved);
        });
  }
});

//[GET] item by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  ShoppingList.getItemById(id)
      .then((item) => {
        if (!item) {
          res.status(404).json(errorMessage.itemNotFound);
        } else {
          res.status(200).json({ ...item, item_acquired: Boolean(item.item_acquired) });
        }
      })
      .catch((error) => {
        res.status(500).json(errorMessage.itemNotRetrieved);
      });
});

// [POST] an item
// will need restricted middleware
router.post('/', restricted, (req, res) => {
  const { item_name, item_acquired, item_price } = req.body;
  const event_id = req.query.event_id;
  const user_id = req.decoded.subject;
  if (!item_name || !user_id || !event_id || !item_price) {
    res.status(400).json(errorMessage.missingItemInfo);
  } else {
    db('shopping_list')
        .insert({ item_name, item_acquired, event_id, item_price })
        .then(arrayOfIds => {
          return db('shopping_list').where({id: arrayOfIds[0]})
              .then(arrayOfItems => {
                res.status(201).json({...arrayOfItems[0], item_acquired: Boolean(arrayOfItems[0].item_acquired)})
              })
              .catch(error => {
                res.status(500).json(errorMessage.itemNotCreated);
              });

        });
  }
});

//[DELETE] an item
router.delete('/:id', restricted, (req, res) => {
  const {id} = req.params;
  ShoppingList.deleteItem(id)
      .then((data) => {
        if (!data) {
          res.status(404).json(errorMessage.itemNotFound);
        } else {
          res.status(200).json(responseMessage.deleteItem);
        }
      })
      .catch((error) => {
        res.status(500).json(errorMessage.itemNotRemoved);
      });
});

