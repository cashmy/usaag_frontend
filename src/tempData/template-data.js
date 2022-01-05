const templateData = {
  tasks: {
    "task-1": { id: "task-1", content: "Take out the garbage" },
    "task-2": { id: "task-2", content: "Watch my favorite show" },
    "task-3": { id: "task-3", content: "Charge my phone" },
    "task-4": { id: "task-4", content: "Cook dinner" },
    "task-5": { id: "task-5", content: "Wash clothes" },
    "task-6": { id: "task-6", content: "Make the Bed" },
  },
  columns: {
    "column1": {
      id: "column1",
      title: "User Stories",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    "column2": {
      id: "column2",
      title: "Bonus stories",
      taskIds: ["task-5", "task-6"],
    },
    columnOrder: ["column1", "column2"],
  },
};

export default templateData;
