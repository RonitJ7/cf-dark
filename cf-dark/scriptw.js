function updateMathJaxElements() {
    console.log("Light mode activated!");
    const mjaxes = document.getElementsByClassName("MathJax");
    for (let i = 0; i < mjaxes.length; i++) {
        mjaxes[i].setAttribute('style', 'color:black !important');
    }
}

updateMathJaxElements();