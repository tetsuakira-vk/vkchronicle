---
layout: default
title: About VK Chronicle
permalink: /about/
description: "VK Chronicle covers Visual Kei news, reviews, and band profiles in English for Western fans who want to stay connected to the Japanese scene."
image: /assets/images/placeholder.jpg
---
<div class="container" style="max-width:760px; padding: 48px 20px;">
  <h1 style="font-family:'Playfair Display',serif; color:#fff; font-size:2rem; margin-bottom:16px;">About VK Chronicle</h1>
  <p>VK Chronicle is an English-language news and review site dedicated to Visual Kei — the Japanese rock movement defined by theatrical makeup, elaborate costumes, and powerful music.</p>
  <p>We cover new releases, tour dates, band profiles, and album reviews, all written for Western fans who want to stay connected to the scene.</p>
  <h2 style="font-family:'Playfair Display',serif; color:#fff; font-size:1.4rem; margin:32px 0 12px;">Contact</h2>
  <p style="color:rgba(255,255,255,0.6); margin-bottom:24px;">Got a tip, a band recommendation, or just want to say hi? Drop us a message.</p>

  <form action="https://api.web3forms.com/submit" method="POST" id="contact-form" style="display:flex; flex-direction:column; gap:16px;">
    <input type="hidden" name="access_key" value="908029ae-f4be-4dbc-8e5d-8c63bbd1430c">
    <input type="hidden" name="subject" value="VK Chronicle — Contact Form">
    <input type="hidden" name="redirect" value="false">

    <div style="display:flex; flex-direction:column; gap:6px;">
      <label for="cf-name" style="font-size:0.78rem; letter-spacing:0.08em; text-transform:uppercase; color:rgba(255,255,255,0.45);">Name</label>
      <input type="text" id="cf-name" name="name" required placeholder="Your name" class="cf-input">
    </div>

    <div style="display:flex; flex-direction:column; gap:6px;">
      <label for="cf-email" style="font-size:0.78rem; letter-spacing:0.08em; text-transform:uppercase; color:rgba(255,255,255,0.45);">Email</label>
      <input type="email" id="cf-email" name="email" required placeholder="your@email.com" class="cf-input">
    </div>

    <div style="display:flex; flex-direction:column; gap:6px;">
      <label for="cf-message" style="font-size:0.78rem; letter-spacing:0.08em; text-transform:uppercase; color:rgba(255,255,255,0.45);">Message</label>
      <textarea id="cf-message" name="message" required placeholder="What's on your mind?" rows="6" class="cf-input" style="resize:vertical;"></textarea>
    </div>

    <button type="submit" class="cf-submit">Send Message</button>

    <p id="cf-result" style="display:none; font-size:0.9rem; padding:12px 16px; border-radius:8px;"></p>
  </form>

  <style>
    .cf-input {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 8px;
      color: #fff;
      font-family: 'Inter', sans-serif;
      font-size: 0.95rem;
      padding: 12px 14px;
      transition: border-color 0.2s;
      width: 100%;
      box-sizing: border-box;
    }
    .cf-input::placeholder { color: rgba(255,255,255,0.25); }
    .cf-input:focus { border-color: rgba(236,172,13,0.5); outline: none; }
    .cf-submit {
      align-self: flex-start;
      background: #ecac0d;
      border: none;
      border-radius: 8px;
      color: #0a0a0a;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      padding: 12px 28px;
      text-transform: uppercase;
      transition: opacity 0.2s;
    }
    .cf-submit:hover { opacity: 0.85; }
    .cf-submit:disabled { opacity: 0.5; cursor: default; }
  </style>

  <script>
    document.getElementById('contact-form').addEventListener('submit', async function(e) {
      e.preventDefault();
      var btn = this.querySelector('.cf-submit');
      var result = document.getElementById('cf-result');
      btn.disabled = true;
      btn.textContent = 'Sending…';
      try {
        var res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: new FormData(this)
        });
        var data = await res.json();
        result.style.display = 'block';
        if (data.success) {
          result.style.background = 'rgba(60,180,80,0.12)';
          result.style.border = '1px solid rgba(60,180,80,0.3)';
          result.style.color = '#6ddc8b';
          result.textContent = 'Message sent — thanks for getting in touch!';
          this.reset();
        } else {
          throw new Error(data.message);
        }
      } catch(err) {
        result.style.display = 'block';
        result.style.background = 'rgba(220,60,60,0.12)';
        result.style.border = '1px solid rgba(220,60,60,0.3)';
        result.style.color = '#f08080';
        result.textContent = 'Something went wrong — please try again.';
      }
      btn.disabled = false;
      btn.textContent = 'Send Message';
    });
  </script>
</div>
