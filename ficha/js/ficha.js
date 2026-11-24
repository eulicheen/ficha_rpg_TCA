const SUPABASE_URL_BASE = 'https://dlzbjomtmquobzwzzfot.supabase.co/rest/v1/ficha';
const  SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_UZujLvs6Ne2v5RtDVuN_iQ_dNOghJn4';


//salva a sessão naquele login
const sessao = JSON.parse(localStorage.getItem('supabase_session') || 'null');
const userId = sessao?.user?.id;
const token = sessao?.access_token;

//lista apenas as fichas daquele login, com o nome do arquétipo/atributo
const SUPABASE_URL = `${SUPABASE_URL_BASE}?select=*,arquetipo(nome),atributos(nome)&user_id=eq.${userId}&order=id.desc`;


//variáveis
const form = document.querySelector('#ficha');
const input = document.querySelector('#input');

const nome = document.querySelector('#nome');
const vida = document.querySelector('#vida');
const dados = document.querySelector('#dados');
const arquetipo = document.querySelector('#arquetipo');
const atributo = document.querySelector('#atributo');
const habilidade = document.querySelector('#habilidade');

const lista = document.querySelector('#lista');
const mensagem = document.querySelector('#mensagem');


//armazenar dados no supabase
let local = [];


//headers para não precisar repetir toda hora
function headers(){
    return{
    'apikey': SUPABASE_PUBLISHABLE_KEY,
    'Authorization': `Bearer ${token || SUPABASE_PUBLISHABLE_KEY}`,
    'Content-Type': 'application/json',  
    'Prefer': 'return=representation'
    };
}

//evita injeção de HTML nos espaços de formulário
function escapar(texto) {
    const div = document.createElement('div');
    div.textContent = texto ?? '';
    return div.innerHTML;
}

//bloqueia a página se não tiver login
if (!userId) {
    alert('Você precisa fazer login antes.');
    window.location.href = 'login.html';
} else {
    form.addEventListener('submit', salvar);
    buscar();
}

//busca as fichas do supabase
async function buscar(){
    try{
        const resposta = await fetch(SUPABASE_URL, {
            headers: headers()
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            console.error('Erro do servidor:', resultado);
            lista.innerHTML = 'Erro ao carregar dados.';
            return;
        }

        local = resultado;
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
                <h3>${escapar(ficha.nome_jogador)}</h3>
                <p>Vida: ${ficha.vida}</p>
                <p>Dados: ${ficha.dados}</p>
                <p>Arquétipo: ${(ficha.arquetipo?.nome)  || '-'}</p>
                <p>Atributo: ${(ficha.atributos?.nome)  || '-'}</p>
                <p>Habilidade: ${escapar(ficha.habilidade)}</p>
                <div class="actions">
                    <button class="edit" onclick="edit(${ficha.id})">Editar</button>
                </div>
            </div>
        `;
    });
}

//preenche com os dados da ficha selecionada para edição
function edit(id) {
    const ficha = local.find(e => e.id === id);
    if (ficha) {
        lista.classList.add('oculto');
        mensagem.innerHTML = 'Informe os dados que serão alterados';

        input.value = ficha.id;
        nome.value = ficha.nome_jogador;
        vida.value = ficha.vida;
        dados.value = ficha.dados;
        arquetipo.value = ficha.id_arquetipo ?? 0;
        atributo.value = ficha.id_atributos ?? 0;
        habilidade.value = ficha.habilidade || '';       
    }
}
window.edit = edit;


//cria (POST) ou atualiza (PATCH)
async function salvar(e){
    e.preventDefault();

    const id= input.value;
    const editando = Boolean(id);

    const fichaData = {
        nome_jogador: nome.value,
        vida: Number(vida.value),
        dados: Number(dados.value),
        id_arquetipo: Number(arquetipo.value) || null, //por ser chave estrangeira da tabela ficha
        id_atributos: Number(atributo.value) || null, //por ser chave estrangeira da tabela ficha
        habilidade: habilidade.value.trim()
    };

    //configurações de logins pra não mexer em outras fichas
    if(!editando){
        fichaData.user_id = userId;
    }

    const url = editando ? `${SUPABASE_URL_BASE}?id=eq.${id}&user_id=eq.${userId}` : SUPABASE_URL_BASE;


    try{
        const resposta = await fetch(url, {
            method: editando ? 'PATCH' : 'POST',
            headers: headers(),
            body: JSON.stringify(fichaData)
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            console.error('Erro do servidor:', resultado);
            alert('Erro: ' + (resultado.message || 'não foi possível salvar.'));
            return;
        }

        if(editando){
            mensagem.innerHTML = `Ficha alterada com sucesso!<br>Escolha outra ficha para editar.`;
            lista.classList.remove('oculto');
        } else {
             mensagem.innerHTML = `Ficha criada com sucesso!<br>Preencha o formulário novamente para criar outra ficha.`;
        }

        //limpa o formulário e recarrega a lista atualizada
        form.reset();
        input.value = '';
        buscar(); 


    }catch(error){
        console.error('Erro ao salvar ficha:', error);
        alert('Erro ao salvar ficha, verifique o console')
    }

}