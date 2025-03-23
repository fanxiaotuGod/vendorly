console.log("🚀 COV Auto Registration Filler running...");

function waitForElement(selector, callback, maxAttempts = 30) {
  let attempts = 0;
  const interval = setInterval(() => {
    const el = document.querySelector(selector);
    if (el) {
      clearInterval(interval);
      callback(el);
    }
    if (++attempts >= maxAttempts) {
      clearInterval(interval);
      console.warn(`⚠️ Could not find element: ${selector}`);
    }
  }, 300);
}

function autofill() {
  const fillInput = (selector, value) => {
    const input = document.querySelector(selector);
    if (input) {
      input.focus();
      input.value = value;
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };

  fillInput("#first_name", "Haocheng");
  fillInput("#last_name", "Fan");
  fillInput("#email", "fhc991115@gmail.com");
  fillInput("#password", "YourPassword123!");
  fillInput("#confirm_password", "YourPassword123!");

  const checkbox = document.querySelector("input[type='checkbox']");
  if (checkbox && !checkbox.checked) {
    checkbox.click();
  }

  console.log("✅ Form auto-filled! Now just complete the CAPTCHA.");
}

// 👇 Add a floating autofill button to the page
function injectAutofillButton() {
  const button = document.createElement("button");
  button.innerText = "Vendorly Autofill";
  button.style.fontSize = "18px";
  button.style.padding = "12px 20px";
  button.style.backgroundColor = "#007bff";
  button.style.color = "#fff";
  button.style.border = "none";
  button.style.borderRadius = "6px";
  button.style.marginTop = "16px";
  button.style.cursor = "pointer";
  button.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
  button.style.zIndex = "9999";

  button.addEventListener("click", autofill);

  // Insert the button right after the "Confirm password" field
  const targetInput = document.querySelector("#confirm_password");
  if (targetInput && targetInput.parentElement) {
    targetInput.parentElement.appendChild(button);
  } else {
    // fallback to fixed position if we can't find the input box
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    document.body.appendChild(button);
  }
}


// Wait for the form to exist before injecting the button
waitForElement("#first_name", injectAutofillButton);
