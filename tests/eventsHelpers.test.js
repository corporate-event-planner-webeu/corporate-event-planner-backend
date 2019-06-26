const db = require('../data/dbConfig');

const Events = require('../api/helpers/eventsHelpers');


describe('eventsHelpers', () => {
  beforeEach(async () => {
    await db('events').truncate();
  });
  afterEach(async () => {
    await db('events').truncate();
  });
  it('should add an event to the database', async () => {
    await db('events').insert({
      event_title: "Tech Conference",
      event_description: "a great tech conference",
      image_url: "https://picsum.photos/id/237/200/300",
      event_date: "25-08-2019",
      event_time: "10:00 PM",
      attendees: 15,
      budget: 600,
      user_id: 2,
      completed: 0
    });
    const events = await Events.getEvents();
    expect(events).toHaveLength(1);
  });
  it('should return a list of all events in the database', async () => {
    await db('events').insert({
      event_title: "Tech Conference",
      event_description: "a great tech conference",
      image_url: "https://picsum.photos/id/237/200/300",
      event_date: "25-08-2019",
      event_time: "10:00 PM",
      attendees: 15,
      budget: 600,
      user_id: 2,
      completed: 0
    });
    await db('events').insert({
      event_title: "Tech Conference",
      event_description: "a great tech conference",
      image_url: "https://picsum.photos/id/237/200/300",
      event_date: "25-08-2019",
      event_time: "10:00 PM",
      attendees: 15,
      budget: 600,
      user_id: 2,
      completed: 0
    });
    const events = await Events.getEvents();
    expect(events).toHaveLength(2);
  });
  it('should return a given event from the database by its ID', async () => {
    await db('events').insert({
      event_title: "Tech Conference",
      event_description: "a great tech conference",
      image_url: "https://picsum.photos/id/237/200/300",
      event_date: "25-08-2019",
      event_time: "10:00 PM",
      attendees: 15,
      budget: 600,
      user_id: 2,
      completed: 0
    });
    const result = await Events.getEventById(1);
    expect(result.event_title).toEqual('Tech Conference');
    expect(result.id).toEqual(1);
  });
  it('should delete a given event record from the the database', async () => {
    await db('events').insert({
      event_title: "Tech Conference",
      event_description: "a great tech conference",
      image_url: "https://picsum.photos/id/237/200/300",
      event_date: "25-08-2019",
      event_time: "10:00 PM",
      attendees: 15,
      budget: 600,
      user_id: 2,
      completed: 0
    });
    await db('events').insert({
      event_title: "Tech Conference II",
      event_description: "a greater tech conference",
      image_url: "https://picsum.photos/id/237/200/300",
      event_date: "25-08-2019",
      event_time: "10:00 PM",
      attendees: 150,
      budget: 6000,
      user_id: 2,
      completed: 0
    });
    const result = await Events.deleteEvent(1);
    const row = await db('events');
    expect(row).toHaveLength(1);
  });
  it('should retrieve events for a specific user', async () => {
    await db('events').insert({
      event_title: "Tech Conference",
      event_description: "a great tech conference",
      image_url: "https://picsum.photos/id/237/200/300",
      event_date: "25-08-2019",
      event_time: "10:00 PM",
      attendees: 15,
      budget: 600,
      user_id: 2,
      completed: 0
    });
    await db('events').insert({
      event_title: "Tech Conference II",
      event_description: "a greater tech conference",
      image_url: "https://picsum.photos/id/237/200/300",
      event_date: "25-08-2019",
      event_time: "10:00 PM",
      attendees: 15,
      budget: 600,
      user_id: 4,
      completed: 0
    });
    const result = await Events.getEventsFromUser(4);
    const event = result[0];
    expect(event.user_id).toEqual(4);
    expect(result).toHaveLength(1);
  });
  xit('should update a specific event in the database.', () => {

  })
});
