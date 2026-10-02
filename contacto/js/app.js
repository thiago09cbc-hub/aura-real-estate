/* =========================================================
   AURA REAL ESTATE — app.js
   Header, footer, propiedades destacadas, contadores y buscador
   ========================================================= */
(function () {
  'use strict';

  const PROPIEDADES = [
    { id: 1, ciudad: 'Miami, Florida', m2: 350, hab: 4, precio: '€12.300.500', img: 'img/miami.jpg' },
    { id: 2, ciudad: 'Lugano, Suiza',  m2: 500, hab: 4, precio: '€7.860.850',  img: 'img/lugano.jpg' }
  ];

  const page = document.body.dataset.page || '';

  /* ---------- Header ---------- */
  const header = document.getElementById('site-header');
  if (header) {
    const links = [
      { href: 'index.html',       label: 'Inicio',      key: 'index' },
      { href: 'propiedades.html', label: 'Propiedades', key: 'propiedades' },
      { href: 'index.html#nosotros', label: 'Nosotros',  key: 'nosotros' },
      { href: 'contacto.html',   label: 'Contacto',    key: 'contacto' }
    ];
    header.innerHTML =
      '<div class="nav">' +
        '<a class="logo" href="index.html"><img src="img/logo.png" alt="Aura Real Estate"></a>' +
        '<nav>' + links.map(l =>
          '<a href="' + l.href + '"' + (l.key === page ? ' class="active"' : '') + '>' + l.label + '</a>'
        ).join('') + '</nav>' +
        '<span class="nav-spacer"></span>' +
      '</div>';
  }

  /* ---------- Footer ---------- */
  const footer = document.getElementById('site-footer');
  if (footer) {
    footer.innerHTML =
      '<div class="container">' +
        '<h3 class="footer-title">Contacto</h3>' +
        '<p>hola@aurarealestate.com · +54 11 6011-0000</p>' +
        '<p class="footer-copy">© ' + new Date().getFullYear() + ' Aura Real Estate. Todos los derechos reservados.</p>' +
      '</div>';
  }

  /* ---------- Propiedades destacadas ---------- */
  const destacadas = document.getElementById('destacadas');
  if (destacadas) {
    destacadas.innerHTML = PROPIEDADES.map(p =>
      '<article class="prop-card">' +
        '<img src="' + p.img + '" alt="' + p.ciudad + '">' +
        '<div class="card-body">' +
          '<div class="card-row">' +
            '<h3>' + p.ciudad + '</h3>' +
            '<div class="card-meta"><span>' + p.m2 + ' m²</span><span>' + p.hab + ' hab.</span></div>' +
          '</div>' +
          '<p class="card-price">' + p.precio + '</p>' +
        '</div>' +
      '</article>'
    ).join('');
  }

  /* ---------- Contadores animados ---------- */
  const nums = document.querySelectorAll('.stat-num');
  function animar(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const decimales = String(el.dataset.target).includes('.') ? 1 : 0;
    const dur = 1600;
    const t0 = performance.now();
    (function paso(t) {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimales) + suffix;
      if (p < 1) requestAnimationFrame(paso);
    })(t0);
  }
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => { if (e.isIntersecting) { animar(e.target); obs.unobserve(e.target); } });
    }, { threshold: 0.4 });
    nums.forEach(n => io.observe(n));
  } else {
    nums.forEach(animar);
  }

  /* ---------- Buscador del inicio ---------- */
  const form = document.getElementById('home-search');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const q = document.getElementById('home-search-input').value.trim();
      window.location.href = 'propiedades.html' + (q ? '?q=' + encodeURIComponent(q) : '');
    });
  }


  /* ---------- Formulario de contacto ---------- */
  const cform = document.getElementById('contacto-form');
  if (cform) {
    const campos = {
      nombre:  { el: document.getElementById('c-nombre'),  msg: 'Ingresá tu nombre.' },
      email:   { el: document.getElementById('c-email'),   msg: 'Ingresá un correo válido.' },
      mensaje: { el: document.getElementById('c-mensaje'), msg: 'Escribí tu mensaje (mínimo 10 caracteres).' }
    };
    const box = document.createElement('div');
    box.className = 'form-message';
    box.hidden = true;
    cform.appendChild(box);

    function marcar(campo, ok) {
      const wrap = campo.el.closest('.form-field');
      wrap.classList.toggle('error', !ok);
      let err = wrap.querySelector('.field-error');
      if (ok && err) err.remove();
      if (!ok && !err) {
        err = document.createElement('span');
        err.className = 'field-error';
        wrap.appendChild(err);
      }
      if (!ok) err.textContent = campo.msg;
    }
    function valido(k) {
      const v = campos[k].el.value.trim();
      if (k === 'nombre')  return v.length >= 2;
      if (k === 'email')   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      return v.length >= 10;
    }
    Object.keys(campos).forEach(k => campos[k].el.addEventListener('input', () => {
      if (campos[k].el.closest('.form-field').classList.contains('error')) marcar(campos[k], valido(k));
    }));

    cform.addEventListener('submit', function (e) {
      e.preventDefault();
      let todoOk = true;
      Object.keys(campos).forEach(k => { const ok = valido(k); marcar(campos[k], ok); if (!ok) todoOk = false; });
      box.hidden = false;
      if (!todoOk) {
        box.className = 'form-message fail';
        box.textContent = 'Revisá los campos marcados e intentá de nuevo.';
        return;
      }
      box.className = 'form-message ok';
      box.textContent = '¡Gracias, ' + campos.nombre.el.value.trim() + '! Recibimos tu mensaje y te respondemos a la brevedad.';
      cform.reset();
    });
  }

  /* ---------- Sección Nosotros (ancla) ---------- */
  const why = document.querySelector('.why-section');
  if (why && !why.id) why.id = 'nosotros';
})();
