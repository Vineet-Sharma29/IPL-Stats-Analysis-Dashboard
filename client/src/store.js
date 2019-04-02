import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({

  state: {

    choices: [
      { name: 'fours' },
      { name: 'sixes' },
      { name: 'man-of-the-match' },
      { name: 'successful-teams'},
      { name: 'toss'},
      { name: 'decision'},
      { name: 'dots'},
      { name: 'extras'}
    ],
    menuItems:[
      {title:'All Time'}, 
      {title:'2016'}, 
      {title:'2015'}, 
      {title:'2014'},
      {title:'2013'},
      {title:'2012'},
      {title:'2011'},
      {title:'2010'},
      {title:'2009'},
      {title:'2008'},
  ],
    datacollection: null,
    options: [],
    loaded: false,
    propYear:'All Time',
    viewName:'/'
  },


  getters:{
    dataGraph: state => {
      return state.datacollection
    },

    labelGraph: state => {
      return state.options
    },

    loadedGraph: state => {
      return state.loaded
    }


  },


  mutations: {
    requestData: (state) => {
      state.loaded = false
        axios.get(`'http://localhost:3000'+this.$route.path`)
        .then(response => {
         
          state.datacollection = response.data.slice(0,100).map( a => a.y_label )
          state.options = response.data.slice(0,100).map( a => a.x_label )
        })
        .finally( ()=> state.loaded = true )
    },


    fireQuery: (state, prop) =>{
      if( prop == 'All Time' ){
        state.loaded = false
    
        axios.get(`'http://localhost:3000'+this.$route.path`)
        .then(response => {
          
          // var limit = document.get

          state.datacollection = response.data.slice(0,50).map( a => a.y_label )
          state.options = response.data.slice(0,50).map( a => a.x_label )
          })
          .finally( ()=> state.loaded = true )
        
          state.desc = prop
      }

      else{
          state.loaded = false
                  
          axios.post(`'http://localhost:3000'+this.$route.path+'/year'`, {year:prop})
          .then(response => {
            state.datacollection = response.data.slice(0,100).map( a => a.y_label )
            state.options = response.data.slice(0,100).map( a => a.x_label )
          })
          .finally( ()=> state.loaded = true )
        
          state.desc = prop
      }
    }
    
  },


  actions: {

    requestData: async ({commit}) => {
      commit('requestData')
    },

    fireQuery: async ({commit}, prop) => {
      commit('fireQuery', prop);
    }
  }
})
