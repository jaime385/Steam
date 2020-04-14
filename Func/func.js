console.log('hellow');
/*chartIt();


async function chartIt() {
  var data = [];
  data = await getData();

  // Chart.js graph example, taken from the documentation of the framework.
  const ctx = document.getElementById('chart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.xs, // I can do this because here is supose to be an array.
      datasets: [
        {
          label: 'Global average temperature',
          data: data.ys,
          backgroundColor: 'rgba(255, 99, 132, 0)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false, // This is a useful thing to remember.
              callback: function (value, index, values) {
                return value + '°';
              },
            },
          },
        ],
      },
    },
  });
}
*/
getData();
async function getData() {
    const xs = [];
    const ys = [];
    const response = await fetch('steam-table.csv');
    const data = await response.text();
    console.log(data);
    const table = data.split('\n').slice(1); // REview about regular exopressions.//Now it is time to use the slice function that works as follows.
    //console.log(rows);
    table.forEach((row) => {
        const column = row.split(',');
        const year = column[0];
        xs.push(year);
        const temp = column[1];
        ys.push(parseFloat(temp) + 14);
        //console.log(year, temp);
    });
    return {
        xs,
        ys,
    };
}
