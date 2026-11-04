(function(){
  "use strict";
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- year ---------- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- projects data ---------- */
  var PROJECTS = [
    {
      n:'01', title:'E-Ticaret Pazaryeri Mobil Uygulaması', letter:'E',
      kicker:'Mobil Uygulama',
      short:'Ionic, Laravel ve MySQL kullanarak geliştirdiğim gerçek iş akışına sahip mobil e-ticaret deneyimi.',
      tags:['Ionic','Laravel','MySQL','E-Ticaret','API'],
      c1:'#d8ff3e', c2:'#1b2a00',
      desc:'Kullanıcıların ürünleri kolayca keşfedip sepete ekleyebildiği, sipariş sürecini yönetebildiği ve yönetici tarafında ürün/ödeme/sipariş akışını kontrol edebildiği mobil e-ticaret uygulaması geliştirdim. Hem kullanıcı deneyimi hem de veri yapısı açısından gerçek bir pazaryeri yaklaşımıyla tasarlandı.',
      bullets:[
        'Ürün listesi, kategori filtreleme ve detay sayfaları',
        'Sepet, adres ve sipariş akışı',
        'Laravel tabanlı API ile güvenli veri iletişimi',
        'MySQL veritabanı yapısı ve kullanıcı/ürün/sipariş yönetimi'
      ]
    },
    {
      n:'02', title:'AI Destekli Ders Programı & Koçluk Uygulaması', letter:'A',
      kicker:'Mobil Uygulama',
      short:'Öğrenme takibi, kişiselleştirilmiş planlama ve AI destekli öneriler sunan mobil uygulama.',
      tags:['Ionic','Laravel','MySQL','AI','Koçluk'],
      c1:'#a78bfa', c2:'#241145',
      desc:'Kullanıcıların ders programlarını planlayabildiği, ilerlemelerini takip edebildiği ve AI destekli önerilerle daha verimli çalışmasını sağlayan bir uygulama geliştirdim. Uygulama, kişisel gelişim ve öğrenme motivasyonu odaklı bir koçluk yaklaşımı taşıyor.',
      bullets:[
        'Haftalık ve aylık ders planlama akışı',
        'Kullanıcı ilerleme takibi ve hedef yönetimi',
        'AI destekli öneri ve kişiselleştirme mantığı',
        'Laravel API ve MySQL ile güvenli veri yönetimi'
      ]
    },
    {
      n:'03', title:'Nakliye & Lojistik Sitesi', letter:'N',
      kicker:'Kurumsal Web Sitesi',
      short:'Nakliye firması için hizmet, teklif ve iletişim akışını sade ve güçlü bir şekilde sunan kurumsal site.',
      tags:['HTML','CSS','JavaScript','SEO','Responsive'],
      c1:'#5eead4', c2:'#04292a',
      desc:'Nakliye firması için hizmetleri açıkça anlatan, teklif ve iletişim akışını kolaylaştıran, mobil uyumlu ve profesyonel bir kurumsal web sitesi hazırladım. Firmaya daha güven veren ve erişilebilir bir dijital yüzey oldu.',
      bullets:[
        'Hizmet ve sektör anlatımı',
        'Teklif ve iletişim yönlendirmesi',
        'Mobil uyumlu ve hızlı yüklenen sayfa yapısı',
        'Temel SEO ve kurumsal marka görünümü'
      ]
    },
    {
      n:'04', title:'Eşya Depolama Web Sitesi', letter:'D',
      kicker:'Hizmet Web Sitesi',
      short:'Depolama hizmeti için rezervasyon odaklı, güven verici ve kullanıcı dostu web sitesi.',
      tags:['Web','Laravel','SEO','Responsive','Hizmet'],
      c1:'#fb7185', c2:'#2e0a12',
      desc:'Depolama hizmeti sunan bir işletme için ziyaretçiye net hizmet anlatımı, fiyatlandırma bilgisi ve iletişim/rezervasyon akışı sağlayan bir web sitesi geliştirdim. Markaya uygun, sade ve güven hissi veren bir yapı kurdum.',
      bullets:[
        'Depolama hizmeti tanıtımı ve paketlendirme',
        'Rezerve ve iletişim akışı',
        'Mobil uyumlu kullanıcı deneyimi',
        'Kurumsal görünüm ve hizmet odaklı içerik yapısı'
      ]
    }
  ];

  /* ---------- render project rows ---------- */
  var list = document.getElementById('projList');
  list.innerHTML = PROJECTS.map(function(p,i){
    return '<button class="proj" type="button" data-project="'+i+'" aria-label="'+p.title+' proje detayını aç">'
      + '<span class="proj-n">'+p.n+'</span>'
      + '<span><span class="proj-t">'+p.title+'</span><span class="proj-mobile-tag">'+p.tags.slice(0,3).join(' · ')+'</span></span>'
      + '<span class="proj-d">'+p.short+'</span>'
      + '<span class="proj-tags">'+p.tags.slice(0,3).map(function(t){return '<span>'+t+'</span>';}).join('')+'</span>'
      + '<span class="proj-ar">↗</span>'
      + '</button>';
  }).join('');

  /* ---------- reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduce){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin:'0px 0px -8% 0px', threshold:.12 });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

  /* ---------- nav state + progress ---------- */
  var nav = document.getElementById('nav');
  var bar = document.getElementById('progressBar');
  var ticking = false;
  function onScroll(){
    var sc = window.scrollY || document.documentElement.scrollTop;
    nav.classList.toggle('scrolled', sc > 12);
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(sc / h, 1) : 0) + ')';
    ticking = false;
  }
  window.addEventListener('scroll', function(){
    if (!ticking){ ticking = true; requestAnimationFrame(onScroll); }
  }, { passive:true });
  onScroll();

  /* ---------- active nav link ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('[data-nav]'));
  var sections = navLinks.map(function(a){ return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  if ('IntersectionObserver' in window){
    var spy = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){
          navLinks.forEach(function(a){
            a.setAttribute('aria-current', a.getAttribute('href') === '#' + e.target.id ? 'true' : 'false');
          });
        }
      });
    }, { rootMargin:'-45% 0px -50% 0px' });
    sections.forEach(function(s){ spy.observe(s); });
  }

  /* ---------- mobile menu ---------- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('mobileMenu');
  function closeMenu(){
    document.body.classList.remove('menu-open');
    burger.setAttribute('aria-expanded','false');
    burger.setAttribute('aria-label','Menüyü aç');
    document.body.style.removeProperty('overflow');
  }
  burger.addEventListener('click', function(){
    var open = document.body.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
  });
  menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeMenu(); });

  /* ---------- glow follows pointer ---------- */
  var glowTarget = document.body.style;
  window.addEventListener('pointermove', function(e){
    glowTarget.setProperty('--mx', e.clientX + 'px');
    glowTarget.setProperty('--my', e.clientY + 'px');
  }, { passive:true });

  /* ---------- custom cursor ---------- */
  if (fine && !reduce){
    var cur = document.getElementById('cursor');
    var dot = document.getElementById('cursorDot');
    var cx = window.innerWidth/2, cy = window.innerHeight/2, tx = cx, ty = cy;
    var curVisible = false;
    window.addEventListener('pointermove', function(e){
      tx = e.clientX; ty = e.clientY;
      dot.style.transform = 'translate(' + tx + 'px,' + ty + 'px)';
      if (!curVisible){ cur.style.opacity = 1; dot.style.opacity = 1; curVisible = true; }
      var t = e.target.closest('a,button,[data-cursor],input');
      cur.classList.toggle('is-active', !!t);
    }, { passive:true });
    document.addEventListener('mouseleave', function(){ cur.style.opacity = 0; dot.style.opacity = 0; curVisible = false; });
    (function loop(){
      cx += (tx - cx) * 0.16;
      cy += (ty - cy) * 0.16;
      cur.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- magnetic buttons ---------- */
  if (fine && !reduce){
    document.querySelectorAll('[data-magnet]').forEach(function(el){
      el.addEventListener('pointermove', function(e){
        var r = el.getBoundingClientRect();
        var dx = e.clientX - r.left - r.width/2;
        var dy = e.clientY - r.top - r.height/2;
        el.style.transform = 'translate(' + (dx*0.16) + 'px,' + (dy*0.26) + 'px)';
      });
      el.addEventListener('pointerleave', function(){ el.style.transform = ''; });
    });
  }

  /* ---------- text scramble ---------- */
  var CHARS = '!<>-_\\/[]{}—=+*^?#________';
  function scramble(el){
    var final = el.dataset.text || el.textContent.trim();
    el.dataset.text = final;
    var frame = 0;
    clearInterval(el._sc);
    el._sc = setInterval(function(){
      frame++;
      var out = '';
      for (var i=0;i<final.length;i++){
        if (final[i] === ' ') { out += ' '; continue; }
        out += (i < frame/2) ? final[i] : CHARS[Math.floor(Math.random()*CHARS.length)];
      }
      el.textContent = out;
      if (frame/2 >= final.length){ clearInterval(el._sc); el.textContent = final; }
    }, 26);
  }
  if (!reduce){
    document.querySelectorAll('[data-scramble]').forEach(function(el){
      el.addEventListener('mouseenter', function(){ scramble(el); });
    });
  }

  /* ---------- hero network canvas ---------- */
  (function network(){
    var cv = document.getElementById('net');
    if (!cv || reduce) return;
    var ctx = cv.getContext('2d');
    var w = 0, h = 0, dpr = 1, pts = [];
    var mouse = { x: -9999, y: -9999 };
    var LINK = 132;

    function resize(){
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = Math.max(1, Math.floor(w*dpr));
      cv.height = Math.max(1, Math.floor(h*dpr));
      ctx.setTransform(dpr,0,0,dpr,0,0);
      var count = Math.min(88, Math.max(22, Math.round(w*h/19000)));
      pts = [];
      for (var i=0;i<count;i++){
        pts.push({
          x: Math.random()*w, y: Math.random()*h,
          vx: (Math.random()-.5)*0.20, vy: (Math.random()-.5)*0.20,
          r: Math.random()*1.5 + 0.6
        });
      }
    }

    function step(){
      if (document.hidden){ requestAnimationFrame(step); return; }
      ctx.clearRect(0,0,w,h);

      for (var i=0;i<pts.length;i++){
        var p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < -20) p.x = w + 20; if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20; if (p.y > h + 20) p.y = -20;

        var mdx = p.x - mouse.x, mdy = p.y - mouse.y;
        var md = Math.sqrt(mdx*mdx + mdy*mdy);
        if (md < 130 && md > 0.1){
          var f = (130 - md) / 130 * 0.9;
          p.x += (mdx/md) * f; p.y += (mdy/md) * f;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(216,255,62,' + (p.r > 1.4 ? .55 : .35) + ')';
        ctx.fill();
      }

      for (var a=0;a<pts.length;a++){
        for (var b=a+1;b<pts.length;b++){
          var dx = pts[a].x - pts[b].x, dy = pts[a].y - pts[b].y;
          var d2 = dx*dx + dy*dy;
          if (d2 < LINK*LINK){
            var alpha = (1 - Math.sqrt(d2)/LINK) * 0.16;
            ctx.strokeStyle = 'rgba(216,255,62,' + alpha + ')';
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(pts[a].x, pts[a].y);
            ctx.lineTo(pts[b].x, pts[b].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(step);
    }

    cv.addEventListener('pointermove', function(e){
      var r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    cv.addEventListener('pointerleave', function(){ mouse.x = -9999; mouse.y = -9999; });

    if ('ResizeObserver' in window){ new ResizeObserver(resize).observe(cv); }
    else { window.addEventListener('resize', resize); }
    resize();
    requestAnimationFrame(step);
  })();

  /* ---------- project float preview ---------- */
  var pf = document.getElementById('projFloat');
  var pfArt = document.getElementById('pfArt');
  var pfLetter = document.getElementById('pfLetter');
  var pfLabel = document.getElementById('pfLabel');
  if (fine && !reduce && pf){
    var fx = 0, fy = 0, ftx = 0, fty = 0, fl = false, fLoop = null;
    function fTick(){
      fx += (ftx - fx) * 0.14;
      fy += (fty - fy) * 0.14;
      pf.style.transform = 'translate(' + fx + 'px,' + fy + 'px) translate(-50%,-50%) scale(' + (fl ? 1 : .86) + ')';
      fLoop = requestAnimationFrame(fTick);
    }
    list.addEventListener('pointerover', function(e){
      var row = e.target.closest('.proj');
      if (!row) return;
      var p = PROJECTS[+row.dataset.project];
      if (!p) return;
      pfArt.style.setProperty('--c1', p.c1);
      pfArt.style.setProperty('--c2', p.c2);
      pfLetter.textContent = p.letter;
      pfLabel.textContent = p.kicker;
      fl = true;
      pf.classList.add('on');
      if (!fLoop) fLoop = requestAnimationFrame(fTick);
    });
    list.addEventListener('pointerout', function(e){
      var row = e.target.closest('.proj');
      if (!row) return;
      fl = false;
      pf.classList.remove('on');
    });
    list.addEventListener('pointermove', function(e){
      ftx = e.clientX + 170;
      fty = e.clientY;
      if (ftx > window.innerWidth - 170) ftx = e.clientX - 170;
    }, { passive:true });
  }

  /* ---------- modal ---------- */
  var modal = document.getElementById('modal');
  var mTitle = document.getElementById('modalTitle');
  var mDesc = document.getElementById('modalDesc');
  var mList = document.getElementById('modalList');
  var mTags = document.getElementById('modalTags');
  var mKicker = document.getElementById('modalKicker');
  var lastFocus = null;

  function openModal(i){
    var p = PROJECTS[i];
    if (!p) return;
    lastFocus = document.activeElement;
    mKicker.textContent = p.kicker + ' · ' + p.n;
    mTitle.textContent = p.title;
    mDesc.textContent = p.desc;
    mList.innerHTML = p.bullets.map(function(b){ return '<li>' + b + '</li>'; }).join('');
    mTags.innerHTML = p.tags.map(function(t){ return '<span>' + t + '</span>'; }).join('');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(function(){ document.getElementById('modalClose').focus(); }, 60);
  }
  function closeModal(){
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  list.addEventListener('click', function(e){
    var row = e.target.closest('.proj');
    if (row) openModal(+row.dataset.project);
  });
  document.getElementById('modalClose').addEventListener('click', closeModal);
  modal.addEventListener('click', function(e){ if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

  /* ---------- terminal ---------- */
  (function terminal(){
    var body = document.getElementById('termBody');
    var form = document.getElementById('termForm');
    var input = document.getElementById('termInput');
    var term = document.getElementById('term');
    var clearBtn = document.getElementById('termClear');
    if (!body || !form) return;
    var history = [], hIndex = -1;

    function out(html, cls){
      var d = document.createElement('div');
      d.className = 'term-line' + (cls ? ' ' + cls : '');
      d.innerHTML = html;
      body.appendChild(d);
      body.scrollTop = body.scrollHeight;
    }
    function clearAll(){ body.innerHTML = ''; }

    clearBtn.addEventListener('click', function(){ clearAll(); out('<em>Ekran temizlendi. <b>help</b> yazarak devam edebilirsin.</em>'); });

    var COMMANDS = {
      help: function(){
        return '<b>Kullanılabilir komutlar</b><br>'
          + '  <b>whoami</b>    → kısaca kim olduğum<br>'
          + '  <b>skills</b>    → teknoloji yığınım<br>'
          + '  <b>projects</b>  → projelerim<br>'
          + '  <b>contact</b>   → iletişim bilgileri<br>'
          + '  <b>scan</b>      → örnek güvenlik taraması<br>'
          + '  <b>sudo</b>      → denemekten zarar gelmez<br>'
          + '  <b>coffee</b>    → uzun geceler için<br>'
          + '  <b>clear</b>     → ekranı temizle';
      },
      whoami: function(){
        return 'Nusret Alataş<br><em>Bilgisayar Programcılığı mezunu · Full-stack geliştirici · Siber güvenlik meraklısı</em><br>'
          + 'Kod yazarım, sistemleri kırarım, sonra daha sağlam kurarım.';
      },
      skills: function(){
        return '<b>frontend</b>   HTML · CSS · JavaScript · Responsive · Animasyon<br>'
          + '<b>backend</b>    Node.js · PHP · REST API · MySQL · Firebase<br>'
          + '<b>mobile</b>     Ionic · TypeScript · Angular · Capacitor<br>'
          + '<b>security</b>   Kali · Nmap · Burp Suite · Wireshark · OWASP';
      },
      projects: function(){
        return PROJECTS.map(function(p){ return '  <b>' + p.n + '</b>  ' + p.title + ' <em>— ' + p.kicker + '</em>'; }).join('<br>')
          + '<br><em>Detaylar için sayfadaki proje satırlarına dokun.</em>';
      },
      contact: function(){
        return 'e-posta   nusretala1@gmail.com<br>'
          + 'telefon   +90 535 658 65 47<br>'
          + 'konum     Ankara / Çankaya<br>'
          + 'durum     <b>yeni projelere açık</b>';
      },
      scan: function(){
        return '<em>[*] host 127.0.0.1 taranıyor...</em><br>'
          + 'PORT     STATE  SERVICE<br>'
          + '22/tcp   open   ssh<br>'
          + '80/tcp   open   http<br>'
          + '443/tcp  open   https<br>'
          + '3000/tcp closed dev-server<br><br>'
          + '<b>[✓] Tarama tamamlandı.</b> 0 kritik bulgu. <em>Bu bir demo çıktısıdır.</em>';
      },
      sudo: function(){
        return '<em>[sudo] password for visitor:</em> <br>Burada root yok. Ama iyi denemeydi. 🙂';
      },
      coffee: function(){
        return '<pre style="line-height:1.25;color:#d8ff3e;margin:4px 0">      ( (\n       ) )\n    ........\n    |      |]\n    \\      /\n     `----\'</pre><em>Kahve olmadan kod yazmak, test yazmadan deploy etmeye benzer.</em>';
      }
    };

    function run(raw){
      var cmd = raw.trim().toLowerCase();
      if (!cmd) return;
      history.push(cmd); hIndex = history.length;
      out('<span class="term-prompt" style="color:#8b8b96">➜ ~</span> <span>' + raw.replace(/[<>]/g,'') + '</span>', 'term-echo');
      if (cmd === 'clear' || cmd === 'cls'){ clearAll(); return; }
      if (cmd === 'ls'){ out('<b>hakkimda</b>  <b>yetenekler</b>  <b>projeler</b>  <b>lab</b>  <b>iletisim</b>'); return; }
      if (cmd === 'exit' || cmd === 'quit'){ out('<em>Bu pencereyi kapatmanın tek yolu var: Esc.</em>'); return; }
      var fn = COMMANDS[cmd];
      if (fn) out(fn());
      else out('komut bulunamadı: <b>' + cmd.replace(/[<>]/g,'') + '</b> — <em>help</em> yazarak komut listesini görebilirsin.');
    }

    form.addEventListener('submit', function(e){
      e.preventDefault();
      run(input.value);
      input.value = '';
    });

    input.addEventListener('keydown', function(e){
      if (e.key === 'ArrowUp'){
        e.preventDefault();
        if (hIndex > 0){ hIndex--; input.value = history[hIndex] || ''; }
      } else if (e.key === 'ArrowDown'){
        e.preventDefault();
        if (hIndex < history.length - 1){ hIndex++; input.value = history[hIndex] || ''; }
        else { hIndex = history.length; input.value = ''; }
      }
    });

    term.addEventListener('click', function(e){
      if (e.target.closest('button') || e.target.closest('input')) return;
      input.focus({ preventScroll:true });
    });

    /* intro lines */
    out('<em>Sistem hazır. Portfolyo v2 yüklendi.</em>');
    out('<em>Yazılabilir komutlar için</em> <b>help</b> <em>yaz ve Enter\'a bas.</em>');
    out('&nbsp;');
  })();

  /* ---------- copy email + toast ---------- */
  var toast = document.getElementById('toast');
  var toastTimer;
  function showToast(msg){
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ toast.classList.remove('show'); }, 2200);
  }
  var copyBtn = document.getElementById('copyEmail');
  if (copyBtn){
    copyBtn.addEventListener('click', function(){
      var mail = 'nusretala1@gmail.com';
      var done = function(){ showToast('E-posta adresi kopyalandı'); };
      var fail = function(){ showToast('Kopyalanamadı: ' + mail); };
      if (navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(mail).then(done).catch(fail);
      } else {
        var ta = document.createElement('textarea');
        ta.value = mail; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); done(); } catch(err){ fail(); }
        document.body.removeChild(ta);
      }
    });
  }
})();
