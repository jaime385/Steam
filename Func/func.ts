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
  table.forEach((row) => {
    const column = row.split(',');
    const pressure = column[0]; // bar
    const temp = column[1]; // Celsius
    const specificVolumenLiquid = column[2]; //m3 / kg
    const specificVolumenGas = column[3]; // m3 / kg
    const internalEnergyLiquid = column[4]; // kK / kg
    const internalEnergyGas = column[5]; // kJ / kg
    const EnthalpyLiquid = column[6]; // kJ / kg
    const vaporitization = column[7];
    const EnthalpyGas = column[8]; // kj / kg
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

function myFunction() {
  chartIt();
  async function chartIt() {
    let data = await getSteamData();
    //X axis.
    var dataListInput = document.getElementById('xAxisInput').value;
    if (dataListInput == 'Temperature [°C]') {
      var xAxis = data.t;
    }
    if (dataListInput == 'Vaporization') {
      var xAxis = data.V;
    }
    if (dataListInput == 'Pressure [Bar]') {
      var xAxis = data.p;
    }
    if (dataListInput == 'Gas Enthalpy [kJ/kg]') {
      var xAxis = data.EtG;
    }
    if (dataListInput == 'Liquid Enthalpy [kJ/kg]') {
      var xAxis = data.EtL;
    }
    if (dataListInput == 'Specific volume Gas [m3/kg]') {
      var xAxis = data.svg;
    }
    if (dataListInput == 'Specific volume Liquid [m3/kg]') {
      var xAxis = data.svl;
    }

    //Y axis
    var dataListInputY = document.getElementById('yAxisInput').value;
    if (dataListInputY == 'Temperature [°C]') {
      var yAxis = data.t;
    }
    if (dataListInputY == 'Pressure [Bar]') {
      var yAxis = data.p;
    }
    if (dataListInputY == 'Vaporization') {
      var yAxis = data.V;
    }
    if (dataListInputY == 'Gas Enthalpy [kJ/kg]') {
      var yAxis = data.EtG;
    }
    if (dataListInputY == 'Liquid Enthalpy [kJ/kg]') {
      var yAxis = data.EtL;
    }
    if (dataListInputY == 'Specific volume Gas [m3/kg]') {
      var yAxis = data.svg;
    }
    if (dataListInputY == 'Specific volume Liquid [m3/kg]') {
      var yAxis = data.svl;
    }

    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: xAxis,
        datasets: [
          {
            label: `${document.getElementById('yAxisInput').value}`,
            data: yAxis,
            backgroundColor: 'rgba(16, 52, 165, 0)',
            borderColor: 'rgba(16, 52, 165, 0.7)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
                callback: function (value, index, values) {
                  return value;
                },
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontSize: 10,
                fontColor: 'yellowgreen',
                min: 0,
                stepSize: 1,
              },
              barPercentage: 0.9,
              maxBarThickness: 60,
              minBarThickness: 8,
            },
          ],
        },
        legend: {
          display: true,
          labels: {
            fontSize: 14,
          },
        },
      },
    });
  }
}

function calculoCaldera() {
  const bhps = document.getElementById('bhps').value;
  const hf = document.getElementById('Hf').value;
  const hg = document.getElementById('Hg').value;
  const hfw = document.getElementById('Hfw').value;
  const bd = document.getElementById('BD').value;
  if (bhps && hf && hg && hfw && bd) {
    const delta_h = hg - hfw + bd * (hf - hfw);
    document.getElementById('w').value = (33475 * bhps) / delta_h;
  } else {
    alert('No hay sufientes parametros para el calculo.');
  }
}
