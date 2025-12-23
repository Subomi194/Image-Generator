document.addEventListener('DOMContentLoaded', function () {
    const inputSpace = document.getElementById('prompt');
    const controlInput = document.getElementById('count');
    const generateBtn = document.getElementById('generateBtn');
    const resultsDiv = document.getElementById('results');

    let isGenerating = false;

    generateBtn.addEventListener('click', generateImages);


    async function generateImages() {
        const prompt  = inputSpace.value.trim();
        const count = Number(controlInput.value);

        if (!prompt) {
            alert('Please enter a prompt', 'error');
            return;
        }

        if (isGenerating)  return;

        isGenerating = true;
        generateBtn.disabled = true;
        generateBtn.textContent = 'Generating...';
        
        try {
            const response = await fetch("/api/generate_image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt, count }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate images");
            }

            
            const data = await response.json();
            console.log("API response:", data); 

            if (!data.data || !Array.isArray(data.data)) {
                throw new Error("No images returned from API");
              }
              
            renderImages(data.data);
            console.log("Prompt:", prompt);
            
        }catch (error) {
            console.error("Error generating images:", error);
            alert("Error generating images. Please try again later.");
        } finally {
            resetUI(); 
        }
    }

    function renderImages(images) {

        resultsDiv.innerHTML = "";

        images.forEach((img) => {
            const imgElement = document.createElement("img");
            imgElement.src = img.url;
            imgElement.alt = "Generated Image";
            imgElement.className = "generated-image";
            resultsDiv.appendChild(imgElement);
        });
    }

    function resetUI() {
        isGenerating = false;
        generateBtn.disabled = false;
        generateBtn.textContent = 'Generate';
    }

    

});