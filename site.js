(function () {
  var button = document.querySelector(".language");
  var nav = document.querySelector("[data-nav]");
  var shot = document.querySelector(".screen img");

  function applyLanguage(isEnglish) {
    document.body.classList.toggle("english", isEnglish);
    document.documentElement.lang = isEnglish ? "en" : "ko";
    document.title = isEnglish
      ? "SHIFTNAKE Android | Support"
      : "SHIFTNAKE Android | 지원";
    button.textContent = isEnglish ? "한국어" : "EN";
    button.lang = isEnglish ? "ko" : "en";
    button.setAttribute("aria-label", isEnglish ? "한국어로 보기" : "View in English");
    if (nav) nav.setAttribute("aria-label", isEnglish ? "On this page" : "본문 탐색");
    if (shot) {
      shot.alt = isEnglish
        ? "Example of the SHIFT board, with score, stage, and fruit"
        : "SHIFT 모드 화면 예. 점수, 스테이지, 과일이 보입니다";
    }
  }

  function applyRoute() {
    var hash = location.hash;
    if (/-en$/.test(hash)) applyLanguage(true);
    else if (/-ko$/.test(hash)) applyLanguage(false);
    var privacy = document.getElementById("website-privacy");
    if (privacy && /^#(privacy|app)(-|$)/.test(hash)) privacy.open = true;
  }

  button.addEventListener("click", function () {
    var isEnglish = !document.body.classList.contains("english");
    applyLanguage(isEnglish);
    var section = "home";
    var match = /^#(home|support|privacy|app|play|worlds|clear|gems|classic|controls|ranking)(?:-|$)/.exec(location.hash);
    if (match) section = match[1];
    history.replaceState(null, "", "#" + section + (isEnglish ? "-en" : "-ko"));
  });

  window.addEventListener("hashchange", applyRoute);
  applyRoute();
})();
