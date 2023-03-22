let btn = document.querySelector(".changeColorBtn");
let colorGrid = document.querySelector(".colorGrid");
let colorValue = document.querySelector(".colorValue");

//popup process
btn.addEventListener("click", async ()=>{
    chrome.storage.sync.get('color', ({color})=>{
        console.log('color', color);
    })
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true})
    
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: pickColor
    }, async(injectionResults)=>{
        const [data] = injectionResults
        if(data.result){
            const color = data.result.sRGBHex;
            colorGrid.style.backgroundColor = color;
            colorValue.innerText = color;
            try {
                await navigator.clipboard.writeText(color);
            } catch (error) {
                console.error(error);
            }
        }
    })



})  

//tab process
async function pickColor() {
    try {
        // Picker
        const eyeDropper = new EyeDropper();
        return await eyeDropper.open();
    } catch (err) {
        console.error(err);
    }
}