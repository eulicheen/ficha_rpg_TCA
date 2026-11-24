const SUPABASE_URL_BASE = 'https://dlzbjomtmquobzwzzfot.supabase.co';
const LOGIN_URL = `${SUPABASE_URL_BASE}/auth/v1/token?grant_type=password`;
const BANCO_URL = `${SUPABASE_URL_BASE}/rest/v1/perfil`;
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_UZujLvs6Ne2v5RtDVuN_iQ_dNOghJn4';

//login
const form = document.querySelector('#form');
const email = document.querySelector('#email');
const senha = document.querySelector('#senha');


form.addEventListener('submit', login);

async function login(e) {

     e.preventDefault(); //impede o navegador de recarregar a página enquanto tenta logar

    const dadosLogin = { email: email.value, password: senha.value };
            
    try {
    const resposta = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
        'apikey': SUPABASE_PUBLISHABLE_KEY,
        'Content-Type': 'application/json',
        Prefer: 'return=representation'
        },
        body: JSON.stringify(dadosLogin)
    }
    );

    const dados = await resposta.json();
    console.log(resposta);
    if (!resposta.ok) {
      throw new Error(dados.error_description  || dados.msg || `Erro HTTP: ${resposta.status}`);
    }

    alert('Login realizado');
    

    localStorage.setItem("supabase_session", JSON.stringify(dados));
    window.location.href = '/ficha_rpg_TCA/ficha/ficha.html';

}
catch (error) {
    console.error('Erro ao fazer login:', error);
    alert('Algo deu errado, confira suas informações')
}
}





