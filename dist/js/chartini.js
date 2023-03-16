
new Chart(document.getElementById("line-chart"), {
  type: "line",
  data: {
    labels: [4500, 3500, 3200, 3050, 2700, 2450, 2200, 1750, 1499, 2050],
    datasets: [
      {
        data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
        label: "Peso",
        borderColor: "#3e95cd",
        fill: false,
      },
      {
        data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
        label: "Euro",
        borderColor: "#36a2eb",
        fill: false,
      },
      {
        data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
        label: "Dolar",
        borderColor: "#07b107",
        fill: false,
      },        
    ],
  },
  options: {
    legend: {
      labels: {
        fontColor: "#b2b9bf",
      },
    },
    title: {
      display: true,
      fontColor: "#b2b9bf",
      text: "Precios historicos crypto",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            fontColor: "#b2b9bf",
            fontSize: 12,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontColor: "#b2b9bf",
            fontSize: 12,
          },
        },
      ],
    },
  },
});

  