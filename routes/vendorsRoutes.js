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
router.get('/', restricted, (req, res) => {
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
router.get('/:id', restricted, (req, res) => {
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

// [POST] a vendor
router.post('/', restricted, (req, res) => {
  const { vendor_name, contact_number, contact_email } = req.body;
  const event_id = req.query.event_id;
  const user_id = req.decoded.subject;
  if (!vendor_name || !user_id || !event_id) {
    res.status(400).json(errorMessage.missingVendorInfo);
  } else {
    db('vendors')
        .insert({ vendor_name, contact_number, event_id, contact_email })
        .then(arrayOfIds => {
          return db('vendors').where({id: arrayOfIds[0]})
              .then(arrayOfItems => {
                res.status(201).json(arrayOfItems[0])
              })
              .catch(error => {
                res.status(500).json(errorMessage.vendorNotCreated);
              });

        });
  }
});

//[DELETE] a vendor
router.delete('/:id', restricted, (req, res) => {
  const {id} = req.params;
  Vendors.deleteVendor(id)
      .then((data) => {
        if (!data) {
          res.status(404).json(errorMessage.vendorNotFound);
        } else {
          res.status(200).json(responseMessage.deleteVendor);
        }
      })
      .catch((error) => {
        res.status(500).json(errorMessage.vendorNotRemoved);
      });
});

// [PUT] vendor by id
router.put('/:id', restricted, async (req, res) => {
  const { id } = req.params;
  const { vendor_name, contact_number, event_id, contact_email } = req.body;
  const user_id = req.decoded.subject;
  try {
    const updatedVendor = Vendors.verifyAndCleanVendor(vendor_name, contact_number, event_id, contact_email);
    const data = await Vendors.updateVendor(updatedVendor, id);
    if (!data) {
      res.status(404).json(errorMessage.vendorNotFound);
    } else {
      res.status(200).json({ success: true, ...updatedVendor });
    }
  } catch (error) {
    res.status(500).json(errorMessage.vendorNotUpdated);
  }
});

module.exports = router;
