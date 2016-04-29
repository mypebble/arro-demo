var chart1 = c3.generate({
    bindto: '#chart-guage',
    data: {
        columns: [
            ['', 34]
        ],
        type: 'gauge',
    },
    gauge: {
        min: 0,
        max: 100
    }
});
var chart = c3.generate({
  data: {
    columns: [
      ['A', 15.2],
      ['B', 10],
    ],
    type : 'donut',
    colors: {
      A: '#f6bb42',
      B: '#f1f1f1',
    },
    order: null // set null to disable sort of data. desc is the default.
  },
  axis: {
    x: {
      label: 'Sepal.Width',
    },
    y: {
      label: 'Petal.Width'
    }
  },
  legend: {
    show: false
  },
  donut: {
    label: {
      show: false
//            format: function (d, ratio) { return ""; }
    },
    title: "",
    width: 40
  }
});

var line = c3.generate({
  bindto: '#lines',
  data: {
    columns: [
      ['Donations', 30, 10, 100, 40, 10, 25],
      ['Projects', 130, 100, 140, 100, 150, 50]
    ],
    legend: {
      show: false
    },
    types: {
      Donations: 'area-spline',
      Projects: 'area-spline'
    },
    colors:{
      Donations: '#00aea9',
      Projects: '#fc6e51',
    }
  }
});

var chart = c3.generate({
    bindto: '#barz',
    data: {
        columns: [
          ['You', 300],
          ['Others', 200],
        ],
        type: 'bar',
        colors: {
          You: '#f6bb42',
          Others: '#333333',
        },
        legend: {
          show: false
        }
    },
    bar: {
        width: 50 // this makes bar width 100px
    }
});
