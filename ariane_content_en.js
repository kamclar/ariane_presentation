window.ARIANE_CONTENTS = window.ARIANE_CONTENTS || {};
window.ARIANE_CONTENTS.en = {
  deck: {
    title: "ARIANE Board Deck",
    headerTitle: "ARIANE",
    headerSubtitle: "automated interpretation of genetic variants",
    presenterName: "Kamila Clarová",
    presenterGroup: "Jiří Vondrášek Group",
    institution: "ÚOCHB AV ČR",
    logoSrc: "images/uochb-iocb-prague-logo.png",
    logoAlt: "IOCB Prague / ÚOCHB AV ČR",
    notesShow: "Show notes",
    notesHide: "Hide notes",
    notesLabel: "Presenter notes",
    footer: "",
  },

  slides: [
    {
      id: "classification",
      kicker: "Slide 1",
      title: "Classification of genetic variants",
      layout: "standard",
      left: [
        {
          type: "paragraphs",
          items: [
            "Genetic testing identifies changes in DNA, known as genetic variants. Most are harmless, but some can alter gene function and increase disease risk.",
            "To interpret a variant, different types of evidence are evaluated using defined classification criteria. Each criterion represents a specific type of evidence and contributes towards a benign or pathogenic classification.",
            "The ACMG/AMP framework provides general criteria for variant interpretation. Expert panels further refine these rules for individual genes or groups of genes.",
            "For BRCA1 and BRCA2, the rules have been further specified by the international ClinGen ENIGMA expert panel."
          ]
        },
        {
          type: "list",
          heading: "Evidence used for classification",
          items: [
            "Population frequency",
            "Predicted effect on the gene or protein",
            "RNA and splicing data",
            "Functional studies",
            "Clinical and family data"
          ]
        }
      ],
      right: [
        {
          type: "scale",
          heading: "Five categories",
          items: [
            "Benign",
            "Likely benign",
            "Uncertain significance (VUS)",
            "Likely pathogenic",
            "Pathogenic"
          ]
        },
        {
          type: "callout",
          heading: "Why classification is chalenging",
          text: "Variant classification can be time-consuming and requires substantial expert knowledge. Relevant evidence is distributed across databases, prediction tools and scientific publications, and individual criteria must be applied according to complex, often gene-specific rules. Some criteria can be evaluated computationally, while others still require manual expert review."
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
      kicker: "Slide 2",
      title: "ARIANE",
      layout: "product",
      left: [
        {
          type: "paragraphs",
          items: [
            "ARIANE automates parts of genetic variant interpretation according to established classification criteria.",
            "Development started with BRCA1 and BRCA2 because they are among the best studied hereditary cancer genes and have detailed, expert-defined interpretation rules.",
            "The current version is a functional web application. It automatically evaluates criteria that can be derived from available annotations and reference data, while criteria requiring expert assessment remain clearly identified."
          ]
        },
        {
          type: "list",
          heading: "For each variant, ARIANE provides",
          items: [
            "Evaluated and applied criteria",
            "Evidence supporting each decision",
            "Proposed classification",
            "Warnings and items requiring manual review"
          ]
        },
        {
          type: "keyValues",
          items: [
            {
              key: "Current implementation",
              value: "BRCA1 and BRCA2"
            },
            {
              key: "Web application",
              value: "ariane-app.duckdns.org",
              href: "https://ariane-app.duckdns.org"
            },
            {
              key: "Collaboration",
              valueHtml: "prof. MUDr. Zdeněk Kleibl, Ph.D.<br>RNDr. Jana Soukupová, Ph.D.<small>Institute of Biochemistry and Experimental Oncology, First Faculty of Medicine, Charles University</small>"
            }
          ]
        }
      ],
      right: [
        {
          type: "flow",
          heading: "Current workflow",
          items: [
            "Variant",
            "Annotation and collection of relevant data",
            "Evaluation of applicable criteria",
            "Combination of evidence",
            "Proposed classification"
          ]
        },
        {
          type: "media",
          label: "Current ARIANE web application",
          description: "Variant entry and the classification result with applied criteria.",
          src: "images/ariane-result.png",
          alt: "ARIANE web interface showing variant classification"
        },
        {
          type: "scope",
          currentLabel: "Current implementation",
          current: "BRCA1 / BRCA2",
          futureLabel: "Designed for extension to",
          future: "additional genes and gene-specific guidelines"
        }
      ],
      notes: [
        "ARIANE už je funkční aplikace ve fázi ladění a testování.",
        "Formulace 'automates parts of variant interpretation' je záměrně přesná. Aplikace automatizuje jen ta kritéria, která lze spolehlivě vyhodnotit z dostupných dat.",
        "BRCA1 a BRCA2 jsou první implementace, ne konečný rozsah projektu. Jsou vhodné pro začátek, protože mají detailně popsaná expertní pravidla a velké množství dostupných dat.",
      ]
    },

    {
      id: "literature",
      kicker: "Slide 3",
      title: "Next phase: evidence from scientific literature",
      layout: "literature",
      left: [
        {
          type: "paragraphs",
          items: [
            "Not all evidence required for variant interpretation is available in structured databases.",
            "Functional studies, RNA experiments and other relevant results are often reported only in individual publications, tables or supplementary data and currently require manual literature curation.",
            "Language-model-based tools will be used to assist literature search and structured evidence extraction. Extracted evidence will remain linked to the original publication and will be presented for expert review."
          ]
        },
        {
          type: "keyValues",
          heading: "Initial scope",
          items: [
            {
              key: "Genes",
              value: "BRCA1 and BRCA2"
            },
            {
              key: "Evidence",
              value: "Functional and RNA / splicing studies"
            },
            {
              key: "Why BRCA first",
              value: "A large body of curated literature is available for development and evaluation"
            }
          ]
        }
      ],
      right: [
        {
          type: "flow",
          heading: "Planned workflow",
          items: [
            "Scientific literature",
            "Find relevant studies",
            "Identify variants, experiments and results",
            "Extract structured, source-linked evidence",
            "Expert review and use in ARIANE"
          ]
        },
        {
          type: "callout",
          heading: "Longer-term direction",
          text: "The same framework can be extended to additional genes and gene-specific interpretation guidelines."
        }
      ],
      notes: [
 "Hlavní sdělení: první část projektu už automatizuje pravidla založená na strukturovaných datech. Další fáze míří na evidenci, která se skrývá v publikacích.",
        "AI není to nejduležitější, i když je to buzzword. Jazykové modely jsou prostředek pro vyhledání a strukturování evidence, nikoli náhrada odborného rozhodnutí. Tohle je důležité i z etického hlediska",
        "Zdůraznit dohledatelnost: každý vytěžený údaj má zůstat propojený s původním zdrojem a má být předložen expertovi k posouzení.",
        "BRCA1 a BRCA2 jsou znovu vhodný první případ, protože existuje dostatek ručně zkurátorované literatury, proti které lze systém vyvíjet a hodnotit.",

        "Dlouhodobě má jít o obecný rámec, který lze rozšířit na další geny podle dostupnosti kvalitních genově specifických pravidel."
      ]
    }
  ]
};
