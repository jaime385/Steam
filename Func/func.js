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
        /*console.log(
          pressure,
          temp,
          specificVolumenLiquid,
          specificVolumenGas,
          internalEnergyLiquid,
          internalEnergyGas,
          EnthalpyLiquid,
          vaporitization,
          EnthalpyGas,
          entropyLiquid,
          entropyGas
        );*/
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
    const pcheck = document.getElementById('pressure');
    var isChecked = pcheck.checked;
    chartIt();
    async function chartIt() {
        let data = await getSteamData();
        var yAxis = data.t;
        var dataListInput = document.getElementById('xAxisInput').value;
        console.log(dataListInput);
        if (dataListInput == 'Vaporization') {
            console.log('Vaporization selected');
            var xAxis = data.V;
        }
        if (isChecked == true) {
            console.log('The checkbox is checked');
            var xAxis = data.p;
        }
        const ctx = document.getElementById('chart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: xAxis,
                datasets: [
                    {
                        label: `Graph selected.`,
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
                                    return value + '°';
                                },
                            },
                        },
                    ],
                },
            },
        });
    }
}
