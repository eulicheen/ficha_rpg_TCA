//criar
const SUPABASE_URL_BASE = 'https://dlzbjomtmquobzwzzfot.supabase.co/rest/v1/campanha?select=*';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_UZujLvs6Ne2v5RtDVuN_iQ_dNOghJn4';
       

const botao = document.querySelector('#botao');
const div = document.querySelector('#div');
const nome = document.querySelector('#nome');

//ao clicar no botão rola tudo
botao.addEventListener('click', NovaCampanha);

async function NovaCampanha(e) {
    e.preventDefault(); 

    const dadosCampanha = {
        nome_campanha: nome.value
    };
    
    try {
        const resposta = await fetch(SUPABASE_URL_BASE, {
            method: 'POST',
            headers: {
            apikey: SUPABASE_PUBLISHABLE_KEY,
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosCampanha)
        });

        if(!resposta.ok){
            throw new Error('Erro ao criar campanha')
        }
        
        const campanhaCriada = await resposta.json();

        const novaDiv = document.createElement('div');

        novaDiv.innerHTML = `Nova campanha registrada com sucesso. <br>
                                {dadosDocumento.nome_campanha}`;

        contentor.appendChild(novaDiv);

    window.open(`/arquivo.html?id=${idGerado}`, '_blank');

    } catch (error) {
        console.error('Erro ao criar campanha:', error);
        alert('Erro ao criar campanha');
    }
}