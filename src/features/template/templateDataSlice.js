import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  value: 0,
  tdta: {
    tasks: {
      "0": { id: "0", content: "Take out the garbage", title: "", description: "", pointValue: 0, bonusStatus: false, greyHighLight: false, headerId: 0 },
      "1": { id: "1", content: "Watch my favorite show", title: "", description: "", pointValue: 0, bonusStatus: false, greyHighLight: false, headerId: 0 },
      "2": { id: "2", content: "Charge my phone", title: "", description: "", pointValue: 0, bonusStatus: false, greyHighLight: false, headerId: 0 },
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "Features",
        taskIds: ["0", "1"],
      },
      "column-2": {
        id: "column-2",
        title: "Bonus Features",
        taskIds: ["2"],
      },
      columnOrder: ["column-1", "column-2"],
    }
  }
};

export const templateDataSlice = createSlice({
  name: 'templateData',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    changeTasks: (state, action) => {
      state.tdta.tasks = action.payload
    },
    changeTemplate: (state, action) => {
      state.tdta = action.payload
    },
    changeColumnTaskList: (state, action) => {
      state.tdta.columns[action.payload.columnId].taskIds = action.payload.taskIds
    }
  },

});

export const { changeTasks, changeTemplate, changeColumnTaskList } = templateDataSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state) => state.counter.value;

export const selectTemplateData = (state) => state.templateData.tdta
export const selectTaskIds = (state, col) => state.templateData.tdta.columns[col].taskIds
export const selectColumn = (state, col) => state.templateData.tdta.columns[col]
export const selectColumnIds = (state) => state.templateData.tdta.map(column => column.id)
export const selectTasks = (state, col) => state.templateData.tdta.columns[col].taskIds.map((taskId) => state.templateData.tdta.tasks[taskId])

export default templateDataSlice.reducer;
