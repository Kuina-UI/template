const totalBalanceChartElement = document.querySelector("#total-balance-chart");
const monthlyBudgetChartElement = document.querySelector("#monthly-budget-chart");
const runwayChartElement = document.querySelector("#runway-chart");
const expenseDistributionChartElement = document.querySelector("#expense-distribution-chart");
const balanceForecastChartElement = document.querySelector("#balance-forecast-chart");
const plannedVsUnplannedChartElement = document.querySelector("#planned-vs-unplanned-chart");

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

const expenseDistributionCategories = [
  { name: "Housing", amountInUsd: 2360.0, colorClasses: "dark:text-orange-400 light:text-orange-500" },
  { name: "Other", amountInUsd: 833.1, colorClasses: "dark:text-violet-400 light:text-violet-500" },
  { name: "Health & wellness", amountInUsd: 435.0, colorClasses: "dark:text-blue-400 light:text-blue-500" },
  { name: "Transport & fuel", amountInUsd: 261.75, colorClasses: "dark:text-green-400 light:text-green-500" },
  { name: "Restaurants & going out", amountInUsd: 242.25, colorClasses: "dark:text-yellow-400 light:text-yellow-500" },
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

const actualBalanceByNovemberDay = [
  { x: 1, y: 16742.6 },
  { x: 2, y: 14628.15 },
  { x: 3, y: 14571.4 },
  { x: 4, y: 14412.72 },
  { x: 5, y: 14356.08 },
  { x: 6, y: 14298.35 },
  { x: 7, y: 15280.88 },
];

const forecastBalanceByNovemberDay = [
  { x: 7, y: 15280.88 },
  { x: 8, y: 20430.88 },
  { x: 9, y: 20430.88 },
  { x: 10, y: 20430.88 },
  { x: 11, y: 20430.88 },
  { x: 12, y: 20430.88 },
  { x: 13, y: 20430.88 },
  { x: 14, y: 20430.88 },
  { x: 15, y: 20430.88 },
  { x: 16, y: 20430.88 },
  { x: 17, y: 20430.88 },
  { x: 18, y: 20430.88 },
  { x: 19, y: 20430.88 },
  { x: 20, y: 20430.88 },
  { x: 21, y: 20430.88 },
  { x: 22, y: 20430.88 },
  { x: 23, y: 20430.88 },
  { x: 24, y: 20430.88 },
  { x: 25, y: 20430.88 },
  { x: 26, y: 20430.88 },
  { x: 27, y: 20430.88 },
  { x: 28, y: 20930.88 },
  { x: 29, y: 20930.88 },
  { x: 30, y: 20930.88 },
];

const balanceForecastLabeledDays = [1, 15, 30];
const balanceForecastSeriesColorClasses = [
  "dark:text-purple-500 light:text-purple-600",
  "dark:text-indigo-500 light:text-indigo-600",
];
const balanceForecastZeroLineColorClasses = "dark:text-red-500 light:text-red-600";

const plannedExpensesByNovemberDay = [
  30, 2270, 0, 170, 37, 0, 880, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];
const unplannedExpensesByNovemberDay = [
  0, 0, 11.4, 34.6, 62.25, 7.6, 664, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

const plannedVsUnplannedLabeledDays = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];
const plannedVsUnplannedCompactLabeledDays = [1, 5, 10, 15, 20, 25, 30];
const plannedVsUnplannedCompactChartMaxWidthInPixels = 320;
const plannedVsUnplannedSeriesColorClasses = [
  "dark:text-blue-500 light:text-blue-600",
  "dark:text-orange-400 light:text-orange-600",
];
const plannedVsUnplannedGridLineColorClasses = "dark:text-white/6 light:text-stone-950/6";

/**
 * Converts any CSS color to rgb(), or rgba() when translucent: ApexCharts parses neither light-dark() tokens nor
 * Tailwind's oklch() palette, and an opaque rgba() would override its fill opacity.
 */
function toChartColor(cssColor) {
  const colorConversionCanvas = document.createElement("canvas").getContext("2d");
  colorConversionCanvas.fillStyle = cssColor;
  colorConversionCanvas.fillRect(0, 0, 1, 1);
  const [red, green, blue, alpha] = colorConversionCanvas.getImageData(0, 0, 1, 1).data;
  return alpha === 255 ? `rgb(${red}, ${green}, ${blue})` : `rgba(${red}, ${green}, ${blue}, ${alpha / 255})`;
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

function readExpenseDistributionThemeOptions() {
  const mutedColor = readColorClasses("text-muted");
  return {
    colors: expenseDistributionCategories.map((category) => readColorClasses(category.colorClasses)),
    stroke: { width: 3, colors: [readColorClasses("text-widget")] },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            name: { color: mutedColor },
            value: { color: mutedColor },
            total: { color: mutedColor },
          },
        },
      },
    },
  };
}

function readBalanceForecastThemeOptions() {
  return {
    chart: { foreColor: readColorClasses("text-muted") },
    colors: balanceForecastSeriesColorClasses.map((seriesColorClasses) => readColorClasses(seriesColorClasses)),
    annotations: {
      yaxis: [{ y: 0, borderColor: readColorClasses(balanceForecastZeroLineColorClasses), strokeDashArray: 4 }],
    },
  };
}

/** Picks the x-axis days to label: a narrow chart cannot fit the full set without label collisions. */
function readPlannedVsUnplannedLabeledDays() {
  return plannedVsUnplannedChartElement.clientWidth < plannedVsUnplannedCompactChartMaxWidthInPixels
    ? plannedVsUnplannedCompactLabeledDays
    : plannedVsUnplannedLabeledDays;
}

function readPlannedVsUnplannedThemeOptions() {
  return {
    chart: { foreColor: readColorClasses("text-muted") },
    colors: plannedVsUnplannedSeriesColorClasses.map((seriesColorClasses) => readColorClasses(seriesColorClasses)),
    grid: { borderColor: readColorClasses(plannedVsUnplannedGridLineColorClasses) },
  };
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

const expenseDistributionChart = new ApexCharts(expenseDistributionChartElement, {
  chart: {
    type: "donut",
    height: 220,
    animations: { enabled: false },
    selection: { enabled: false },
    events: {
      dataPointSelection: (event) => event.preventDefault(),
    },
  },
  series: expenseDistributionCategories.map((category) => category.amountInUsd),
  labels: expenseDistributionCategories.map((category) => category.name),
  plotOptions: {
    pie: {
      expandOnClick: false,
      donut: {
        size: "75%",
        labels: {
          show: true,
          name: { fontSize: "11px", fontWeight: 400, offsetY: -8 },
          value: {
            fontSize: "16px",
            fontWeight: 500,
            offsetY: 0,
            formatter: (value) =>
              parseFloat(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
              " USD",
          },
          total: {
            show: true,
            showAlways: true,
            label: "TOTAL",
            fontSize: "10px",
            formatter: () => {
              const total = expenseDistributionCategories.reduce((sum, category) => sum + category.amountInUsd, 0);
              return total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " USD";
            },
          },
        },
      },
    },
  },
  dataLabels: { enabled: false },
  legend: { show: false },
  states: { hover: { filter: { type: "none" } }, active: { filter: { type: "none" } } },
  tooltip: { enabled: false },
});

const balanceForecastChart = new ApexCharts(balanceForecastChartElement, {
  chart: {
    type: "line",
    height: 200,
    fontFamily: "inherit",
    parentHeightOffset: 0,
    toolbar: { show: false },
    zoom: { enabled: false },
    animations: { enabled: false },
  },
  series: [
    { name: "Actual", type: "area", data: actualBalanceByNovemberDay },
    { name: "Forecast", type: "line", data: forecastBalanceByNovemberDay },
  ],
  stroke: { curve: "monotoneCubic", width: 1.5, dashArray: [0, 4] },
  fill: {
    type: ["gradient", "solid"],
    gradient: { type: "vertical", shadeIntensity: 0, opacityFrom: 0.35, opacityTo: 0, stops: [0, 100] },
  },
  xaxis: {
    type: "numeric",
    min: 1,
    max: 30,
    tickAmount: 29,
    axisBorder: { show: false },
    axisTicks: { show: false },
    crosshairs: { show: false },
    tooltip: { enabled: false },
    labels: {
      rotate: 0,
      hideOverlappingLabels: false,
      formatter: (dayOfMonth) =>
        balanceForecastLabeledDays.includes(Number(dayOfMonth)) ? `Nov ${Number(dayOfMonth)}` : "",
    },
  },
  yaxis: {
    opposite: true,
    min: 0,
    max: 30000,
    tickAmount: 3,
    labels: {
      align: "right",
      offsetX: 8,
      formatter: (balanceInUsd) => (balanceInUsd === 0 ? "0" : `${balanceInUsd / 1000}K`),
    },
  },
  grid: { show: false, padding: { top: -16, right: 0 } },
  dataLabels: { enabled: false },
  legend: { show: false },
  tooltip: { enabled: false },
});

const plannedVsUnplannedChart = new ApexCharts(plannedVsUnplannedChartElement, {
  chart: {
    type: "bar",
    height: 178,
    stacked: true,
    fontFamily: "inherit",
    parentHeightOffset: 0,
    toolbar: { show: false },
    zoom: { enabled: false },
    animations: { enabled: false },
  },
  series: [
    { name: "Planned", data: plannedExpensesByNovemberDay },
    { name: "Unplanned", data: unplannedExpensesByNovemberDay },
  ],
  plotOptions: {
    bar: { columnWidth: "55%", borderRadius: 2, borderRadiusApplication: "end", borderRadiusWhenStacked: "last" },
  },
  stroke: { width: 0 },
  fill: { opacity: 1 },
  xaxis: {
    categories: Array.from({ length: 30 }, (emptySlot, dayIndex) => dayIndex + 1),
    axisBorder: { show: false },
    axisTicks: { show: false },
    crosshairs: { show: false },
    tooltip: { enabled: false },
    labels: {
      rotate: 0,
      hideOverlappingLabels: false,
      formatter: (dayOfMonth) => (readPlannedVsUnplannedLabeledDays().includes(Number(dayOfMonth)) ? dayOfMonth : ""),
    },
  },
  yaxis: {
    opposite: true,
    min: 0,
    max: 2400,
    tickAmount: 4,
    labels: {
      align: "right",
      offsetX: 8,
      formatter: (amountInUsd) => (amountInUsd < 1000 ? `${amountInUsd}` : `${amountInUsd / 1000}K`),
    },
  },
  grid: { padding: { top: -6, right: 0, bottom: -6 } },
  dataLabels: { enabled: false },
  legend: { show: false },
  states: { hover: { filter: { type: "none" } }, active: { filter: { type: "none" } } },
  tooltip: { enabled: false },
});

totalBalanceChart.render();
monthlyBudgetChart.render();
runwayChart.render();
expenseDistributionChart.render();
expenseDistributionChart.updateOptions(readExpenseDistributionThemeOptions());
balanceForecastChart.render();
balanceForecastChart.updateOptions(readBalanceForecastThemeOptions());
plannedVsUnplannedChart.render();
plannedVsUnplannedChart.updateOptions(readPlannedVsUnplannedThemeOptions());

new MutationObserver(() => {
  totalBalanceChart.updateOptions(readTotalBalanceThemeOptions());
  monthlyBudgetChart.updateOptions(readMonthlyBudgetThemeOptions());
  runwayChart.updateOptions(readRunwayThemeOptions());
  expenseDistributionChart.updateOptions(readExpenseDistributionThemeOptions());
  balanceForecastChart.updateOptions(readBalanceForecastThemeOptions());
  plannedVsUnplannedChart.updateOptions(readPlannedVsUnplannedThemeOptions());
}).observe(document.documentElement, { attributeFilter: ["data-theme"] });
