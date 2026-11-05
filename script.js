/* Hidráulica Francisco. Todo el contenido funciona sin este archivo; aquí solo se añade el comportamiento. */
(() => {
  const WA = "https://wa.me/5215514035647?text=";
  const reducido = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- Menú móvil ---------- */
  const menuBtn = $(".menu-btn");
  const enlaces = $(".nav-enlaces");
  if (menuBtn && enlaces) {
    const cerrar = () => { enlaces.classList.remove("abierto"); menuBtn.setAttribute("aria-expanded", "false"); };
    menuBtn.addEventListener("click", () => menuBtn.setAttribute("aria-expanded", String(enlaces.classList.toggle("abierto"))));
    enlaces.addEventListener("click", e => { if (e.target.closest("a")) cerrar(); });
    addEventListener("keydown", e => { if (e.key === "Escape" && enlaces.classList.contains("abierto")) { cerrar(); menuBtn.focus(); } });
  }

  /* ---------- Encendido de la portada: una sola vez por visita ---------- */
  const portada = $(".portada");
  if (portada && !reducido) {
    let visto = false;
    try { visto = sessionStorage.getItem("encendido") === "1"; sessionStorage.setItem("encendido", "1"); } catch { /* sin almacenamiento también funciona */ }
    if (!visto) portada.classList.add("encendido");
  }

  /* ---------- Circuito: la válvula cambia presión y retorno ---------- */
  const circuito = $(".circuito");
  if (circuito) {
    const btn = $(".valvula-btn", circuito);
    const texto = $(".valvula-texto", circuito);
    const aviso = $(".circuito-aviso", circuito);
    const lineas = [["a", "c-rojo", "c-turq"], ["b", "c-turq", "c-rojo"]];
    const pintar = extendiendo => {
      circuito.classList.toggle("estado-b", !extendiendo);
      lineas.forEach(([n, ext, ret]) => $$(`.ln-${n}`, circuito).forEach(el => {
        el.classList.remove("c-rojo", "c-turq");
        el.classList.add(extendiendo ? ext : ret);
      }));
      $(".flujo-a", circuito).classList.toggle("flujo-r", !extendiendo);
      $(".flujo-b", circuito).classList.toggle("flujo-r", extendiendo);
      btn.setAttribute("aria-pressed", String(!extendiendo));
      texto.textContent = extendiendo ? "Retraer el cilindro" : "Extender el cilindro";
      aviso.textContent = extendiendo ? "El cilindro se extiende." : "El cilindro se retrae.";
    };
    const alternar = () => pintar(circuito.classList.contains("estado-b"));
    btn.addEventListener("click", alternar);
    $(".valvula-toque", circuito).addEventListener("click", alternar);
    // En teléfono se acerca la vista a la válvula y al cilindro para que se distingan.
    const encuadre = matchMedia("(max-width: 820px)");
    const encuadrar = () => $("svg", circuito).setAttribute("viewBox", encuadre.matches ? "520 6 800 230" : "0 0 1320 262");
    encuadre.addEventListener("change", encuadrar);
    encuadrar();
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => circuito.classList.toggle("pausado", !e.isIntersecting)).observe(circuito);
    }
  }

  /* ---------- Tubo continuo: un solo trazo que se enciende al bajar ---------- */
  const SVGNS = "http://www.w3.org/2000/svg";
  const inicioTubo = $("main");
  const finTubo = $("[data-tubo-fin]");
  if (inicioTubo && finTubo) {
    const svg = document.createElementNS(SVGNS, "svg");
    svg.classList.add("tubo-sitio");
    svg.setAttribute("aria-hidden", "true");
    const capas = ["ts-vidrio", "ts-halo", "ts-gas", "ts-nucleo"].map(c => {
      const p = document.createElementNS(SVGNS, "path");
      p.setAttribute("class", c);
      svg.append(p);
      return p;
    });
    const encendidas = capas.slice(1);
    document.body.append(svg);
    let largo = 0, yIni = 0, yFin = 0, tick = false;

    // Esquina doblada como vidrio: radio fijo en cada quiebre.
    const trazar = pts => {
      const r = 6;
      let d = `M${pts[0][0]} ${pts[0][1]}`;
      for (let i = 1; i < pts.length - 1; i++) {
        const [ax, ay] = pts[i - 1], [x, y] = pts[i], [bx, by] = pts[i + 1];
        const l1 = Math.hypot(x - ax, y - ay) || 1, l2 = Math.hypot(bx - x, by - y) || 1;
        const r1 = Math.min(r, l1 / 2), r2 = Math.min(r, l2 / 2);
        d += ` L${x - (x - ax) / l1 * r1} ${y - (y - ay) / l1 * r1} Q${x} ${y} ${x + (bx - x) / l2 * r2} ${y + (by - y) / l2 * r2}`;
      }
      const u = pts[pts.length - 1];
      return d + ` L${u[0]} ${u[1]}`;
    };

    const medir = () => {
      const ancho = innerWidth;
      const yAbs = el => el.getBoundingClientRect().top + scrollY;
      const contenedor = $(".contenedor", inicioTubo) || inicioTubo;
      const izq = contenedor.getBoundingClientRect().left;
      const movil = ancho < 821;
      const x = movil ? 10 : Math.max(16, izq - 30);
      const s = movil ? 3 : Math.min(9, Math.max(5, izq / 8));   // paso de la greca
      yIni = yAbs(inicioTubo);
      const rectFin = finTubo.getBoundingClientRect();
      yFin = rectFin.top + scrollY + rectFin.height / 2;
      const pts = [[x, yIni]];
      $$("main h2:not(.solo-lector):not(.datos h2)").forEach(h => {
        const y = yAbs(h) + 22;
        if (y <= pts[pts.length - 1][1] + 40 || y >= yFin - 60) return;
        // Greca: un escalón en espiral cuadrada en cada tema
        pts.push([x, y], [x + s * 2, y], [x + s * 2, y + s * 3], [x - s, y + s * 3], [x - s, y + s], [x + s * .6, y + s], [x + s * .6, y + s * 2.1], [x, y + s * 2.1], [x, y + s * 6]);
      });
      pts.push([x, yFin], [rectFin.left - 7, yFin]);
      const d = trazar(pts);
      capas.forEach(p => p.setAttribute("d", d));
      const alto = document.documentElement.scrollHeight;
      svg.setAttribute("width", Math.ceil(rectFin.left + 10));
      svg.setAttribute("height", alto);
      svg.style.width = Math.ceil(rectFin.left + 10) + "px";
      svg.style.height = alto + "px";
      largo = capas[0].getTotalLength();
      encendidas.forEach(p => p.style.strokeDasharray = `${largo} ${largo}`);
      pintar();
    };
    const pintar = () => {
      tick = false;
      if (reducido) { encendidas.forEach(p => p.style.strokeDashoffset = 0); return; }
      const avance = Math.min(1, Math.max(0, (scrollY + innerHeight * .72 - yIni) / Math.max(1, yFin - yIni)));
      const o = largo * (1 - avance);
      encendidas.forEach(p => p.style.strokeDashoffset = o);
    };
    addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(pintar); } }, { passive: true });
    let esperaResize;
    const remedir = () => { clearTimeout(esperaResize); esperaResize = setTimeout(medir, 120); };
    addEventListener("resize", remedir);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(medir);
    addEventListener("load", medir);
    if ("ResizeObserver" in window) new ResizeObserver(remedir).observe(document.body);
    medir();
  }

  /* ---------- Filtros de refacciones ---------- */
  const filtros = $$(".filtro");
  if (filtros.length) {
    const cuadros = $$(".cuadro[data-tipo]");
    filtros.forEach(f => f.addEventListener("click", () => {
      filtros.forEach(o => o.setAttribute("aria-pressed", String(o === f)));
      const tipo = f.dataset.filtro;
      let n = 0;
      cuadros.forEach(c => { const ver = tipo === "todo" || c.dataset.tipo === tipo; c.hidden = !ver; if (ver) n++; });
      const cuenta = $(".filtro-cuenta");
      if (cuenta) cuenta.textContent = `${n} ${n === 1 ? "pieza" : "piezas"} en pantalla`;
    }));
  }

  /* ---------- Visor de fotos y video ---------- */
  const visor = $("#visor");
  if (visor && visor.showModal) {
    const marco = $(".visor-cuadro", visor), pie = $(".visor-texto", visor), wa = $(".visor-wa", visor), cuenta = $(".visor-cuenta", visor);
    let grupo = [], i = 0, origen = null;
    const mostrar = () => {
      const b = grupo[i], d = b.dataset;
      marco.replaceChildren();
      if (d.video) {
        const v = document.createElement("video");
        Object.assign(v, { src: d.video, poster: d.src, controls: true, playsInline: true, preload: "metadata" });
        v.setAttribute("aria-label", d.alt);
        marco.append(v);
      } else {
        const im = new Image();
        im.src = d.src; im.alt = d.alt;
        marco.append(im);
      }
      pie.textContent = d.alt;
      cuenta.textContent = `${i + 1} de ${grupo.length}`;
      wa.href = WA + encodeURIComponent(`Hola, vi esta foto en su página (${d.alt}) y quiero más información.`);
    };
    const mover = n => { i = (i + n + grupo.length) % grupo.length; mostrar(); };
    const cerrar = () => visor.close();
    document.addEventListener("click", e => {
      const b = e.target.closest(".foto[data-src]");
      if (!b) return;
      const cont = b.closest("[data-galeria]") || document.body;
      grupo = $$(".foto[data-src]", cont).filter(x => !x.closest("[hidden]"));
      i = grupo.indexOf(b); origen = b;
      mostrar(); visor.showModal();
    });
    $(".visor-sig", visor).addEventListener("click", () => mover(1));
    $(".visor-prev", visor).addEventListener("click", () => mover(-1));
    $(".visor-cerrar", visor).addEventListener("click", cerrar);
    visor.addEventListener("click", e => { if (e.target === visor || e.target === marco) cerrar(); });
    visor.addEventListener("close", () => { marco.replaceChildren(); if (origen) origen.focus(); });
    visor.addEventListener("keydown", e => { if (e.key === "ArrowRight") mover(1); if (e.key === "ArrowLeft") mover(-1); });
    let x0 = null;
    marco.addEventListener("pointerdown", e => { if (e.pointerType !== "mouse") x0 = e.clientX; });
    marco.addEventListener("pointerup", e => {
      if (x0 === null) return;
      const dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) mover(dx < 0 ? 1 : -1);
    });
    marco.addEventListener("pointercancel", () => { x0 = null; });
  }

  /* ---------- Abierto ahora, con la hora de la Ciudad de México ---------- */
  const estado = $(".estado-abierto");
  if (estado) {
    const partes = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" }).formatToParts(new Date());
    const val = t => partes.find(p => p.type === t).value;
    const dia = val("weekday"), min = Number(val("hour")) * 60 + Number(val("minute"));
    const fin = dia === "Sun" ? 0 : dia === "Sat" ? 14 * 60 : 18 * 60;
    const abierto = min >= 9 * 60 && min < fin;
    estado.classList.toggle("abierto", abierto);
    $("span", estado).textContent = abierto ? "Abierto ahora" : "Cerrado ahora. Déjanos tu mensaje por WhatsApp.";
    estado.hidden = false;
  }

  /* ---------- Cotización: arma el mensaje y abre WhatsApp ---------- */
  const form = $("#cotForm");
  if (form) {
    const params = new URLSearchParams(location.search);
    const preServicio = params.get("servicio");
    const sel = $("#servicio");
    if (preServicio && [...sel.options].some(o => o.value === preServicio)) sel.value = preServicio;
    const campos = ["nombre", "tel", "msg"].map(id => $("#" + id));
    const avisar = (c, txt) => {
      const err = $("#" + c.id + "-error");
      err.textContent = txt;
      if (txt) c.setAttribute("aria-invalid", "true"); else c.removeAttribute("aria-invalid");
    };
    const revisar = c => {
      const v = c.value.trim();
      if (!v) return "Falta este dato.";
      if (c.id === "tel" && v.replace(/\D/g, "").length < 10) return "Escribe los 10 dígitos de tu teléfono.";
      return "";
    };
    campos.forEach(c => {
      c.addEventListener("blur", () => { if (c.value) avisar(c, revisar(c)); });
      c.addEventListener("input", () => { if (c.hasAttribute("aria-invalid")) avisar(c, revisar(c)); });
    });
    form.addEventListener("submit", e => {
      e.preventDefault();
      const estadoForm = $("#estado");
      let primero = null;
      campos.forEach(c => { const t = revisar(c); avisar(c, t); if (t && !primero) primero = c; });
      if (primero) { estadoForm.textContent = ""; primero.focus(); return; }
      const texto = `Hola, soy ${campos[0].value.trim()} (${campos[1].value.trim()}). Me interesa: ${sel.value}.\n${campos[2].value.trim()}`;
      const abierta = window.open(WA + encodeURIComponent(texto), "_blank", "noopener");
      estadoForm.textContent = "Abriendo WhatsApp con tu mensaje. Solo falta que lo envíes.";
      if (abierta === null) location.href = WA + encodeURIComponent(texto);
    });
  }
})();
