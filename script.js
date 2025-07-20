const newtask = document.getElementById('newtask');
const button = document.getElementById('add');
const list = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');
const allCount = document.getElementById('all-count');
const activeCount = document.getElementById('active-count');
const completedCount = document.getElementById('completed-count');

button.addEventListener('click', function() {
    if (!newtask.value.trim()) return;

    const row = document.createElement('div');
    row.classList.add('flex', 'items-center', 'justify-between', 'bg-gray-100', 'p-2', 'rounded', 'mb-2');

    const task = document.createElement('p');
    task.textContent = newtask.value.trim();
    task.classList.add('flex', 'items-center', 'gap-2');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const remove = document.createElement('button');
    const icon = document.createElement('i');
    icon.classList.add('fa-regular', 'fa-trash-can');
    icon.style.color = '#fc0303';
    remove.appendChild(icon);

    remove.addEventListener('click', function() {
        // Update counters before removal
        if (checkbox.checked) {
            completedCount.textContent = parseInt(completedCount.textContent) - 1;
        } else {
            activeCount.textContent = parseInt(activeCount.textContent) - 1;
        }
        allCount.textContent = parseInt(allCount.textContent) - 1;
        
        row.remove();
        checkEmptyState();
    });

    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            activeCount.textContent = parseInt(activeCount.textContent) - 1;
            completedCount.textContent = parseInt(completedCount.textContent) + 1;
            task.classList.add('line-through', 'text-gray-500');
        } else {
            activeCount.textContent = parseInt(activeCount.textContent) + 1;
            completedCount.textContent = parseInt(completedCount.textContent) - 1;
            task.classList.remove('line-through', 'text-gray-500');
        }
    });

    task.prepend(checkbox);
    row.appendChild(task);
    row.appendChild(remove);
    list.appendChild(row);

    // Update counters for new task
    allCount.textContent = parseInt(allCount.textContent) + 1;
    activeCount.textContent = parseInt(activeCount.textContent) + 1;
    
    newtask.value = '';
    checkEmptyState();
});

function checkEmptyState() {
    if (parseInt(allCount.textContent) === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }
}

// Initialize
allCount.textContent = '0';
activeCount.textContent = '0';
completedCount.textContent = '0';
checkEmptyState();


