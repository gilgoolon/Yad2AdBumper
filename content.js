function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

waitForElm('[data-testid="bump-ad-action-button"]')
    .then((element) => {
        const targetDivs = document.querySelectorAll('[data-testid="bump-ad-action-button"]');

        if (targetDivs.length > 0) {
            targetDivs.forEach((div, index) => {
                console.log(`Clicking bump button ${index + 1}`);
                const button = div.querySelector("button");
                if (button) {
                    button.click();
                }
            });
            console.log(`Clicked ${targetDivs.length} bump button(s).`);

        } else {
            console.log("No bump buttons found.");
        }
    })
    .catch((error) => { });

