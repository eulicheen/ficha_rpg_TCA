const SUPABASE_URL_BASE = 'https://dlzbjomtmquobzwzzfot.supabase.co/rest/v1/ficha';
const  SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_UZujLvs6Ne2v5RtDVuN_iQ_dNOghJn4';
       
//variáveis
const ficha = document.querySelector('#ficha');
const input = document.querySelector('#input');

const nome = document.querySelector('#nome');
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
    return{
    'apikey': SUPABASE_PUBLISHABLE_KEY,
    'Authorization': `Bearer ${PUBLISHABLE_KEY}`,
    'Content-Type': 'application/json',  
    'Prefer': 'return=representation'
    };
}

//busca as fichas do supabase
async function buscar(){
    try{
        const resposta = await fetch(SUPABASE_URL_BASE, {
            headers: headers()
        });

        const dados = await resposta.json();

        local = dados;
        render();

    }catch(error){
        lista.innerHTML = 'Erro ao buscar fichas';
    }
    
}

//renderiza as fichas na div
function render() {
    if (local.length == 0) {
        lista.innerHTML = '<p>Nenhuma ficha encontrada.</p>';
        return;
    }

    lista.innerHTML = '';
    local.forEach(ficha => {
        lista.innerHTML += `
            <div class="ficha-card" id="ficha-${ficha.id}">
                <h2>${ficha.nome_produto}</h2>
                <p>Vida: ${ficha.vida}</p>
                <p>Dados: ${ficha.dados}</p>
                <p>Arquétipo: ${ficha.arquetipo}</p>
                <p>Atributo: ${ficha.atributo}</p>
                <p>Habilidade: ${ficha.habilidade}</p>
                <div class="actions">
                    <button class="edit" onclick="prepararEdit(${ficha.id})">Editar</button>
                </div>
            </div>
        `;
    });
}

//preenche com os dados da ficha selecionada para edição
function edit(id) {
    const ficha = local.find(e => e.id === id);
    if (ficha) {
        form.classList.remove('oculto');
        ficha.classList.add('oculto');
        lista.innerHTML = 'Informe os dados que serão alterados';

        input.value = ficha.id;
        nome.value = ficha.nome_produto;
        vida.value = ficha.vida;
        dados.value = ficha.dados;
        arquetipo.value = ficha.arquetipo;
        atributo.value = ficha.atributo;
        habilidade.value = ficha.habilidade;
                    
    }
}
window.edit = edit;
