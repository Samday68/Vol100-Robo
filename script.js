function analyze() {
    const data = [1298.42, 1298.57, 1298.86, 1299.2, 1298.77]; // Örnek veri
    const digits = data.map(v => parseInt(v.toString().slice(-1)));
    let even = digits.filter(d => d % 2 === 0).length;
    let odd = digits.length - even;
    let result = (even > odd) ? "Rise" : "Fall";
    document.getElementById("result").innerText = "Tahmin: " + result + " (" + digits.join(", ") + ")";
}