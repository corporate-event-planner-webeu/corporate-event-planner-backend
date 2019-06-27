const db = require('../data/dbConfig');

ShoppingList = require('../api/helpers/shoppingListHelpers');


describe('shoppingListHelpers', () => {
  beforeEach(async () => {
    await db('shopping_list').truncate();
  });
  afterEach(async () => {
    await db('shopping_list').truncate();
  });
  it('should add an item to the database', async () => {
    await db('shopping_list').insert({
      item_name: "cake",
      item_acquired: false,
      item_price: 40
    });
    const items = await ShoppingList.getShoppingList();
    expect(items).toHaveLength(1);
  });
  it('should return a list of all items in the database', async () => {
    await db('shopping_list').insert({
      item_name: "cake",
      item_acquired: false,
      item_price: 40
    });
    await db('shopping_list').insert({
      item_name: "napkins",
      item_acquired: false,
      item_price: 40
    });
    await db('shopping_list').insert({
      item_name: "plastic cups",
      item_acquired: false,
      item_price: 40
    });
    const items = await ShoppingList.getShoppingList();
    expect(items).toHaveLength(3);
  });
  it('should return a given item from the database by its ID', async () => {
    await db('shopping_list').insert({
      item_name: "plastic cups",
      item_acquired: false,
      item_price: 40,
      event_id: 1
    });
    const result = await ShoppingList.getItemById(1);
    expect(result.item_name).toEqual('plastic cups');
    expect(result.event_id).toEqual(1);
  });
  it('should delete a given item record from the the database', async () => {
    await db('shopping_list').insert({
      item_name: "plastic cups",
      item_acquired: false,
      item_price: 40
    });
    await db('shopping_list').insert({
      item_name: "paper straws",
      item_acquired: true,
      item_price: 40
    });
    const result = await ShoppingList.deleteItem(1);
    const row = await db('shopping_list');
    expect(row).toHaveLength(1);
  });
  it('should retrieve items for a specific event', async () => {
    await db('shopping_list').insert({
      item_name: "extra chairs",
      item_acquired: true,
      item_price: 40,
      event_id: 2

    });
    await db('shopping_list').insert({
      item_name: "video equipment",
      item_acquired: true,
      item_price: 400,
      event_id: 4
    });
    const result = await ShoppingList.getShoppingListForEvent(2);
    const item = result[0];
    expect(item.event_id).toEqual(2);
    expect(result).toHaveLength(1);
  });
  xit('should update a specific item in the database.', () => {

  })
});
