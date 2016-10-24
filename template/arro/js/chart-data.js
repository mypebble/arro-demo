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

var line = c3.generate({
  bindto: '#lines-2',
  data: {
    names: {
      data1: 'Donations',
      data2: 'Other',
    },
    columns: [
      ['data1', 0, 20, 50, 50, 110, 50, 10],
      ['data2', 5, 10, 30, 40, 10, 25, 5],

    ],
    type: 'area-spline',
    colors:{
      data1: '#fc6e51',
      data2: '#00aea9',
    }
  },
  legend:{
    show: false
  },
  axis: {
    x: {
      label: {
        position: 'outer-center'
      },
      type: 'category',
      categories: ['10 Mon', '11 Tue', '12 Wed', '13 Thur', '14 Fri', '15 Sat', '16 Sun']
    }
  }
});

var line = c3.generate({
  bindto: '#lines-3',
  data: {
    names: {
      data1: 'Donations',
    },
    columns: [
      ['data1', 0, 20, 50, 50, 110, 50, 10],
    ],
    type: 'spline',
    colors:{
      data1: '#fc6e51',
    }
  },
  legend:{
    show: false
  },
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


//exec
var line = c3.generate({
  bindto: '#lines-ex1',
  data: {
    names: {
      data1: 'Donations',
    },
    columns: [
      ['data1', 0, 10, 15, 22, 23, 50, 52],
    ],
    type: 'spline',
    colors:{
      data1: '#00aea9',
    }
  },
  legend:{
    show: false
  },
});
var line = c3.generate({
  bindto: '#lines-ex2',
  data: {
    names: {
      data1: 'Stakeholders',
    },
    columns: [
      ['data1', 0, 20, 21, 24, 26, 53, 53],
    ],
    type: 'spline',
    colors:{
      data1: '#79d4a1',
    }
  },
  legend:{
    show: false
  },
});
var line = c3.generate({
  bindto: '#lines-ex3',
  data: {
    names: {
      data1: 'Projects',
    },
    columns: [
      ['data1', 0, 20, 50, 50, 110, 110, 110],
    ],
    type: 'spline',
    colors:{
      data1: '#fc6e51',
    }
  },
  legend:{
    show: false
  },
});



var chart = c3.generate({
  bindto: '#bar-dash',
    data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
        ],
        type: 'bar'
    },
    bar: {
        width: {
            ratio: 0.5 // this makes bar width 50% of length between ticks
        }
        // or
        //width: 100 // this makes bar width 100px
    }
});
