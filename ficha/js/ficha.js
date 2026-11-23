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


//salva a sessão naquele login
const userId = sessao?.user?.id;

//lista apenas as fichas daquele login
const SUPABASE_URL = `${SUPABASE_URL_BASE}?select=*&user_id=eq.${userId}&order=id.desc`;

//armazenar dados no supabase
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
        const resposta = await fetch(SUPABASE_URL, {
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

async function salvar(e){
    e.preventDefault();

    const id= input.value;
    const editando = Boolean(id);

    const fichaData = {
        nome_jogador: nome.value,
        vida: Number(vida.value),
        dados: Number(dados.value),
        id_arquetipo: Number(arquetipo.value) || null, //por ser chave estrangeira da tabela ficha
        id_atributo: Number(atributo.value) || null, //por ser chave estrangeira da tabela ficha
        habilidade: habilidade.value.trim()
    };

    //configurações de logins pra não mexer em outras fichas
    if(!editando){
        fichaData.user_id = userId;
    }

    const url = editando ? `${SUPABASE_URL_BASE}?select=*&user_id=eq.${userId}` : SUPABASE_URL_BASE;

    try{
        const resposta = await fetch(url, {
            method: editando ? 'PATCH' : 'POST',
            headers: headers(),
            body: JSON.stringify(fichaData)
        });
    }catch(error){
        console.error('Erro ao salvar ficha:', error);
        alert('Erro ao salvar ficha, verifique o console')
    }

}