
const USER = "Samet";
const PASS = "Samet2020";
let digits = [];
let chart;

function login() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;
  if (u === USER && p === PASS) {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("app").style.display = "block";
    initChart();
    startWebSocket();
  } else {
    document.getElementById("login-error").innerText = "Hatalı giriş!";
  }
}

function initChart() {
  const ctx = document.getElementById("chart").getContext("2d");
  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: Array(5).fill(""),
      datasets: [{
        label: "Last Digit",
        data: [],
        backgroundColor: [],
      }]
    },
    options: {
      scales: { y: { beginAtZero: true, max: 9 } }
    }
  });
}

function startWebSocket() {
  const ws = new WebSocket("wss://ws.binaryws.com/websockets/v3?app_id=1089");
  ws.onopen = () => ws.send(JSON.stringify({ ticks: "R_100", subscribe: 1 }));
  ws.onmessage = msg => {
    const data = JSON.parse(msg.data);
    if (!data.tick) return;

    const ld = parseInt(data.tick.quote.toString().slice(-1));
    digits.push(ld);
    if (digits.length > 5) digits.shift();

    document.getElementById("digits").innerText = digits.join(", ");

    updateChart();
    if (digits.length === 5) {
      document.getElementById("prediction").innerText = analyzePattern(digits);
    }
  };
}

function updateChart() {
  chart.data.labels = digits.map((_, i) => `${i + 1}`);
  chart.data.datasets[0].data = [...digits];
  chart.data.datasets[0].backgroundColor = digits.map(d => d % 2 ? "rgba(0, 150, 0, 0.7)" : "rgba(150, 0, 0, 0.7)");
  chart.update();
}

function analyzePattern(d) {
  const successBlocks = {
    "5,4,4,4,0": "Rise",
    "2,7,6,2,7": "Fall",
    "4,5,4,4,4": "Fall",
    "4,4,4,0,8": "Fall",
    "4,4,0,8,5": "Rise"
  };
  const key = d.join(",");
  const dir = successBlocks[key];
  return dir ? `Tahmin: ${dir}` : "Belirsiz";
}
