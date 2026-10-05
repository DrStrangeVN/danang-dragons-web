/* Danang Dragons fan site — interactions v2 */
(function () {
  "use strict";

  /* ---------- Sticky header / back-to-top ---------- */
  var header = document.getElementById("siteHeader");
  var toTop = document.getElementById("toTop");
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    header.classList.toggle("scrolled", y > 24);
    toTop.classList.toggle("show", y > 640);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById("burger");
  var nav = document.getElementById("navLinks");
  burger.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
  });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Reveal on scroll (v4: staggered) ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  revealEls.forEach(function (el) {
    var sibs = Array.prototype.filter.call(el.parentElement.children, function (c) {
      return c.classList && c.classList.contains("reveal");
    });
    el.style.setProperty("--d", Math.min(Math.max(sibs.indexOf(el), 0), 5) * 80 + "ms");
  });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Active nav link ---------- */
  var ids = ["tong-quan", "lich-su", "doi-hinh", "tin-tuc", "thu-vien", "ve", "cong-dong"];
  var sections = ids.map(function (id) { return document.getElementById(id); }).filter(Boolean);
  var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
  function setActive() {
    var current = null, y = window.scrollY + 140;
    sections.forEach(function (s) { if (s.offsetTop <= y) current = s.id; });
    links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + current); });
  }
  window.addEventListener("scroll", setActive, { passive: true });
  setActive();

  toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Modal helpers ---------- */
  function wireModal(modal) {
    modal.querySelectorAll("[data-close]").forEach(function (el) {
      el.addEventListener("click", function () { closeModal(modal); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("open")) closeModal(modal);
    });
  }
  function openModal(modal) {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeModal(modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  /* ---------- Player data & modal ---------- */
  var PLAYERS = {
    edo: { jersey: "#4", pos: "Ngoại binh · Mỹ", name: "Karachi Edo",
      bio: "Cỗ máy ghi điểm của Dragons với những màn trình diễn bùng nổ cả về điểm số lẫn khả năng tranh chấp dưới rổ.",
      stats: [["Vai trò", "Tay săn điểm số 1"], ["Mùa nổi bật", "VBA 2025 (Star X)"], ["Trận cao điểm", "27–33 điểm"], ["Rebounds", "18–21 / trận (phong độ cao)"], ["Hiện tại", "Góp mặt trong các buổi tập 2026"]] },
    simmons: { jersey: "🇺🇸", pos: "Ngoại binh · Mỹ · Hậu vệ", name: "Timothy Simmons",
      bio: "Bộ não của Dragons với nhãn quan chiến thuật xuất sắc — chủ nhân của một trong những kỷ lục đẹp nhất lịch sử VBA.",
      stats: [["Kỷ lục", "Triple-double 12đ – 12 reb – 12 kt"], ["Ý nghĩa", "Người đầu tiên lập triple-double ở VBA Star X"], ["Mùa giải", "VBA 2025"], ["Vai trò", "Hậu vệ kiến tạo"]] },
    chinbold: { jersey: "🇲🇳", pos: "Ngoại binh · Mông Cổ · Trung phong", name: "Ganbat Chinbold",
      bio: "Trung phong ngoại binh mang đến sức mạnh và chiều cao cho khu vực dưới rổ của Rồng sông Hàn.",
      stats: [["Quốc tịch", "Mông Cổ"], ["Vị trí", "Center"], ["Mùa giải", "VBA 2025"]] },
    soy: { jersey: "#3", pos: "Heritage · Canada (gốc Việt)", name: "Michael Soy",
      bio: "Cầu thủ gốc Việt sinh tại Ottawa, Canada. Trở lại đội hình tháng 05/2026 và ngay lập tức trở thành điểm sáng rực rỡ nhất của đội với biệt danh “Iron Man”.",
      stats: [["Điểm/trận", "17.9 (hạng 6 toàn giải)"], ["Kiến tạo", "3.6 / trận"], ["Rebounds", "4.5 / trận"], ["Thời gian", "34+ phút / trận (cả 20 trận)"], ["Kỷ lục cá nhân", "14 kiến tạo / trận"], ["Số áo", "#3"]] },
    wood: { jersey: "🇺🇸", pos: "Ngoại binh · Mỹ · Hậu vệ", name: "Brandon Scott-Dior Wood",
      bio: "Hậu vệ người Mỹ mang đến khả năng tổ chức lối chơi hàng đầu giải đấu cho Dragons ở mùa 2026.",
      stats: [["Điểm/trận", "14.7"], ["Kiến tạo", "5.2 (Top 1 toàn giải)"], ["Rebounds", "4.1"], ["Mùa giải", "VBA 2026"]] },
    ross: { jersey: "🇺🇸", pos: "Ngoại binh · Mỹ", name: "Corey Raley Ross",
      bio: "Ngoại binh bổ sung chiều sâu đội hình cho Dragons ở mùa giải 2026.",
      stats: [["Mùa giải", "VBA 2026"]] },
    trongtai: { jersey: "#19", pos: "Nội binh · Hậu vệ", name: "Phan Trọng Tài",
      bio: "Sinh năm 2005, mùa VBA thứ 3 (từng khoác áo Cantho Catfish 2024, Hanoi Buffaloes 2025). Bước tiến vượt bậc từ 2025 sang 2026 — tương lai của Rồng sông Hàn.",
      stats: [["Điểm/trận", "6.4"], ["Kiến tạo", "2.3"], ["Cướp bóng", "1.9 (Top 3 toàn giải)"], ["Số áo", "#19"], ["Ghi chú", "Sức khỏe đã ổn định sau sự cố 09/08/2026"]] },
    quan: { jersey: "#5", pos: "Nội binh", name: "Lê Hoàng Quân",
      bio: "Đóng góp quan trọng từ băng ghế dự bị với tinh thần chiến đấu máu lửa.",
      stats: [["Số áo", "#5"], ["Mùa giải", "VBA 2025 – 2026"]] },
    thinh: { jersey: "—", pos: "Nội binh trụ cột", name: "Mai Phước Thịnh",
      bio: "Trụ cột nội binh nhiều mùa giải, thủ lĩnh tinh thần trong phòng thay đồ của Dragons.",
      stats: [["Vai trò", "Trụ cột nội binh"], ["Gắn bó", "Nhiều mùa giải"]] },
    duy: { jersey: "—", pos: "Nội binh", name: "Lâm Minh Duy",
      bio: "Biệt danh “Gấu đen” từ người hâm mộ — biểu tượng của tinh thần không bỏ cuộc, từng phá kỷ lục ghi điểm cá nhân trong một trận đấu.",
      stats: [["Biệt danh", "“Gấu đen”"], ["Điểm nhấn", "Kỷ lục điểm số cá nhân / trận"]] },
    tu: { jersey: "—", pos: "Hậu vệ", name: "Hoàng Tú",
      bio: "Hậu vệ trẻ nổi bật, nhiều trận ghi 11–15 điểm từ ghế dự bị ở mùa 2025.",
      stats: [["Vị trí", "Hậu vệ"], ["Mùa nổi bật", "VBA 2025"]] },
    minh: { jersey: "—", pos: "Nội binh kỳ cựu", name: "Triệu Hán Minh",
      bio: "Kinh nghiệm dày dặn — điểm tựa vững chắc cho lứa cầu thủ trẻ của đội.",
      stats: [["Vai trò", "Nội binh kỳ cựu"]] },
    hiep: { jersey: "—", pos: "Tân binh 2026", name: "Nguyễn Đại Hiệp",
      bio: "Tân binh 30 tuổi, lần đầu ký hợp đồng chuyên nghiệp — câu chuyện truyền cảm hứng của mùa 2026 và là ứng viên Rookie of the Year.",
      stats: [["Đề cử", "Rookie of the Year VBA 2026"], ["Tuổi ký HĐ chuyên nghiệp đầu tiên", "30"]] },
    khang: { jersey: "—", pos: "Tân binh 2026", name: "Lê Trung Bảo Khang",
      bio: "Gương mặt trẻ được đề cử Rookie of the Year VBA 2026 — niềm hy vọng mới của Rồng sông Hàn.",
      stats: [["Đề cử", "Rookie of the Year VBA 2026"]] }
  };

  var pModal = document.getElementById("playerModal");
  wireModal(pModal);
  document.querySelectorAll("[data-player]").forEach(function (card) {
    card.addEventListener("click", function () {
      var p = PLAYERS[card.getAttribute("data-player")];
      if (!p) return;
      document.getElementById("pmJersey").textContent = p.jersey;
      document.getElementById("pmPos").textContent = p.pos;
      document.getElementById("pmName").textContent = p.name;
      document.getElementById("pmBio").textContent = p.bio;
      document.getElementById("pmStats").innerHTML = p.stats.map(function (s) {
        return "<li><span>" + s[0] + "</span><span>" + s[1] + "</span></li>";
      }).join("");
      openModal(pModal);
    });
  });

  /* ---------- Lightbox ---------- */
  var lb = document.getElementById("lightbox");
  wireModal(lb);
  document.querySelectorAll(".g-item").forEach(function (fig) {
    fig.addEventListener("click", function () {
      var img = document.getElementById("lbImg");
      img.src = fig.getAttribute("data-full");
      img.alt = fig.getAttribute("data-cap") || "";
      document.getElementById("lbCap").textContent = fig.getAttribute("data-cap") || "";
      openModal(lb);
    });
  });

  /* ---------- Wins-per-season chart ---------- */
  (function drawChart() {
    var cv = document.getElementById("winsChart");
    if (!cv) return;
    var seasons = ["2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","2026"];
    var wins = [4,2,3,5,5,5,4,1,7,8,0];
    var champ = [true,false,false,false,false,false,false,false,false,false,false];

    function render() {
      var dpr = window.devicePixelRatio || 1;
      var W = cv.clientWidth, H = 260;
      cv.width = W * dpr; cv.height = H * dpr;
      var ctx = cv.getContext("2d");
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, W, H);

      var padL = 34, padB = 30, padT = 16, padR = 8;
      var cw = W - padL - padR, ch = H - padB - padT;
      var max = 10, n = seasons.length;
      var slot = cw / n, bw = Math.min(44, slot * 0.58);

      // gridlines
      ctx.strokeStyle = "rgba(255,255,255,.07)";
      ctx.fillStyle = "#6e6a61";
      ctx.font = "11px 'Barlow Condensed','Be Vietnam Pro',sans-serif";
      ctx.textAlign = "right";
      for (var g = 0; g <= max; g += 2) {
        var gy = padT + ch - (g / max) * ch;
        ctx.beginPath(); ctx.moveTo(padL, gy); ctx.lineTo(W - padR, gy); ctx.stroke();
        ctx.fillText(g, padL - 8, gy + 4);
      }

      // bars
      ctx.textAlign = "center";
      for (var i = 0; i < n; i++) {
        var h = (wins[i] / max) * ch;
        var x = padL + slot * i + (slot - bw) / 2;
        var y = padT + ch - h;
        var grad = ctx.createLinearGradient(0, y, 0, y + h);
        if (champ[i]) { grad.addColorStop(0, "#ff8a3d"); grad.addColorStop(1, "#c74300"); }
        else if (wins[i] === 0) { grad.addColorStop(0, "#3a3a3e"); grad.addColorStop(1, "#262628"); }
        else { grad.addColorStop(0, "rgba(255,107,26,.85)"); grad.addColorStop(1, "rgba(255,107,26,.35)"); }
        ctx.fillStyle = grad;
        var r = 6;
        ctx.beginPath();
        ctx.moveTo(x, y + h);
        ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.lineTo(x + bw - r, y); ctx.quadraticCurveTo(x + bw, y, x + bw, y + r);
        ctx.lineTo(x + bw, y + h); ctx.closePath(); ctx.fill();

        ctx.fillStyle = wins[i] === 0 ? "#6e6a61" : "#f4f1ea";
        ctx.font = "700 12px 'Barlow Condensed','Be Vietnam Pro',sans-serif";
        ctx.fillText(wins[i], x + bw / 2, y - 7);

        ctx.fillStyle = champ[i] ? "#ff6b1a" : "#6e6a61";
        ctx.font = (champ[i] ? "700" : "600") + " 11px 'Barlow Condensed','Be Vietnam Pro',sans-serif";
        ctx.fillText("’" + seasons[i].slice(2), x + bw / 2, H - 10);
      }

      // champion marker
      ctx.fillStyle = "#ff6b1a";
      ctx.font = "700 11px 'Barlow Condensed','Be Vietnam Pro',sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("🏆 Vô địch", padL + slot * 0 + (slot - bw) / 2 - 8, padT - 2);
    }

    render();
    var t;
    window.addEventListener("resize", function () { clearTimeout(t); t = setTimeout(render, 150); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(render);
  })();
})();

  /* ---------- Reading progress bar ---------- */
  (function () {
    var bar = document.getElementById("progress");
    if (!bar) return;
    function upd() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    }
    window.addEventListener("scroll", upd, { passive: true });
    upd();
  })();

  /* ---------- Fan poll ---------- */
  (function () {
    var wrap = document.getElementById("mvpPoll");
    if (!wrap) return;
    var box = document.getElementById("pollOptions");
    var note = document.getElementById("pollNote");
    var KEY = "dnd_mvp_2026";
    // Seed votes so the widget feels alive (stored offsets + real votes)
    var base = { "Michael Soy": 214, "Phan Trọng Tài": 167, "Karachi Edo": 89, "Lâm Minh Duy": 76 };
    var mine = null;
    try { mine = localStorage.getItem(KEY); } catch (e) {}

    function totals() {
      var t = {}, sum = 0;
      Object.keys(base).forEach(function (k) {
        t[k] = base[k] + (mine === k ? 1 : 0);
        sum += t[k];
      });
      return { t: t, sum: sum };
    }

    function render(animate) {
      var d = totals();
      box.innerHTML = "";
      Object.keys(base).forEach(function (k) {
        var v = d.t[k], pct = d.sum ? Math.round((v / d.sum) * 100) : 0;
        var b = document.createElement("button");
        b.className = "poll-opt" + (mine === k ? " voted" : "");
        b.disabled = !!mine;
        b.innerHTML =
          '<span class="opt-name">' + (mine === k ? "✓ " : "") + k + "</span>" +
          '<span class="pct">' + pct + "%</span>" +
          '<span class="bar"><i></i></span>';
        if (!mine) {
          b.addEventListener("click", function () {
            try { localStorage.setItem(KEY, k); } catch (e) {}
            mine = k;
            render(true);
            note.textContent = "Đã ghi nhận bình chọn của bạn. Cảm ơn đã đồng hành cùng Rồng! 🐉";
          });
        }
        box.appendChild(b);
        var fill = b.querySelector(".bar i");
        if (animate) requestAnimationFrame(function () { requestAnimationFrame(function () { fill.style.width = pct + "%"; }); });
        else fill.style.width = pct + "%";
      });
      if (mine) note.textContent = "Bạn đã bình chọn. Kết quả tổng hợp từ cộng đồng fan.";
    }
    render(false);
  })();
