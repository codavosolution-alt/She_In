(function () {
  "use strict";
  window.ELORA = window.ELORA || {};
  function parse() {
    var raw = (location.hash || "#/home").slice(1), parts = raw.split("?"), path = parts[0] || "/home", params = {};
    (parts[1] || "").split("&").forEach(function (pair) { if (!pair) return; var bits=pair.split("="); params[decodeURIComponent(bits[0])] = decodeURIComponent(bits[1] || ""); });
    return { path:path, params:params };
  }
  function resolve(route) {
    var V=window.ELORA.Views, path=route.path, match;
    if(path==="/"||path==="/home") return V.home();
    if(path==="/shop"||path==="/product-listing") return V.shop(route.params);
    if((match=path.match(/^\/product\/(\d+)$/))) return V.product(match[1]);
    if(path==="/search"||path==="/smart-search") return V.search();
    if(path==="/request-from-shein") return V.sheinRequest(route.params);
    if((match=path.match(/^\/shein-request\/(.+)$/))) return V.sheinRequestDetails(decodeURIComponent(match[1]));
    if(path==="/wishlist") return V.wishlist();
    if(path==="/cart") return V.cart();
    if(path==="/checkout") return V.checkout();
    if(path==="/login") return V.auth("login");
    if(path==="/register") return V.auth("register");
    if(path==="/otp") return V.otp();
    if(path==="/forgot-password") return V.auth("forgot");
    if(path==="/reset-password") return V.auth("reset");
    if(path==="/reset-success") return V.state("reset-success");
    if(path==="/login-error") return V.state("login-error");
    if(path==="/otp-invalid") return V.state("otp-invalid");
    if(path==="/otp-expired") return V.state("otp-expired");
    if(path==="/account") return V.account();
    if(path==="/addresses") return V.addresses(false);
    if(path==="/addresses/new") return V.addressForm();
    if(path==="/addresses/empty") return V.addresses(true);
    if(path==="/order-confirmation") return V.confirmation();
    if(path==="/orders") return V.orders(false);
    if(path==="/orders/empty") return V.orders(true);
    if(path==="/orders/delivered") return V.tracking("delivered");
    if(path==="/orders/cancelled") return V.tracking("cancelled");
    if(path==="/orders/delayed") return V.tracking("delayed");
    if(path==="/tracking"||path==="/orders/tracking") return V.tracking(null,route.params);
    if(path==="/returns") return V.returns();
    if(path==="/returns/request") return V.returnForm();
    if(path==="/returns/submitted") return V.state("returns-submitted");
    if(path==="/returns/empty") return V.state("returns-empty");
    if(path==="/returns/accepted") return V.state("returns-accepted");
    if(path==="/returns/rejected") return V.state("returns-rejected");
    if(path==="/returns/refund") return V.state("returns-refund");
    if(path==="/loading") return V.state("loading");
    if(path==="/empty") return V.state("empty");
    if(path==="/offline") return V.state("offline");
    if(path==="/success") return V.state("success");
    if(path==="/error") return V.state("error");
    return V.state("404");
  }
  var rendering=false;
  function render() {
    if(rendering) return;
    rendering=true;
    var app=document.getElementById("app"), route=parse(), next=function(){
      app.innerHTML=window.ELORA.Components.shell(resolve(route));
      window.scrollTo(0,0);
      window.ELORA.App.bindPage();
      window.ELORA.Animations.enter();
      rendering=false;
    };
    if(app.innerHTML && window.ELORA.Animations) window.ELORA.Animations.exit(next); else next();
  }
  window.ELORA.Router={init:function(){window.addEventListener("hashchange",render);render();},render:render,parse:parse,navigate:function(path){location.hash=path.charAt(0)==="#"?path:"#"+path;}};
})();
