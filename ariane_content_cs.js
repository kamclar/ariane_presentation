window.ARIANE_CONTENTS = window.ARIANE_CONTENTS || {};
window.ARIANE_CONTENTS.cs = {
  deck: {
    title: "ARIANE Board Deck CZ",
    headerTitle: "ARIANE",
    headerSubtitle: "automatizovaná interpretace genetických variant",
    presenterName: "Kamila Clarová",
    authorName: "Kamila Clarová",
    presenterGroup: "Skupina Jiřího Vondráška",
    authorGroup: "Skupina Jiřího Vondráška",
    institution: "ÚOCHB AV ČR",
    logoSrc: "images/uochb-iocb-prague-logo.png",
    logoAlt: "IOCB Prague / ÚOCHB AV ČR",
    notesShow: "Zobrazit poznámky",
    notesHide: "Skrýt poznámky",
    notesLabel: "Poznámky pro prezentujícího",
    footer: ""
  },

  slides: [
    {
      id: "classification",
      kicker: "Snímek 1",
      title: "Klasifikace genetických variant",
      layout: "standard",
      left: [
        {
          type: "paragraphs",
          items: [
            "Genetické vyšetření nachází změny v DNA, označované jako genetické varianty. Většina z nich je neškodná, ale některé mohou ovlivnit funkci genu a zvýšit riziko onemocnění.",
            "Při interpretaci varianty se hodnotí různé typy evidence pomocí předem definovaných klasifikačních kritérií. Každé kritérium představuje určitý typ důkazu a posouvá klasifikaci směrem k benigní nebo patogenní variantě.",
            "Rámec ACMG/AMP poskytuje obecná pravidla pro interpretaci variant. Expertní panely tato pravidla dále zpřesňují pro jednotlivé geny nebo skupiny genů.",
            "Pro BRCA1 a BRCA2 byla pravidla zpřesněna mezinárodním expertním panelem ClinGen ENIGMA."
          ]
        },
        {
          type: "list",
          heading: "Evidence používaná pro klasifikaci",
          items: [
            "Populační frekvence",
            "Předpokládaný dopad na gen nebo protein",
            "RNA a splicingová data",
            "Funkční studie",
            "Klinická a rodinná data"
          ]
        }
      ],
      right: [
        {
          type: "scale",
          heading: "Pět kategorií",
          items: [
            "Benigní",
            "Pravděpodobně benigní",
            "Varianta nejasného významu (VUS)",
            "Pravděpodobně patogenní",
            "Patogenní"
          ]
        },
        {
  type: "callout",
  heading: "Proč je klasifikace náročná",
  text: "Klasifikace variant může být časově náročná a vyžaduje značnou odbornou znalost. Relevantní důkazy jsou rozptýlené v databázích, predikčních nástrojích a odborných publikacích a jednotlivá kritéria je nutné aplikovat podle komplexních, často genově specifických pravidel. Některá kritéria lze vyhodnotit výpočetně, jiná stále vyžadují manuální odborné posouzení."
        }
      ],
      notes: [
  "Základní problém: genetický test najde variantu, ale samotný nález ještě neříká, zda je klinicky významná.",
  "Co je kritérium: předem definovaný typ důkazu, který posouvá klasifikaci směrem k benigní nebo patogenní variantě.",
  "Problém je, že samotná kritéria mohou být velmi složitá. Je potřeba pracovat s tabulkami důkazů, různými typy skóre a nakonec všechno správně spojit pomocí rozhodovacích pravidel. Ne všechny laboratoře mají dostatek času nebo potřebnou odbornost na to, aby klasifikaci prováděly v takové hloubce, jak by bylo ideální. V praxi se pak někdy sklouzne k přístupu typu: podívám se, jak tuto variantu hodnotili ostatní v ClinVaru. Tím ale může vznikat kruhové hodnocení, kdy se jednotlivé záznamy opírají jeden o druhý místo o nezávislé vyhodnocení důkazů.",
  "Lze zmínit VUS, tedy variantu s nedostatečnými nebo rozpornými důkazy. Není nutné zacházet do kombinatoriky ACMG. VUS jsou v současnosti velký problém, ať už kvůli nedostatku dat, nebo kvůli neúplnému či nepřesnému vyhodnocení dostupných důkazů. ARIANE může pomoci v obou případech tím, že zpřístupní konzistentnější a důkladnější vyhodnocení a potenciálně sníží počet variant, které zůstávají klasifikované jako VUS.",
  "ENIGMA je mezinárodní expertní panel, který pravidla zpřesnil pro BRCA1 a BRCA2.",
  "Poslední box je přechod na další slide: část evidence lze zpracovat automaticky a část stále vyžaduje ruční odborné posouzení."
]
    },

    {
      id: "ariane",
      kicker: "Snímek 2",
      title: "ARIANE",
      layout: "product",
      left: [
        {
          type: "paragraphs",
          items: [
            "Webová aplikace ARIANE automatizuje části interpretace genetických variant podle zavedených klasifikačních kritérií.",
            "Vývoj začal geny BRCA1 a BRCA2, protože patří mezi nejlépe popsané geny spojené s dědičnou nádorovou predispozicí a mají detailní expertní pravidla pro interpretaci variant.",
            "Současná verze je funkční webová aplikace. Automaticky vyhodnocuje kritéria, která lze odvodit z dostupných anotací a referenčních dat. Kritéria vyžadující odborné posouzení zůstávají jasně označená."
          ]
        },
        {
          type: "list",
          heading: "Pro každou variantu ARIANE poskytuje",
          items: [
            "Vyhodnocená a aplikovaná kritéria",
            "Evidenci podporující jednotlivá rozhodnutí",
            "Navrženou klasifikaci",
            "Varování a položky vyžadující manuální revizi"
          ]
        },
        {
          type: "keyValues",
          items: [
            {
              key: "Současná implementace",
              value: "BRCA1 a BRCA2"
            },
            {
              key: "Webová aplikace",
              value: "ariane-app.duckdns.org",
              href: "https://ariane-app.duckdns.org"
            },
            {
              key: "Spolupráce",
              valueHtml: "prof. MUDr. Zdeněk Kleibl, Ph.D.<br>RNDr. Jana Soukupová, Ph.D.<small>Ústav biochemie a experimentální onkologie, 1. lékařská fakulta Univerzity Karlovy</small>"
            }
          ]
        }
      ],
      right: [
        {
          type: "flow",
          heading: "Současný workflow",
          items: [
            "Varianta",
            "Anotace a sběr relevantních dat",
            "Vyhodnocení použitelných kritérií",
            "Kombinace evidence",
            "Navržená klasifikace"
          ]
        },
        {
          type: "media",
          label: "Současná webová aplikace ARIANE",
          description: "Zadání varianty a výsledek klasifikace s aplikovanými kritérii.",
          src: "images/ariane-result.png",
          alt: "Webové rozhraní ARIANE zobrazující klasifikaci varianty"
        },
        {
          type: "scope",
          currentLabel: "Současná implementace",
          current: "BRCA1 / BRCA2",
          futureLabel: "Navrženo pro rozšíření na",
          future: "další geny a genově specifická pravidla"
        }
      ],
      notes: [
        "ARIANE už je funkční aplikace ve fázi ladění a testování.",
        "Formulace, že automatizuje části interpretace, je záměrně přesná. Aplikace automatizuje jen ta kritéria, která lze spolehlivě vyhodnotit z dostupných dat.",
        "BRCA1 a BRCA2 jsou první implementace, ne konečný rozsah projektu. Jsou vhodné pro začátek, protože mají detailně popsaná expertní pravidla a velké množství dostupných dat."
      ]
    },

    {
      id: "literature",
      kicker: "Snímek 3",
      title: "Další fáze: evidence z vědecké literatury",
      layout: "literature",
      left: [
        {
          type: "paragraphs",
          items: [
            "Ne všechna evidence potřebná pro interpretaci variant je dostupná ve strukturovaných databázích.",
            "Funkční studie, RNA experimenty a další relevantní výsledky jsou často popsány pouze v jednotlivých publikacích, tabulkách nebo suplementárních datech a dnes vyžadují manuální kuraci literatury.",
            "Jazykové modely budou použity jako nástroj pro podporu vyhledávání literatury a extrakce strukturované evidence. Vytěžená evidence zůstane propojená s původní publikací a bude předkládána k odborné revizi."
          ]
        },
        {
          type: "keyValues",
          heading: "První rozsah",
          items: [
            {
              key: "Geny",
              value: "BRCA1 a BRCA2"
            },
            {
              key: "Evidence",
              value: "Funkční a RNA / splicingové studie"
            },
            {
              key: "Proč nejdřív BRCA",
              value: "Existuje velké množství zkurátorované literatury vhodné pro vývoj a hodnocení systému"
            }
          ]
        }
      ],
      right: [
        {
          type: "flow",
          heading: "Plánovaný workflow",
          items: [
            "Vědecká literatura",
            "Vyhledání relevantních studií",
            "Identifikace variant, experimentů a výsledků",
            "Extrakce strukturované evidence propojené se zdrojem",
            "Expertní revize a využití v ARIANE"
          ]
        },
        {
          type: "callout",
          heading: "Dlouhodobý směr",
          text: "Stejný rámec lze rozšířit na další geny a genově specifická pravidla interpretace variant."
        }
      ],
      notes: [
        "Hlavní sdělení: první část projektu už automatizuje pravidla založená na strukturovaných datech. Další fáze míří na evidenci, která se skrývá v publikacích.",
        "AI není to nejduležitější, i když je to buzzword. Jazykové modely jsou prostředek pro vyhledání a strukturování evidence, nikoli náhrada odborného rozhodnutí. Tohle je důležité i z etického hlediska",
        "Zdůraznit dohledatelnost: každý vytěžený údaj má zůstat propojený s původním zdrojem a má být předložen expertovi k posouzení.",
        "BRCA1 a BRCA2 jsou znovu vhodný první případ, protože existuje dostatek ručně zkurátorované literatury, proti které lze systém vyvíjet a hodnotit.",
        "Dlouhodobě má jít o obecný rámec, který lze rozšířit na další geny podle dostupnosti kvalitních genově specifických pravidel."
      ]
    },

    {
      id: "conclusion",
      kicker: "Snímek 4",
      title: "Směrem k systematičtější interpretaci variant",
      layout: "standard",
      left: [
        {
          type: "callout",
          heading: "Současný problém",
          text: "Klasifikace variant je složitá, časově náročná a vyžaduje značnou odbornou znalost. Dostupné důkazy a genově specifická pravidla proto nejsou v rutinní praxi vždy vyhodnocovány konzistentně."
        },
        {
          type: "callout",
          heading: "ARIANE v laboratorní praxi",
          text: "ARIANE je navržena jako praktický nástroj pro laboratoře provádějící klasifikaci genetických variant. Při hodnocení konkrétní varianty automaticky vyhodnocuje použitelná kritéria, dokumentuje podkladovou evidenci a provádí uživatele klasifikačním procesem. Vývoj probíhá ve spolupráci s členy ENIGMA Janou Soukupovou a Zdeňkem Kleiblem, a je tak úzce propojen s expertní komunitou zabývající se interpretací variant BRCA1/2."
        }
      ],
      right: [
        {
          type: "callout",
          heading: "Další krok ve vývoji",
          text: "Rozšířit tento rámec na důkazy obsažené ve vědecké literatuře, přičemž expertní revize zůstává nedílnou součástí interpretačního procesu."
        },
        {
          type: "keyValues",
          heading: "Ukázka",
          items: [
            {
              key: "Video ukázka",
              value: "ARIANE - klasifikace variant BRCA1/2",
              href: "ARIANE%20-%20BRCA1_2%20Variant%20Classification.mp4"
            }
          ]
        }
      ],
      notes: [
        "ARIANE je zamýšlená jako praktický nástroj přímo pro laboratoře, ne pouze jako technický prototyp.",
        "Spolupráce s Janou Soukupovou a Zdeňkem Kleiblem je důležitá, protože oba jsou napojeni na ENIGMA komunitu a vývoj tak probíhá v kontaktu s expertní praxí."
      ]
    }
  ]
};
