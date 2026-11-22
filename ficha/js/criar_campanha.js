const SUPABASE_URL_BASE = 'https://dlzbjomtmquobzwzzfot.supabase.co/rest/v1/campanha';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_UZujLvs6Ne2v5RtDVuN_iQ_dNOghJn4';
       

//criarcampanha
const botao = document.querySelector('#botao');
const div = document.querySelector('#div');
const nome = document.querySelector('#nome');

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


        const novaDiv = document.createElement('div');
        div.appendChild(novaDiv);


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
        const resposta = await fetch(API_URL,
            {
                method: 'GET',
                headers: {
                apikey: PUBLISHABLE_KEY,
                Accept: 'application/json'
                }
            }
        );  
        localCampanhas = await response.json();
        renderCampanhas();
    } catch (error) {
        lista.innerHTML = 'Erro ao carregar campanhas.';
    }
}

//redenriza as campanhas
function renderCampanhas() {
    if (localCampanhas.length === 0) {
        lista.innerHTML = '<p>Nenhuma campanha encontrada.</p>';
        return;
    }

    localCampanhas.forEach(campanha => {
        lista.innerHTML += `
            <div id="campanha-${campanha.id}">
                <p>${campanha.nome}</p>
            </div>
        `;
    });
}
buscarCampanhas();