(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function setOpen(open) {
    if (!toggle || !nav) return;
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("open"));
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setOpen(false); });
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 800) setOpen(false);
    });
  }

  var form = document.getElementById("inquiry-form");
  var note = document.getElementById("form-note");

  function value(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : "";
  }

  function show(message, isError) {
    if (!note) return;
    note.textContent = message;
    note.classList.toggle("error", !!isError);
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var name = value("name");
      var email = value("email");
      var company = value("company");
      var service = value("service");
      var message = value("message");

      if (!name || !email || !service || !message) {
        show("Please fill in your name, email, service, and message.", true);
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        show("Please enter a valid email address.", true);
        return;
      }

      var subject = "Project inquiry from " + name;
      var body = [
        "Name: " + name,
        "Email: " + email,
        "Company or channel: " + (company || "(not provided)"),
        "Service: " + service,
        "",
        "Message:",
        message
      ].join("\n");

      var href =
        "mailto:vm@pinkredline.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      show("Opening your email app…", false);
      window.location.href = href;
    });
  }
})();
