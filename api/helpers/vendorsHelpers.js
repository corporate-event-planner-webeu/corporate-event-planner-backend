const db = require('../../data/dbConfig');

const getVendors = () => db('vendors');

const getVendorById = id => db('vendors')
    .where({ id })
    .first();

const getVendorsForEvent = id => db('vendors').where({ event_id: id });

const addVendor = (vendor) => db('vendors')
    .where({vendor_id: id })
    .insert(vendor)
    .then(ids => getVendorById(ids[0]));

const deleteVendor = id => db('vendors')
    .where({ id })
    .del();

const updateVendor = (vendor, id) => db('vendors')
    .where({ id })
    .update(vendor);

const notUndefined = (value) => value !== undefined;

const verifyAndCleanVendor = (vendorName, contactNumber, eventId, contactEmail) => {
  if (!vendorName && !contactNumber && !eventId && !contactEmail) {
    throw new Error('Invalid vendor');
  }

  if (!contactNumber && !vendorName && !contactEmail) {
    return {
      event_id: eventId,
    };
  }

  if (!contactNumber && !eventId && !contactEmail) {
    return {
      vendor_name: vendorName,
    };
  }

  if (!contactNumber && !eventId && !eventId) {
    return {
      contact_email: contactEmail,
    };
  }

  if (!vendorName && !eventId && !contactEmail) {
    return {
      contact_number: contactNumber,
    };
  }

  if (!vendorName && !eventId && !contactNumber) {
    return {
      contact_email: contactEmail,
    };
  }

  if (!vendorName && !eventId) {
    return {
      contact_email: contactEmail,
      contact_number: contactNumber,
    }
  }

  if (!vendorName && !contactEmail) {
    return {
      event_id: eventId,
      contact_number: contactNumber,
    }
  }

  if (!vendorName && !contactNumber) {
    return {
      contact_email: contactEmail,
      event_id: eventId,
    }
  }

  if (!contactNumber && !eventId) {
    return {
      contact_email: contactEmail,
      vendor_name: vendorName,
    }
  }

  if (!contactNumber && !contactEmail) {
    return {
      event_id: eventId,
      vendor_name: vendorName,
    }
  }

  if (!contactEmail && !eventId) {
    return {
      contact_number: contactNumber,
      vendor_name: vendorName,
    }
  }

  if (!vendorName) {
    return {
      contact_number: contactNumber,
      event_id: eventId,
      contact_email: contactEmail,
    };
  }

  if (!eventId) {
    return {
      contact_number: contactNumber,
      vendor_name: vendorName,
      contact_email: contactEmail,
    };
  }

  if (contactNumber) {
    return {
      vendor_name: vendorName,
      event_id: eventId,
      contact_email: contactEmail,
    };
  }

  if (!contactEmail) {
    return {
      vendor_name: vendorName,
      event_id: eventId,
      contact_number: contactNumber,
    };
  }

  return {
    vendor_name: vendorName,
    contact_number: contactNumber,
    event_id: eventId,
  };
};

module.exports = {
  getVendors,
  getVendorById,
  getVendorsForEvent,
  addVendor,
  deleteVendor,
  updateVendor,
  notUndefined,
  verifyAndCleanVendor,

};

