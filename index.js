document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded")
    let leftpartcontainer = document.getElementById("left-part-webcontainer")
    let leftpartembed = document.getElementById("left-part-embed")
    let maincontent = document.querySelector(".main-div")
    let leftparttitle = document.getElementById("right-part-title")
    
    let quotes_section = document.getElementById("quotes-section")

    leftpartcontainer.addEventListener("click", () => {
        const viewportHeight = window.innerHeight; 
        const minHeight = viewportHeight * 0.01 + 700;
        if (leftpartembed.classList == "open_embed") {
            leftparttitle.textContent = "˅"
            leftpartcontainer.style.height = "70px";
        } else {
            leftparttitle.textContent = "˄"
            leftpartcontainer.style.height = "700px";
            maincontent.style.minHeight =minHeight;
            
        }
        leftpartembed.classList.toggle("open_embed");
        leftpartembed.classList.toggle("closed_embed");
    });

    async function displayQuotes() {
        let quotes_request = fetch('/api/get-quotes/' ,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then(async (json) => {
            json.quotes_db.forEach(quote => {
            let new_quote_div = document.createElement("div");
            new_quote_div.classList.add("comment");

            let new_quote_text = document.createElement("h5");
            new_quote_text.classList.add("comment-content");
            new_quote_text.textContent = quote.content;

            let new_quote_author = document.createElement("h6");
            new_quote_author.classList.add("comment-username");
            new_quote_author.textContent = quote.author;

            new_quote_div.append(new_quote_text);
            new_quote_div.append(new_quote_author);
            quotes_section.append(new_quote_div)
        })})
    
    


}
    displayQuotes()

    function addOrRemoveShortcut() {
        const shortcutsContainer = document.querySelector(".shortcuts-container");
        const shortcutMaths = document.getElementById("shortcut-maths");

        if (window.innerWidth < 800) {
            if (!shortcutMaths) {
                const newShortcut = document.createElement("div");
                newShortcut.classList.add("shortcut");
                newShortcut.id = "shortcut-maths";
                newShortcut.innerHTML = `
                    <a href="https://mp2icamilleguerin.blogspot.com/" target="_blank">
                        <img src="/static/icons/math.png" alt="Mathématiques">
                        <h4>Mathématiques</h4>
                    </a>
                `;
                // Ajoute le nouveau raccourci en premier
                shortcutsContainer.insertAdjacentElement('afterbegin', newShortcut);
            }
        } else {
            if (shortcutMaths) {
                shortcutsContainer.removeChild(shortcutMaths);
            }
        }
    }

    addOrRemoveShortcut();

    const redirect_bar = document.getElementById("footer")
    redirect_bar.addEventListener("click",()=>{
        window.location.href = "https://lydre.onrender.com/"
    })

    window.addEventListener("resize", addOrRemoveShortcut);
});
