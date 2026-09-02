(function(){
  "use strict";

  const contents = window.ARIANE_CONTENTS || {};
  const languages = [
    { code: "en", label: "EN" },
    { code: "cs", label: "CZ" }
  ];

  const IDENTITY = {
    logoSrc: "images/uochb-iocb-prague-logo.png",
    logoAlt: "ÚOCHB IOCB Prague"
  };

  if (!contents.en && !contents.cs) {
    document.body.innerHTML = "<p>Missing ARIANE content files.</p>";
    return;
  }

  let currentLang = chooseInitialLanguage();
  let notesHidden = false;

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  };

  function chooseInitialLanguage() {
    const hash = window.location.hash.replace("#", "").toLowerCase();
    if (contents[hash]) return hash;
    const saved = window.localStorage && localStorage.getItem("arianeDeckLanguage");
    if (saved && contents[saved]) return saved;
    return contents.en ? "en" : Object.keys(contents)[0];
  }

  function setLanguage(lang) {
    if (!contents[lang] || lang === currentLang) return;
    currentLang = lang;
    if (window.localStorage) localStorage.setItem("arianeDeckLanguage", lang);
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, "", `#${lang}`);
    } else {
      window.location.hash = lang;
    }
    renderDeck();
  }

  function renderDeckMark(content) {
    const mark = el("div", "deck-mark");

    const img = document.createElement("img");
    img.src = content.deck.logoSrc || IDENTITY.logoSrc;
    img.alt = content.deck.logoAlt || IDENTITY.logoAlt;
    mark.appendChild(img);

    if (content.deck.authorName) {
      mark.appendChild(el("div", "author-name", content.deck.authorName));
    }
    if (content.deck.authorGroup) {
      mark.appendChild(el("div", "author-group", content.deck.authorGroup));
    }

    return mark;
  }


  function normalizeBase(item) {
    return typeof item === "string" ? { base: item, changed: false } : item;
  }

  function renderBaseStrip(items, extraClass) {
    const strip = el("div", `dna-base-strip ${extraClass || ""}`.trim());
    items.map(normalizeBase).forEach(item => {
      const box = el("span", `dna-base${item.changed ? " changed" : ""}`, item.base);
      strip.appendChild(box);
    });
    return strip;
  }

  function renderSequenceDiagram(data, cutWord, mutation, changedRegion) {
    const seq = el("div", "dna-sequence");

    const kept = el("div", "dna-region kept");
    kept.appendChild(el("div", "dna-region-label", data.keptLabel));
    kept.appendChild(renderBaseStrip(data.kept, "kept-strip"));

    const cutMarker = el("div", "dna-cut-marker");
    cutMarker.appendChild(el("div", "dna-cut-line"));
    cutMarker.appendChild(el("div", "dna-cut-word", cutWord));

    const removed = el("div", "dna-region removed");
    removed.appendChild(el("div", "dna-region-label", data.cutLabel));
    removed.appendChild(renderBaseStrip(data.cutOut, "removed-strip"));

    seq.append(kept, cutMarker, removed);

    if (mutation) {
      const mutationRow = el("div", `dna-mutation ${changedRegion === "cut" ? "under-cut" : "under-kept"}`, mutation);
      seq.appendChild(mutationRow);
    }

    return seq;
  }

  function proteinDots(kind) {
    const fig = el("div", `protein-figure protein-${kind}`);
    fig.setAttribute("aria-label", kind === "normal" ? "schematic folded protein" : "schematic altered protein");

    const positions = {
      normal: [
        [17,45],[25,26],[41,17],[58,20],[72,32],[76,49],[67,64],[50,72],[33,68],[22,59],[40,45],[56,45]
      ],
      substitution: [
        [18,46],[27,28],[44,20],[61,24],[75,38],[76,57],[62,70],[45,72],[28,64],[40,47],[57,48]
      ],
      splice: [
        [17,49],[26,31],[43,24],[59,29],[70,42],
        [74,57],[82,67],[78,80]
      ],
      truncated: [
        [20,50],[29,32],[47,26],[63,33],[70,45]
      ]
    };

    (positions[kind] || positions.normal).forEach((xy, i) => {
      const aa = el("span", "aa-dot");
      aa.style.left = xy[0] + "%";
      aa.style.top = xy[1] + "%";

      if (kind === "substitution" && i === 3) aa.classList.add("aa-different");
      if (kind === "splice" && i >= 5) aa.classList.add("aa-wrong");
      fig.appendChild(aa);
    });

    if (kind === "splice") {
      const breakMark = el("span", "protein-break", "×");
      fig.appendChild(breakMark);
    }

    if (kind === "truncated") {
      const stop = el("span", "protein-stop", "STOP");
      fig.appendChild(stop);
    }

    return fig;
  }

  function renderProcessFunnel(steps) {
    const funnel = el("div", "dna-funnel");
    steps.forEach((step, index) => {
      funnel.appendChild(el("div", "dna-process-step", step));
      if (index < steps.length - 1) funnel.appendChild(el("div", "dna-process-chevron", "▾"));
    });
    return funnel;
  }

  function renderDNAStorySlide(slide, content) {
    const fragment = document.createDocumentFragment();
    const section = el("section", "slide dna-story");

    const head = el("div", "head");
    const titleBlock = el("div", "title-block");
    titleBlock.appendChild(el("div", "kicker", slide.kicker));
    titleBlock.appendChild(el("h2", "", slide.title));
    head.appendChild(titleBlock);
    head.appendChild(renderDeckMark(content));
    section.appendChild(head);

    const ref = el("div", "dna-reference");
    const refSeq = renderSequenceDiagram(
      {
        keptLabel: "",
        cutLabel: "",
        kept: slide.reference.kept,
        cutOut: slide.reference.cutOut
      },
      slide.reference.cutWord
    );
    refSeq.classList.add("reference-sequence");
    const normalLabel = el("div", "dna-normal-label", slide.reference.label);
    const normalProtein = proteinDots("normal");
    const normalText = el("div", "dna-normal-text", slide.reference.proteinText);
    ref.append(refSeq, normalLabel, normalProtein, normalText);
    section.appendChild(ref);

    const variants = el("div", "dna-variants");
    slide.variants.forEach(variant => {
      const card = el("article", "dna-variant-card");

      const badge = el("div", "dna-number", variant.number);
      card.appendChild(badge);

      card.appendChild(
        renderSequenceDiagram(
          variant,
          slide.reference.cutWord,
          variant.mutation,
          variant.changedRegion
        )
      );

      card.appendChild(renderProcessFunnel(slide.process));
      card.appendChild(proteinDots(variant.protein));
      card.appendChild(el("div", "dna-result", variant.result));
      card.appendChild(el("div", "dna-hgvs", variant.hgvs));

      variants.appendChild(card);
    });
    section.appendChild(variants);

    section.appendChild(el("div", "dna-takeaway", slide.takeaway));
    fragment.appendChild(section);

    if (slide.notes && slide.notes.length) {
      const notes = el("div", "notes");
      notes.appendChild(el("div", "lab", content.deck.notesLabel || "Presenter notes"));
      slide.notes.forEach(note => notes.appendChild(el("p", "", note)));
      fragment.appendChild(notes);
    }

    return fragment;
  }

  function renderBlock(block) {
    const wrap = el("div");

    if (block.type === "paragraphs") {
      block.items.forEach(text => wrap.appendChild(el("p", "", text)));
      return wrap;
    }

    if (block.heading) wrap.appendChild(el("h3", "", block.heading));

    if (block.type === "list") {
      const ul = el("ul");
      block.items.forEach(item => ul.appendChild(el("li", "", item)));
      wrap.appendChild(ul);
      return wrap;
    }

    if (block.type === "scale") {
      const scale = el("div", "scale");
      block.items.forEach((item, index) => {
        const cell = el("div", `s${index + 1}`);
        cell.appendChild(el("div", "bar5"));
        cell.appendChild(el("div", "t", item));
        scale.appendChild(cell);
      });
      wrap.appendChild(scale);
      return wrap;
    }

    if (block.type === "callout") {
      wrap.className = "callout";
      wrap.appendChild(el("p", "", block.text));
      return wrap;
    }

    if (block.type === "flow") {
      const flow = el("div", "flow");
      block.items.forEach((item, index) => {
        const nodeClass = ["n"];
        if (index === 0) nodeClass.push("first");
        if (index === block.items.length - 1) nodeClass.push("last");
        flow.appendChild(el("div", nodeClass.join(" "), item));
        if (index < block.items.length - 1) flow.appendChild(el("div", "a"));
      });
      wrap.appendChild(flow);
      return wrap;
    }

    if (block.type === "keyValues") {
      const kv = el("div", "kv");
      block.items.forEach(item => {
        const row = el("div");
        row.appendChild(el("div", "k", item.key));
        const value = el("div", "v");
        if (item.href) {
          const a = el("a", "", item.value);
          a.href = item.href;
          value.appendChild(a);
        } else if (item.valueHtml) {
          value.innerHTML = item.valueHtml;
        } else {
          value.textContent = item.value;
        }
        row.appendChild(value);
        kv.appendChild(row);
      });
      wrap.appendChild(kv);
      return wrap;
    }

    if (block.type === "media") {
      const media = el("div", "media");
      if (block.src) {
        media.classList.add("has-image");
        const img = document.createElement("img");
        img.src = block.src;
        img.alt = block.alt || "";
        media.appendChild(img);
      } else {
        const placeholder = el("div", "media-placeholder");
        placeholder.appendChild(el("div", "t", block.label || "Screenshot"));
        placeholder.appendChild(el("div", "d", block.description || ""));
        media.appendChild(placeholder);
      }
      return media;
    }

    if (block.type === "scope") {
      const scope = el("div", "scope");
      const current = el("div");
      current.appendChild(el("div", "k", block.currentLabel));
      current.appendChild(el("div", "v", block.current));
      const future = el("div");
      future.appendChild(el("div", "k", block.futureLabel));
      future.appendChild(el("div", "v", block.future));
      scope.append(current, future);
      return scope;
    }

    return wrap;
  }

  function renderSlide(slide, content) {
    const fragment = document.createDocumentFragment();

    if (slide.layout === "dna-story") {
      return renderDNAStorySlide(slide, content);
    }

    if (slide.layout === "image-only") {
      const section = el("section", "slide image-only");
      const img = document.createElement("img");
      img.src = slide.src;
      img.alt = slide.alt || slide.title || "";
      section.appendChild(img);
      fragment.appendChild(section);

      if (slide.notes && slide.notes.length) {
        const notes = el("div", "notes");
        notes.appendChild(el("div", "lab", content.deck.notesLabel || "Presenter notes"));
        slide.notes.forEach(note => notes.appendChild(el("p", "", note)));
        fragment.appendChild(notes);
      }

      return fragment;
    }

    const section = el("section", `slide ${slide.layout || "standard"}`);

    const head = el("div", "head");
    const titleBlock = el("div", "title-block");
    titleBlock.appendChild(el("div", "kicker", slide.kicker));
    titleBlock.appendChild(el("h2", "", slide.title));
    head.appendChild(titleBlock);
    head.appendChild(renderDeckMark(content));
    section.appendChild(head);

    const cols = el("div", "cols");
    [slide.left, slide.right].forEach(column => {
      const stack = el("div", "stack");
      column.forEach(block => stack.appendChild(renderBlock(block)));
      cols.appendChild(stack);
    });
    section.appendChild(cols);
    fragment.appendChild(section);

    if (slide.notes && slide.notes.length) {
      const notes = el("div", "notes");
      notes.appendChild(el("div", "lab", content.deck.notesLabel || "Presenter notes"));
      slide.notes.forEach(note => notes.appendChild(el("p", "", note)));
      fragment.appendChild(notes);
    }

    return fragment;
  }

  function renderDeck() {
    const content = contents[currentLang];
    document.documentElement.lang = currentLang;
    document.title = content.deck.title || "ARIANE Board Deck";
    document.body.classList.toggle("hide-notes", notesHidden);

    const root = document.getElementById("deck-root");
    root.innerHTML = "";

    const bar = el("div", "bar");
    const who = el("div", "who");
    const authorParts = [content.deck.authorName, content.deck.authorGroup].filter(Boolean).join(" · ");
    const byline = authorParts ? ` <span class="bar-author">${authorParts}</span>` : "";
    who.innerHTML = `<b>${content.deck.headerTitle}</b> &nbsp;&middot;&nbsp; ${content.deck.headerSubtitle}${byline}`;

    const controls = el("div", "controls");
    const langGroup = el("div", "lang-switch");
    languages.forEach(lang => {
      if (!contents[lang.code]) return;
      const btn = el("button", "btn lang-btn", lang.label);
      btn.type = "button";
      btn.setAttribute("aria-pressed", String(lang.code === currentLang));
      btn.classList.toggle("active", lang.code === currentLang);
      btn.addEventListener("click", () => setLanguage(lang.code));
      langGroup.appendChild(btn);
    });

    const toggle = el("button", "btn", notesHidden ? (content.deck.notesShow || "Show notes") : (content.deck.notesHide || "Hide notes"));
    toggle.id = "toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-pressed", String(notesHidden));
    toggle.addEventListener("click", function(){
      notesHidden = !notesHidden;
      document.body.classList.toggle("hide-notes", notesHidden);
      toggle.setAttribute("aria-pressed", String(notesHidden));
      toggle.textContent = notesHidden ? (content.deck.notesShow || "Show notes") : (content.deck.notesHide || "Hide notes");
    });

    controls.append(langGroup, toggle);
    bar.append(who, controls);
    root.appendChild(bar);

    content.slides.forEach(slide => root.appendChild(renderSlide(slide, content)));
    if (content.deck.footer) root.appendChild(el("div", "foot", content.deck.footer));
  }

  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.replace("#", "").toLowerCase();
    if (contents[hash] && hash !== currentLang) {
      currentLang = hash;
      renderDeck();
    }
  });

  renderDeck();
})();
