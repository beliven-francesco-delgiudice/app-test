(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21da73"],{d1e5:function(i,n,t){"use strict";t.r(n),t.d(n,"ion_infinite_scroll",(function(){return c})),t.d(n,"ion_infinite_scroll_content",(function(){return f}));var e=t("9ab4"),o=t("3414"),r=t("a091"),s=t("2196"),l="ion-infinite-scroll{display:none;width:100%}.infinite-scroll-enabled{display:block}",c=function(){function i(i){var n=this;Object(o["o"])(this,i),this.ionInfinite=Object(o["g"])(this,"ionInfinite",7),this.thrPx=0,this.thrPc=0,this.didFire=!1,this.isBusy=!1,this.isLoading=!1,this.threshold="15%",this.disabled=!1,this.position="bottom",this.onScroll=function(){var i=n.scrollEl;if(!i||!n.canStart())return 1;var t=n.el.offsetHeight;if(0===t)return 2;var e=i.scrollTop,o=i.scrollHeight,r=i.offsetHeight,s=0!==n.thrPc?r*n.thrPc:n.thrPx,l="bottom"===n.position?o-t-e-s-r:e-t-s;if(l<0){if(!n.didFire)return n.isLoading=!0,n.didFire=!0,n.ionInfinite.emit(),3}else n.didFire=!1;return 4}}return i.prototype.thresholdChanged=function(){var i=this.threshold;i.lastIndexOf("%")>-1?(this.thrPx=0,this.thrPc=parseFloat(i)/100):(this.thrPx=parseFloat(i),this.thrPc=0)},i.prototype.disabledChanged=function(){var i=this.disabled;i&&(this.isLoading=!1,this.isBusy=!1),this.enableScrollEvents(!i)},i.prototype.connectedCallback=function(){return Object(e["a"])(this,void 0,void 0,(function(){var i,n,t=this;return Object(e["c"])(this,(function(e){switch(e.label){case 0:return i=this.el.closest("ion-content"),i?(n=this,[4,i.getScrollElement()]):(console.error("<ion-infinite-scroll> must be used inside an <ion-content>"),[2]);case 1:return n.scrollEl=e.sent(),this.thresholdChanged(),this.disabledChanged(),"top"===this.position&&Object(o["f"])((function(){t.scrollEl&&(t.scrollEl.scrollTop=t.scrollEl.scrollHeight-t.scrollEl.clientHeight)})),[2]}}))}))},i.prototype.disconnectedCallback=function(){this.enableScrollEvents(!1),this.scrollEl=void 0},i.prototype.complete=function(){return Object(e["a"])(this,void 0,void 0,(function(){var i,n,t=this;return Object(e["c"])(this,(function(e){return i=this.scrollEl,this.isLoading&&i?(this.isLoading=!1,"top"===this.position&&(this.isBusy=!0,n=i.scrollHeight-i.scrollTop,requestAnimationFrame((function(){Object(o["h"])((function(){var e=i.scrollHeight,r=e-n;requestAnimationFrame((function(){Object(o["f"])((function(){i.scrollTop=r,t.isBusy=!1}))}))}))}))),[2]):[2]}))}))},i.prototype.canStart=function(){return!this.disabled&&!this.isBusy&&!!this.scrollEl&&!this.isLoading},i.prototype.enableScrollEvents=function(i){this.scrollEl&&(i?this.scrollEl.addEventListener("scroll",this.onScroll):this.scrollEl.removeEventListener("scroll",this.onScroll))},i.prototype.render=function(){var i,n=Object(r["b"])(this),t=this.disabled;return Object(o["j"])(o["c"],{class:(i={},i[n]=!0,i["infinite-scroll-loading"]=this.isLoading,i["infinite-scroll-enabled"]=!t,i)})},Object.defineProperty(i.prototype,"el",{get:function(){return Object(o["k"])(this)},enumerable:!1,configurable:!0}),Object.defineProperty(i,"watchers",{get:function(){return{threshold:["thresholdChanged"],disabled:["disabledChanged"]}},enumerable:!1,configurable:!0}),i}();c.style=l;var a="ion-infinite-scroll-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;min-height:84px;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.infinite-loading{margin-left:0;margin-right:0;margin-top:0;margin-bottom:32px;display:none;width:100%}.infinite-loading-text{margin-left:32px;margin-right:32px;margin-top:4px;margin-bottom:0}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.infinite-loading-text{margin-left:unset;margin-right:unset;-webkit-margin-start:32px;margin-inline-start:32px;-webkit-margin-end:32px;margin-inline-end:32px}}.infinite-scroll-loading ion-infinite-scroll-content>.infinite-loading{display:block}.infinite-scroll-content-ios .infinite-loading-text{color:var(--ion-color-step-600, #666666)}.infinite-scroll-content-ios .infinite-loading-spinner .spinner-lines-ios line,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-lines-small-ios line,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-crescent circle{stroke:var(--ion-color-step-600, #666666)}.infinite-scroll-content-ios .infinite-loading-spinner .spinner-bubbles circle,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-circles circle,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-dots circle{fill:var(--ion-color-step-600, #666666)}",d="ion-infinite-scroll-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;min-height:84px;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.infinite-loading{margin-left:0;margin-right:0;margin-top:0;margin-bottom:32px;display:none;width:100%}.infinite-loading-text{margin-left:32px;margin-right:32px;margin-top:4px;margin-bottom:0}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.infinite-loading-text{margin-left:unset;margin-right:unset;-webkit-margin-start:32px;margin-inline-start:32px;-webkit-margin-end:32px;margin-inline-end:32px}}.infinite-scroll-loading ion-infinite-scroll-content>.infinite-loading{display:block}.infinite-scroll-content-md .infinite-loading-text{color:var(--ion-color-step-600, #666666)}.infinite-scroll-content-md .infinite-loading-spinner .spinner-lines-md line,.infinite-scroll-content-md .infinite-loading-spinner .spinner-lines-small-md line,.infinite-scroll-content-md .infinite-loading-spinner .spinner-crescent circle{stroke:var(--ion-color-step-600, #666666)}.infinite-scroll-content-md .infinite-loading-spinner .spinner-bubbles circle,.infinite-scroll-content-md .infinite-loading-spinner .spinner-circles circle,.infinite-scroll-content-md .infinite-loading-spinner .spinner-dots circle{fill:var(--ion-color-step-600, #666666)}",f=function(){function i(i){Object(o["o"])(this,i)}return i.prototype.componentDidLoad=function(){if(void 0===this.loadingSpinner){var i=Object(r["b"])(this);this.loadingSpinner=r["c"].get("infiniteLoadingSpinner",r["c"].get("spinner","ios"===i?"lines":"crescent"))}},i.prototype.render=function(){var i,n=Object(r["b"])(this);return Object(o["j"])(o["c"],{class:(i={},i[n]=!0,i["infinite-scroll-content-"+n]=!0,i)},Object(o["j"])("div",{class:"infinite-loading"},this.loadingSpinner&&Object(o["j"])("div",{class:"infinite-loading-spinner"},Object(o["j"])("ion-spinner",{name:this.loadingSpinner})),this.loadingText&&Object(o["j"])("div",{class:"infinite-loading-text",innerHTML:Object(s["a"])(this.loadingText)})))},i}();f.style={ios:a,md:d}}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGlvbmljL2NvcmUvZGlzdC9lc20tZXM1L2lvbi1pbmZpbml0ZS1zY3JvbGxfMi5lbnRyeS5qcyJdLCJuYW1lcyI6WyJpbmZpbml0ZVNjcm9sbENzcyIsIkluZmluaXRlU2Nyb2xsIiwiaSIsIm4iLCJ0aGlzIiwiaW9uSW5maW5pdGUiLCJ0aHJQeCIsInRoclBjIiwiZGlkRmlyZSIsImlzQnVzeSIsImlzTG9hZGluZyIsInRocmVzaG9sZCIsImRpc2FibGVkIiwicG9zaXRpb24iLCJvblNjcm9sbCIsInNjcm9sbEVsIiwiY2FuU3RhcnQiLCJlIiwiZWwiLCJvZmZzZXRIZWlnaHQiLCJ0Iiwic2Nyb2xsVG9wIiwiciIsInNjcm9sbEhlaWdodCIsIm8iLCJzIiwibCIsImVtaXQiLCJwcm90b3R5cGUiLCJ0aHJlc2hvbGRDaGFuZ2VkIiwibGFzdEluZGV4T2YiLCJwYXJzZUZsb2F0IiwiZGlzYWJsZWRDaGFuZ2VkIiwiZW5hYmxlU2Nyb2xsRXZlbnRzIiwiY29ubmVjdGVkQ2FsbGJhY2siLCJsYWJlbCIsImNsb3Nlc3QiLCJnZXRTY3JvbGxFbGVtZW50IiwiY29uc29sZSIsImVycm9yIiwic2VudCIsImNsaWVudEhlaWdodCIsImRpc2Nvbm5lY3RlZENhbGxiYWNrIiwidW5kZWZpbmVkIiwiY29tcGxldGUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbmRlciIsImNsYXNzIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwic3R5bGUiLCJpbmZpbml0ZVNjcm9sbENvbnRlbnRJb3NDc3MiLCJpbmZpbml0ZVNjcm9sbENvbnRlbnRNZENzcyIsIkluZmluaXRlU2Nyb2xsQ29udGVudCIsImNvbXBvbmVudERpZExvYWQiLCJsb2FkaW5nU3Bpbm5lciIsIm5hbWUiLCJsb2FkaW5n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LElBQXRCdkMsS0FBS3dELGVBQTJCLENBQUMsSUFBSTFELEVBQUUsZUFBV0UsTUFBTUEsS0FBS3dELGVBQWUsT0FBT1IsSUFBSSx5QkFBeUIsT0FBT0EsSUFBSSxVQUFjLFFBQUpsRCxFQUFVLFFBQVEsZUFBZUEsRUFBRTBCLFVBQVVvQixPQUFPLFdBQVcsSUFBSTlDLEVBQU1DLEVBQUUsZUFBV0MsTUFBTSxPQUFPLGVBQUUsT0FBSyxDQUFDNkMsT0FBTy9DLEVBQUUsR0FBR0EsRUFBRUMsSUFBRyxFQUFLRCxFQUFFLDJCQUEyQkMsSUFBRyxFQUFLRCxJQUFJLGVBQUUsTUFBTSxDQUFDK0MsTUFBTSxvQkFBb0I3QyxLQUFLd0QsZ0JBQWdCLGVBQUUsTUFBTSxDQUFDWCxNQUFNLDRCQUE0QixlQUFFLGNBQWMsQ0FBQ1ksS0FBS3pELEtBQUt3RCxrQkFBa0J4RCxLQUFLMEQsYUFBYSxlQUFFLE1BQU0sQ0FBQ2IsTUFBTSx3QkFBd0JjLFVBQVUsZUFBa0IzRCxLQUFLMEQsa0JBQXlCNUQsRUFBL29CLEdBQW9wQndELEVBQXNCSCxNQUFNLENBQUNTLElBQUlSLEVBQTRCUyxHQUFHUiIsImZpbGUiOiJqcy9jaHVuay0yZDIxZGE3My4xOGMxNmVmYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydHtfX2F3YWl0ZXIsX19nZW5lcmF0b3J9ZnJvbVwidHNsaWJcIjtpbXBvcnR7ciBhcyByZWdpc3Rlckluc3RhbmNlLGUgYXMgY3JlYXRlRXZlbnQsYyBhcyB3cml0ZVRhc2ssZiBhcyByZWFkVGFzayxoLGkgYXMgZ2V0RWxlbWVudCxIIGFzIEhvc3R9ZnJvbVwiLi9pbmRleC1lODA2ZDFmNi5qc1wiO2ltcG9ydHtiIGFzIGdldElvbk1vZGUsYyBhcyBjb25maWd9ZnJvbVwiLi9pb25pYy1nbG9iYWwtOWQ1YzhlZTMuanNcIjtpbXBvcnR7cyBhcyBzYW5pdGl6ZURPTVN0cmluZ31mcm9tXCIuL2luZGV4LTllM2ZlODA2LmpzXCI7dmFyIGluZmluaXRlU2Nyb2xsQ3NzPVwiaW9uLWluZmluaXRlLXNjcm9sbHtkaXNwbGF5Om5vbmU7d2lkdGg6MTAwJX0uaW5maW5pdGUtc2Nyb2xsLWVuYWJsZWR7ZGlzcGxheTpibG9ja31cIjt2YXIgSW5maW5pdGVTY3JvbGw9ZnVuY3Rpb24oKXtmdW5jdGlvbiBpKGkpe3ZhciBuPXRoaXM7cmVnaXN0ZXJJbnN0YW5jZSh0aGlzLGkpO3RoaXMuaW9uSW5maW5pdGU9Y3JlYXRlRXZlbnQodGhpcyxcImlvbkluZmluaXRlXCIsNyk7dGhpcy50aHJQeD0wO3RoaXMudGhyUGM9MDt0aGlzLmRpZEZpcmU9ZmFsc2U7dGhpcy5pc0J1c3k9ZmFsc2U7dGhpcy5pc0xvYWRpbmc9ZmFsc2U7dGhpcy50aHJlc2hvbGQ9XCIxNSVcIjt0aGlzLmRpc2FibGVkPWZhbHNlO3RoaXMucG9zaXRpb249XCJib3R0b21cIjt0aGlzLm9uU2Nyb2xsPWZ1bmN0aW9uKCl7dmFyIGk9bi5zY3JvbGxFbDtpZighaXx8IW4uY2FuU3RhcnQoKSl7cmV0dXJuIDF9dmFyIGU9bi5lbC5vZmZzZXRIZWlnaHQ7aWYoZT09PTApe3JldHVybiAyfXZhciB0PWkuc2Nyb2xsVG9wO3ZhciByPWkuc2Nyb2xsSGVpZ2h0O3ZhciBvPWkub2Zmc2V0SGVpZ2h0O3ZhciBzPW4udGhyUGMhPT0wP28qbi50aHJQYzpuLnRoclB4O3ZhciBsPW4ucG9zaXRpb249PT1cImJvdHRvbVwiP3ItZS10LXMtbzp0LWUtcztpZihsPDApe2lmKCFuLmRpZEZpcmUpe24uaXNMb2FkaW5nPXRydWU7bi5kaWRGaXJlPXRydWU7bi5pb25JbmZpbml0ZS5lbWl0KCk7cmV0dXJuIDN9fWVsc2V7bi5kaWRGaXJlPWZhbHNlfXJldHVybiA0fX1pLnByb3RvdHlwZS50aHJlc2hvbGRDaGFuZ2VkPWZ1bmN0aW9uKCl7dmFyIGk9dGhpcy50aHJlc2hvbGQ7aWYoaS5sYXN0SW5kZXhPZihcIiVcIik+LTEpe3RoaXMudGhyUHg9MDt0aGlzLnRoclBjPXBhcnNlRmxvYXQoaSkvMTAwfWVsc2V7dGhpcy50aHJQeD1wYXJzZUZsb2F0KGkpO3RoaXMudGhyUGM9MH19O2kucHJvdG90eXBlLmRpc2FibGVkQ2hhbmdlZD1mdW5jdGlvbigpe3ZhciBpPXRoaXMuZGlzYWJsZWQ7aWYoaSl7dGhpcy5pc0xvYWRpbmc9ZmFsc2U7dGhpcy5pc0J1c3k9ZmFsc2V9dGhpcy5lbmFibGVTY3JvbGxFdmVudHMoIWkpfTtpLnByb3RvdHlwZS5jb25uZWN0ZWRDYWxsYmFjaz1mdW5jdGlvbigpe3JldHVybiBfX2F3YWl0ZXIodGhpcyx2b2lkIDAsdm9pZCAwLChmdW5jdGlvbigpe3ZhciBpLG47dmFyIGU9dGhpcztyZXR1cm4gX19nZW5lcmF0b3IodGhpcywoZnVuY3Rpb24odCl7c3dpdGNoKHQubGFiZWwpe2Nhc2UgMDppPXRoaXMuZWwuY2xvc2VzdChcImlvbi1jb250ZW50XCIpO2lmKCFpKXtjb25zb2xlLmVycm9yKFwiPGlvbi1pbmZpbml0ZS1zY3JvbGw+IG11c3QgYmUgdXNlZCBpbnNpZGUgYW4gPGlvbi1jb250ZW50PlwiKTtyZXR1cm5bMl19bj10aGlzO3JldHVybls0LGkuZ2V0U2Nyb2xsRWxlbWVudCgpXTtjYXNlIDE6bi5zY3JvbGxFbD10LnNlbnQoKTt0aGlzLnRocmVzaG9sZENoYW5nZWQoKTt0aGlzLmRpc2FibGVkQ2hhbmdlZCgpO2lmKHRoaXMucG9zaXRpb249PT1cInRvcFwiKXt3cml0ZVRhc2soKGZ1bmN0aW9uKCl7aWYoZS5zY3JvbGxFbCl7ZS5zY3JvbGxFbC5zY3JvbGxUb3A9ZS5zY3JvbGxFbC5zY3JvbGxIZWlnaHQtZS5zY3JvbGxFbC5jbGllbnRIZWlnaHR9fSkpfXJldHVyblsyXX19KSl9KSl9O2kucHJvdG90eXBlLmRpc2Nvbm5lY3RlZENhbGxiYWNrPWZ1bmN0aW9uKCl7dGhpcy5lbmFibGVTY3JvbGxFdmVudHMoZmFsc2UpO3RoaXMuc2Nyb2xsRWw9dW5kZWZpbmVkfTtpLnByb3RvdHlwZS5jb21wbGV0ZT1mdW5jdGlvbigpe3JldHVybiBfX2F3YWl0ZXIodGhpcyx2b2lkIDAsdm9pZCAwLChmdW5jdGlvbigpe3ZhciBpLG47dmFyIGU9dGhpcztyZXR1cm4gX19nZW5lcmF0b3IodGhpcywoZnVuY3Rpb24odCl7aT10aGlzLnNjcm9sbEVsO2lmKCF0aGlzLmlzTG9hZGluZ3x8IWkpe3JldHVyblsyXX10aGlzLmlzTG9hZGluZz1mYWxzZTtpZih0aGlzLnBvc2l0aW9uPT09XCJ0b3BcIil7dGhpcy5pc0J1c3k9dHJ1ZTtuPWkuc2Nyb2xsSGVpZ2h0LWkuc2Nyb2xsVG9wO3JlcXVlc3RBbmltYXRpb25GcmFtZSgoZnVuY3Rpb24oKXtyZWFkVGFzaygoZnVuY3Rpb24oKXt2YXIgdD1pLnNjcm9sbEhlaWdodDt2YXIgcj10LW47cmVxdWVzdEFuaW1hdGlvbkZyYW1lKChmdW5jdGlvbigpe3dyaXRlVGFzaygoZnVuY3Rpb24oKXtpLnNjcm9sbFRvcD1yO2UuaXNCdXN5PWZhbHNlfSkpfSkpfSkpfSkpfXJldHVyblsyXX0pKX0pKX07aS5wcm90b3R5cGUuY2FuU3RhcnQ9ZnVuY3Rpb24oKXtyZXR1cm4hdGhpcy5kaXNhYmxlZCYmIXRoaXMuaXNCdXN5JiYhIXRoaXMuc2Nyb2xsRWwmJiF0aGlzLmlzTG9hZGluZ307aS5wcm90b3R5cGUuZW5hYmxlU2Nyb2xsRXZlbnRzPWZ1bmN0aW9uKGkpe2lmKHRoaXMuc2Nyb2xsRWwpe2lmKGkpe3RoaXMuc2Nyb2xsRWwuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLHRoaXMub25TY3JvbGwpfWVsc2V7dGhpcy5zY3JvbGxFbC5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsdGhpcy5vblNjcm9sbCl9fX07aS5wcm90b3R5cGUucmVuZGVyPWZ1bmN0aW9uKCl7dmFyIGk7dmFyIG49Z2V0SW9uTW9kZSh0aGlzKTt2YXIgZT10aGlzLmRpc2FibGVkO3JldHVybiBoKEhvc3Qse2NsYXNzOihpPXt9LGlbbl09dHJ1ZSxpW1wiaW5maW5pdGUtc2Nyb2xsLWxvYWRpbmdcIl09dGhpcy5pc0xvYWRpbmcsaVtcImluZmluaXRlLXNjcm9sbC1lbmFibGVkXCJdPSFlLGkpfSl9O09iamVjdC5kZWZpbmVQcm9wZXJ0eShpLnByb3RvdHlwZSxcImVsXCIse2dldDpmdW5jdGlvbigpe3JldHVybiBnZXRFbGVtZW50KHRoaXMpfSxlbnVtZXJhYmxlOmZhbHNlLGNvbmZpZ3VyYWJsZTp0cnVlfSk7T2JqZWN0LmRlZmluZVByb3BlcnR5KGksXCJ3YXRjaGVyc1wiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm57dGhyZXNob2xkOltcInRocmVzaG9sZENoYW5nZWRcIl0sZGlzYWJsZWQ6W1wiZGlzYWJsZWRDaGFuZ2VkXCJdfX0sZW51bWVyYWJsZTpmYWxzZSxjb25maWd1cmFibGU6dHJ1ZX0pO3JldHVybiBpfSgpO0luZmluaXRlU2Nyb2xsLnN0eWxlPWluZmluaXRlU2Nyb2xsQ3NzO3ZhciBpbmZpbml0ZVNjcm9sbENvbnRlbnRJb3NDc3M9XCJpb24taW5maW5pdGUtc2Nyb2xsLWNvbnRlbnR7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LW1zLWZsZXgtZGlyZWN0aW9uOmNvbHVtbjtmbGV4LWRpcmVjdGlvbjpjb2x1bW47LW1zLWZsZXgtcGFjazpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjttaW4taGVpZ2h0Ojg0cHg7dGV4dC1hbGlnbjpjZW50ZXI7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfS5pbmZpbml0ZS1sb2FkaW5ne21hcmdpbi1sZWZ0OjA7bWFyZ2luLXJpZ2h0OjA7bWFyZ2luLXRvcDowO21hcmdpbi1ib3R0b206MzJweDtkaXNwbGF5Om5vbmU7d2lkdGg6MTAwJX0uaW5maW5pdGUtbG9hZGluZy10ZXh0e21hcmdpbi1sZWZ0OjMycHg7bWFyZ2luLXJpZ2h0OjMycHg7bWFyZ2luLXRvcDo0cHg7bWFyZ2luLWJvdHRvbTowfUBzdXBwb3J0cyAoKC13ZWJraXQtbWFyZ2luLXN0YXJ0OiAwKSBvciAobWFyZ2luLWlubGluZS1zdGFydDogMCkpIG9yICgtd2Via2l0LW1hcmdpbi1zdGFydDogMCl7LmluZmluaXRlLWxvYWRpbmctdGV4dHttYXJnaW4tbGVmdDp1bnNldDttYXJnaW4tcmlnaHQ6dW5zZXQ7LXdlYmtpdC1tYXJnaW4tc3RhcnQ6MzJweDttYXJnaW4taW5saW5lLXN0YXJ0OjMycHg7LXdlYmtpdC1tYXJnaW4tZW5kOjMycHg7bWFyZ2luLWlubGluZS1lbmQ6MzJweH19LmluZmluaXRlLXNjcm9sbC1sb2FkaW5nIGlvbi1pbmZpbml0ZS1zY3JvbGwtY29udGVudD4uaW5maW5pdGUtbG9hZGluZ3tkaXNwbGF5OmJsb2NrfS5pbmZpbml0ZS1zY3JvbGwtY29udGVudC1pb3MgLmluZmluaXRlLWxvYWRpbmctdGV4dHtjb2xvcjp2YXIoLS1pb24tY29sb3Itc3RlcC02MDAsICM2NjY2NjYpfS5pbmZpbml0ZS1zY3JvbGwtY29udGVudC1pb3MgLmluZmluaXRlLWxvYWRpbmctc3Bpbm5lciAuc3Bpbm5lci1saW5lcy1pb3MgbGluZSwuaW5maW5pdGUtc2Nyb2xsLWNvbnRlbnQtaW9zIC5pbmZpbml0ZS1sb2FkaW5nLXNwaW5uZXIgLnNwaW5uZXItbGluZXMtc21hbGwtaW9zIGxpbmUsLmluZmluaXRlLXNjcm9sbC1jb250ZW50LWlvcyAuaW5maW5pdGUtbG9hZGluZy1zcGlubmVyIC5zcGlubmVyLWNyZXNjZW50IGNpcmNsZXtzdHJva2U6dmFyKC0taW9uLWNvbG9yLXN0ZXAtNjAwLCAjNjY2NjY2KX0uaW5maW5pdGUtc2Nyb2xsLWNvbnRlbnQtaW9zIC5pbmZpbml0ZS1sb2FkaW5nLXNwaW5uZXIgLnNwaW5uZXItYnViYmxlcyBjaXJjbGUsLmluZmluaXRlLXNjcm9sbC1jb250ZW50LWlvcyAuaW5maW5pdGUtbG9hZGluZy1zcGlubmVyIC5zcGlubmVyLWNpcmNsZXMgY2lyY2xlLC5pbmZpbml0ZS1zY3JvbGwtY29udGVudC1pb3MgLmluZmluaXRlLWxvYWRpbmctc3Bpbm5lciAuc3Bpbm5lci1kb3RzIGNpcmNsZXtmaWxsOnZhcigtLWlvbi1jb2xvci1zdGVwLTYwMCwgIzY2NjY2Nil9XCI7dmFyIGluZmluaXRlU2Nyb2xsQ29udGVudE1kQ3NzPVwiaW9uLWluZmluaXRlLXNjcm9sbC1jb250ZW50e2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4Oy1tcy1mbGV4LWRpcmVjdGlvbjpjb2x1bW47ZmxleC1kaXJlY3Rpb246Y29sdW1uOy1tcy1mbGV4LXBhY2s6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7bWluLWhlaWdodDo4NHB4O3RleHQtYWxpZ246Y2VudGVyOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX0uaW5maW5pdGUtbG9hZGluZ3ttYXJnaW4tbGVmdDowO21hcmdpbi1yaWdodDowO21hcmdpbi10b3A6MDttYXJnaW4tYm90dG9tOjMycHg7ZGlzcGxheTpub25lO3dpZHRoOjEwMCV9LmluZmluaXRlLWxvYWRpbmctdGV4dHttYXJnaW4tbGVmdDozMnB4O21hcmdpbi1yaWdodDozMnB4O21hcmdpbi10b3A6NHB4O21hcmdpbi1ib3R0b206MH1Ac3VwcG9ydHMgKCgtd2Via2l0LW1hcmdpbi1zdGFydDogMCkgb3IgKG1hcmdpbi1pbmxpbmUtc3RhcnQ6IDApKSBvciAoLXdlYmtpdC1tYXJnaW4tc3RhcnQ6IDApey5pbmZpbml0ZS1sb2FkaW5nLXRleHR7bWFyZ2luLWxlZnQ6dW5zZXQ7bWFyZ2luLXJpZ2h0OnVuc2V0Oy13ZWJraXQtbWFyZ2luLXN0YXJ0OjMycHg7bWFyZ2luLWlubGluZS1zdGFydDozMnB4Oy13ZWJraXQtbWFyZ2luLWVuZDozMnB4O21hcmdpbi1pbmxpbmUtZW5kOjMycHh9fS5pbmZpbml0ZS1zY3JvbGwtbG9hZGluZyBpb24taW5maW5pdGUtc2Nyb2xsLWNvbnRlbnQ+LmluZmluaXRlLWxvYWRpbmd7ZGlzcGxheTpibG9ja30uaW5maW5pdGUtc2Nyb2xsLWNvbnRlbnQtbWQgLmluZmluaXRlLWxvYWRpbmctdGV4dHtjb2xvcjp2YXIoLS1pb24tY29sb3Itc3RlcC02MDAsICM2NjY2NjYpfS5pbmZpbml0ZS1zY3JvbGwtY29udGVudC1tZCAuaW5maW5pdGUtbG9hZGluZy1zcGlubmVyIC5zcGlubmVyLWxpbmVzLW1kIGxpbmUsLmluZmluaXRlLXNjcm9sbC1jb250ZW50LW1kIC5pbmZpbml0ZS1sb2FkaW5nLXNwaW5uZXIgLnNwaW5uZXItbGluZXMtc21hbGwtbWQgbGluZSwuaW5maW5pdGUtc2Nyb2xsLWNvbnRlbnQtbWQgLmluZmluaXRlLWxvYWRpbmctc3Bpbm5lciAuc3Bpbm5lci1jcmVzY2VudCBjaXJjbGV7c3Ryb2tlOnZhcigtLWlvbi1jb2xvci1zdGVwLTYwMCwgIzY2NjY2Nil9LmluZmluaXRlLXNjcm9sbC1jb250ZW50LW1kIC5pbmZpbml0ZS1sb2FkaW5nLXNwaW5uZXIgLnNwaW5uZXItYnViYmxlcyBjaXJjbGUsLmluZmluaXRlLXNjcm9sbC1jb250ZW50LW1kIC5pbmZpbml0ZS1sb2FkaW5nLXNwaW5uZXIgLnNwaW5uZXItY2lyY2xlcyBjaXJjbGUsLmluZmluaXRlLXNjcm9sbC1jb250ZW50LW1kIC5pbmZpbml0ZS1sb2FkaW5nLXNwaW5uZXIgLnNwaW5uZXItZG90cyBjaXJjbGV7ZmlsbDp2YXIoLS1pb24tY29sb3Itc3RlcC02MDAsICM2NjY2NjYpfVwiO3ZhciBJbmZpbml0ZVNjcm9sbENvbnRlbnQ9ZnVuY3Rpb24oKXtmdW5jdGlvbiBpKGkpe3JlZ2lzdGVySW5zdGFuY2UodGhpcyxpKX1pLnByb3RvdHlwZS5jb21wb25lbnREaWRMb2FkPWZ1bmN0aW9uKCl7aWYodGhpcy5sb2FkaW5nU3Bpbm5lcj09PXVuZGVmaW5lZCl7dmFyIGk9Z2V0SW9uTW9kZSh0aGlzKTt0aGlzLmxvYWRpbmdTcGlubmVyPWNvbmZpZy5nZXQoXCJpbmZpbml0ZUxvYWRpbmdTcGlubmVyXCIsY29uZmlnLmdldChcInNwaW5uZXJcIixpPT09XCJpb3NcIj9cImxpbmVzXCI6XCJjcmVzY2VudFwiKSl9fTtpLnByb3RvdHlwZS5yZW5kZXI9ZnVuY3Rpb24oKXt2YXIgaTt2YXIgbj1nZXRJb25Nb2RlKHRoaXMpO3JldHVybiBoKEhvc3Qse2NsYXNzOihpPXt9LGlbbl09dHJ1ZSxpW1wiaW5maW5pdGUtc2Nyb2xsLWNvbnRlbnQtXCIrbl09dHJ1ZSxpKX0saChcImRpdlwiLHtjbGFzczpcImluZmluaXRlLWxvYWRpbmdcIn0sdGhpcy5sb2FkaW5nU3Bpbm5lciYmaChcImRpdlwiLHtjbGFzczpcImluZmluaXRlLWxvYWRpbmctc3Bpbm5lclwifSxoKFwiaW9uLXNwaW5uZXJcIix7bmFtZTp0aGlzLmxvYWRpbmdTcGlubmVyfSkpLHRoaXMubG9hZGluZ1RleHQmJmgoXCJkaXZcIix7Y2xhc3M6XCJpbmZpbml0ZS1sb2FkaW5nLXRleHRcIixpbm5lckhUTUw6c2FuaXRpemVET01TdHJpbmcodGhpcy5sb2FkaW5nVGV4dCl9KSkpfTtyZXR1cm4gaX0oKTtJbmZpbml0ZVNjcm9sbENvbnRlbnQuc3R5bGU9e2lvczppbmZpbml0ZVNjcm9sbENvbnRlbnRJb3NDc3MsbWQ6aW5maW5pdGVTY3JvbGxDb250ZW50TWRDc3N9O2V4cG9ydHtJbmZpbml0ZVNjcm9sbCBhcyBpb25faW5maW5pdGVfc2Nyb2xsLEluZmluaXRlU2Nyb2xsQ29udGVudCBhcyBpb25faW5maW5pdGVfc2Nyb2xsX2NvbnRlbnR9OyJdLCJzb3VyY2VSb290IjoiIn0=