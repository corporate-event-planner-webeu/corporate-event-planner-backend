const db = require('../data/dbConfig');

const Tasks = require('../api/helpers/tasksHelpers');


describe('tasksHelpers', () => {
  beforeEach(async () => {
    await db('tasks').truncate();
  });
  afterEach(async () => {
    await db('tasks').truncate();
  });
  it('should add a task to the database', async () => {
    await db('tasks').insert({
      "task_name": "reserve seats",
      "event_id": 1,
      "task_completed": 0
    });
    const tasks = await Tasks.getTasks();
    expect(tasks).toHaveLength(1);
  });
  it('should return a list of all tasks in the database', async () => {
    await db('tasks').insert({
      "task_name": "reserve seats",
      "event_id": 1,
      "task_completed": 0
    });
    await db('tasks').insert({
      "task_name": "contact speakers",
      "event_id": 1,
      "task_completed": 0
    });
    const tasks = await Tasks.getTasks();
    expect(tasks).toHaveLength(2);
  });
  it('should return a given task from the database by its ID', async () => {
    await db('tasks').insert({
      "task_name": "contact speakers",
      "event_id": 1,
      "task_completed": 0
    });
    const result = await Tasks.getTaskById(1);
    expect(result.task_name).toEqual('contact speakers');
    expect(result.event_id).toEqual(1);
  });
  it('should delete a given task record from the the database', async () => {
    await db('tasks').insert({
      "task_name": "contact speakers",
      "event_id": 1,
      "task_completed": 0
    });
    await db('tasks').insert({
      "task_name": "invite special guest",
      "event_id": 1,
      "task_completed": 0
    });
    const result = await Tasks.deleteTask(1);
    const row = await db('tasks');
    expect(row).toHaveLength(1);
  });
  it('should retrieve tasks for a specific event', async () => {
    await db('tasks').insert({
      "task_name": "contact speakers",
      "event_id": 1,
      "task_completed": 0
    });
    await db('tasks').insert({
      "task_name": "contact speakers",
      "event_id": 2,
      "task_completed": 0
    });
    const result = await Tasks.getTasksForEvent(2);
    const task = result[0];
    expect(task.event_id).toEqual(2);
    expect(result).toHaveLength(1);
  });
  xit('should update a specific task in the database.', () => {

  })
});
