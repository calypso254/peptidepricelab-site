/* ------------------------------------------------------------------
   subscribe.js — progressive enhancement for the Dispatch sign-up forms.

   Every .subscribe-form already POSTs to site.newsletterAction (a Make.com
   custom webhook) on its own, so the form still works with JavaScript off.
   This script intercepts the submit, sends the same fields via fetch(), and
   swaps in an inline confirmation — so the reader never leaves the page or
   sees the webhook's raw "Accepted" response.

   Sent as application/x-www-form-urlencoded (a CORS "simple request", so no
   preflight) which Make.com parses straight into the scenario's bundle.
   ------------------------------------------------------------------ */
(function () {
  "use strict";

  document.addEventListener("submit", function (event) {
    var form = event.target.closest(".subscribe-form");
    if (!form) return;

    var action = form.getAttribute("action");
    // No webhook configured (action is the inert "#" placeholder) — let the
    // browser do whatever it would normally do.
    if (!action || action === "#") return;

    event.preventDefault();

    var emailInput = form.querySelector('input[name="email"]');
    var button = form.querySelector('button[type="submit"]');
    var email = emailInput ? emailInput.value.trim() : "";
    if (!email) return;

    var originalLabel = button ? button.textContent : "";
    if (button) {
      button.disabled = true;
      button.textContent = "Sending…";
    }
    clearError(form);

    var body = new URLSearchParams();
    body.set("email", email);
    body.set("source", window.location.pathname);
    body.set("submitted_at", new Date().toISOString());

    fetch(action, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: body.toString()
    })
      .then(function (response) {
        if (!response.ok) throw new Error("Request failed (" + response.status + ")");
        showSuccess(form);
      })
      .catch(function () {
        if (button) {
          button.disabled = false;
          button.textContent = originalLabel;
        }
        showError(form, "Something went wrong — please try again.");
      });
  });

  function showSuccess(form) {
    form.classList.add("is-subscribed");
    form.innerHTML =
      '<span class="form-label">You’re on the list ✓</span>' +
      '<p class="form-prompt">Thanks for subscribing. Look for the next Dispatch this Saturday at 7&nbsp;a.m. Eastern.</p>';
  }

  function showError(form, message) {
    var error = form.querySelector(".form-error");
    if (!error) {
      error = document.createElement("p");
      error.className = "form-error";
      error.setAttribute("role", "alert");
      form.appendChild(error);
    }
    error.textContent = message;
  }

  function clearError(form) {
    var error = form.querySelector(".form-error");
    if (error) error.remove();
  }
})();
