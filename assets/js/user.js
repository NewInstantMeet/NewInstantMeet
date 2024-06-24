// Função para validar e atualizar a data de nascimento
function validateBirthdate(newBirthdate) {
    // Atualiza diretamente a propriedade birthdate de currentUser
    currentUser.birthdate = newBirthdate;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Opcionalmente, atualiza o campo de formulário para exibir a nova data de nascimento
    profileForm.birthdate.value = newBirthdate;

    // Exemplo de feedback ou atualização de UI
    console.log('Data de nascimento atualizada com sucesso:', newBirthdate);
}

// Evento disparado quando o conteúdo da página foi carregado
document.addEventListener('DOMContentLoaded', () => {
    // Obtém o usuário atual do localStorage ou define um valor padrão
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {
        firstName: 'Usuário',
        lastName: '',
        birthdate: '',
        gender: '', // Inclui a propriedade para o sexo/gênero
        email: '',
        preferences: '',
        image: '',
        bgColor: '#ffffff',
        cardColor: '#ffffff',
        bgImage: ''
    };

    // Seleciona os elementos do DOM que serão manipulados
    const profileCard = document.getElementById('profileCard');
    const profileForm = document.getElementById('profileForm');
    const imageUpload = document.getElementById('imageUpload');
    const profileImage = document.getElementById('profileImage');
    const bgColorInput = document.getElementById('bgColor');
    const cardColorInput = document.getElementById('cardColor');
    const bgImageUpload = document.getElementById('bgImageUpload');
    const genderSelect = document.getElementById('gender'); // Elemento para seleção de sexo/gênero

    // Define o estilo inicial do cartão de perfil
    profileCard.style.backgroundColor = currentUser.cardColor;

    // Preenche os campos do formulário com os dados do usuário atual
    document.getElementById('userName').textContent = `${currentUser.firstName} ${currentUser.lastName}`;
    profileForm.name.value = `${currentUser.firstName} ${currentUser.lastName}`;
    profileForm.email.value = currentUser.email;
    profileForm.birthdate.value = currentUser.birthdate;
    profileForm.gender.value = currentUser.gender; // Preenche o campo de sexo/gênero
    profileForm.preferences.value = currentUser.preferences || '';
    bgColorInput.value = currentUser.bgColor;
    cardColorInput.value = currentUser.cardColor;

    // Se o usuário tiver uma imagem de perfil, exibe-a
    if (currentUser.image) {
        profileImage.src = currentUser.image;
    }

    // Se o usuário tiver uma imagem de plano de fundo, define-a no corpo da página
    if (currentUser.bgImage) {
        document.body.style.backgroundImage = `url(${currentUser.bgImage})`;
    } else {
        document.body.style.backgroundColor = currentUser.bgColor;
    }

    // Evento disparado ao enviar o formulário de perfil
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Extrai e atualiza os dados do formulário no objeto currentUser
        const [firstName, lastName] = profileForm.name.value.split(' ');
        currentUser.firstName = firstName;
        currentUser.lastName = lastName;
        currentUser.email = profileForm.email.value;
        currentUser.birthdate = profileForm.birthdate.value;
        currentUser.gender = profileForm.gender.value; // Atualiza o sexo/gênero
        currentUser.preferences = profileForm.preferences.value;
        currentUser.bgColor = bgColorInput.value;
        currentUser.cardColor = cardColorInput.value;

        // Salva as alterações no localStorage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        alert('Informações atualizadas com sucesso!');

        // Atualiza o estilo do cartão de perfil com a nova cor
        profileCard.style.backgroundColor = currentUser.cardColor;

        // Se não houver imagem de plano de fundo definida, atualiza a cor de fundo do corpo da página
        if (!currentUser.bgImage) {
            document.body.style.backgroundColor = currentUser.bgColor;
        }
    });

    // Evento disparado ao alterar o upload de imagem de perfil
    imageUpload.addEventListener('change', (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            currentUser.image = reader.result;
            profileImage.src = reader.result;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        };
        reader.readAsDataURL(e.target.files[0]);
    });

    // Evento disparado ao alterar o upload de imagem de plano de fundo
    bgImageUpload.addEventListener('change', (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            currentUser.bgImage = reader.result;
            document.body.style.backgroundImage = `url(${reader.result})`;
            document.body.style.backgroundColor = '';
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        };
        reader.readAsDataURL(e.target.files[0]);
    });

    // Evento disparado ao alterar a cor do cartão de perfil
    cardColorInput.addEventListener('input', () => {
        const color = cardColorInput.value;
        profileCard.style.backgroundColor = color;
    });

    // Evento disparado ao clicar no botão de logout
    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html'; // Redireciona para a página inicial
    });
});
