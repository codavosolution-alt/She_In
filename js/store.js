(function () {
  "use strict";
  window.ELORA = window.ELORA || {};
  var keys = {
    cart: "elora_cart",
    wishlist: "elora_wishlist",
    recently: "elora_recently_viewed",
    auth: "elora_auth",
    searches: "elora_recent_searches",
    orders: "elora_orders",
    lastOrder: "elora_last_order",
    chatHistory: "elora_chat_history",
    chatState: "elora_chat_state",
    chatPreferences: "elora_chat_preferences",
    chatUnread: "elora_chat_unread",
    contactRequests: "elora_contact_requests"
  };
  function read(key, fallback) { try { var value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch (e) { return fallback; } }
  function write(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch (e) { return false; } }
  var state = {
    cart: read(keys.cart, []),
    wishlist: read(keys.wishlist, []),
    recently: read(keys.recently, []),
    auth: read(keys.auth, { loggedIn: false }),
    searches: read(keys.searches, []),
    orders: read(keys.orders, []),
    lastOrder: read(keys.lastOrder, null),
    chatHistory: read(keys.chatHistory, []),
    chatState: read(keys.chatState, { mode:"idle", step:"", answers:{}, lastProductIds:[], resultOffset:0, updatedAt:"" }),
    chatPreferences: read(keys.chatPreferences, { minimized:false, language:"" }),
    chatUnread: read(keys.chatUnread, 0),
    contactRequests: read(keys.contactRequests, []),
    promo: null
  };
  function emit() { document.dispatchEvent(new CustomEvent("elora:store", { detail: state })); }
  function save(part) { if (keys[part]) write(keys[part], state[part]); emit(); }
  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function isSpecial(item) { return item && item.type === "shein_request"; }
  window.ELORA.store = {
    state: state,
    getLanguage: function () { try { var lang=localStorage.getItem("elora_language"); return lang === "ar" || lang === "en" ? lang : null; } catch (e) { return null; } },
    setLanguage: function (lang) { try { localStorage.setItem("elora_language", lang === "ar" ? "ar" : "en"); return true; } catch (e) { return false; } },
    getProduct: function (id) { return window.ELORA_DATA.products.find(function (p) { return p.id === Number(id); }); },
    addToCart: function (id, quantity, size, color) {
      var existing = state.cart.find(function (item) { return !isSpecial(item) && item.id === Number(id) && item.size === (size || "M") && item.color === (color || ""); });
      if (existing) existing.quantity += quantity || 1; else state.cart.push({ id: Number(id), type: "product", quantity: quantity || 1, size: size || "M", color: color || "" });
      save("cart");
    },
    addSpecialRequest: function (request) {
      var item = Object.assign({
        id: "special-request-" + Date.now(), type: "shein_request", source: "SHEIN", productUrl: "", productName: "", image: "", color: "", size: "", sheinSizeText: "", quantity: 1, displayedPrice: null, displayedCurrency: "EGP", notes: "", reviewStatus: "pending_review", finalPrice: null, availability: "pending", createdAt: new Date().toISOString()
      }, request || {});
      state.cart.push(item); save("cart"); return item;
    },
    getCartItem: function (id) { return state.cart.find(function (item) { return String(item.id) === String(id); }); },
    updateSpecialRequest: function (id, patch) { var item=this.getCartItem(id); if (!isSpecial(item)) return null; Object.keys(patch || {}).forEach(function (key) { if (key !== "id" && key !== "type" && key !== "source") item[key]=patch[key]; }); save("cart"); return item; },
    removeFromCart: function (index) { state.cart.splice(Number(index), 1); save("cart"); },
    removeCartItemById: function (id) { var index=state.cart.findIndex(function(item){return String(item.id)===String(id);}); if(index>-1){state.cart.splice(index,1);save("cart");} },
    changeQuantity: function (index, delta) { var item = state.cart[Number(index)]; if (!item) return; item.quantity = Math.max(1, item.quantity + Number(delta)); save("cart"); },
    changeSize: function (index, size) { index=Number(index);var item=state.cart[index],product=item&&!isSpecial(item)?this.getProduct(item.id):null;if(!item||!product||product.sizes.indexOf(size)===-1)return false;var existingIndex=state.cart.findIndex(function(other,i){return i!==index&&!isSpecial(other)&&other.id===item.id&&other.size===size&&other.color===item.color;});if(existingIndex>-1){state.cart[existingIndex].quantity+=Number(item.quantity||1);state.cart.splice(index,1);}else item.size=size;save("cart");return true; },
    cartCount: function () { return state.cart.reduce(function (sum, item) { return sum + Number(item.quantity || 1); }, 0); },
    normalCartItems: function () { return state.cart.filter(function(item){return !isSpecial(item);}); },
    specialCartItems: function () { return state.cart.filter(isSpecial); },
    cartSubtotal: function () { var self = this; return state.cart.reduce(function (sum, item) { if(isSpecial(item)) return sum; var product = self.getProduct(item.id); return sum + (product ? product.price * item.quantity : 0); }, 0); },
    toggleWishlist: function (id) { id = Number(id); var i = state.wishlist.indexOf(id); if (i > -1) state.wishlist.splice(i, 1); else state.wishlist.push(id); save("wishlist"); return i === -1; },
    isWishlisted: function (id) { return state.wishlist.indexOf(Number(id)) > -1; },
    addRecently: function (id) { id = Number(id); state.recently = [id].concat(state.recently.filter(function (x) { return x !== id; })).slice(0, 8); save("recently"); },
    addSearch: function (query) { query = String(query || "").trim(); if (!query) return; state.searches = [query].concat(state.searches.filter(function (x) { return x.toLowerCase() !== query.toLowerCase(); })).slice(0, 6); save("searches"); },
    clearSearches: function () { state.searches = []; save("searches"); },
    setAuth: function (loggedIn) { state.auth = { loggedIn: !!loggedIn }; save("auth"); },
    setPromo: function (code) { state.promo = code === "ELORA10" ? "ELORA10" : null; emit(); },
    setChatHistory: function (messages) { state.chatHistory=(Array.isArray(messages)?clone(messages):[]).slice(-100);save("chatHistory");return state.chatHistory; },
    setChatState: function (next) { state.chatState=Object.assign({ mode:"idle",step:"",answers:{},lastProductIds:[],resultOffset:0,updatedAt:"" },clone(next||{}),{updatedAt:new Date().toISOString()});save("chatState");return state.chatState; },
    setChatPreferences: function (next) { state.chatPreferences=Object.assign({},state.chatPreferences||{},clone(next||{}));save("chatPreferences");return state.chatPreferences; },
    setChatUnread: function (count) { state.chatUnread=Math.max(0,Math.min(99,Number(count)||0));save("chatUnread");return state.chatUnread; },
    addContactRequest: function (request) { var item=Object.assign({id:"contact-"+Date.now(),createdAt:new Date().toISOString(),status:"local_demo"},clone(request||{}));state.contactRequests=[item].concat(state.contactRequests||[]).slice(0,50);save("contactRequests");return item; },
    clearChat: function () { state.chatHistory=[];state.chatState={mode:"idle",step:"",answers:{},lastProductIds:[],resultOffset:0,updatedAt:new Date().toISOString()};state.chatUnread=0;write(keys.chatHistory,state.chatHistory);write(keys.chatState,state.chatState);write(keys.chatUnread,state.chatUnread);emit(); },
    submitOrder: function (customer) {
      if (!state.cart.length) return null;
      var suffix=String(Date.now()).slice(-6), specials=this.specialCartItems(), order={
        id:"EL-"+suffix, date:new Date().toISOString(), status:"pending_review", customer:clone(customer || {}), items:clone(this.normalCartItems()), specialRequests:clone(specials), subtotal:this.cartSubtotal(), createdAt:new Date().toISOString(), isDemo:true
      };
      state.orders.unshift(order); state.lastOrder=order; write(keys.orders,state.orders); write(keys.lastOrder,state.lastOrder); state.cart=[]; save("cart"); return order;
    },
    getOrder: function (id) { return state.orders.find(function(order){return String(order.id)===String(id);}) || (state.lastOrder && String(state.lastOrder.id)===String(id) ? state.lastOrder : null); },
    getSpecialRequests: function () { var requests=[]; state.orders.forEach(function(order){(order.specialRequests||[]).forEach(function(item){requests.push(Object.assign({orderId:order.id,orderDate:order.date},item));});}); return requests; },
    getSubmittedSpecialRequest: function (id) { return this.getSpecialRequests().find(function(item){return String(item.id)===String(id);}); },
    cancelSubmittedSpecialRequest: function (id) { var changed=false; state.orders.forEach(function(order){(order.specialRequests||[]).forEach(function(item){if(String(item.id)===String(id) && ["pending_review","reviewing","awaiting_customer_confirmation"].indexOf(item.reviewStatus)>-1){item.reviewStatus="cancelled";changed=true;}});}); if(changed){write(keys.orders,state.orders);if(state.lastOrder){var match=state.orders.find(function(o){return o.id===state.lastOrder.id;});if(match){state.lastOrder=clone(match);write(keys.lastOrder,state.lastOrder);}}emit();} return changed; },
    clearCart: function () { state.cart = []; save("cart"); }
  };
})();
