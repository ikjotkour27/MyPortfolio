const roles = ["doctor", "healthcare provider", "wellness educator"];
    let i = 0;
    setInterval(() => {
      document.getElementById("role").textContent = roles[i];
      i = (i + 1) % roles.length;
    }, 2000);