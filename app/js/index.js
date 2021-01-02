// ===================== //
// ====== INITIAL ====== //
// ===================== //

const SVF = new SV({
  tasks: {
    list: [
      {id: 1, name: 'React', description: 'Some react'},
      {id: 2, name: 'Node.js', description: 'Some node js'},
      {id: 3, name: 'Postgresql', description: 'Some postgresql'},
    ],

    isLoading: false,
  },

  errors: []
})

const { div, fr, button, li, ul } = SVF.ui();

// ========================= //
// ====== END INITIAL ====== //
// ========================= //


// ================================ //
// ====== COMPONENTS | TASKS ====== //
// ================================ //

const buttonRemoveTask = SVF.component((_props) => {
  const {props} = _props;

  const onRemove = () => {
    const {id} = props;
    const store = SVF.getStore();

    SVF.updateStore({
      tasks: {
        ...store.tasks,

        list: [
          ...store.tasks.list.filter(item => item.id !== id),
        ]
      }
    })
  }

  return button(
    {
      className: "sv-btn-v2 sv-mt-24 sv-ml-auto",
      onClick: onRemove,
    },
    `Remove`
  );
})

const itemTask = SVF.component(({id, name, description}) => {
  return li({className: 'sv-list-v1-item sv-clr-g7 sv-pv-16 sv-ph-16 '},
    fr(
      div({className: 'sv-font-t1-14-b'}, name),
      div({className: 'sv-font-t1-14 sv-mt-8'}, description),
      buttonRemoveTask({props: {id}})
    )
  );
})

const listTasks = SVF.component((_props) => {
  const { tasks } = _props;

  return fr(...tasks.list.map(item => (
    itemTask(item)
  )))
})

SVF.mount(
  '#task-list',
  listTasks,
  {},

  {
    tasks: (store) => store.tasks
  }
);

const buttonAddTask = document.getElementById('btnAddTask');

buttonAddTask.onclick = () => {
  const store = SVF.getStore();

  const id = store.tasks.list.length + 1

  SVF.updateStore({
    tasks: {
      ...store.tasks,

      list: [
        ...store.tasks.list,
        {id, name: 'Javascript', description: 'Some base js'},
      ]
    }
  })
};

// ==================================== //
// ====== END COMPONENTS | TASKS ====== //
// ==================================== //
