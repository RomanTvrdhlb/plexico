function initializeFileUpload(container) {
    if (!container) return;

    const fileInput = container.querySelector('input[type="file"]');
    const mainLink = container.querySelector('.main-link');
    const downloadBox = container.querySelector('.download__box');

    if (!fileInput || !mainLink || !downloadBox) return;

    fileInput.style.display = 'none';
    mainLink.addEventListener('click', (event) => {
        event.preventDefault();
        fileInput.click();
    });

    fileInput.addEventListener('change', (event) => handleFileUpload(event, container));

    downloadBox.addEventListener('dragover', (event) => {
        event.preventDefault();
        downloadBox.classList.add('drag-over');
    });

    downloadBox.addEventListener('dragleave', () => {
        downloadBox.classList.remove('drag-over');
    });

    downloadBox.addEventListener('drop', (event) => {
        event.preventDefault();
        downloadBox.classList.remove('drag-over');

        const file = event.dataTransfer.files[0];
        if (file) {
            handleFileUpload({ target: { files: [file] } }, container);
        }
    });
}

function handleFileUpload(event, container) {
    const file = event.target.files[0];
    if (!file) return;

    const fileElement = createFileElement(file, container);

    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        updateProgress(fileElement, progress);

        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 200);
}

function createFileElement(file, container) {
    const fileElement = document.createElement('div');
    fileElement.classList.add('file');

    const isImage = file.type.startsWith('image/');
    const fileSrc = isImage ? URL.createObjectURL(file) : './img/index/Frame.png';

    fileElement.innerHTML = `
        <img src="${fileSrc}" alt="file icon">
        <div class="file__box">
            <div class="file__name">${file.name}</div>
            <div class="file__progress">
                <div class="file__progress-bar">
                    <div class="file__progress-fill" style="width: 0%;"></div>
                </div>
                0%
            </div>
        </div>
        <div class="file__btns">
            <button class="file__btn file__btn--upload">
                <svg width='20' height='20'>
                    <use href='img/sprite/sprite.svg#upload'></use>
                </svg>
            </button>
            <button class="file__btn file__btn--close">
                <svg width='20' height='20'>
                    <use href='img/sprite/sprite.svg#close'></use>
                </svg>
            </button>
        </div>
    `;

    container.appendChild(fileElement);
    return fileElement;
}

function updateProgress(fileElement, progress) {
    const progressFill = fileElement.querySelector('.file__progress-fill');
    const progressText = fileElement.querySelector('.file__progress');
    if (progressFill) progressFill.style.width = `${progress}%`;
    if (progressText) {
        progressText.innerHTML = `
            <div class="file__progress-bar">
                <div class="file__progress-fill" style="width: ${progress}%;"></div>
            </div>
            ${progress}%
        `;
    }
}

document.querySelectorAll('.download').forEach(container => {
    initializeFileUpload(container);
});
