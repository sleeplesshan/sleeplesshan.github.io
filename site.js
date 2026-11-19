(function () {
  var buttons = Array.prototype.slice.call(document.querySelectorAll(".language[data-lang]"));
  var nav = document.querySelector("[data-nav]");
  var shot = document.querySelector(".screen img");
  var LANGS = ["ko", "en", "ja"];
  var TEXT = {
    ko: {
      title: "SHIFTNAKE Android | 지원",
      nav: "본문 탐색",
      shot: "SHIFT 모드 화면 예. 점수, 스테이지, 과일이 보입니다"
    },
    en: {
      title: "SHIFTNAKE Android | Support",
      nav: "On this page",
      shot: "Example of the SHIFT board, with score, stage, and fruit"
    },
    ja: {
      title: "SHIFTNAKE Android | サポート",
      nav: "このページの内容",
      shot: "SHIFTモードの画面例。スコア、ステージ、フルーツが表示されています"
    }
  };
  var current = "ko";

  function applyLanguage(lang) {
    if (LANGS.indexOf(lang) < 0) lang = "ko";
    current = lang;
    document.body.classList.toggle("english", lang === "en");
    document.body.classList.toggle("japanese", lang === "ja");
    document.documentElement.lang = lang;
    document.title = TEXT[lang].title;
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
    });
    if (nav) nav.setAttribute("aria-label", TEXT[lang].nav);
    if (shot) shot.alt = TEXT[lang].shot;
  }

  function applyRoute() {
    var hash = location.hash;
    var m = /-(ko|en|ja)$/.exec(hash);
    if (m) applyLanguage(m[1]);
    var privacy = document.getElementById("website-privacy");
    if (privacy && /^#(privacy|app)(-|$)/.test(hash)) privacy.open = true;
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var lang = button.getAttribute("data-lang");
      applyLanguage(lang);
      var section = "home";
      var match = /^#(home|support|privacy|app|play|worlds|clear|gems|classic|controls|ranking)(?:-|$)/.exec(location.hash);
      if (match) section = match[1];
      history.replaceState(null, "", "#" + section + "-" + lang);
    });
  });

  window.addEventListener("hashchange", applyRoute);
  applyRoute();
})();
