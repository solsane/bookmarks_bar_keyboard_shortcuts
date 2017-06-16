
    chrome.extension.onRequest.addListener(handleRequest);

    function handleRequest(index, sender, sendResponse) {
      sendResponse(); // Close connection.

      withBookmarksBar(function(bookmarks_bar) {
        var item = bookmarks_bar.children[index-1];
        if (item && item.url) {
          chrome.tabs.update(sender.tab.id, {url: item.url});
        }
      });
    }


    function withBookmarksBar(callback) {
      chrome.bookmarks.getTree(function(array) {
        // Finding by order is currently guaranteed:
        // http://groups.google.com/group/chromium-extensions/browse_thread/thread/312986b5f27046ad/ac9b855f984a3b3d
        var bookmarks_bar = array[0].children[0];
        callback(bookmarks_bar);
      });
    }
