const SUPABASE_URL_BASE = 'https://dlzbjomtmquobzwzzfot.supabase.co';
const AUTENTICACAO_URL = `${SUPABASE_URL_BASE}/auth/v1/signup`;
const BANCO_URL = `${SUPABASE_URL_BASE}/rest/v1/perfil`;
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_UZujLvs6Ne2v5RtDVuN_iQ_dNOghJn4';

//cadastro
const form = document.querySelector('#form');
const email = document.querySelector('#email');
const senha = document.querySelector('#senha');

let armazenar = [];

form.addEventListener('submit', cadastro);

async function cadastro(e) {

     e.preventDefault(); //impede o navegador de recarregar a página enquanto tenta logar

    const dadosCadastro = { email: email.value, password: senha.value };
            
    try {
    const resposta = await fetch(AUTENTICACAO_URL, {
        method: 'POST',
        headers: {
        'apikey': SUPABASE_PUBLISHABLE_KEY,
        'Content-Type': 'application/json',
        Prefer: 'return=representation'
        },
        body: JSON.stringify(dadosCadastro)
    }
    );

    const dados = await resposta.json();
    console.log(resposta);
    if (!resposta.ok) {
      throw new Error(dados.message || `Erro HTTP: ${resposta.status}`);
    }

    alert('Conta criada');
    console.log('Conta criada:', dados);
    armazenar.push(dados);

    
    localStorage.setItem("supabase_session", JSON.stringify(dados));
    window.location.href = '/ficha.html';

}
catch (error) {
    console.error('Erro ao criar conta:', error);
}
}





