//  The above code is only for the pop up page of the extension.

const btn = document.querySelector('.changeColorBtn');

const colorGrid = document.querySelector('.colorGrid');

const colorValue = document.querySelector('.colorValue');

btn.addEventListener('click', async () => {
    
    // To get the information of the current tabs by clling the api's.
    
    chrome.storage.sync.get('color', ({color})=> {
        
        console.log('color: ', color);
    })

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});

    // calling a method which contains the object in which the script will be injected in the current tab.

    chrome.scripting.executeScript({

        target: { tabId: tab.id },

        function: pickColor,
        
    }, async(injectionResults) => {    // Result from the pick color function will be uploaded here.
        
        // console.log(injectionResults);

        // In injectionResults the result object must be containing the hex value of the selected color.

        const [data] = injectionResults;

        if(data.result) {

            const color = data.result.sRGBHex;

            // We want to display the color down the button.
             
            colorGrid.style.backgroundColor = color;

            colorValue.innerText = color;

            // Using the navigator api from the browser (Just copying the hex value of the color to the clipboard.)

            // Applying try and catch as the error may occur

            try{

                await navigator.clipboard.writeText(color);

            }

            catch(err) {

                console.error(err);
            }


        }
    })
});


// The above code is for the current webpage on which the extension is applied.

async function pickColor() {

   // console.log('Script Working');

   // For picking up the color

   try {
      
    // Activating the Picker.

    // We get the native api's of the eye dropper in the browser

    const eyeDropper = new EyeDropper();

    // Eye Dropper is an open source api which can be used to fetch colors from the screen.

    // Activating the eye Dropper

     return await eyeDropper.open();   // It will return the selected color.

    // console.log(selectedColor);

   }
   catch(err){
       
       console.error(err);

   }
}