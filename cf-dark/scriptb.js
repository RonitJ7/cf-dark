function updateMathJaxElements() {
    console.log("Dark mode activated!");
    const mjaxes = document.getElementsByClassName("MathJax");
    for (let i = 0; i < mjaxes.length; i++) {
        mjaxes[i].setAttribute('style', 'color:white !important');
    }
}

// Example usage:
updateMathJaxElements();