const React = require('react')
const { Provider } = require('react-redux')
const createStore = require('./src/store/createStore').default
const axios = require('axios')
axios.defaults.baseURL = 'https://api.realworld.io/api'

module.exports = {
  wrapRootElement: ({ element }) => {
    return <Provider store={createStore()}>{element}</Provider>
  }
}
