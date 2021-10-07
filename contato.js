window.onload = () => {
  inicializar();
  listar();
  document.getElementById('formCadastro').addEventListener('submit',add);
  document.getElementById('formCadastro').addEventListener('submit',listar);
}
var contatos = []
function inicializar(){
  if (localStorage.getItem('value') !== null){
    contatos = JSON.parse(localStorage.getItem('value'));
  }
}

function add(e) {

 let contato = {
   nome: document.getElementById("txtName").value,
   phone: document.getElementById("txtPhone").value,
   rua: document.getElementById("txtRua").value,
   numero: document.getElementById("txtNumero").value,
   cidade: document.getElementById("txtCidade").value,
   cep: document.getElementById("txtCep").value,
   type: document.getElementById("work").checked ? 'W' : 'F'
 }

 contatos.push(contato);
 localStorage.setItem('value', JSON.stringify(contatos));
 document.getElementById('formCadastro').reset();
}

function listar(){

  if(localStorage.getItem('value') === null){
    return
  }

  contatos = JSON.parse(localStorage.getItem('value'));
  var tbody = document.getElementById('contatosCadastrados');

  tbody.innerHTML = '';

  for (var i = 0; i < contatos.length; i++) {
      nome = contatos[i].nome;
      phone = contatos[i].phone;
      rua = contatos[i].rua;
      numero = contatos[i].numero;
      cidade = contatos[i].cidade;
      cep = contatos[i].cep;
      type = contatos[i].type == 'W' ? "Work" : "Family";

      if(type === 'Work'){
        tbody.innerHTML += '<tr class ="work" id="rowContact'+i+'">'+
        '<td class="work">'+nome+'</td>'+
        '<td class="work">'+phone+'</td>'+
        '<td class="work">'+rua+'</td>'+
        '<td class="work">'+numero+'</td>'+
        '<td class="work">'+cidade+'</td>'+
        '<td class="work">'+cep+'</td>'+
        '<td class="work">'+type+'</td>'+
        '<td><button class = "button buttonDelete" onclick="excluir('+i+')">Excluir</button></td>'+
        '</tr>';
      }
      if(type === 'Family'){
        tbody.innerHTML += '<tr class ="family" id="rowContact'+i+'">'+
        '<td class="family">'+nome+'</td>'+
        '<td class="family">'+phone+'</td>'+
        '<td class="family">'+rua+'</td>'+
        '<td class="family">'+numero+'</td>'+
        '<td class="family">'+cidade+'</td>'+
        '<td class="family">'+cep+'</td>'+
        '<td class="family">'+type+'</td>'+
        '<td><button class = "button buttonDelete" onclick="excluir('+i+')">Excluir</button></td>'+
        '</tr>';
      }
      
  }
}

function excluir(index) {


  if(confirm("Você tem certeza que deseja excluir o contato "+contatos[index].nome+"?")){
    contatos.splice(index,1)
  } else{
    alert("Exclusão cancelada!")
  }
  localStorage.setItem('value', JSON.stringify(contatos))
  listar()
}