const nextQuoteButton = document.createElement("button");
const quoteLavel = document.createElement("blockquote");
const authorLabel = document.createElement("h3");

export const BreakingbadApp = async (element) => {
  document.querySelector("#app-title").innerHTML = "Breaking Bad App";
  element.innerHTML =  "loading..."
  const resp = await fetchQuote()
  
  renderQuote(resp, element )
  nextQuote( element )
  
  
};

const renderQuote = ( data, element  ) => {
  element.innerHTML = "Datos Cargados";
  authorLabel.innerHTML = data[0].author;
  quoteLavel.innerHTML = data[0].quote;
  nextQuoteButton.innerText = "Next Quote";
  element.replaceChildren( authorLabel, quoteLavel, nextQuoteButton)


};


const nextQuote =  ( element ) => {
  nextQuoteButton.addEventListener("click", async () => {
    element.innerHTML = "Loading..."
    const data = await fetchQuote();
    renderQuote( data, element );
  })
};

/**
* @returns {Promise<object[]>}
*/
const fetchQuote = async () => {
  const url = "https://api.breakingbadquotes.xyz/v1/quotes";
  const conecction = await fetch( url );
  const data = await conecction.json();
  return data;
};
