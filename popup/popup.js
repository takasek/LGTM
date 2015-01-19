var Page = function(){
};

Page.prototype.load = function(){
  var context = this;
  var tabId   = 0;
  chrome.tabs.query({"active": true}, function(tab){
    tabId = tab[0].id;
  });
  $(".loading").show();
  $(".image").hide().each(function(){
    var image = $(this);
    $.getJSON("http://www.lgtm.in/g?" + Math.random(), function (data) {
      image.attr("src", data.imageUrl);
      var launch = function(postfix) {
        var str = "![LGTM](" + image.attr("src") + ")" + postfix;
        chrome.tabs.sendMessage(tabId, {image: str}, function(response){
        });

        $(".message").show(500);
        setTimeout(function() { $(".message").hide(500) }, 1000);

        var clipboard = $("<textarea/>");
        $("body").append(clipboard);
        clipboard.val(str).select();
        document.execCommand('copy');
        clipboard.remove();
      };
      image.unbind().click(function(){
        launch("");
      });
      });
      image.show().prev().hide();
    });
  });
};

$(document).ready(function(){
  var page = new Page();
  $("#reload").click(function(){
    page.load();
  });
  page.load();
});
