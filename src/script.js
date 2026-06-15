// src/script.js

// ============================================
// DADOS DA APLICAÇÃO
// ============================================

let tasks = {
    todo: [],
    progress: [],
    testing: [],
    fixing: [],
    done: []
};

let nextId = 1;

// ============================================
// INICIALIZAÇÃO
// ============================================

function init() {
    loadData();
    renderAllColumns();
    setupEventListeners();
}

// ============================================
// LOCAL STORAGE
// ============================================

function loadData() {
    const saved = localStorage.getItem('kanbanTasks');
    if (saved) {
        tasks = JSON.parse(saved);
        nextId = localStorage.getItem('nextId') ? parseInt(localStorage.getItem('nextId')) : 1;
    } else {
        loadExampleTasks();
    }
}

function loadExampleTasks() {
    tasks = {
        todo: [{ id: nextId++, title: "Revisar documentação", priority: "high" }],
        progress: [{ id: nextId++, title: "Desenvolver busca", priority: "medium" }],
        testing: [],
        fixing: [],
        done: [{ id: nextId++, title: "Testes unitários", priority: "low" }]
    };
}

function saveData() {
    localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
    localStorage.setItem('nextId', nextId);
}

// ============================================
// RENDERIZAÇÃO
// ============================================

function renderAllColumns() {
    renderColumn('todo');
    renderColumn('progress');
    renderColumn('testing');
    renderColumn('fixing');
    renderColumn('done');
}

function renderColumn(columnId) {
    const column = document.querySelector(`.kanban-column[data-column="${columnId}"]`);
    const cardsContainer = column.querySelector('.kanban-cards');
    
    cardsContainer.innerHTML = '';
    
    //mensagem caso a coluna esteja vazia
    if (tasks[columnId].length === 0) {
        cardsContainer.innerHTML = '<div class="empty-message">📭 No task yet</div>';
        return;
    }
    
    tasks[columnId].forEach(task => {
        cardsContainer.appendChild(createCardElement(task, columnId));
    });
}

function createCardElement(task, columnId) {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-id', task.id);
    card.setAttribute('draggable', 'true');
    
    const priorityClass = {
        high: 'badge-high',
        medium: 'badge-medium',
        low: 'badge-low'
    };
    
    const priorityText = {
        high: 'High',
        medium: 'Medium',
        low: 'Low'
    };
    
    //modelo de card a ser criado
    card.innerHTML = `
        <div class="badge ${priorityClass[task.priority]}">
            ${priorityText[task.priority]} Priority
        </div>
        <p class="card-title">${escapeHtml(task.title)}</p>
        <div class="card-infos">
            <div class="card-icons">
                <i class="fa-regular fa-comment"></i>
                <i class="fa-solid fa-paperclip"></i>
            </div>
        </div>
        <button class="btn-delete">
            <i class="fa-solid fa-trash"></i>
        </button>
    `;
    
    //evento de deletar
    card.querySelector('.btn-delete').addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTask(task.id, columnId);
    });
    
    //drag events
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);
    
    return card;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// CRUD OPERATIONS
// ============================================

//criando uma nova task
function addTask(columnId) {
    const title = prompt('New Task:');
    if (!title || !title.trim()) return;
    
    const priority = prompt('Priority (alta | media | baixa):', 'media').toLowerCase();
    let normalizedPriority = 'medium';
    
    if (priority === 'alta' || priority === 'high') normalizedPriority = 'high';
    else if (priority === 'baixa' || priority === 'low') normalizedPriority = 'low';
    else normalizedPriority = 'medium';
    
    const newTask = {
        id: nextId++,
        title: title.trim(),
        priority: normalizedPriority
    };
    
    tasks[columnId].push(newTask);
    saveData();
    renderColumn(columnId);
}

function deleteTask(taskId, columnId) {
    if (confirm('Remove this task?')) {
        tasks[columnId] = tasks[columnId].filter(task => task.id !== taskId);
        saveData();
        renderColumn(columnId);
    }
}

function moveTask(taskId, fromColumn, toColumn) {
    const taskIndex = tasks[fromColumn].findIndex(task => task.id === taskId);
    if (taskIndex === -1) return;
    
    const task = tasks[fromColumn][taskIndex];
    tasks[fromColumn].splice(taskIndex, 1);
    tasks[toColumn].push(task);
    
    saveData();
    renderAllColumns();
}

// ============================================
// DRAG AND DROP
// ============================================

let draggedTaskId = null;
let draggedFromColumn = null;

function handleDragStart(e) {
    draggedTaskId = parseInt(this.getAttribute('data-id'));
    
    //descobrindo de qual coluna veio
    const column = this.closest('.kanban-column');
    draggedFromColumn = column.getAttribute('data-column');
    
    this.style.opacity = '0.5';
    e.dataTransfer.setData('text/plain', draggedTaskId);
}

function handleDragEnd(e) {
    this.style.opacity = '';
    draggedTaskId = null;
    draggedFromColumn = null;
    
    //remover highlight de todas colunas
    document.querySelectorAll('.kanban-column').forEach(col => {
        col.classList.remove('drag-over');
    });
}

function handleDragOver(e) {
    e.preventDefault();
    const column = e.currentTarget;
    column.classList.add('drag-over');
}

function handleDragLeave(e) {
    const column = e.currentTarget;
    column.classList.remove('drag-over');
}

function handleDrop(e, toColumn) {
    e.preventDefault();
    
    const column = e.currentTarget;
    column.classList.remove('drag-over');
    
    if (!draggedTaskId || !draggedFromColumn) return;
    if (draggedFromColumn === toColumn) return;
    
    moveTask(draggedTaskId, draggedFromColumn, toColumn);
}

// ============================================
// EVENTOS
// ============================================

function setupEventListeners() {
    //botões de adicionar
    document.querySelectorAll('.btn-add').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const column = e.target.closest('.kanban-column');
            const columnId = column.getAttribute('data-column');
            addTask(columnId);
        });
    });
    
    //eventos de drag nas colunas
    document.querySelectorAll('.kanban-column').forEach(column => {
        column.addEventListener('dragover', handleDragOver);
        column.addEventListener('dragleave', handleDragLeave);
        
        const columnId = column.getAttribute('data-column');
        column.addEventListener('drop', (e) => handleDrop(e, columnId));
    });
}

// ============================================
// INICIAR
// ============================================

document.addEventListener('DOMContentLoaded', init);