// procurar o botão
document.querySelector("#add-time").addEventListener("click", cloneField);
// Executar uma ação
function cloneField() {
  // Duplicar os campos. qual campo?

  const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true);

  //pegar cada campo .

  const fields = newFieldContainer.querySelectorAll('input');

  fields.forEach(function (field) {
    // pega o fild e limpa ele
    field.value = "";
  });
  // colocar na página
  document.querySelector('#schedule-items').appendChild(newFieldContainer);
}

  
  
