// chrome.runtime.onInstalled.addListener(() => {
//     chrome.action.setBadgeText({
//       text: "OFF",
//     });
//   });

  //console.log("This is the log from background worker");
  let x =0;
  const codeforces = "http://codeforces.com";
  const sforces = "https://codeforces.com";
  //console.log("below the constants");
  chrome.storage.local.get('activated',function(data){
  chrome.action.onClicked.addListener(async (tab) => {
    // console.log("The click part works");
    if (tab.url.startsWith(codeforces) || tab.url.startsWith(sforces)) {
      //alert("inside the if");
      const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
      const nextState = prevState === 'ON' ? 'OFF' : 'ON'

      await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState,
      });
      
      let isActive = data.activated || false;
      // console.log("current state: ",isActive);
      if(nextState=== "ON"){
        chrome.storage.local.set({activated: true});
        // console.log("Set storage to true");
        isActive = data.activated || false;
        // console.log("current state: ",isActive);
        await chrome.scripting.insertCSS({
            files: ["class.css"],
            target: {tabId: tab.id},
        });
        await chrome.scripting.executeScript({
            files: ["scriptb.js"],
            target: {tabId: tab.id},
        });
      }else if(nextState === "OFF"){
        chrome.storage.local.set({activated: false});
        // console.log("Set storage to false");
        isActive = data.activated || false;
        // console.log("current state: ",isActive);
        await chrome.scripting.removeCSS({
            files: ["class.css"],
            target: {tabId: tab.id},
        });
        await chrome.scripting.executeScript({
          files: ["scriptw.js"],
          target: {tabId: tab.id},
      });
      }
      
    }
  });
});
   
  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab)=>{
    // console.log("1st if");
    if(changeInfo.status === 'complete'){
      if (!tab || !tab.url) {
        // console.log("Tab or tab.url is undefined. TabId: ",tabId);
        return;
    }
      chrome.storage.local.get('activated',function(data){
        let isActive = data.activated || false;
        const isSite = (tab.url.startsWith(codeforces) || tab.url.startsWith(sforces));
        if(isSite){
      isActive = data.activated || false;
      // console.log("current state: ",isActive);
          // console.log("3rd if");
        if(isActive){
          // console.log("4th if");
        chrome.scripting.insertCSS({
          files: ["class.css"],
          target: {tabId: tabId},
      });
        chrome.scripting.executeScript({
          files: ["scriptb.js"],
          target: {tabId: tabId},
      });
    }
  }
      });
    }
  });
//  console.log("on clicked listener doesnt work");

 