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
      B: '#00aea9',
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
//            format: function (d, ratio) { return ""; }
    },
    title: "",
    width: 70
  }
});

var line = c3.generate({
  bindto: '#lines',
  data: {
    columns: [
      ['data1', 30, 200, 100, 400, 150, 250],
      ['data2', 130, 100, 140, 200, 150, 50]
    ],
    types: {
      data1: 'spline',
      data2: 'spline'
    }
  }
});
