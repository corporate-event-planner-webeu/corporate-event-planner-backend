const db = require('../data/dbConfig');

ShoppingList = require('../api/helpers/shoppingListHelpers');
Vendors = require('../api/helpers/vendorsHelpers');


describe('vendorsHelpers', () => {
  beforeEach(async () => {
    await db('vendors').truncate();
  });
  afterEach(async () => {
    await db('vendors').truncate();
  });
  it('should add a vendor to the database', async () => {
    await db('vendors').insert({
      vendor_name: "Andres",
      contact_number: "07842156431",
      contact_email: "andres@test.com",
      event_id: 1
    });
    const vendors = await Vendors.getVendors();
    expect(vendors).toHaveLength(1);
  });
  it('should return a list of all vendors in the database', async () => {
    await db('vendors').insert({
      vendor_name: "Andres",
      contact_number: "07842156431",
      contact_email: "andres@test.com",
      event_id: 3,
    });
    await db('vendors').insert({
      vendor_name: "Andres",
      contact_number: "07842156431",
      contact_email: "andres@test.com",
      event_id: 2,
    });
    await db('vendors').insert({
      vendor_name: "Andres",
      contact_number: "07842156431",
      contact_email: "andres@test.com",
      event_id: 1,
    });
    const vendors = await Vendors.getVendors();
    expect(vendors).toHaveLength(3);
  });
  it('should return a given vendor from the database by its ID', async () => {
    await db('vendors').insert({
      vendor_name: "Andres",
      contact_number: "07842156431",
      contact_email: "andres@test.com",
      event_id: 3,
    });
    const result = await Vendors.getVendorById(1);
    expect(result.vendor_name).toEqual('Andres');
    expect(result.event_id).toEqual(3);
  });
  it('should delete a given vendor record from the the database', async () => {
    await db('vendors').insert({
      vendor_name: "Andres",
      contact_number: "07842156431",
      contact_email: "andres@test.com",
      event_id: 3,
    });
    await db('vendors').insert({
      vendor_name: "Lucas",
      contact_number: "07842156432",
      contact_email: "lucas@test.com",
      event_id: 3,
    });
    const result = await Vendors.deleteVendor(1);
    const row = await db('vendors');
    expect(row).toHaveLength(1);
  });
  it('should retrieve vendors for a specific event', async () => {
    await db('vendors').insert({
      vendor_name: "Lucas",
      contact_number: "07842156432",
      contact_email: "lucas@test.com",
      event_id: 3,

    });
    await db('vendors').insert({
      vendor_name: "Lucas",
      contact_number: "07842156432",
      contact_email: "lucas@test.com",
      event_id: 1,
    });
    const result = await Vendors.getVendorsForEvent(3);
    const vendor = result[0];
    expect(vendor.event_id).toEqual(3);
    expect(result).toHaveLength(1);
  });
  xit('should update a specific item in the database.', () => {

  })
});
