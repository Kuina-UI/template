const totalBalanceChartElement = document.querySelector("#total-balance-chart");
const monthlyBudgetChartElement = document.querySelector("#monthly-budget-chart");
const runwayChartElement = document.querySelector("#runway-chart");

const totalBalanceByDay = [
  { x: "Sep 11", y: 14312.4 },
  { x: "Sep 12", y: 14688.15 },
  { x: "Sep 13", y: 14655.9 },
  { x: "Sep 14", y: 14640.22 },
  { x: "Sep 15", y: 14602.87 },
  { x: "Sep 16", y: 14598.1 },
  { x: "Sep 17", y: 14571.64 },
  { x: "Sep 18", y: 14566.03 },
  { x: "Sep 19", y: 14540.75 },
  { x: "Sep 20", y: 14532.18 },
  { x: "Sep 21", y: 14509.46 },
  { x: "Sep 22", y: 14497.3 },
  { x: "Sep 23", y: 14488.92 },
  { x: "Sep 24", y: 14462.05 },
  { x: "Sep 25", y: 14455.61 },
  { x: "Sep 26", y: 14431.28 },
  { x: "Sep 27", y: 14420.7 },
  { x: "Sep 28", y: 14398.44 },
  { x: "Sep 29", y: 14387.19 },
  { x: "Sep 30", y: 16912.57 },
  { x: "Oct 1", y: 15284.33 },
  { x: "Oct 2", y: 15261.9 },
  { x: "Oct 3", y: 15240.12 },
  { x: "Oct 4", y: 15055.48 },
  { x: "Oct 5", y: 15031.67 },
  { x: "Oct 6", y: 15019.25 },
  { x: "Oct 7", y: 14987.8 },
  { x: "Oct 8", y: 14962.41 },
  { x: "Oct 9", y: 14948.66 },
  { x: "Oct 10", y: 15209.13 },
];

const monthlyBudgetSegments = [
  { name: "Spent", amountInUsd: 4150, fillType: "solid", colorClasses: "dark:text-red-500 light:text-red-600" },
  {
    name: "Planned within budget",
    amountInUsd: 710,
    fillType: "pattern",
    colorClasses: "dark:text-stone-500 light:text-stone-400",
  },
  {
    name: "Planned over budget",
    amountInUsd: 679.44,
    fillType: "pattern",
    colorClasses: "dark:text-red-500 light:text-red-600",
  },
];

const runwayInDays = 186;
const healthyRunwayInDays = 180;
const runwayMarkerPositionInDays = Math.min(runwayInDays, healthyRunwayInDays);
const runwayScaleColorClasses = [
  "dark:text-red-500 light:text-red-600",
  "dark:text-orange-400 light:text-orange-500",
  "dark:text-yellow-300 light:text-yellow-400",
  "dark:text-green-500 light:text-green-600",
];
const runwayMarkerColorClasses = "dark:text-stone-950 light:text-stone-800";

/** Converts any CSS color to rgb(): ApexCharts parses neither light-dark() tokens nor Tailwind's oklch() palette. */
function toChartColor(cssColor) {
  const colorConversionCanvas = document.createElement("canvas").getContext("2d");
  colorConversionCanvas.fillStyle = cssColor;
  colorConversionCanvas.fillRect(0, 0, 1, 1);
  const [red, green, blue] = colorConversionCanvas.getImageData(0, 0, 1, 1).data;
  return `rgb(${red}, ${green}, ${blue})`;
}

/** Resolves Tailwind text color classes, theme variants included, by applying them to a temporary element. */
function readColorClasses(colorClasses) {
  const colorProbeElement = document.createElement("span");
  colorProbeElement.className = colorClasses;
  document.body.append(colorProbeElement);
  const probedColor = getComputedStyle(colorProbeElement).color;
  colorProbeElement.remove();
  return toChartColor(probedColor);
}

function readTotalBalanceThemeOptions() {
  return { colors: [toChartColor(getComputedStyle(totalBalanceChartElement).color)] };
}

function readMonthlyBudgetThemeOptions() {
  return { colors: monthlyBudgetSegments.map((budgetSegment) => readColorClasses(budgetSegment.colorClasses)) };
}

function readRunwayThemeOptions() {
  return {
    fill: {
      type: "gradient",
      gradient: {
        type: "horizontal",
        colorStops: runwayScaleColorClasses.map((scaleColorClasses, scaleColorIndex) => ({
          offset: (scaleColorIndex / (runwayScaleColorClasses.length - 1)) * 100,
          color: readColorClasses(scaleColorClasses),
          opacity: 1,
        })),
      },
    },
    annotations: {
      points: [
        {
          x: runwayMarkerPositionInDays,
          y: "Runway",
          marker: {
            size: 5,
            fillColor: readColorClasses(runwayMarkerColorClasses),
            strokeColor: readColorClasses("text-widget"),
            strokeWidth: 2,
          },
        },
      ],
    },
  };
}

const totalBalanceChart = new ApexCharts(totalBalanceChartElement, {
  chart: {
    type: "area",
    height: totalBalanceChartElement.clientHeight,
    sparkline: { enabled: true },
    animations: { enabled: false },
  },
  series: [{ name: "Total balance", data: totalBalanceByDay }],
  stroke: { curve: "monotoneCubic", width: 2 },
  fill: { type: "solid", opacity: 0.12 },
  grid: { padding: { top: 2 } },
  tooltip: { enabled: false },
  ...readTotalBalanceThemeOptions(),
});

const monthlyBudgetChart = new ApexCharts(monthlyBudgetChartElement, {
  chart: {
    type: "bar",
    height: monthlyBudgetChartElement.clientHeight,
    stacked: true,
    stackType: "100%",
    sparkline: { enabled: true },
    animations: { enabled: false },
  },
  series: monthlyBudgetSegments.map((budgetSegment) => ({
    name: budgetSegment.name,
    data: [budgetSegment.amountInUsd],
  })),
  plotOptions: { bar: { horizontal: true, barHeight: "100%", borderRadius: 5 } },
  stroke: { width: 2, colors: ["transparent"] },
  fill: {
    type: monthlyBudgetSegments.map((budgetSegment) => budgetSegment.fillType),
    opacity: 1,
    pattern: { style: "slantedLines", width: 6, height: 6, strokeWidth: 2 },
  },
  dataLabels: { enabled: false },
  states: { hover: { filter: { type: "none" } }, active: { filter: { type: "none" } } },
  tooltip: { enabled: false },
  ...readMonthlyBudgetThemeOptions(),
});

const runwayChart = new ApexCharts(runwayChartElement, {
  chart: {
    type: "bar",
    height: runwayChartElement.clientHeight,
    sparkline: { enabled: true },
    animations: { enabled: false },
  },
  series: [{ name: "Runway", data: [healthyRunwayInDays] }],
  xaxis: { categories: ["Runway"], min: 0, max: healthyRunwayInDays },
  plotOptions: { bar: { horizontal: true, barHeight: "43%", borderRadius: 3, borderRadiusApplication: "around" } },
  dataLabels: { enabled: false },
  states: { hover: { filter: { type: "none" } }, active: { filter: { type: "none" } } },
  tooltip: { enabled: false },
  ...readRunwayThemeOptions(),
});

totalBalanceChart.render();
monthlyBudgetChart.render();
runwayChart.render();

new MutationObserver(() => {
  totalBalanceChart.updateOptions(readTotalBalanceThemeOptions());
  monthlyBudgetChart.updateOptions(readMonthlyBudgetThemeOptions());
  runwayChart.updateOptions(readRunwayThemeOptions());
}).observe(document.documentElement, { attributeFilter: ["data-theme"] });
