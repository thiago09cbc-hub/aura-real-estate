/* =========================================================
   AURA REAL ESTATE — app.js
   Header, footer, propiedades destacadas, contadores y buscador
   ========================================================= */
(function () {
  'use strict';

  /* Catálogo completo (editá acá las propiedades) */
  const miles = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const CATALOGO = [
    { id: 1, titulo: 'Miami, Florida', tipo: 'departamento', operacion: 'venta', estado: 'disponible', precio: 12300500, totales: 350, cubiertos: 310, ambientes: 6, dormitorios: 4, banos: 4, toilet: 1, cocheras: 2, antiguedad: 5, expensas: 1850, img: 'img/miami.jpg',
      desc: 'Amplio departamento frente al agua con living integrado a un balcón corrido y vista panorámica de la bahía. Cocina equipada, suite principal con vestidor y amenities de primer nivel.' },
    { id: 2, titulo: 'Lugano, Suiza', tipo: 'departamento', operacion: 'venta', estado: 'disponible', precio: 7860850, totales: 500, cubiertos: 420, ambientes: 7, dormitorios: 4, banos: 5, toilet: 2, cocheras: 3, antiguedad: 3, expensas: 2400, img: 'img/lugano.jpg',
      desc: 'Residencia de diseño con ventanales de piso a techo y vista abierta al lago y las montañas. Terminaciones en mármol, domótica integrada y servicio de conserjería.' },
    { id: 3, titulo: 'Palermo, Buenos Aires', tipo: 'departamento', operacion: 'alquiler', estado: 'disponible', precio: 1450, totales: 95, cubiertos: 88, ambientes: 3, dormitorios: 2, banos: 1, toilet: 1, cocheras: 1, antiguedad: 8, expensas: 210, img: 'img/living.jpg',
      desc: 'Luminoso departamento de tres ambientes a metros de los parques, con living de doble orientación y cocina independiente. Ideal para contrato anual.' },
    { id: 4, titulo: 'Nordelta, Tigre', tipo: 'casa', operacion: 'venta', estado: 'reservada', moneda: 'USD', precio: 1850000, totales: 500, cubiertos: 500, terreno: 2000, ambientes: 8, dormitorios: 5, banos: 3, toilet: 2, cocheras: 3, antiguedad: 26, expensas: 0, img: 'img/nordelta.jpg',
      desc: 'Casa de ladrillo a la vista en barrio cerrado, sobre un terreno de 2.000 m² con jardín y pileta. 500 m² cubiertos, 8 ambientes, 5 dormitorios y 3 cocheras.' },
    { id: 5, titulo: 'Panamericana Km 90, Zárate', tipo: 'nave industrial', operacion: 'alquiler', estado: 'disponible', moneda: 'ARS', precio: 83000000, totales: 11000, cubiertos: 11000, terreno: 42000, ambientes: 0, dormitorios: 0, banos: 0, toilet: 0, cocheras: 0, antiguedad: 15, expensas: 0, img: 'img/zarate.jpg',
      ubicacion: 'Panamericana Km 90 0, Zárate, Zárate, Buenos Aires',
      desc: 'Alquiler de nave industrial completa de 11.000 m² en Zárate. Excepcional bloque logístico e industrial: un centro de operaciones premium sobre la Colectora Oeste de la Panamericana (Km 90), con 42.000 m² de terreno.' },
    { id: 6, titulo: 'Pilar, Buenos Aires', tipo: 'terreno', operacion: 'venta', estado: 'disponible', precio: 210000, totales: 900, cubiertos: 0, ambientes: 0, dormitorios: 0, banos: 0, toilet: 0, cocheras: 0, antiguedad: null, expensas: 0, img: 'img/ph-terreno.jpg',
      desc: 'Lote plano en barrio abierto con todos los servicios. Frente de 20 metros, ideal para vivienda unifamiliar.' },
    { id: 7, titulo: 'Barcelona, España', tipo: 'departamento', operacion: 'venta', estado: 'vendida', precio: 640000, totales: 110, cubiertos: 102, ambientes: 4, dormitorios: 3, banos: 2, toilet: 0, cocheras: 1, antiguedad: 12, expensas: 260, img: 'img/ph-depto.jpg',
      desc: 'Departamento reformado en el Eixample, con techos altos, balcón a la calle y cocina abierta.' },
    { id: 8, titulo: 'Punta del Este, Uruguay', tipo: 'casa', operacion: 'alquiler', estado: 'alquilada', precio: 5200, totales: 410, cubiertos: 280, ambientes: 7, dormitorios: 5, banos: 4, toilet: 1, cocheras: 2, antiguedad: 9, expensas: 0, img: 'img/ph-casa.jpg',
      desc: 'Casa de veraneo a pasos de la playa, con parque arbolado, piscina climatizada y barbacoa.' },
    { id: 9, titulo: 'Torre Aura, Puerto Madero', tipo: 'departamento', operacion: 'venta', estado: 'en_construccion', precio: 350000, totales: 82, cubiertos: 74, ambientes: 3, dormitorios: 2, banos: 2, toilet: 0, cocheras: 1, antiguedad: 0, expensas: 0, img: 'img/ph-torre.jpg',
      desc: 'Unidad en pozo dentro de Torre Aura, con entrega prevista para diciembre de 2027 y seguimiento online del avance de obra.' }
  ];
  /* Emprendimientos en construcción (editá acá los datos) */
  const EMPRENDIMIENTOS = [
    { id: 1, nombre: 'Torre Aura', ubicacion: 'Puerto Madero, Buenos Aires', tipo: 'Torre residencial', avance: 62, entrega: 'Dic 2027', unidades: 84, disponibles: 31, desde: 350000, img: 'img/ph-torre.jpg',
      desc: 'Torre de 28 pisos con departamentos de 2 a 4 ambientes, amenities con pileta cubierta, gimnasio y coworking, y vistas abiertas al río.' },
    { id: 2, nombre: 'Barrio Los Olivos', ubicacion: 'Pilar, Buenos Aires', tipo: 'Barrio cerrado', avance: 35, entrega: 'Jun 2028', unidades: 120, disponibles: 74, desde: 98000, img: 'img/ph-barrio.jpg',
      desc: 'Barrio cerrado con lotes desde 600 m², club house, canchas deportivas y seguridad las 24 horas, rodeado de espacios verdes.' },
    { id: 3, nombre: 'Aura Costa', ubicacion: 'Mar del Plata, Buenos Aires', tipo: 'Complejo frente al mar', avance: 81, entrega: 'Mar 2027', unidades: 46, disponibles: 12, desde: 210000, img: 'img/ph-complejo.jpg',
      desc: 'Complejo de departamentos a metros de la playa, con solárium, pileta y cocheras cubiertas. Últimas unidades disponibles.' },
    { id: 4, nombre: 'Loft Palermo Soho', ubicacion: 'Palermo, Buenos Aires', tipo: 'Lofts', avance: 12, entrega: 'Nov 2028', unidades: 28, disponibles: 25, desde: 145000, img: 'img/ph-loft.jpg',
      desc: 'Lofts de doble altura con ventanales de arco y terrazas privadas, en el corazón del barrio más vibrante de la ciudad.' }
  ];
  const ESTADO_TXT = { disponible: 'Disponible', reservada: 'Reservada', vendida: 'Vendida', alquilada: 'Alquilada', en_construccion: 'En construcción' };
  const eur = n => '€' + miles(n);
  const fmtPrecio = (n, moneda) => (moneda === 'USD' || moneda === 'ARS') ? miles(n) + ' ' + moneda : '€' + miles(n);
  const plural = (n, s, p) => (n === 1 ? s : p);
  const escHTML = t => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* El estado de una propiedad cambia al comprar, reservar o alquilar (se guarda en el navegador) */
  const estadoDe = p => (store.get('aura_estados', {})[p.id]) || p.estado;
  function setEstado(id, estado) { const e = store.get('aura_estados', {}); e[id] = estado; store.set('aura_estados', e); }
  const estaLibre = p => { const e = estadoDe(p); return e === 'disponible' || e === 'en_construccion'; };

  /* Íconos y grilla de características (detalle de propiedad y pago) */
  const ICONOS = {
    totales:   '<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M8 16l8-8M11 8h5v5"/>',
    cubiertos: '<path d="M4 11l8-7 8 7v9H4z"/><path d="M9 16l6-6M11 10h4v4"/>',
    ambientes: '<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M12 3.5v6M3.5 12h6M14 12h6.5M12 14v6.5"/>',
    banos:     '<path d="M3 12h18v2a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z"/><path d="M6 12V6a2 2 0 0 1 4 0"/><path d="M7 19l-1 2M17 19l1 2"/>',
    toilet:    '<path d="M8 3h5v7"/><path d="M5 10h14v3a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6z"/><path d="M9 19v2M15 19v2"/>',
    cochera:   '<path d="M3 11l9-7 9 7v9H3z"/><path d="M7 20v-5h10v5M7 17h10"/>',
    dormitorio:'<path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6"/><path d="M3 15h18M7 10V7h10v3"/>',
    terreno:   '<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M8 8l8 8M8 12V8h4M16 12v4h-4"/>',
    antig:     '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M8 3v4M16 3v4"/>'
  };
  function featuresPropiedad(p) {
    const a = [['totales', miles(p.totales), 'm² totales']];
    if (p.cubiertos) a.push(['cubiertos', miles(p.cubiertos), 'm² cubiertos']);
    if (p.terreno) a.push(['terreno', miles(p.terreno), 'm² terreno']);
    if (p.ambientes) a.push(['ambientes', p.ambientes, 'ambientes']);
    if (p.banos) a.push(['banos', p.banos, plural(p.banos, 'baño', 'baños')]);
    if (p.toilet) a.push(['toilet', p.toilet, plural(p.toilet, 'toilet', 'toilets')]);
    if (p.cocheras) a.push(['cochera', p.cocheras, plural(p.cocheras, 'cochera', 'cocheras')]);
    if (p.dormitorios) a.push(['dormitorio', p.dormitorios, plural(p.dormitorios, 'dormitorio', 'dormitorios')]);
    if (p.antiguedad != null) a.push(['antig', p.antiguedad, plural(p.antiguedad, 'año antigüedad', 'años antigüedad')]);
    return a;
  }
  const featureGrid = items => '<ul class="detalle-grid">' + items.map(i =>
    '<li><svg viewBox="0 0 24 24" aria-hidden="true">' + ICONOS[i[0]] + '</svg><span><b>' + escHTML(i[1]) + '</b> ' + escHTML(i[2]) + '</span></li>').join('') + '</ul>';

  /* Tarjeta de propiedad (catálogo y destacadas) */
  function tarjetaProp(p) {
    const est = estadoDe(p);
    return '<a class="prop-card" href="propiedad.html?id=' + p.id + '">' +
      '<img src="' + p.img + '" alt="' + escHTML(p.titulo) + '" loading="lazy">' +
      '<span class="badge badge-op">' + (p.operacion === 'venta' ? 'Venta' : 'Alquiler') + '</span>' +
      '<span class="badge badge-estado estado-' + est + '">' + ESTADO_TXT[est] + '</span>' +
      '<div class="card-body">' +
        '<div class="card-row"><h3>' + escHTML(p.titulo) + '</h3>' +
          '<div class="card-meta"><span>' + miles(p.totales) + ' m²</span>' + (p.dormitorios ? '<span>' + p.dormitorios + ' hab.</span>' : '') + '</div></div>' +
        '<p class="card-price">' + fmtPrecio(p.precio, p.moneda) + (p.operacion === 'alquiler' ? ' / mes' : '') + '</p>' +
      '</div></a>';
  }

  /* Formato simple que usan inicio y pago */
  const PROPIEDADES = CATALOGO.map(p => ({ id: p.id, ciudad: p.titulo, m2: p.totales, hab: p.dormitorios, precio: fmtPrecio(p.precio, p.moneda), img: p.img }));

  const page = document.body.dataset.page || '';

  /* ---------- Cuentas y sesión (simuladas en el navegador) ---------- */
  const store = {
    get(k, def) { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? def : v; } catch (e) { return def; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } }
  };
  function usuarios() {
    let u = store.get('aura_users', null);
    if (!u) {
      u = [{ nombre: 'Cliente Demo', dni: '30123456', tel: '+54 11 1234-5678', email: 'demo@aura.com', password: '123456', tipo: 'ambos' }];
      store.set('aura_users', u);
    }
    return u;
  }
  function usuarioActual() {
    const email = store.get('aura_session', null);
    return email ? usuarios().find(u => u.email === email) || null : null;
  }
  function cerrarSesion() { try { localStorage.removeItem('aura_session'); } catch (e) { /* noop */ } }

  /* ---------- Header ---------- */
  const header = document.getElementById('site-header');
  if (header) {
    const links = [
      { href: 'index.html',       label: 'Inicio',      key: 'index' },
      { href: 'propiedades.html', label: 'Propiedades', key: 'propiedades' },
      { href: 'construcciones.html', label: 'Emprendimientos', key: 'construcciones' },
      { href: 'nosotros.html', label: 'Nosotros', key: 'nosotros' },
      { href: 'index.html#contacto', label: 'Contacto', key: 'contacto' }
    ];
    header.innerHTML =
      '<div class="nav">' +
        '<a class="logo" href="index.html"><img src="img/logo.png" alt="Aura Real Estate"></a>' +
        '<nav>' + links.map(l =>
          '<a href="' + l.href + '"' + (l.key === page || (l.key === 'construcciones' && page === 'construccion') ? ' class="active"' : '') + '>' + l.label + '</a>'
        ).join('') + '</nav>' +
        '<div class="nav-right">' +
          (usuarioActual()
            ? '<a class="nav-user" href="mi-cuenta.html">Hola, ' + usuarioActual().nombre.split(' ')[0].replace(/[<>&"]/g, '') + '</a><button type="button" id="btn-logout" class="btn btn-outline btn-sm">Salir</button>'
            : '<a class="btn btn-primary btn-sm" href="registro.html">Registrarse</a>') +
        '</div>' +
      '</div>';
    const salir = document.getElementById('btn-logout');
    if (salir) salir.addEventListener('click', () => { cerrarSesion(); window.location.href = 'index.html'; });
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

  /* ---------- Propiedades destacadas (página destacadas.html) ---------- */
  const destacadas = document.getElementById('destacadas');
  if (destacadas) {
    const dest = CATALOGO.filter(p => p.operacion === 'venta' && estaLibre(p)).slice(0, 2);
    destacadas.innerHTML = dest.map(tarjetaProp).join('');
  }
  const destSearch = document.getElementById('dest-search');
  if (destSearch) {
    destSearch.addEventListener('submit', e => {
      e.preventDefault();
      const q = document.getElementById('dest-search-input').value.trim();
      window.location.href = 'propiedades.html' + (q ? '?q=' + encodeURIComponent(q) : '');
    });
  }

  /* ---------- Catálogo de propiedades ---------- */
  const propGrid = document.getElementById('prop-grid');
  if (propGrid) {
    const escapar = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const f = {
      buscar: document.getElementById('f-buscar'), tipo: document.getElementById('f-tipo'), op: document.getElementById('f-operacion'),
      estado: document.getElementById('f-estado'), precio: document.getElementById('f-precio')
    };
    const contador = document.getElementById('result-count');

    const tarjeta = tarjetaProp;

    function filtrar() {
      const q = f.buscar.value.trim().toLowerCase();
      const max = parseFloat(f.precio.value);
      const res = CATALOGO.filter(p =>
        (!q || (p.titulo + ' ' + p.tipo + ' ' + p.operacion).toLowerCase().indexOf(q) !== -1) &&
        (!f.tipo.value || p.tipo === f.tipo.value) &&
        (!f.op.value || p.operacion === f.op.value) &&
        (!f.estado.value || estadoDe(p) === f.estado.value) &&
        (isNaN(max) || p.precio <= max));
      contador.textContent = res.length + (res.length === 1 ? ' propiedad encontrada' : ' propiedades encontradas');
      propGrid.innerHTML = res.length ? res.map(tarjeta).join('')
        : '<div class="no-results">No encontramos propiedades con esos filtros. Probá ampliar la búsqueda.</div>';
    }

    /* Búsqueda que viene del inicio: propiedades.html?q=miami */
    const qInicial = new URLSearchParams(location.search).get('q');
    if (qInicial) f.buscar.value = qInicial;

    Object.keys(f).forEach(k => { f[k].addEventListener('input', filtrar); f[k].addEventListener('change', filtrar); });
    document.getElementById('filtros-form').addEventListener('submit', e => { e.preventDefault(); filtrar(); });
    document.getElementById('f-limpiar').addEventListener('click', () => { Object.keys(f).forEach(k => { f[k].value = ''; }); filtrar(); });
    filtrar();
  }


  /* ---------- Registro ---------- */
  const registroForm = document.getElementById('registro-form');
  if (registroForm) {
    registroForm.noValidate = true;
    if (usuarioActual()) { window.location.replace('index.html'); }

    const campo = {
      nombre: document.getElementById('r-nombre'), dni: document.getElementById('r-dni'), tel: document.getElementById('r-telefono'),
      email: document.getElementById('r-email'), pass: document.getElementById('r-password'), tipo: document.getElementById('r-tipo')
    };
    const msgEmail = campo.email.closest('.form-field').querySelector('.error-msg');
    const MSG_EMAIL = msgEmail.textContent;
    const marcar = (input, ok) => { input.closest('.form-field').classList.toggle('error', !ok); return ok; };

    /* Formato automático del DNI: 30.123.456 */
    campo.dni.addEventListener('input', () => {
      const d = campo.dni.value.replace(/\D/g, '').slice(0, 9);
      campo.dni.value = d.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    });
    registroForm.querySelectorAll('input, select').forEach(i => i.addEventListener('input', () => i.closest('.form-field').classList.remove('error')));

    registroForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = campo.email.value.trim();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const existe = emailOk && usuarios().some(u => u.email.toLowerCase() === email.toLowerCase());
      msgEmail.textContent = existe ? 'Ya existe una cuenta con ese correo.' : MSG_EMAIL;
      const dniDigitos = campo.dni.value.replace(/\D/g, '');
      const nombre = campo.nombre.value.trim();

      const oks = [
        marcar(campo.nombre, nombre.length >= 5 && nombre.split(/\s+/).length >= 2),
        marcar(campo.dni, dniDigitos.length >= 7 && dniDigitos.length <= 9),
        marcar(campo.tel, campo.tel.value.replace(/\D/g, '').length >= 8),
        marcar(campo.email, emailOk && !existe),
        marcar(campo.pass, campo.pass.value.length >= 6)
      ];
      if (oks.indexOf(false) !== -1) return;

      const lista = usuarios();
      lista.push({ nombre: nombre, dni: dniDigitos, tel: campo.tel.value.trim(), email: email, password: campo.pass.value, tipo: campo.tipo.value });
      store.set('aura_users', lista);
      store.set('aura_session', email);

      /* Aviso de éxito y redirección (a ?next=... si vino de otra página) */
      registroForm.querySelector('button[type="submit"]').disabled = true;
      let ok = registroForm.querySelector('.form-message');
      if (!ok) { ok = document.createElement('div'); ok.className = 'form-message ok'; registroForm.appendChild(ok); }
      ok.textContent = '¡Cuenta creada! Te estamos llevando al inicio…';
      const next = new URLSearchParams(location.search).get('next');
      setTimeout(() => { window.location.href = next && /^[\w\-]+\.html/.test(next) ? next : 'index.html'; }, 1400);
    });
  }


  /* ---------- Mi cuenta ---------- */
  if (document.getElementById('mc-nombre')) {
    const AUTH_PAGE = 'registro.html';   /* cuando exista login.html, cambialo acá */
    const user = usuarioActual();
    if (!user) {
      window.location.replace(AUTH_PAGE + '?next=mi-cuenta.html');
    } else {
      const escMC = t => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
      const euros = (n, moneda) => fmtPrecio(n, moneda);
      const dmy = iso => { const d = new Date(iso); return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear(); };
      const TIPOS = { comprador: 'Comprador', inquilino: 'Inquilino', ambos: 'Comprador e inquilino' };

      document.getElementById('mc-nombre').textContent = user.nombre;
      document.getElementById('mc-email').textContent = user.email;
      document.getElementById('mc-dni').textContent = String(user.dni).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      document.getElementById('mc-tel').textContent = user.tel;
      document.getElementById('mc-tipo').textContent = TIPOS[user.tipo] || user.tipo;

      const claseEstado = e => e === 'Pagado' ? 'ok' : (e === 'Reservada' || e.indexOf('Pendiente') === 0 ? 'warn' : '');
      const filaOp = o =>
        '<div class="op-item"><div><b>' + escMC(o.titulo) + '</b><small>' + escMC(o.concepto) + ' · ' + dmy(o.fecha) + ' · N° ' + escMC(o.id) + '</small></div>' +
        '<div class="op-right"><strong>' + euros(o.monto, o.moneda) + '</strong><span class="op-estado ' + claseEstado(o.estado) + '">' + escMC(o.estado) + '</span></div></div>';

      function pintar() {
        const ops = store.get('aura_ops', []).filter(o => o.email === user.email);
        const compras = ops.filter(o => o.categoria === 'compra');
        const alquileres = ops.filter(o => o.categoria === 'alquiler');
        document.getElementById('mc-ventas').innerHTML = compras.length ? compras.map(filaOp).join('')
          : '<p class="empty">Todavía no tenés compras. <a href="propiedades.html">Explorá el catálogo</a>.</p>';
        document.getElementById('mc-alquileres').innerHTML = alquileres.length ? alquileres.map(filaOp).join('')
          : '<p class="empty">No tenés alquileres ni pagos registrados.</p>';
        const citas = store.get('aura_citas', []).filter(c => c.email === user.email);
        document.getElementById('mc-citas').innerHTML = citas.length ? citas.map(c =>
          '<div class="op-item"><div><b>' + escMC(c.titulo) + '</b><small>' + dmy(c.fecha + 'T12:00:00') + ' a las ' + escMC(c.hora) + ' h</small></div>' +
          '<div class="op-right"><span class="op-estado warn">' + escMC(c.estado) + '</span><button type="button" class="op-cancel" data-cita="' + escMC(c.id) + '">Cancelar</button></div></div>').join('')
          : '<p class="empty">No tenés visitas agendadas. <a href="agendar-cita.html">Agendá una</a>.</p>';
      }
      document.getElementById('mc-citas').addEventListener('click', e => {
        const b = e.target.closest('.op-cancel');
        if (!b) return;
        store.set('aura_citas', store.get('aura_citas', []).filter(c => c.id !== b.dataset.cita));
        pintar();
      });
      pintar();
    }
  }


  /* ---------- Nosotros: equipo de agentes ---------- */
  const equipoGrid = document.getElementById('equipo-grid');
  if (equipoGrid) {
    /* Editá acá los integrantes del equipo */
    const EQUIPO = [
      { nombre: 'Martina Suárez', rol: 'Directora comercial', texto: 'Más de 15 años liderando operaciones de alto valor en Buenos Aires y Miami.' },
      { nombre: 'Julián Paredes', rol: 'Agente senior · Ventas', texto: 'Especialista en departamentos y casas de categoría en zona norte y CABA.' },
      { nombre: 'Camila Ríos', rol: 'Agente · Alquileres', texto: 'Acompaña contratos de alquiler residenciales y comerciales de principio a fin.' },
      { nombre: 'Federico Lamas', rol: 'Asesor · Emprendimientos', texto: 'Guía a inversores en proyectos en pozo con seguimiento del avance de obra.' }
    ];
    const escEq = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    equipoGrid.innerHTML = EQUIPO.map(a =>
      '<article class="agente-card">' +
        '<div class="agente-avatar" aria-hidden="true">' + escEq(a.nombre.split(' ').map(x => x[0]).join('')) + '</div>' +
        '<h3>' + escEq(a.nombre) + '</h3>' +
        '<p class="agente-rol">' + escEq(a.rol) + '</p>' +
        '<p class="agente-texto">' + escEq(a.texto) + '</p>' +
      '</article>').join('');
  }


  /* ---------- Detalle de propiedad ---------- */
  const propDetalle = document.getElementById('prop-detalle');
  if (propDetalle) {
    const p = CATALOGO.find(x => x.id === parseInt(new URLSearchParams(location.search).get('id'), 10));
    if (!p) {
      propDetalle.innerHTML = '<a class="back-link" href="propiedades.html">← Volver al catálogo</a>' +
        '<p class="empty">No encontramos esa propiedad. <a href="propiedades.html">Mirá el catálogo completo</a>.</p>';
    } else {
      document.title = p.titulo + ' — Aura Real Estate';
      const est = estadoDe(p);
      const esVenta = p.operacion === 'venta';
      propDetalle.innerHTML =
        '<a class="back-link" href="propiedades.html">← Volver al catálogo</a>' +
        '<div class="prop-layout"><div>' +
          '<div class="prop-media"><img src="' + p.img + '" alt="' + escHTML(p.titulo) + '">' +
            '<span class="badge badge-op">' + (esVenta ? 'Venta' : 'Alquiler') + '</span>' +
            '<span class="badge badge-estado estado-' + est + '">' + ESTADO_TXT[est] + '</span></div>' +
          '<h1 class="prop-title">' + escHTML(p.titulo) + '</h1>' +
          '<p class="prop-sub">' + escHTML(p.tipo) + ' · ' + (esVenta ? 'en venta' : 'en alquiler') + '</p>' +
          '<p class="prop-desc">' + escHTML(p.desc) + '</p>' +
          (p.ubicacion ? '<div class="prop-ubic"><h2>Ubicación</h2><p>' + escHTML(p.ubicacion) + '</p></div>' : '') +
        '</div>' +
        '<aside class="panel prop-side">' +
          '<span class="detalle-tag">' + (esVenta ? 'Venta' : 'Alquiler') + '</span>' +
          '<p class="detalle-precio">' + fmtPrecio(p.precio, p.moneda) + (esVenta ? '' : ' / mes') + '</p>' +
          '<p class="detalle-expensas">' + (p.expensas ? 'Expensas : ' + eur(p.expensas) + ' / mes' : '&nbsp;') + '</p>' +
          featureGrid(featuresPropiedad(p)) +
          (estaLibre(p)
            ? '<div class="prop-cta"><a class="btn btn-primary" href="pago.html?id=' + p.id + '">' + (esVenta ? 'Comprar ahora' : 'Alquilar ahora') + '</a>' +
              '<a class="btn btn-outline" href="agendar-cita.html?prop=' + p.id + '">Agendar visita</a></div>' +
              '<p class="prop-nota">Reservá con una seña menor y contá con 24 horas para completar la operación.</p>'
            : '<div class="prop-agotada">Esta propiedad está ' + ESTADO_TXT[est].toLowerCase() + '. Mirá otras opciones del catálogo.</div>' +
              '<div class="prop-cta"><a class="btn btn-outline" href="propiedades.html">Ver catálogo</a></div>') +
        '</aside></div>';
    }
  }


  /* ---------- Agendar cita ---------- */
  const citaForm = document.getElementById('cita-form');
  if (citaForm) {
    const AUTH_PAGE = 'registro.html';   /* cuando exista login.html, cambialo acá */
    const user = usuarioActual();
    if (!user) {
      window.location.replace(AUTH_PAGE + '?next=' + encodeURIComponent('agendar-cita.html' + location.search));
    } else {
      citaForm.noValidate = true;
      const selProp = document.getElementById('cita-propiedad');
      const inFecha = document.getElementById('cita-fecha');
      const inHora = document.getElementById('cita-hora');
      const boton = citaForm.querySelector('button[type="submit"]');
      const dmy = iso => { const d = new Date(iso); return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear(); };

      /* Propiedades que se pueden visitar (las no disponibles no aparecen) */
      const visitables = CATALOGO.filter(estaLibre);
      selProp.innerHTML =
        '<optgroup label="Propiedades">' + visitables.map(p =>
          '<option value="p' + p.id + '">' + escHTML(p.titulo) + ' — ' + (p.operacion === 'venta' ? 'Venta' : 'Alquiler') + '</option>').join('') + '</optgroup>' +
        '<optgroup label="Emprendimientos">' + EMPRENDIMIENTOS.map(e =>
          '<option value="e' + e.id + '">' + escHTML(e.nombre) + ' — En pozo</option>').join('') + '</optgroup>';
      const qsCita = new URLSearchParams(location.search);
      const pre = qsCita.get('emp') ? 'e' + qsCita.get('emp') : (qsCita.get('prop') ? 'p' + qsCita.get('prop') : '');
      if (pre && Array.from(selProp.options).some(o => o.value === pre)) selProp.value = pre;

      /* Fecha mínima: hoy */
      const hoy = new Date();
      const hoyISO = hoy.getFullYear() + '-' + String(hoy.getMonth() + 1).padStart(2, '0') + '-' + String(hoy.getDate()).padStart(2, '0');
      inFecha.min = hoyISO;

      /* Aviso de horarios y mensaje de error */
      const aviso = document.createElement('p');
      aviso.className = 'cita-aviso';
      aviso.textContent = 'Atendemos de lunes a viernes de 9 a 18 h.';
      const error = document.createElement('p');
      error.className = 'cita-error';
      error.hidden = true;
      citaForm.insertBefore(aviso, boton);
      citaForm.insertBefore(error, boton);
      const fallo = t => { error.textContent = t; error.hidden = false; };
      [selProp, inFecha, inHora].forEach(el => el.addEventListener('input', () => { error.hidden = true; }));

      citaForm.addEventListener('submit', e => {
        e.preventDefault();
        const fecha = inFecha.value, hora = inHora.value;
        if (!selProp.value) { fallo('No hay propiedades disponibles para visitar.'); return; }
        if (!fecha) { fallo('Elegí una fecha para la visita.'); return; }
        const d = new Date(fecha + 'T12:00:00');
        const h0 = new Date(); h0.setHours(0, 0, 0, 0);
        if (d < h0) { fallo('La fecha no puede ser anterior a hoy.'); return; }
        if (d.getDay() === 0 || d.getDay() === 6) { fallo('Atendemos de lunes a viernes. Elegí otro día.'); return; }
        if (!hora || hora < '09:00' || hora > '18:00') { fallo('El horario de atención es de 9 a 18 h.'); return; }

        const refId = parseInt(selProp.value.slice(1), 10);
        const esEmp = selProp.value[0] === 'e';
        const prop = esEmp ? { id: refId, titulo: (EMPRENDIMIENTOS.find(x => x.id === refId) || {}).nombre } : CATALOGO.find(x => x.id === refId);
        const clave = selProp.value;
        const citas = store.get('aura_citas', []);
        if (citas.some(c => c.email === user.email && (c.clave || 'p' + c.propId) === clave && c.fecha === fecha && c.hora === hora)) {
          fallo('Ya tenés una visita agendada para esa propiedad en ese horario.'); return;
        }
        const cita = {
          id: 'CIT-' + Date.now().toString().slice(-6), email: user.email, propId: prop.id, clave: clave, titulo: prop.titulo,
          fecha: fecha, hora: hora, estado: 'Pendiente de confirmación'
        };
        citas.unshift(cita);
        store.set('aura_citas', citas);

        /* Pantalla de confirmación dentro de la misma tarjeta */
        const card = citaForm.closest('.cita-card');
        card.innerHTML =
          '<div class="cita-ok">' +
            '<div class="cita-ok-ico">✓</div>' +
            '<h1 class="section-title">¡Visita agendada!</h1>' +
            '<p class="section-sub">Un agente va a confirmar tu cita a la brevedad.</p>' +
            '<div class="cita-resumen">' +
              '<div><span>Propiedad</span><b>' + escHTML(cita.titulo) + '</b></div>' +
              '<div><span>Fecha</span><b>' + dmy(cita.fecha + 'T12:00:00') + '</b></div>' +
              '<div><span>Hora</span><b>' + escHTML(cita.hora) + ' h</b></div>' +
              '<div><span>Estado</span><b>' + escHTML(cita.estado) + '</b></div>' +
              '<div><span>Referencia</span><b>' + escHTML(cita.id) + '</b></div>' +
            '</div>' +
            '<div class="cita-acciones"><a class="btn btn-primary" href="mi-cuenta.html">Ver mis visitas</a>' +
            '<a class="btn btn-ghost" href="propiedades.html">Seguir explorando</a></div>' +
          '</div>';
      });
    }
  }


  /* ---------- Emprendimientos: listado (construcciones.html) ---------- */
  const empGrid = document.getElementById('construcciones-grid');
  if (empGrid) {
    empGrid.innerHTML = EMPRENDIMIENTOS.map(e =>
      '<a class="prop-card emp-card" href="construccion.html?id=' + e.id + '">' +
        '<img src="' + e.img + '" alt="' + escHTML(e.nombre) + '" loading="lazy">' +
        '<span class="badge badge-op">' + escHTML(e.tipo) + '</span>' +
        '<span class="badge badge-estado estado-en_construccion">En construcción</span>' +
        '<div class="card-body">' +
          '<h3>' + escHTML(e.nombre) + '</h3>' +
          '<p class="emp-loc">' + escHTML(e.ubicacion) + '</p>' +
          '<div class="progress"><div class="progress-top"><span>Avance de obra</span><b>' + e.avance + '%</b></div>' +
            '<div class="progress-bar"><i style="width:' + e.avance + '%"></i></div></div>' +
          '<p class="card-price"><small>Desde</small> ' + eur(e.desde) + '</p>' +
        '</div></a>').join('');
  }

  /* ---------- Emprendimientos: detalle (construccion.html?id=...) ---------- */
  const empDetalle = document.getElementById('construccion-detalle');
  if (empDetalle) {
    const e = EMPRENDIMIENTOS.find(x => x.id === parseInt(new URLSearchParams(location.search).get('id'), 10));
    if (!e) {
      empDetalle.innerHTML = '<a class="back-link" href="construcciones.html">← Volver a emprendimientos</a>' +
        '<p class="empty">No encontramos ese emprendimiento. <a href="construcciones.html">Mirá el listado completo</a>.</p>';
    } else {
      document.title = e.nombre + ' — Aura Real Estate';
      const ETAPAS = [['Movimiento de suelo y cimientos', 0, 20], ['Estructura de hormigón', 20, 50], ['Cerramientos e instalaciones', 50, 75], ['Terminaciones y amenities', 75, 100], ['Entrega de unidades', 100, 101]];
      const timeline = ETAPAS.map(et => {
        const cls = e.avance >= et[2] ? 'done' : (e.avance >= et[1] ? 'current' : 'pending');
        const txt = cls === 'done' ? 'Completada' : (cls === 'current' ? 'En curso' : 'Próximamente');
        return '<div class="tl-item ' + cls + '"><b>' + et[0] + '</b><span>' + txt + '</span></div>';
      }).join('');
      empDetalle.innerHTML =
        '<a class="back-link" href="construcciones.html">← Volver a emprendimientos</a>' +
        '<div class="emp-layout"><div>' +
          '<div class="emp-hero"><img src="' + e.img + '" alt="' + escHTML(e.nombre) + '">' +
            '<span class="badge badge-op">' + escHTML(e.tipo) + '</span><span class="badge badge-estado estado-en_construccion">En construcción</span></div>' +
          '<h1 class="emp-title">' + escHTML(e.nombre) + '</h1>' +
          '<p class="emp-sub">' + escHTML(e.tipo) + ' · ' + escHTML(e.ubicacion) + '</p>' +
          '<p class="emp-desc">' + escHTML(e.desc) + '</p>' +
          '<div class="timeline"><h2>Seguimiento de obra</h2><div class="timeline-list">' + timeline + '</div></div>' +
        '</div>' +
        '<aside class="panel emp-side">' +
          '<span class="detalle-tag">En pozo</span>' +
          '<p class="detalle-precio"><small>Desde</small> ' + eur(e.desde) + '</p>' +
          '<div class="progress"><div class="progress-top"><span>Avance de obra</span><b>' + e.avance + '%</b></div>' +
            '<div class="progress-bar"><i style="width:' + e.avance + '%"></i></div></div>' +
          '<p class="detalle-expensas">Seña de reserva: ' + eur(Math.round(e.desde * 0.1)) + ' (10%)</p>' +
          featureGrid([['antig', e.entrega, 'entrega estimada'], ['ambientes', e.unidades, 'unidades'], ['totales', e.disponibles, 'disponibles'], ['cubiertos', e.avance + '%', 'de avance']]) +
          '<div class="emp-cta"><a class="btn btn-primary" href="pago.html?emp=' + e.id + '">Reservar unidad</a>' +
            '<a class="btn btn-outline" href="agendar-cita.html?emp=' + e.id + '">Agendar visita</a></div>' +
          '<p class="emp-nota">Reservá con una seña menor y contá con 24 horas para completar la operación.</p>' +
        '</aside></div>';
    }
  }


  /* ---------- Contacto en el inicio: menú activo y tecla Esc ---------- */
  if (page === 'index' && document.getElementById('contacto')) {
    const marcarMenu = () => {
      const abierto = location.hash === '#contacto';
      document.querySelectorAll('#site-header nav a').forEach(a => {
        const href = a.getAttribute('href');
        a.classList.toggle('active', abierto ? href === 'index.html#contacto' : href === 'index.html');
      });
    };
    window.addEventListener('hashchange', marcarMenu);
    marcarMenu();
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && location.hash === '#contacto') window.location.hash = ''; });
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
      nombre:  { el: document.getElementById('Nombre'),  msg: 'Ingresá tu nombre.' },
      mensaje: { el: document.getElementById('mensaje'), msg: 'Escribí tu mensaje (mínimo 10 caracteres).' }
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

  /* ---------- Pago ---------- */
  const resumen = document.getElementById('resumen-compra');
  const pagoForm = document.getElementById('pago-form');
  if (resumen && pagoForm) {
    const qs = new URLSearchParams(location.search);
    const emp = qs.get('emp') ? EMPRENDIMIENTOS.find(e => String(e.id) === qs.get('emp')) : null;   /* pago.html?emp=ID = seña de un emprendimiento */
    const idProp = parseInt(qs.get('id'), 10) || 1;
    const prop = emp ? { id: emp.id, ciudad: emp.nombre, img: emp.img } : (PROPIEDADES.find(p => p.id === idProp) || PROPIEDADES[0]);
    const infoProp = emp ? null : CATALOGO.find(x => x.id === prop.id);
    const sena = emp ? Math.round(emp.desde * 0.1) : 0;
    /* Si la propiedad ya no está disponible, volvemos a su detalle */
    if (infoProp && !estaLibre(infoProp)) window.location.replace('propiedad.html?id=' + infoProp.id);

    resumen.innerHTML =
      '<img src="' + prop.img + '" alt="' + prop.ciudad + '">' +
      '<div class="resumen-body">' +
        '<span class="resumen-label">Resumen de la operación</span>' +
        '<h2>' + prop.ciudad + '</h2>' +
        (emp ? '' : '<div class="resumen-meta"><span>' + prop.m2 + ' m²</span><span>' + prop.hab + ' hab.</span></div>' +
        '<div class="resumen-total"><span>Total</span><strong>' + prop.precio + '</strong></div>') +
      '</div>';

    /* Tarjeta de detalle (datos del catálogo) */
    const detalleBox = document.getElementById('detalle-propiedad');
    if (detalleBox && emp) {
      detalleBox.innerHTML =
        '<span class="detalle-tag">En pozo</span>' +
        '<p class="detalle-precio">' + eur(sena) + '</p>' +
        '<p class="detalle-expensas">Seña de reserva (10% del precio desde ' + eur(emp.desde) + ')</p>' +
        featureGrid([['antig', emp.entrega, 'entrega estimada'], ['ambientes', emp.unidades, 'unidades'], ['totales', emp.disponibles, 'disponibles'], ['cubiertos', emp.avance + '%', 'de avance']]);
    } else if (detalleBox && infoProp) {
      detalleBox.innerHTML =
        '<span class="detalle-tag">' + (infoProp.operacion === 'venta' ? 'Venta' : 'Alquiler') + '</span>' +
        '<p class="detalle-precio">' + fmtPrecio(infoProp.precio, infoProp.moneda) + (infoProp.operacion === 'alquiler' ? ' / mes' : '') + '</p>' +
        '<p class="detalle-expensas">' + (infoProp.expensas ? 'Expensas : ' + eur(infoProp.expensas) + ' / mes' : '&nbsp;') + '</p>' +
        featureGrid(featuresPropiedad(infoProp));
    }

    const wrap = document.getElementById('pago-form-wrap');
    const fallido = document.getElementById('pago-fallido');
    const content = document.querySelector('.pago-content');
    const btnPagar = document.getElementById('btn-pagar');
    const f = {
      nombre: document.getElementById('pago-nombre'),
      numero: document.getElementById('pago-numero'),
      venc:   document.getElementById('pago-vencimiento'),
      cvv:    document.getElementById('pago-cvv')
    };
    const reglas = {
      nombre: { ok: v => v.trim().length >= 2,                         msg: 'Ingresá el nombre como figura en la tarjeta.' },
      numero: { ok: v => v.replace(/\D/g, '').length === 16,           msg: 'El número debe tener 16 dígitos.' },
      venc:   { ok: v => /^(0[1-9]|1[0-2])\/\d{2}$/.test(v),           msg: 'Usá el formato MM/AA.' },
      cvv:    { ok: v => /^\d{3,4}$/.test(v),                          msg: 'El CVV debe tener 3 o 4 dígitos.' }
    };

    function marcarCampo(k) {
      const ok = reglas[k].ok(f[k].value);
      const box = f[k].closest('.form-field');
      let err = box.querySelector('.field-error');
      box.classList.toggle('error', !ok);
      if (ok && err) err.remove();
      if (!ok) {
        if (!err) { err = document.createElement('span'); err.className = 'field-error'; box.appendChild(err); }
        err.textContent = reglas[k].msg;
      }
      return ok;
    }

    /* Formato automático mientras se escribe */
    f.numero.addEventListener('input', () => {
      const d = f.numero.value.replace(/\D/g, '').slice(0, 16);
      f.numero.value = d.replace(/(.{4})/g, '$1 ').trim();
    });
    f.venc.addEventListener('input', () => {
      const d = f.venc.value.replace(/\D/g, '').slice(0, 4);
      f.venc.value = d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d;
    });
    f.cvv.addEventListener('input', () => { f.cvv.value = f.cvv.value.replace(/\D/g, '').slice(0, 4); });
    Object.keys(f).forEach(k => f[k].addEventListener('input', () => {
      if (f[k].closest('.form-field').classList.contains('error')) marcarCampo(k);
    }));

    /* Pantallas de resultado */
    function mostrarResultado(titulo, texto) {
      wrap.classList.add('hidden');
      fallido.classList.add('hidden');
      let r = document.getElementById('pago-resultado');
      if (!r) {
        r = document.createElement('div');
        r.id = 'pago-resultado';
        r.className = 'panel pago-resultado';
        content.appendChild(r);
      }
      r.innerHTML = '';
      const h = document.createElement('h1'); h.textContent = titulo;
      const p = document.createElement('p');  p.textContent = texto;
      const a = document.createElement('a');  a.href = 'index.html'; a.className = 'btn btn-primary'; a.textContent = 'Volver al inicio';
      r.append(h, p, a);
      r.classList.remove('hidden');
    }
    function volverAlFormulario() {
      fallido.classList.add('hidden');
      wrap.classList.remove('hidden');
    }

    /* Guarda la operación en "Mi cuenta" (solo si hay sesión iniciada) */
    function registrarOperacion(concepto, estado, factor, idOp, nuevoEstado) {
      const u = usuarioActual();
      if (!u) return null;
      const ops = store.get('aura_ops', []);
      const op = {
        id: idOp || 'AUR-' + Date.now().toString().slice(-6) + Math.floor(10 + Math.random() * 90),
        email: u.email, titulo: prop.ciudad, concepto: concepto, estado: estado, moneda: infoProp && infoProp.moneda ? infoProp.moneda : 'EUR',
        monto: Math.round((emp ? sena : (infoProp ? infoProp.precio : 0)) * factor),
        categoria: infoProp && infoProp.operacion === 'alquiler' ? 'alquiler' : 'compra',
        fecha: new Date().toISOString()
      };
      ops.unshift(op);
      store.set('aura_ops', ops);
      if (infoProp && nuevoEstado) setEstado(infoProp.id, nuevoEstado);
      return op;
    }
    const notaCuenta = () => usuarioActual() ? ' Podés seguir esta operación desde Mi cuenta.' : ' Iniciá sesión o creá tu cuenta para seguir tus operaciones desde Mi cuenta.';

    /* Envío: solo números 1 en la tarjeta => éxito; solo 0 (u otro valor) => no procesado */
    pagoForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let todoOk = true;
      Object.keys(f).forEach(k => { if (!marcarCampo(k)) todoOk = false; });
      if (!todoOk) return;

      const digitos = f.numero.value.replace(/\D/g, '');
      btnPagar.disabled = true;
      btnPagar.textContent = 'Procesando...';
      setTimeout(function () {
        btnPagar.disabled = false;
        btnPagar.textContent = 'Pagar ahora';
        if (/^1+$/.test(digitos)) {
          registrarOperacion(emp ? 'Seña de reserva (10%)' : (infoProp && infoProp.operacion === 'alquiler' ? 'Alquiler — primer mes' : 'Compra'), 'Pagado', 1, null, infoProp && infoProp.operacion === 'alquiler' ? 'alquilada' : 'vendida');
          mostrarResultado('¡Pago exitoso!', 'Gracias, ' + f.nombre.value.trim() + '. Recibimos el pago de ' + prop.ciudad + ' y un agente se va a comunicar con vos.' + notaCuenta());
        } else {
          wrap.classList.add('hidden');
          fallido.classList.remove('hidden');
        }
      }, 900);
    });

    /* Opciones de la pantalla "Pago no procesado" */
    document.getElementById('btn-reintentar').addEventListener('click', function () {
      volverAlFormulario();
      f.numero.focus();
    });
    document.getElementById('btn-otra-tarjeta').addEventListener('click', function () {
      pagoForm.reset();
      pagoForm.querySelectorAll('.error').forEach(x => x.classList.remove('error'));
      pagoForm.querySelectorAll('.field-error').forEach(x => x.remove());
      volverAlFormulario();
      f.nombre.focus();
    });
    document.getElementById('btn-transferencia').addEventListener('click', function () {
      const ref = 'AURA-' + prop.id + '-' + Math.floor(1000 + Math.random() * 9000);
      registrarOperacion('Pago por transferencia', 'Pendiente de transferencia', 1, ref);
      mostrarResultado('Pago por transferencia', 'Te enviamos los datos bancarios a tu correo. Referencia de la operación: ' + ref + '.' + notaCuenta());
    });
    document.getElementById('btn-reservar-ahora').addEventListener('click', function () {
      registrarOperacion('Reserva por 24 h (seña 10%)', 'Reservada', 0.1, null, 'reservada');
      mostrarResultado(emp ? '¡Unidad reservada!' : '¡Propiedad reservada!', prop.ciudad + ' queda reservada durante 24 horas con una seña menor. Tenés ese tiempo para completar la operación.' + notaCuenta());
    });
    document.getElementById('btn-ahora-no').addEventListener('click', function () {
      window.location.href = emp ? 'construccion.html?id=' + emp.id : (infoProp ? 'propiedad.html?id=' + infoProp.id : 'index.html');
    });
  }

  /* ---------- Sección Nosotros (ancla) ---------- */
  const why = document.querySelector('.why-section');
  if (why && !why.id) why.id = 'nosotros';
})();
