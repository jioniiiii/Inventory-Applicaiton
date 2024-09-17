function openDeleteModal(id) {
    const modal = document.getElementById(`deleteModal_${id}`);
    modal.classList.add('show');
    
}

function closeDeleteModal(id) {
    const modal = document.getElementById(`deleteModal_${id}`);
    modal.classList.remove('show');
}

function openEditModal(id) {
    const modal = document.getElementById(`editModal_${id}`);
    modal.classList.add('show');

    modal.addEventListener('submit', function () {
        modal.classList.remove('show');
    });
}

function closeEditModal(id) {
    const modal = document.getElementById(`editModal_${id}`);
    modal.classList.remove('show');
}

document.getElementById('toggleFormBtn').addEventListener('click', function() {
    const modal = document.getElementById('formModal');
    modal.classList.toggle('show');

    modal.addEventListener('submit', function () {
        modal.classList.remove('show');
    });
});

function closeForm() {
    const modal = document.getElementById('formModal');
    modal.classList.remove('show');
}

window.addEventListener('unload', function () {
    modal.classList.remove('show');
});