(function () {
  var slides = Array.prototype.slice.call(document.querySelectorAll(".slide"));
  var dots = Array.prototype.slice.call(document.querySelectorAll(".dots button"));
  var index = 0;
  var timer;

  function show(next) {
    if (!slides.length) return;
    index = (next + slides.length) % slides.length;
    slides.forEach(function (slide, i) {
      slide.classList.toggle("active", i === index);
    });
    dots.forEach(function (dot, i) {
      dot.classList.toggle("active", i === index);
    });
  }

  function restart() {
    if (timer) clearInterval(timer);
    if (slides.length < 2) return;
    timer = setInterval(function () { show(index + 1); }, 5000);
  }

  var prev = document.querySelector(".slider-btn.prev");
  var next = document.querySelector(".slider-btn.next");
  if (prev) prev.addEventListener("click", function () { show(index - 1); restart(); });
  if (next) next.addEventListener("click", function () { show(index + 1); restart(); });
  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () { show(i); restart(); });
  });
  show(0);
  restart();

  var menu = document.querySelector(".menu-btn");
  var nav = document.querySelector(".nav-list");
  if (menu && nav) {
    menu.addEventListener("click", function (event) {
      event.preventDefault();
      nav.classList.toggle("open");
    });
  }

  var top = document.querySelector(".to-top");
  if (top) {
    top.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  var form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var result = document.querySelector("#form-result");
      var lines = [];
      var data = new FormData(form);
      data.forEach(function (value, key) {
        if (key === "agree") return;
        lines.push(key + "： " + value);
      });
      var text = lines.join("\n");
      result.hidden = false;
      result.innerHTML = "<p>メールの届き先は、まだ設定されていません。お電話（03-5318-1420）でご連絡ください。受付は平日 9:00～17:00 です。</p><textarea readonly rows=\"12\"></textarea>";
      result.querySelector("textarea").value = text;
    });
  }
})();
