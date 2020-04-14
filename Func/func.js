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
getSteamData();
async function getSteamData() {
    const p = [];
    const t = [];
    const svl = [];
    const svg = [];
    const iEl = [];
    const iEg = [];
    const EtL = [];
    const V = [];
    const EtG = [];
    const enL = [];
    const enG = [];
    const response = await fetch('steam-table.csv');
    const data = await response.text();
    const table = data.split('\n').slice(1);
    /*var steamTable = table.map(function (rows) {
      return parseFloat(rows)
    });
    console.log(steamTable);*/
    //console.log(table);
    table.forEach((row) => {
        const column = row.split(',');
        const pressure = column[0]; // bar
        const temp = column[1]; // Celsius
        const specificVolumenLiquid = column[2]; // to define
        const specificVolumenGas = column[3]; // to define
        const internalEnergyLiquid = column[4];
        const internalEnergyGas = column[5];
        const EnthalpyLiquid = column[6];
        const vaporitization = column[7];
        const EnthalpyGas = column[8];
        const entropyLiquid = column[9];
        const entropyGas = column[10];
        p.push(parseFloat(pressure));
        t.push(parseFloat(temp));
        svl.push(parseFloat(specificVolumenLiquid));
        svg.push(parseFloat(specificVolumenGas));
        iEl.push(parseFloat(internalEnergyLiquid));
        iEg.push(parseFloat(internalEnergyGas));
        EtL.push(parseFloat(EnthalpyLiquid));
        V.push(parseFloat(vaporitization));
        EtG.push(parseFloat(EnthalpyGas));
        enL.push(parseFloat(entropyLiquid));
        enG.push(parseFloat(entropyGas));
        console.log(pressure, temp, specificVolumenLiquid, specificVolumenGas, internalEnergyLiquid, internalEnergyGas, EnthalpyLiquid, vaporitization, EnthalpyGas, entropyLiquid, entropyGas);
    });
    return {
        p,
        t,
        svl,
        svg,
        iEl,
        iEg,
        EtL,
        V,
        EtG,
        enL,
        enG,
    };
}
