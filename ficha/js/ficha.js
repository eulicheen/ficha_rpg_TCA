const SUPABASE_URL_BASE = 'https://dlzbjomtmquobzwzzfot.supabase.co/rest/v1/ficha?select=*&order=id.desc';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_UZujLvs6Ne2v5RtDVuN_iQ_dNOghJn4';
       

const ficha = document.querySelector('#ficha');
const input = document.querySelector('#input');

const nome = document.querySelector('#nome');
const vida = document.querySelector('#vida');
const dados = document.querySelector('#dados');
const habilidade1 = document.querySelector('#habilidade1');
const habilidade2 = document.querySelector('#habilidade2');

const lista = document.querySelector('#lista');
const mensagem = document.querySelector('#mensagem');

//armazenar dados no servidor

