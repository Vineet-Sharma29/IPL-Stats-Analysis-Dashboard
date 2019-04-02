<script>
  import { Line } from 'vue-chartjs'
  export default {
    extends: Line,
    props: {
      chartData: {
        type: Array,
        required: false
      },
      chartLabels: {
        type: Array,
        required: true
      }
    },
    
    data () {
      return {
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: false,
                
              },
              gridLines: {
                display: true,
                color: '#EEF0F4',
                borderDash: [5, 15]
              }
            }],
            xAxes: [ {
              gridLines: {
                display: true,
                color: '#EEF0F4',
                borderDash: [5, 15]
              }
            }]
          },
            tooltips: {
            backgroundColor: '#4F5565',
            titleFontStyle: 'normal',
            titleFontSize: 18,
            bodyFontFamily: "'Proxima Nova', sans-serif",
            cornerRadius: 3,
            bodyFontColor: '#20C4C8',
            bodyFontSize: 14,
            xPadding: 14,
            yPadding: 14,
            displayColors: false,
            mode: 'index',
            intersect: false,
            callbacks: {
              title: tooltipItem => {
                return `${tooltipItem[0].xLabel}`
              },
              label: (tooltipItem, data) => {
                let dataset = data.datasets[tooltipItem.datasetIndex]
                let currentValue = dataset.data[tooltipItem.index]
                return `${currentValue.toLocaleString()}`
              }
            }
          },

          legend: {
            display: false
          },

          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {

      this.gradient = this.$refs.canvas
        .getContext('2d')
        .createLinearGradient(0, 0, 0, 450)

      this.gradient.addColorStop(0, 'rgba(52, 217, 221, 0.6)')
      this.gradient.addColorStop(0.5, 'rgba(52, 217, 221, 0.25)')
      this.gradient.addColorStop(1, 'rgba(52, 217, 221, 0)')

      this.renderChart({
        labels: this.chartLabels,
        datasets: [
           {
            label: 'downloads',
            borderColor: '#249EBF',
            pointBackgroundColor: 'rgba(0,0,0,0)',
            pointBorderColor: 'rgba(0,0,0,0)',
            pointHoverBorderColor: '#249EBF',
            pointHoverBackgroundColor: '#fff',
            pointHoverRadius: 4,
            pointHitRadius: 10,
            pointHoverBorderWidth: 1,
            borderWidth: 1,
            backgroundColor: this.gradient,
            data: this.chartData
          }
        ]
      }, this.options)

      setTimeout(() => {
        this.download()
      }, 500)
    },

    methods: {
    }
  }
</script>