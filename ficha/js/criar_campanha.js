const { createElement } = require("react");

//mostrar e criar campanhas
const SUPABASE_URL_BASE = 'https://dlzbjomtmquobzwzzfot.supabase.co/rest/v1/campanha';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_UZujLvs6Ne2v5RtDVuN_iQ_dNOghJn4';
       

const botao = document.querySelector('#botao');
const div = document.querySelector('#div');
const nome = document.querySelector('#nome');

const lista = document.querySelector('#campanhas');



//carregar a lista de campanhas registradas
document.addEventListener('DOMContentLoaded', carregarCampanhas);

async function carregarCampanhas(){

    try {
        const resposta = await fetch(SUPABASE_URL_BASE, {
            method: 'GET',
            headers: {
            apikey: SUPABASE_PUBLISHABLE_KEY,
            'Authorization': `Bearer ${SUPABASE_PUBLISHABLE_KEY}`
            }
         });

          if(!resposta.ok){
            throw new Error('Erro ao carregar campanhas')
        }

        const campanhaLista = await resposta.json();

        if(campanhaLista.length == 0){
            lista.innerHTML = '<p>Não existem campanhas registradas</p>';
            return;
        }

        campanhaLista.forEach(campanha => {
            const acesso = document.createElement('div');

            acesso.innerHTML = `<button onclick="abrirCampanha('${campanha.id}')"><b>Abrir</b></button>`

            lista.appendChild(acesso);
        });

    } catch(error){
        console.error(error);
        alert('Algo deu errado')
    }
}

//abrir a campanha
function abrirCampanha(id){
    window.open(`/ficha/criar_ficha.html?id=${id}`, '_blank');
}



//cria campanhas a partir do botão
async function novaCampanha() {

    if(!nome.value.trim()){
        alert('Escreva um nome');
        return;
    }

    const dadosCampanha = {
        nome: nome.value
    };
    
    try {
        const resposta = await fetch(SUPABASE_URL_BASE, {
            method: 'POST',
            headers: {
            apikey: SUPABASE_PUBLISHABLE_KEY,
            'Authorization': `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
            'Content-Type': 'application/json',
             Prefer: 'return=representation',
             'Accept': 'application/vnd.pgrst.object+json'
            },
            body: JSON.stringify(dadosCampanha)
        });

        if(!resposta.ok){
            throw new Error('Erro ao criar campanha')
        }
        
        const campanhaCriada = await resposta.json();

        //limpar input
        nome.value = '';

        carregarCampanhas();

        const novaDiv = document.createElement('div');

        abrirCampanha(campanhaCriada.id);


    } catch (error) {
        console.error('Erro ao criar campanha:', error);
        alert('Erro ao criar campanha');
    }
}