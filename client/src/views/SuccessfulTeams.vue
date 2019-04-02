<template>
<div class="successful-teams">

<!----- NAVBAR ---->

  <nav>
        <div class="hidden-sm-and-down">
            <v-toolbar flat app color="primary" class="white--text">
              <v-toolbar-side-icon class="grey--white" @click="drawer = !drawer"></v-toolbar-side-icon>
                <v-toolbar-title >
                    <span class="font-weight-bold text-uppercase">IPL</span>
                    <span class="font-weight-light"> Statistics</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items class="hidden-sm-and-down">
                  <v-btn flat color="white" v-for="link in this.$store.state.menuItems" :key="link.title" @click="fireQuery(link.title)">{{link.title}}</v-btn>
                </v-toolbar-items>
            </v-toolbar>
             <v-navigation-drawer app v-model="drawer" class="hidden-sm-and-down blue darken-4">
                <v-list class="pt-5">
                    <v-list-tile class="pl-5">
                      <v-list-title-content>
                        <router-link to="/">
                          <v-list-title-title class="white--text headline">Runs</v-list-title-title>
                        </router-link>
                      </v-list-title-content>
                    </v-list-tile>
                    <v-list-tile v-for="choice in this.$store.state.choices" :key="choice.name" class="pl-5">
                      <v-list-title-content>
                        <router-link :to="'/' + choice.name">
                          <v-list-title-title class="white--text headline">{{choice.name}}</v-list-title-title>
                        </router-link>
                      </v-list-title-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
        </div>
    </nav>


<!------- CHARTS ----->

  <v-layout row class="mt-5 ml-5 mb-5">
    <v-flex xs11 sm11 md11 lg11>
      <Graphs :loadedLabel="loaded" :values="datacollection" :labels="options" :yearLabel="desc"/>
    </v-flex>
  </v-layout>

</div>
</template>

<script>

  import axios from 'axios'
  import Graphs from '@/components/Graphs'

  export default {

    name:'SuccessfulTeams',

    components:{
         Graphs
    },


    data() {
      return {
        desc: 'All Time',
        datacollection: null,
        options: [],
        errored: false,
        loaded: false,
        drawer:false,
      }
    },




    mounted() {
      this.requestData()  
      },


    methods: {
      requestData(){
        this.loaded = false
        axios.get('/successful-teams')
        .then(response => {
         
          this.datacollection = response.data.map( a => a.y_label )
          this.options = response.data.map( a => a.x_label )
        })
        .finally( ()=> this.loaded = true )
      },


      fireQuery(prop){

        if( prop == 'All Time' ){
            this.loaded = false
        
            axios.get('/successful-teams')
            .then(response => {
          
              this.datacollection = response.data.map( a => a.y_label )
              this.options = response.data.map( a => a.x_label )
            })
            .finally( ()=> this.loaded = true )
          
            this.desc = prop
        }

        else{
            this.loaded = false
                    
            axios.post('/successful-teams/year', {year:prop})
            .then(response => {
              this.datacollection = response.data.map( a => a.y_label )
              this.options = response.data.map( a => a.x_label )
            })
            .finally( ()=> this.loaded = true )
            this.desc = prop
        }
        
      }
    },
    

  }
</script>
