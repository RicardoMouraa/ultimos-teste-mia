emailjs.init("WzcPTOoOPwBS89lo1");

function sendModelsByEmail(formData) {
  const selectedCardsJson = localStorage.getItem('selectedCards');
  if (!selectedCardsJson) {
      alert('Nenhum modelo selecionado.');
      return;
  }

  const selectedCards = JSON.parse(selectedCardsJson);
  if (selectedCards.length === 0) {
      alert('Nenhum modelo selecionado.');
      return;
  }

  const modelNames = selectedCards.map(card => card.title.toUpperCase());
  const modelNamesFormatted = modelNames.join(', ');

  const emailParams = {
      user_name: formData.nome,
      user_email: formData.email,
      user_phone: formData.telefone,
      company_name: formData.empresa,
      user_message: formData.descricao,
      model_names: modelNamesFormatted
  };

  // Substitua "YOUR_SERVICE_ID" e "YOUR_TEMPLATE_ID" pelos valores apropriados da sua conta do EmailJS
  emailjs.send("service_p4b6r2r", "template_yldlsgo", emailParams)
      .then(response => {
          alert("Casting enviado com sucesso!");
          document.getElementById('custom-overlay').style.display = 'none';
      })
      .catch(error => {
          alert("Ocorreu um erro ao enviar o casting: ", error);
      });
}


document.getElementById('formulario-contato').addEventListener('submit', function (event) {
  event.preventDefault();
  const formData = {
      nome: event.target.nome.value,
      email: event.target.email.value,
      telefone: event.target.telefone.value,
      empresa: event.target.empresa.value,
      descricao: event.target.descricao.value
  };

  sendModelsByEmail(formData);
});

document.addEventListener('DOMContentLoaded', function () {
  const actionButton = document.getElementById('send-button');
  if (actionButton) {
      actionButton.addEventListener('click', sendModelsByWhatsApp);
  }

  const emailButton = document.getElementById('abrir-formulario');
  if (emailButton) {
      emailButton.addEventListener('click', function() {
          document.getElementById('custom-overlay').style.display = 'block';
      });
  }
});

document.getElementById('close-btn').addEventListener('click', function () {
  document.getElementById('custom-overlay').style.display = 'none';
});

document.querySelector('.submit-button').addEventListener('click', function () {
  document.getElementById('custom-overlay').style.display = 'none';
});