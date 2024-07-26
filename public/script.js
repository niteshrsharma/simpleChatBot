const loader = document.querySelector(".loader");
const answerBox = document.querySelector(".answer");
function scrollToBottom() {
    answerBox.scrollTop = answerBox.scrollHeight;
}

window.onload=scrollToBottom;
async function sendMessage() {
    const para = document.createElement("p");
    const paraAi = document.createElement("p");

    // Show the loader
    loader.style.display = "block";

    const inputBox = document.querySelector(".prompt");
    let inputString=inputBox.value;
    if(inputString==""){
        alert("prompt can't be blank")
        loader.style.display = "none";
        return;
    }
    para.className="user";
    para.innerHTML = inputString;
    inputBox.value=""
    answerBox.append(para);
    try {
        scrollToBottom();
        const response = await axios.post('http://localhost:3000/chat', { prompt: inputString });
        let answer = response.data.result;
        answer = JSON.parse(answer.split('"parts": [')[1].split(`"role": "model"`)[0].split('],')[0]);
        answer = answer.text;
        paraAi.innerHTML = answer;
        paraAi.className="ai"
        answerBox.append(paraAi);
        scrollToBottom();
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Hide the loader
        loader.style.display = "none";
    }
}

document.addEventListener("keydown", (e)=>{
    if(e.key=="Enter"){
        sendMessage();
    }
})