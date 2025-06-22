function login() {
    const u = document.getElementById("username").value;
    const p = document.getElementById("password").value;
    if (u === "Samet" && p === "Samet2020") {
        document.getElementById("login").style.display = "none";
        document.getElementById("app").style.display = "block";
    } else {
        alert("Hatalı giriş");
    }
}