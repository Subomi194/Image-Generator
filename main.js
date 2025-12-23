document.addEventListener('DOMContentLoaded', function () {
    const inputSpace = document.getElementById('prompt');
    const controlInput = document.getElementById('count');
    const generateBtn = document.getElementById('generateBtn');
    const resultsDiv = document.getElementById('results');

    let isGenerating = false;

    generateBtn.addEventListener('click', generateImages);


    function generateImages() {
    const prompt  = inputSpace.value.trim();
    const imageCount = Number(controlInput.value);

    if (!prompt) {
        alert('Please enter a prompt', 'error');
        return;
    }

    if (isGenerating)  return;

    isGenerating = true;
    generateBtn.disabled = true;
    generateBtn.textContent = 'Generating...';
    
    setTimeout(() => {
            renderMockImages(imageCount);
            resetUI();
    },   1500);

    console.log("Prompt:", prompt);

    }

    function renderMockImages(count) {

        resultsDiv.innerHTML = "";
        console.log("renderMockImages called with:", count);

        for (let i = 0; i < count; i++) {
            console.log("Creating image", i);
            const img = document.createElement('img');
            img.src = `https://picsum.photos/200/300?random=${i}`;
            img.className = 'generated-image';
            resultsDiv.appendChild(img);
        }
    }

    function resetUI() {
        isGenerating = false;
        generateBtn.disabled = false;
        generateBtn.textContent = 'Generate';
    }

    async function generateImagesFromAPI(prompt, count) {
        const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, count }),
        });
    
        return response.json();
    }
    
        
        


});