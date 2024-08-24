// background.js - Handles requests from the UI, runs the model, then sends back a response


import { pipeline, env } from '@xenova/transformers';

// Skip initial check for local models, since we are not loading any local models.
env.allowLocalModels = false; //a lot of problems with this enabled, so i guess no local models

// Due to a bug in onnxruntime-web, we must disable multithreading for now.
// See https://github.com/microsoft/onnxruntime/issues/14445 for more information.
env.backends.onnx.wasm.numThreads = 1;



class PipelineSingleton {
    static task_classify = 'text-classification';
    static task_zeroshot = 'zero-shot-classification';
    static model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
    static model2 = 'Xenova/mobilebert-uncased-mnli';
    static instance = null;
    static instance2 = null;

    static async getInstance() {
        if (this.instance === null) {
            this.instance = pipeline(this.task_classify, this.model);
        }
        return this.instance;  
    }

    static async getInstance2() {
        if (this.instance2 === null) {
            this.instance2 = pipeline(this.task_zeroshot, this.model2);
        }

        return this.instance2;  
    }


}

// Create generic classify function, which will be reused for the different types of events.
const classify = async (text) => {
    // Get the pipeline instance. This will load and build the model when run for the first time.
    let model = await PipelineSingleton.getInstance((data) => {

    });

    // Actually run the model on the input text
    let result = await model(text);

    return result;
};



const zeroshot = async (text) => {
    const { data } = await chrome.storage.local.get(['data']);
    let labels = data.map(item => item.label);


    
    let model = await PipelineSingleton.getInstance2((data) => {

    });

    let result = await model(text, labels);
    return result;

};


function getColorByLabel(labelInput, data) {


    let itemObject = data.find(item => item.label === labelInput);
    return itemObject ? itemObject.color : null;
  }
  //if checked true,  censor all, if checked false, censor only negative sentiment

function getCheckByLabel(labelInput, data) {

    let itemObject = data.find(item => item.label === labelInput);
    return itemObject ? itemObject.checked : null;
  }


  function getOptionByLabel(labelInput, data) {

    let itemObject = data.find(item => item.label === labelInput);
    return itemObject ? itemObject.option : null;
  }


async function processText(text) {


    if ((text.trim().split(/\s+/).filter(Boolean)).length > 3) {

        
    

        const zeroshotResult = await zeroshot(text);


        const { data } = await chrome.storage.local.get(['data']);
        console.log('data', data);


        if (getCheckByLabel(zeroshotResult['labels'][0], data) === false) {
            const sentimentResult = await classify(text);

            if (sentimentResult[0]['label'] === 'NEGATIVE') {
                if (getOptionByLabel(zeroshotResult['labels'][0], data) === 'redact') {
                    return 'censor';
                } else if (getOptionByLabel(zeroshotResult['labels'][0], data) === 'delete') {
                    return 'delete';
                } else if (getOptionByLabel(zeroshotResult['labels'][0], data) === 'color') {
                    return getColorByLabel(zeroshotResult['labels'][0], data);
                //return 'red';
                }else if (getOptionByLabel(zeroshotResult['labels'][0], data) === 'nothing') {
                    return 'nothing';
                }

            } else {
                return false; // No action for positive sentiment
            }

            
        } else if (getCheckByLabel(zeroshotResult['labels'][0], data) === true) {
            if (getOptionByLabel(zeroshotResult['labels'][0], data) === 'redact') {
                return 'censor';
            } else if (getOptionByLabel(zeroshotResult['labels'][0], data) === 'delete') {
                return 'delete';
            } else if (getOptionByLabel(zeroshotResult['labels'][0], data) === 'color') {
                return getColorByLabel(zeroshotResult['labels'][0], data);
            //return 'red';
            }else if (getOptionByLabel(zeroshotResult['labels'][0], data) === 'nothing') {
                return 'nothing';
            }
        } else {
            return false;
        }

    } else {
        return false;
    }
}

// Listener for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'classify') {
        processText(message.text).then(result => {
            sendResponse(result);
        });
    } 
    

    return true;
});


