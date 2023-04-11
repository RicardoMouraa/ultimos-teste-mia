document.addEventListener("DOMContentLoaded", function () {
    // Inicialize o emailJS com sua chave pública
    emailjs.init("WzcPTOoOPwBS89lo1");
  
    const form = document.querySelector(".form-querSerModelo");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      sendEmail();
    });
  
    function sendEmail() {
      const nome = document.getElementById("nome").value;
      const instagram = document.getElementById("instagram").value;
      const altura = document.getElementById("altura").value;
      const busto = document.getElementById("busto").value;
      const cintura = document.getElementById("cintura").value;
      const quadril = document.getElementById("quadril").value;
      const sapato = document.getElementById("sapato").value;
      const cabelo = document.getElementById("cabelo").value;
      const olhos = document.getElementById("olhos").value;
      const whatsapp = document.getElementById("whatsapp").value;
  
      if (!nome || !instagram || !altura || !busto || !cintura || !quadril || !sapato || !cabelo || !olhos || !whatsapp) {
        showAlert("Preencha todos os campos.", "error");
        return;
      }
  
      const templateParams = {
        from_name: nome,
        from_instagram: instagram,
        altura: altura,
        busto: busto,
        cintura: cintura,
        quadril: quadril,
        sapato: sapato,
        cabelo: cabelo,
        olhos: olhos,
        whatsapp: whatsapp
      };
  
      emailjs
        .send("service_p4b6r2r", "template_do6xnc6", templateParams) // Substitua com seu Service ID e Template ID do emailJS
        .then(
          function () {
            showAlert("Formulário enviado com sucesso!", "success");
            form.reset(); // Limpar campos do formulário após envio bem-sucedido
          },
          function (error) {
            showAlert("Ocorreu um erro ao enviar o formulário. Tente novamente.", "error");
            console.error("Erro ao enviar o formulário: ", error);
          }
        );
    }
  
    function showAlert(message, type) {
      const alertDiv = document.createElement("div");
      alertDiv.classList.add("alert");
      if (type === "success") {
        alertDiv.classList.add("alert-success");
      } else if (type === "error") {
        alertDiv.classList.add("alert-danger");
      }
      alertDiv.textContent = message;
      form.appendChild(alertDiv);
      setTimeout(function () {
        form.removeChild(alertDiv);
      }, 5000);
    }
});
  