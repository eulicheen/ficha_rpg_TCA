const SUPABASE_URL_BASE = 'https://dlzbjomtmquobzwzzfot.supabase.co/rest/v1/campanha';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_UZujLvs6Ne2v5RtDVuN_iQ_dNOghJn4';
       

//criar campanha
const botao = document.querySelector('#botao');
const nome = document.querySelector('#nome');


botao.addEventListener('submit', novaCampanha);
async function novaCampanha() {

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


        nome.value = '';
        buscarCampanhas();//atualiza a lista de campanhas


    window.open(`/ficha/criar_ficha.html?id=${campanhaCriada.id}`, '_blank');


    } catch (error) {
        console.error('Erro ao criar campanha:', error);
        alert('Erro ao criar campanha');
    }
}





//mostrar campanhas criadas
const lista = document.querySelector('#lista');
let localCampanhas = [];

async function buscarCampanhas() {
    try {
        const resposta = await fetch(`${SUPABASE_URL_BASE}?select=*order=id.desc`,
            {
                method: 'GET',
                headers: {
                apikey: SUPABASE_PUBLISHABLE_KEY,
                'Authorization': `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
                Accept: 'application/json'
                }
            }
        );
        
        if(!resposta.ok){
        throw new Error('Erro ao carregar campanhas')
        }

        localCampanhas = await resposta.json();
        renderCampanhas();

    } catch (error) {
        console.error('Erro ao carregar campanhas:', error);
        lista.innerHTML = 'Erro ao carregar campanhas.';
    }
}

//redenriza as campanhas
function renderCampanhas() {
    lista.innerHTML = '';

    if (localCampanhas.length === 0) {
        lista.innerHTML = '<p>Nenhuma campanha encontrada.</p>';
        return;
    }

    localCampanhas.forEach(campanha => {

        const div = document.createElement('div');
        div.id = `campanha-${campanha.id}`;
        
        const p = document.createElement('p');
        const b = document.createElement('b');
        
        b.textContent = campanha.nome;
        div.appendChild(p);

        div.addEventListener('click', () => {
            window.open(`/ficha/criar_ficha.html?id=${campanhaCriada.id}`, '_blank');
        });

        lista.appendChild(div);

    });
}
buscarCampanhas();