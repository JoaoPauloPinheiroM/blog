document.addEventListener('DOMContentLoaded', () => {
    const CONTACT_EMAIL = 'joaopinheiromourao@gmail.com';

    // Alternar tema claro/escuro
    const btnTheme = document.getElementById('btn-theme');
    const body = document.body;

    // carrega o tema salvo no localStorage (se houver) -> manipulação do Local Storage aprendi fora da academia. 
    // no projeto academico e todo-list e angular
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        btnTheme.textContent = 'Tema Claro';
     }

    btnTheme.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        btnTheme.textContent = isDark ? 'Tema Claro' : 'Tema Escuro';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    /*
    * VALIDAÇÃO DE FORMULÁRIO E MODAL DE SUCESSO
    * onde eu manipulei o DOM diretamente para validar os campos.
    */
    const form = document.getElementById('contact-form');
    const modal = document.getElementById('modal-overlay');
    const closeBtn = document.getElementById('close-modal');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome');
        const email = document.getElementById('email');
        const mensagem = document.getElementById('mensagem');

        let valido = true;

        // Validar nome
        if (nome.value.trim() === '') {
            document.getElementById('err-nome').style.display = 'block';
            valido = false;
        } else {
            document.getElementById('err-nome').style.display = 'none';
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            document.getElementById('err-email').style.display = 'block';
            valido = false;
        } else {
            document.getElementById('err-email').style.display = 'none';
        }

        // Validar mensagem
        if (mensagem.value.trim() === '') {
            document.getElementById('err-msg').style.display = 'block';
            valido = false;
        } else {
            document.getElementById('err-msg').style.display = 'none';
        }

        // Se valido, enviar email para o meu email real usando o FormSubmit.co (serviço gratuito de envio de formulários por email)
        // irei usar o projeto para manter como contato real.
        //aprendi sobre o FormSubmit fora da academia.
        if (valido) {
            try {
                const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: nome.value.trim(),
                        email: email.value.trim(),
                        message: mensagem.value.trim(),
                        _subject: 'Novo contato do portfólio',
                        _captcha: 'false'
                    })
                });

                if (!response.ok) {
                    throw new Error('Falha no envio');
                }

                form.reset();
                modal.style.display = 'flex';
            } catch (error) {
                alert('Nao foi possivel enviar agora. Tente novamente em instantes.');
                console.error('Erro ao enviar email:', error);
            }
        }
    });

    // Fechar modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});