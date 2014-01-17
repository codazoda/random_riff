chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
          id: "appEngineSampleID",
    bounds: {
      width: 320,
      height: 450
    }
  });
});