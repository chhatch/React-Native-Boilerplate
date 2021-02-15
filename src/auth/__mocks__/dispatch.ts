const actions = []
const dispatch = (action) => actions.push(action)
dispatch.actions = () => console.log(actions)

export default { dispatch }
