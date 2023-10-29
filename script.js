function addTaskToList(task) {
    const tabela = document.querySelector('.tabela tbody');
    const newRow = tabela.insertRow(-1);
    const dataCell = newRow.insertCell(0);
    const periodoCell = newRow.insertCell(1);
    const glicoseCell = newRow.insertCell(2);

    dataCell.textContent = task.data;
    periodoCell.textContent = task.periodo;
    glicoseCell.textContent = task.glicose;
}

document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById("formulario");
    const tabela = document.querySelector('.tabela tbody');
    // Carregue os dados da tabela do localStorage, se houver algum.
    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
    }

    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        const glicose = document.getElementById("glicose");
        const select = document.getElementById("periodo");

        const valorGlicose = glicose.value;
        const periodo = select.value;

        if (valorGlicose && periodo) {
            const dataAtual = new Date();
            const dia = dataAtual.getDate();
            const mes = dataAtual.getMonth() + 1;
            const ano = dataAtual.getFullYear();
            const dataFormatada = `${dia}/${mes}/${ano}`;

            const newRow = tabela.insertRow(-1);
            const dataCell = newRow.insertCell(0);
            const periodoCell = newRow.insertCell(1);
            const glicoseCell = newRow.insertCell(2);

            dataCell.textContent = dataFormatada;
            periodoCell.textContent = periodo;
            glicoseCell.textContent = valorGlicose;

            glicose.value = "";
            select.value = "manha";

            // Crie um objeto que represente a linha da tabela
            const rowData = {
                data: dataFormatada,
                periodo: periodo,
                glicose: valorGlicose
            };

            // Adicione o objeto ao array de dados
            savedTasks.push(rowData);

            // Converta o array de dados em formato JSON e salve no localStorage
            saveTasksToLocalStorage();
        }
    });

    savedTasks.forEach(function (task) {
        addTaskToList(task);
    });
});

// Mova a definição do botão e da função resetTasks para fora do escopo do evento 'DOMContentLoaded'
const resetButton = document.querySelector('#resetButton');

function resetTasks() {
    const tabela = document.querySelector('.tabela tbody');
    tabela.innerHTML = '';
    savedTasks = [];
    saveTasksToLocalStorage();
}

resetButton.addEventListener('click', resetTasks);
