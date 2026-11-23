const SUPABASE_URL_BASE = 'https://dlzbjomtmquobzwzzfot.supabase.co/rest/v1/ficha';
const  SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_UZujLvs6Ne2v5RtDVuN_iQ_dNOghJn4';
       
//variáveis
const ficha = document.querySelector('#ficha');
const input = document.querySelector('#input');

const nomeJogador = document.querySelector('#nome');
const vida = document.querySelector('#vida');
const dados = document.querySelector('#dados');
const arquetipo = document.querySelector('#arquetipo');
const atributo = document.querySelector('#atributo');
const habilidade = document.querySelector('#habilidade');

const lista = document.querySelector('#lista');

//armazenar dados no servidor
let local = [];


//headers para não precisar repetir toda hora
function headers(){
    'apikey': SUPABASE_PUBLISHABLE_KEY,
    'Authorization': `Bearer ${PUBLISHABLE_KEY}`,
    'Content-Type': 'application/json',  
    'Prefer': 'return=representation'
}

async function buscar(){
    try{
        const resposta = await fetch(SUPABASE_URL_BASE, {
            headers: headers()
        }
        );
    }catch(error){
        lista.innerHTML = 'Erro ao buscar fichas';
    }
    
}