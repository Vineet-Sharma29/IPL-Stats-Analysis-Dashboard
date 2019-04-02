<template>
    <div>
        <h1 class="display-1">{{yearLabel}}</h1>
       <v-card flat v-if="bar" class="my-3">
            <v-layout row wrap>
                <v-layout row wrap class="mb-5">
                    <v-btn flat outline color="info" @click="loadGraph('bar')">Bar Graph</v-btn>
                    <v-btn flat outline color="info" @click="loadGraph('area')">Area Graph</v-btn>
                </v-layout>
            </v-layout>
            <bar-chart v-if="loadedLabel" :chart-data="values" :chart-labels="labels"></bar-chart>
      </v-card> 
      <v-card flat v-if="area" class="my-3">
            <v-layout row wrap>
                <v-layout row wrap class="mb-5">
                    <v-btn flat outline color="info" @click="loadGraph('bar')">Bar Graph</v-btn>
                    <v-btn flat outline color="info" @click="loadGraph('area')">Area Graph</v-btn>
                    <v-btn flat outline color="info">ASC Order</v-btn>
                    <v-btn flat outline color="info">DSC Order</v-btn>
                </v-layout>
            </v-layout>
            <line-chart v-if="loadedLabel" :chart-data="values" :chart-labels="labels"></line-chart>
      </v-card>
    </div>
</template>

<script>
import LineChart from '@/components/LineChart'
import BarChart from '@/components/BarChart'

export default {
    name:'Graphs',
    components:{
        LineChart,
        BarChart
    },
    props:{
        values:Array,
        labels:Array,
        loadedLabel:Boolean ,
        yearLabel:String
    },
    data(){
        return{
            bar:true,
            area:false
        }
    },
    methods:{
        loadGraph(prop){
            if( prop == 'area' ){
                this.area = true
                this.bar = false
            }
            else if( prop == 'bar' ){
                this.area = false
                this.bar = true
            }
        }
    }
}
</script>