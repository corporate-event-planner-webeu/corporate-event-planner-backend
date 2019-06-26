const express = require('express');
const bcrypt = require('bcryptjs');
const { restricted } = require('../middleware/restricted');

const router = express.Router();
const db = require('../data/dbConfig');
const errorMessage = require('../utils/errorMessage');
const responseMessage = require('../utils/responseMessage');


const Vendors = require('../api/helpers/vendorsHelpers');
const Events = require('../api/helpers/eventsHelpers');

// [GET] vendors for event
router.get('/', (req, res) => {
  if (req.query && req.query.event_id) {
    Vendors.getVendorsForEvent(req.query.event_id)
        .then((vendors) => {
          if (!vendors) {
            res.status(404).json(errorMessage.vendorsNotFound);
          } else {
            res.status(200).json(vendors);
          }
        })
        .catch((error) => {
          res.status(500).json(errorMessage.vendorsNotRetrieved);
        });
  } else {
    Vendors.getVendors()
        .then((vendors) => {
          res.status(200).json(vendors);
        })
        .catch((error) => {
          res.status(500).json(errorMessage.vendorsNotRetrieved);
        });
  }
});

//[GET] vendor by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Vendors.getVendorById(id)
      .then((vendor) => {
        if (!vendor) {
          res.status(404).json(errorMessage.vendorNotFound);
        } else {
          res.status(200).json(vendor);
        }
      })
      .catch((error) => {
        res.status(500).json(errorMessage.vendorNotRetrieved);
      });
});

