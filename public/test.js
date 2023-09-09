const form = document.querySelector("form");
console.log(process.env.recaptcha_client_key);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const captchaResponse = grecaptcha.getResponse();

  if (!captchaResponse.length > 0) {
    alert("recaptcha 驗證失敗");
    throw new Error("Captcha not complete");
  } else {
  }
  const fd = new FormData(e.target);
  const params = new URLSearchParams(fd);
  fetch("/upload", {
    method: "POST",
    body: params,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        alert("成功");
      } else {
        alert("失敗");
      }
    })
    .catch((err) => console.error(err));
});
