/**
 * PORTFÓLIO PESSOAL - JÚLIA VICTÓRIA
 * Arquivo Principal de Scripts Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. ALTERNADOR DE TEMA (DARK MODE / LIGHT MODE)
       ========================================================================== */
    const botaoTema = document.getElementById('botao-tema');
    const corpoPagina = document.body;

    // Verificar se existe um tema salvo no localStorage
    const temaSalvo = localStorage.getItem('tema-portfolio');
    if (temaSalvo) {
        corpoPagina.className = temaSalvo;
    }

    // Função para alternar o tema
    function alternarTema() {
        if (corpoPagina.classList.contains('tema-escuro')) {
            corpoPagina.classList.remove('tema-escuro');
            corpoPagina.classList.add('tema-claro');
            localStorage.setItem('tema-portfolio', 'tema-claro');
        } else {
            corpoPagina.classList.remove('tema-claro');
            corpoPagina.classList.add('tema-escuro');
            localStorage.setItem('tema-portfolio', 'tema-escuro');
        }
    }

    botaoTema.addEventListener('click', alternarTema);

    /* ==========================================================================
       2. MENU HAMBÚRGUER MOBILE
       ========================================================================== */
    const botaoMenuMobile = document.getElementById('botao-menu-mobile');
    const menuNavegacao = document.getElementById('menu-navegacao');
    const linksMenu = document.querySelectorAll('.link-menu');

    // Alternar visibilidade do menu no mobile
    botaoMenuMobile.addEventListener('click', () => {
        menuNavegacao.classList.toggle('ativo');
        const estaAtivo = menuNavegacao.classList.contains('ativo');
        
        // Alternar ícone do botão
        const iconeAbrir = botaoMenuMobile.querySelector('.icone-abrir');
        const iconeFechar = botaoMenuMobile.querySelector('.icone-fechar');

        if (estaAtivo) {
            iconeAbrir.style.display = 'none';
            iconeFechar.style.display = 'block';
        } else {
            iconeAbrir.style.display = 'block';
            iconeFechar.style.display = 'none';
        }
    });

    // Fechar menu ao clicar em qualquer link
    linksMenu.forEach(link => {
        link.addEventListener('click', () => {
            menuNavegacao.classList.remove('ativo');
            const iconeAbrir = botaoMenuMobile.querySelector('.icone-abrir');
            const iconeFechar = botaoMenuMobile.querySelector('.icone-fechar');
            if (iconeAbrir && iconeFechar) {
                iconeAbrir.style.display = 'block';
                iconeFechar.style.display = 'none';
            }
        });
    });

    /* ==========================================================================
       3. EFEITO MÁQUINA DE ESCREVER (TYPING EFFECT)
       ========================================================================== */
    const elementoTexto = document.getElementById('texto-maquina-escrever');
    const frases = [
        'Estudante de Desenvolvimento Full Stack',
        'Especializando em Front-end',
        'Futura Dev Back-end & Mobile'
    ];

    let indiceFrase = 0;
    let indiceCaractere = 0;
    let estaDeletando = false;
    let velocidadeDigitacao = 100;

    function digitarEfeito() {
        const fraseAtual = frases[indiceFrase];

        if (estaDeletando) {
            elementoTexto.textContent = fraseAtual.substring(0, indiceCaractere - 1);
            indiceCaractere--;
            velocidadeDigitacao = 50; // Mais rápido ao apagar
        } else {
            elementoTexto.textContent = fraseAtual.substring(0, indiceCaractere + 1);
            indiceCaractere++;
            velocidadeDigitacao = 100; // Velocidade normal de digitação
        }

        // Se terminou de digitar a frase inteira
        if (!estaDeletando && indiceCaractere === fraseAtual.length) {
            velocidadeDigitacao = 2000; // Pausa no final da frase
            estaDeletando = true;
        } 
        // Se terminou de apagar a frase
        else if (estaDeletando && indiceCaractere === 0) {
            estaDeletando = false;
            indiceFrase = (indiceFrase + 1) % frases.length; // Passa para a próxima frase
            velocidadeDigitacao = 500;
        }

        setTimeout(digitarEfeito, velocidadeDigitacao);
    }

    // Iniciar efeito de digitação
    if (elementoTexto) {
        digitarEfeito();
    }

    /* ==========================================================================
       4. BOTÃO FLUTUANTE "VOLTAR AO TOPO"
       ========================================================================== */
    const botaoTopo = document.getElementById('botao-topo');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            botaoTopo.classList.add('visivel');
        } else {
            botaoTopo.classList.remove('visivel');
        }
    });

    botaoTopo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==========================================================================
       5. ANIMAÇÃO DE ENTRADA AO ROLAR A PÁGINA (SCROLL REVEAL)
       ========================================================================== */
    const elementosParaAnimar = document.querySelectorAll('.animar-ao-rolar');

    const observadorScroll = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visivel');
            }
        });
    }, {
        threshold: 0.15 // Dispara a animação quando 15% do elemento estiver visível
    });

    elementosParaAnimar.forEach(elemento => {
        observadorScroll.observe(elemento);
    });

    /* ==========================================================================
       6. ANO DINÂMICO NO RODAPÉ
       ========================================================================== */
    const elementoAno = document.getElementById('ano-atual');
    if (elementoAno) {
        elementoAno.textContent = new Date().getFullYear();
    }
});