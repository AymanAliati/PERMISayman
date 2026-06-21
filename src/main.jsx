import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { CalendarDays, Camera, CheckCircle2, Download, FileUp, Filter, Trash2, Upload, X, ZoomIn } from "lucide-react";
import "../styles.css";

const STORAGE = {
  examDate: "permis.examDate",
  tasks: "permis.programTasks",
  courseChecks: "permis.courseChecks",
  series: "permis.series",
  videos: "permis.videos",
  videoChecks: "permis.videoChecks",
  errors: "permis.errors"
};

const DB_NAME = "permisayman-images";
const DB_VERSION = 1;
const IMAGE_STORE = "images";

const tabs = [
  ["dashboard", "Tableau"],
  ["program", "Programme"],
  ["courses", "Cours"],
  ["videos", "Vidéos"],
  ["series", "Séries"],
  ["errors", "Erreurs"]
];

const themes = [
  "التشوير الطرقي",
  "حق الاسبقية",
  "التجاوز و التقابل",
  "الوقوف و التوقف",
  "الأضواء و العربة",
  "السلامة الطرقية",
  "المخالفات والغرامات",
  "مفاهيم تطبيقية",
  "دروس نظرية",
  "آخر"
];

const program = [
  {
    day: 1,
    title: "Signalisation complète",
    theme: "التشوير الطرقي",
    tasks: [
      "Lire le cours « التشوير الطرقي » en entier",
      "Étudier « علامات التنبيه », « علامات المنع », « علامات الإجبار », « علامات الإرشاد », « علامات ملتقى الطرق »",
      "Vidéo : « شرح جميع العلامات الطرقية بالتفصيل »",
      "Vidéo : « محور التشوير الطرقي 2026 » — vidéo 1",
      "Vidéo : « محور التشوير الطرقي 2026 » — vidéo 2",
      "Faire سلسلة 1 — التشوير الطرقي",
      "Faire سلسلة 2 — التشوير الطرقي",
      "Pour chaque faute : ouvrir la série, bouton « Ajouter une erreur », importer la photo de la question"
    ]
  },
  {
    day: 2,
    title: "Priorité et ronds-points",
    theme: "حق الاسبقية",
    tasks: [
      "Lire le cours « حق الاسبقية » en entier",
      "Étudier priorité à droite, Stop, céder le passage, passage piéton, véhicules prioritaires",
      "Vidéo : « محور الأسبقية في ملتقيات الطرق »",
      "Vidéo : « قواعد الأسبقية في المدارات 2026 »",
      "Faire سلسلة 6 — حق الاسبقية",
      "Faire سلسلة 7 — حق الاسبقية",
      "Ajouter les captures des questions ratées dans les séries 6 et 7"
    ]
  },
  {
    day: 3,
    title: "Dépassement, croisement, arrêt",
    theme: "التجاوز و التقابل",
    tasks: [
      "Lire le cours « التجاوز و التقابل »",
      "Lire le cours « الوقوف و التوقف »",
      "Vidéo : « محور التجاوز والتقابل »",
      "Vidéo : « محور الوقوف والتوقف 2026 »",
      "Faire سلسلة 3 — التجاوز + التشوير الطرقي",
      "Faire سلسلة 4 — التجاوز و التقابل",
      "Faire سلسلة 5 — الوقوف و التوقف",
      "Ajouter une erreur avec photo pour chaque question où tu as hésité"
    ]
  },
  {
    day: 4,
    title: "Voiture, feux, mécanique, sécurité",
    theme: "الأضواء و العربة",
    tasks: [
      "Lire le cours « الأضواء و العربة »",
      "Lire le cours « السلامة الطرقية »",
      "Vidéo : « فيديو خاص بأضواء السيارة 2026 »",
      "Vidéo : « محور الميكانيك السيارة 2026 »",
      "Vidéo : « شرح أنظمة السيارة 2026 »",
      "Vidéo : « محور الحوادث والإسعافات 2026 »",
      "Vidéo : « محور خاص بالسائق 2026 »",
      "Faire سلسلة 8 — الأضواء و العربة",
      "Faire سلسلة 9 — مفاهيم تطبيقية",
      "Faire سلسلة 10 و سلسلة 11 — السلامة الطرقية"
    ]
  },
  {
    day: 5,
    title: "Infractions, amendes, plaques",
    theme: "المخالفات والغرامات",
    tasks: [
      "Lire le cours « المخالفات والغرامات »",
      "Mémoriser uniquement les montants affichés : 700 DH, 500 DH, 300 DH, 25 DH",
      "Lire le cours « الصفيحة »",
      "Vidéo : « شرح جميع الجنح 2026 » — vidéo 1",
      "Vidéo : « شرح جميع الجنح 2026 » — vidéo 2",
      "Vidéo : « مخالفات السرعة 2026 »",
      "Faire سلسلة 12 و سلسلة 13 — المخالفات والغرامات",
      "Ajouter les erreurs avec photo, surtout les montants et les questions de « جنحة »"
    ]
  },
  {
    day: 6,
    title: "Questions nouvelles et tests",
    theme: "سلسلة جديدة",
    tasks: [
      "Faire سلسلة 14 à 22 — الإختبار رقم 1 à 9",
      "Vidéo : « الأسئلة الجديدة لرخصة السياقة 2026 » — vidéos 1 à 30",
      "Faire سلسلة جديدة 1 à 9 (= séries 23 à 31)",
      "Après chaque série, noter score /40",
      "Si score < 34/40 : ajouter toutes les questions ratées avec photo",
      "Relire les erreurs à revoir avant de continuer"
    ]
  },
  {
    day: 7,
    title: "Simulation examen et révision finale",
    theme: "الامتحان التجريبي",
    tasks: [
      "Vidéo : « الأسئلة الجديدة لرخصة السياقة 2026 » — vidéos 31 à 61",
      "Vidéo : « إمتحان تجريبي لرخصة السياقة » — vidéos 1 à 14",
      "Faire سلسلة جديدة 10 à 18 (= séries 32 à 40)",
      "Faire الامتحان التجريبي #1 en conditions réelles",
      "Faire الامتحان التجريبي #2 en conditions réelles",
      "Relire uniquement les erreurs à revoir avec leurs photos",
      "Marquer comme revu seulement les erreurs que tu peux expliquer sans regarder la correction"
    ]
  }
];

const courses = [
  ["التشوير الطرقي", "Signalisation (5 catégories)", ["علامات التنبيه : triangle, bord rouge → signale un danger à venir", "علامات المنع : cercle, bord rouge → interdiction", "علامات الإجبار : cercle, fond bleu → obligation", "علامات الإرشاد : rectangle/carré bleu ou vert → information/direction", "علامات ملتقى الطرق : panneaux liés aux intersections et à la priorité"]],
  ["حق الاسبقية", "Priorité", ["priorité à droite par défaut aux intersections sans panneau", "règles aux ronds-points", "priorité piétons aux passages protégés", "priorité véhicules prioritaires (ambulance, pompiers, police en intervention)"]],
  ["التجاوز و التقابل", "Dépassement et croisement", ["conditions de visibilité", "distance de sécurité avant de doubler", "interdictions (ligne continue, sommet de côte, virage, passage piéton, intersection)"]],
  ["الوقوف و التوقف", "Arrêt et stationnement", ["Différence entre \"arrêt\" (toupef, momentané, conducteur reste à proximité) et \"stationnement\" (wouqouf, prolongé)", "zones interdites : passages piétons, intersections, ponts, lignes jaunes"]],
  ["الأضواء و العربة", "Éclairage et équipement obligatoire du véhicule", ["feux de croisement/route", "clignotants", "triangle de signalisation", "gilet", "ceinture", "pneus"]],
  ["السلامة الطرقية / وظائف التمييز والتقييم", "Sécurité routière", ["perception du danger", "distance et temps de réaction", "distance de freinage"]],
  ["السياقة تحت تأثير", "Conduite sous l'effet de l'alcool, médicaments, drogues", ["impact sur le temps de réaction et le jugement"]],
  ["المخالفات والعقوبات", "Infractions et sanctions (montants OFFICIELS vérifiés, loi n°52-05)", ["Contravention 1ère classe : 700 DH (réduit à 400 DH si payé sous 24h, 500 DH si payé sous 15 jours)", "Contravention 2ème classe : 500 DH (réduit à 300 DH / 350 DH)", "Contravention 3ème classe : 300 DH (réduit à 150 DH / 200 DH)", "Contravention article 187 (mineure) : 25 DH", "جنحة (délit) : catégorie plus grave qu'une contravention (une dizaine de cas prévus par la loi), jugée par un tribunal, peut entraîner des poursuites pénales en plus de l'amende."]],
  ["الصفيحة", "Plaque d'immatriculation marocaine", ["Format standard : numéro séquentiel (1 à 99999) + lettre arabe au milieu (indique la série) + code régional (1 à 2 chiffres, de 1 pour Rabat à 89 pour Lagouira)", "Fond blanc, caractères noirs réfléchissants, carte du Maroc à gauche", "Dimensions standard : 520 x 110 mm pour les voitures", "Plaques spéciales à connaître : CD = corps diplomatique (fond bleu), WW = véhicule neuf en sortie de concession (temporaire), véhicules de l'État = fond noir, caractères blancs, avec \"M\" ou \"المغرب\""]]
];

const videoGroups = [
  ["Signalisation", "التشوير الطرقي", ["شرح جميع العلامات الطرقية بالتفصيل", "محور التشوير الطرقي"]],
  ["Dépassement/croisement", "التجاوز و التقابل", ["محور التجاوز والتقابل"]],
  ["Priorité", "حق الاسبقية", ["محور الأسبقية في الملتقيات الطرق", "قواعد الأسبقية في المدارات"]],
  ["Stationnement", "الوقوف و التوقف", ["محور الوقوف والتوقف"]],
  ["Éclairage/mécanique/systèmes", "الأضواء و العربة", ["محور الأضواء المركبة", "محور الميكانيك المركبة", "شرح أنظمة السيارة"]],
  ["Sécurité/amendes", "المخالفات والغرامات", ["مخالفات السرعة 2026", "شرح جميع الجنح", "الحوادث و اسعافات", "محور خاص بالسائق"]],
  ["Entraînement intensif", "أسئلة جديدة ومهمة", ["أسئلة جديدة ومهمة (61 vidéos — jours 7 à 9)"]],
  ["Examens blancs filmés", "الامتحان التجريبي", ["إمتحان تجريبي في رخصة السياقة (14 vidéos — jour 9)"]]
];

const detailedCourses = [
  {
    id: "signalisation",
    title: "التشوير الطرقي",
    subtitle: "Les panneaux et marques que tu dois reconnaître vite pendant l'examen.",
    study: [
      "علامات التنبيه : panneaux de danger. Forme triangle, bord rouge. Le bon réflexe est de ralentir et prévoir le danger avant d'arriver dessus.",
      "علامات المنع : panneaux d'interdiction. Forme cercle, bord rouge. Ils disent ce qui est interdit : vitesse, dépassement, accès, stationnement.",
      "علامات الإجبار : panneaux d'obligation. Forme cercle, fond bleu. Ils imposent une direction, une voie, une obligation ou un comportement.",
      "علامات الإرشاد : panneaux d'information, de direction ou de service. Forme rectangle ou carré, souvent bleu ou vert.",
      "علامات ملتقى الطرق : panneaux liés aux intersections, priorité, Stop, céder le passage et route prioritaire.",
      "Marquage au sol : ligne continue, ligne discontinue, passages piétons, flèches directionnelles, zébras, lignes jaunes."
    ],
    traps: [
      "Ne pas confondre علامات التنبيه et علامات المنع : triangle = danger, cercle rouge = interdiction.",
      "Un panneau temporaire ou un agent peut modifier la règle normale.",
      "La ligne continue interdit le franchissement et rend le dépassement interdit."
    ],
    checklist: [
      "Je reconnais les 5 familles de panneaux.",
      "Je sais expliquer la différence entre triangle, cercle rouge et cercle bleu.",
      "Je sais quoi faire devant Stop, céder le passage et route prioritaire.",
      "Je sais lire les marques au sol importantes."
    ]
  },
  {
    id: "priority",
    title: "حق الاسبقية",
    subtitle: "Les règles de priorité aux intersections, ronds-points et passages protégés.",
    study: [
      "À une intersection sans panneau, la règle générale à retenir est la priorité à droite.",
      "Stop : arrêt obligatoire, puis laisser passer les usagers prioritaires avant de redémarrer.",
      "Céder le passage : ralentir, contrôler, laisser passer si nécessaire, s'arrêter seulement si besoin.",
      "Rond-point : vérifier la signalisation. Très souvent, les véhicules déjà engagés ont priorité si le panneau l'indique.",
      "Passage piéton : priorité aux piétons engagés ou manifestant l'intention de traverser.",
      "Véhicules prioritaires en intervention : ambulance, police, pompiers avec signaux. Il faut faciliter le passage sans créer de danger."
    ],
    traps: [
      "Ne jamais appliquer priorité à droite si un panneau donne une autre règle.",
      "Dans un rond-point, regarder les panneaux avant de répondre.",
      "Un piéton au passage protégé est un point très fréquent dans les questions."
    ],
    checklist: [
      "Je sais résoudre une intersection sans panneau.",
      "Je sais résoudre Stop et céder le passage.",
      "Je sais gérer un rond-point.",
      "Je sais identifier les véhicules prioritaires."
    ]
  },
  {
    id: "overtaking",
    title: "التجاوز و التقابل",
    subtitle: "Dépassement, croisement et décision de sécurité.",
    study: [
      "Avant التجاوز : contrôler devant, derrière, angle mort, signaler avec clignotant, garder la distance et vérifier la visibilité.",
      "التجاوز est interdit si la visibilité est insuffisante, au sommet de côte, dans un virage dangereux, près d'un passage piéton, à une intersection dangereuse ou avec ligne continue.",
      "التقابل : en route étroite, ralentir, serrer à droite, laisser assez d'espace et céder si obstacle de ton côté.",
      "Distance latérale : laisser une marge suffisante avec vélos, piétons, deux-roues et véhicules arrêtés."
    ],
    traps: [
      "Si tu ne vois pas assez loin, la réponse sûre est souvent ne pas dépasser.",
      "La ligne continue est un signal fort : pas de franchissement.",
      "L'obstacle de ton côté signifie souvent que tu dois céder."
    ],
    checklist: [
      "Je sais quand dépasser est autorisé.",
      "Je sais quand dépasser est interdit.",
      "Je sais gérer التقابل sur route étroite.",
      "Je contrôle toujours rétroviseur, angle mort, clignotant."
    ]
  },
  {
    id: "parking",
    title: "الوقوف و التوقف",
    subtitle: "Différence entre arrêt, stationnement et endroits interdits.",
    study: [
      "التوقف : arrêt momentané, généralement pour faire monter/descendre une personne ou charger rapidement.",
      "الوقوف : immobilisation plus longue du véhicule.",
      "Interdictions importantes : passage piéton, intersection, virage dangereux, sommet de côte, pont, tunnel, arrêt bus, accès garage, ligne jaune.",
      "Toujours vérifier les panneaux, le marquage au sol et si le véhicule gêne la visibilité ou la circulation."
    ],
    traps: [
      "Même quelques secondes peuvent être dangereux si tu caches un passage piéton.",
      "Un stationnement peut être interdit même si la chaussée paraît large.",
      "Les lignes jaunes et panneaux locaux priment."
    ],
    checklist: [
      "Je distingue التوقف et الوقوف.",
      "Je connais les zones interdites.",
      "Je vérifie si je gêne la visibilité.",
      "Je regarde toujours panneaux et marquage."
    ]
  },
  {
    id: "lights_vehicle",
    title: "الأضواء و العربة",
    subtitle: "Feux, équipement, mécanique simple et systèmes de sécurité.",
    study: [
      "Feux de croisement : utilisés la nuit, en tunnel, pluie, brouillard léger ou visibilité réduite.",
      "Feux de route : utilisés hors agglomération quand il n'y a pas d'usager en face ou devant à courte distance.",
      "Clignotants : changer de direction, dépasser, se rabattre, sortir d'un stationnement.",
      "Feux de détresse : danger, panne, ralentissement brusque.",
      "Équipement : ceinture, pneus en bon état, freins, rétroviseurs, triangle, gilet, essuie-glaces, lave-glace.",
      "Systèmes : ABS aide à garder le contrôle au freinage, ESP aide à stabiliser, airbags complètent la ceinture."
    ],
    traps: [
      "Les feux de route éblouissent : il faut repasser en croisement face à un usager.",
      "Le clignotant n'accorde jamais la priorité.",
      "Un pneu usé augmente la distance de freinage."
    ],
    checklist: [
      "Je sais choisir les bons feux.",
      "Je connais l'équipement obligatoire.",
      "Je comprends ABS, ESP, airbags.",
      "Je sais pourquoi pneus et freins sont essentiels."
    ]
  },
  {
    id: "safety",
    title: "السلامة الطرقية",
    subtitle: "Comportement, perception, distance et risques.",
    study: [
      "وظائف التمييز والتقييم : observer, identifier le danger, évaluer, décider, agir.",
      "Temps de réaction : temps entre voir le danger et commencer l'action.",
      "Distance de freinage : distance parcourue pendant le freinage.",
      "Distance d'arrêt : distance de réaction + distance de freinage.",
      "Facteurs de risque : vitesse, fatigue, téléphone, stress, pluie, nuit, brouillard, pneus usés.",
      "Adapter la vitesse ne veut pas seulement dire respecter la limite : il faut adapter à la visibilité, météo, trafic et état de la route."
    ],
    traps: [
      "La vitesse augmente fortement la distance d'arrêt.",
      "La fatigue et le téléphone augmentent le temps de réaction.",
      "Par pluie, la distance de freinage augmente."
    ],
    checklist: [
      "Je sais définir distance de réaction, freinage, arrêt.",
      "Je sais repérer les risques.",
      "Je sais adapter ma vitesse.",
      "Je comprends l'effet fatigue/téléphone."
    ]
  },
  {
    id: "influence",
    title: "السياقة تحت تأثير",
    subtitle: "Alcool, médicaments, drogues, fatigue et jugement.",
    study: [
      "L'alcool, les drogues et certains médicaments ralentissent les réflexes et diminuent le jugement.",
      "Le danger principal est de croire que l'on contrôle encore alors que le temps de réaction augmente.",
      "La fatigue peut provoquer manque d'attention, somnolence, mauvaise estimation des distances.",
      "La bonne réponse dans les questions est presque toujours : ne pas conduire, se reposer, demander une alternative sûre."
    ],
    traps: [
      "Café ou douche ne suppriment pas les effets de l'alcool.",
      "Un médicament peut être dangereux même légal.",
      "La fatigue est un risque sérieux, pas un détail."
    ],
    checklist: [
      "Je sais expliquer les effets sur le temps de réaction.",
      "Je sais reconnaître les situations où il ne faut pas conduire.",
      "Je lis les pictogrammes des médicaments.",
      "Je choisis toujours la réponse la plus sûre."
    ]
  },
  {
    id: "infractions",
    title: "المخالفات والغرامات",
    subtitle: "Montants à mémoriser sans ajouter d'autres montants non vérifiés.",
    study: [
      "Contravention 1ère classe : 700 DH. Réduction : 400 DH si payé sous 24h, 500 DH si payé sous 15 jours.",
      "Contravention 2ème classe : 500 DH. Réduction : 300 DH / 350 DH.",
      "Contravention 3ème classe : 300 DH. Réduction : 150 DH / 200 DH.",
      "Contravention article 187 : 25 DH.",
      "جنحة : catégorie plus grave qu'une contravention, jugée par un tribunal, avec risque de poursuites pénales en plus de l'amende."
    ],
    traps: [
      "Ne pas inventer d'autres montants.",
      "Distinguer contravention et جنحة.",
      "Les délais de paiement réduit changent le montant à retenir."
    ],
    checklist: [
      "Je connais 700 DH.",
      "Je connais 500 DH.",
      "Je connais 300 DH.",
      "Je connais 25 DH.",
      "Je comprends جنحة."
    ]
  },
  {
    id: "plates",
    title: "الصفيحة",
    subtitle: "Plaques marocaines à reconnaître pour l'examen.",
    study: [
      "Format courant : numéro séquentiel de 1 à 99999 + lettre arabe au milieu + code régional.",
      "Fond blanc avec caractères noirs pour les véhicules ordinaires.",
      "La lettre arabe indique la série d'immatriculation.",
      "Le code régional est à droite et identifie la préfecture/province d'immatriculation.",
      "WW : véhicule neuf en circulation provisoire.",
      "W18 : usage provisoire professionnel ou essai, à vérifier selon le contexte exact.",
      "CD : corps diplomatique. CC : corps consulaire.",
      "Véhicules de l'État : plaques spécifiques, souvent fond noir et caractères blancs avec M ou المغرب selon le cas.",
      "Autres plaques à reconnaître visuellement : الشرطة, الوقاية المدنية, القوات المسلحة الملكية."
    ],
    traps: [
      "Ne pas confondre lettre arabe de série et code régional.",
      "WW n'est pas une plaque normale définitive.",
      "Les plaques spéciales ont des règles visuelles différentes."
    ],
    checklist: [
      "Je sais lire numéro + lettre arabe + code régional.",
      "Je reconnais WW, W18, CD, CC.",
      "Je reconnais plaques de l'État.",
      "Je sais que les plaques spéciales ne suivent pas toujours le format courant."
    ]
  },
  {
    id: "method",
    title: "منهجية حل السؤال",
    subtitle: "Méthode simple pour répondre aux questions en arabe.",
    study: [
      "Regarder d'abord l'image : panneaux, marquage, position des véhicules, piétons, météo, visibilité.",
      "Identifier le thème : التشوير الطرقي, حق الاسبقية, التجاوز, الوقوف, السلامة الطرقية.",
      "Chercher le danger principal avant de chercher la réponse.",
      "Éliminer les réponses dangereuses : accélérer sans visibilité, dépasser avec ligne continue, ignorer piéton, forcer priorité.",
      "Si tu hésites, choisis la réponse la plus prudente et conforme aux panneaux."
    ],
    traps: [
      "Ne réponds pas seulement avec mémoire : analyse l'image.",
      "Un petit panneau dans le coin peut changer toute la réponse.",
      "Le clignotant d'un véhicule ne donne pas automatiquement la priorité."
    ],
    checklist: [
      "Je lis l'image avant les réponses.",
      "Je repère panneaux et lignes.",
      "Je cherche le danger.",
      "Je choisis la réponse la plus sûre."
    ]
  }
];

const carPlaylists = [
  ["محور التجاوز والتقابل", 1, "التجاوز و التقابل"],
  ["محور الحوادث والإسعافات 2026", 1, "السلامة الطرقية"],
  ["محور خاص بالسائق 2026", 1, "السلامة الطرقية"],
  ["محور الأسبقية في ملتقيات الطرق", 1, "حق الاسبقية"],
  ["محور الوقوف والتوقف 2026", 1, "الوقوف و التوقف"],
  ["فيديو خاص بأضواء السيارة 2026", 1, "الأضواء و العربة"],
  ["محور الميكانيك السيارة 2026", 1, "الأضواء و العربة"],
  ["محور التشوير الطرقي 2026", 2, "التشوير الطرقي"],
  ["شرح أنظمة السيارة 2026", 1, "الأضواء و العربة"],
  ["شرح جميع الجنح 2026", 2, "المخالفات والغرامات"],
  ["قواعد الأسبقية في المدارات 2026", 1, "حق الاسبقية"],
  ["مخالفات السرعة 2026", 1, "المخالفات والغرامات"],
  ["الأسئلة الجديدة لرخصة السياقة 2026", 61, "سلسلة جديدة"],
  ["إمتحان تجريبي لرخصة السياقة", 14, "الامتحان التجريبي"],
  ["شرح جميع العلامات الطرقية بالتفصيل", 1, "التشوير الطرقي"]
];

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [seriesErrorDraft, setSeriesErrorDraft] = useState(null);
  const [serverLoaded, setServerLoaded] = useState(false);
  const [examDate, setExamDate] = useLocalText(STORAGE.examDate, "2026-06-30");
  const [tasks, setTasks] = useLocalJson(STORAGE.tasks, {});
  const [courseChecks, setCourseChecks] = useLocalJson(STORAGE.courseChecks, {});
  const [series, setSeries] = useLocalJson(STORAGE.series, {});
  const [videos, setVideos] = useLocalJson(STORAGE.videos, {});
  const [videoChecks, setVideoChecks] = useLocalJson(STORAGE.videoChecks, {});
  const [errors, setErrors] = useLocalJson(STORAGE.errors, []);
  const dayRefs = useRef({});
  const applyingRemoteState = useRef(false);

  useEffect(() => {
    if ("serviceWorker" in navigator && location.protocol !== "file:") navigator.serviceWorker.register("/sw.js");
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/state")
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("API indisponible")))
      .then((state) => {
        if (cancelled) return;
        applySharedState(state);
      })
      .catch(() => setServerLoaded(false));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!serverLoaded || applyingRemoteState.current) return;
    const timer = window.setTimeout(() => {
      saveServerState({ examDate, tasks, courseChecks, series, videos, videoChecks, errors });
    }, 350);
    return () => window.clearTimeout(timer);
  }, [serverLoaded, examDate, tasks, courseChecks, series, videos, videoChecks, errors]);

  useEffect(() => {
    if (!serverLoaded) return;
    const timer = window.setInterval(async () => {
      const activeTag = document.activeElement?.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(activeTag)) return;
      const state = await loadServerState();
      if (state) applySharedState(state);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [serverLoaded]);

  const totalTasks = program.reduce((sum, day) => sum + day.tasks.length, 0);
  const doneTasks = Object.values(tasks).filter(Boolean).length;
  const progress = totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0;
  const pendingErrors = errors.filter((error) => !error.reviewed).length;

  function goToday() {
    setActiveTab("program");
    window.requestAnimationFrame(() => {
      const day = getCurrentProgramDay(examDate);
      dayRefs.current[day]?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  function applySharedState(state) {
    applyingRemoteState.current = true;
    setExamDate(state.examDate || "2026-06-30");
    setTasks(state.tasks || {});
    setCourseChecks(state.courseChecks || {});
    setSeries(state.series || {});
    setVideos(state.videos || {});
    setVideoChecks(state.videoChecks || {});
    setErrors(state.errors || []);
    setServerLoaded(true);
    window.setTimeout(() => {
      applyingRemoteState.current = false;
    }, 0);
  }

  return (
    <>
      <header className="app-header">
        <div className="brand-mark" aria-hidden="true" />
        <div>
          <p className="kicker">Code de la route marocain - catégorie B</p>
          <h1>PERMISayman</h1>
          {serverLoaded && <p className="sync-status">Synchronisation partagée active</p>}
        </div>
      </header>
      <nav className="tabs" aria-label="Navigation principale">
        {tabs.map(([id, label]) => (
          <button key={id} className={`tab ${activeTab === id ? "active" : ""}`} onClick={() => setActiveTab(id)}>{label}</button>
        ))}
      </nav>
      <main>
        {activeTab === "dashboard" && <Dashboard examDate={examDate} setExamDate={setExamDate} progress={progress} pendingErrors={pendingErrors} goToday={goToday} />}
        {activeTab === "program" && <Program tasks={tasks} setTasks={setTasks} dayRefs={dayRefs} examDate={examDate} />}
        {activeTab === "courses" && <Courses courseChecks={courseChecks} setCourseChecks={setCourseChecks} />}
        {activeTab === "videos" && <Videos videos={videos} setVideos={setVideos} videoChecks={videoChecks} setVideoChecks={setVideoChecks} />}
        {activeTab === "series" && (
          <Series
            series={series}
            setSeries={setSeries}
            errors={errors}
            onAddError={(serie) => {
              setSeriesErrorDraft({ series: serie.number, theme: getErrorThemeForSeries(serie.theme) });
              setActiveTab("errors");
            }}
          />
        )}
        {activeTab === "errors" && (
          <Errors
            errors={errors}
            setErrors={setErrors}
            initialDraft={seriesErrorDraft}
            allState={{ examDate, tasks, courseChecks, series, videos, videoChecks }}
            refreshState={{ setExamDate, setTasks, setCourseChecks, setSeries, setVideos, setVideoChecks }}
          />
        )}
      </main>
    </>
  );
}

function Dashboard({ examDate, setExamDate, progress, pendingErrors, goToday }) {
  const daysLeft = getDaysLeft(examDate);
  return (
    <section className="page active">
      <SectionHeading kicker="Vue rapide" title="Tableau de bord">
        <button className="primary-action icon-button" onClick={goToday}><CalendarDays size={18} />Aller à aujourd'hui</button>
      </SectionHeading>
      <div className="dashboard-grid">
        <article className="metric-card road-card">
          <label htmlFor="examDate">Date de mon examen</label>
          <input id="examDate" type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} />
          <strong>{daysLeft}</strong>
          <span>jours restants</span>
        </article>
        <article className="metric-card">
          <div className="progress-ring" style={{ background: `conic-gradient(var(--green) ${progress * 3.6}deg, #2b3945 0deg)` }}>
            <span>{progress}%</span>
          </div>
          <p>Tâches du Programme cochées</p>
        </article>
        <article className="metric-card danger-card">
          <strong>{pendingErrors}</strong>
          <span>erreurs non encore revues</span>
        </article>
      </div>
    </section>
  );
}

function Program({ tasks, setTasks, dayRefs, examDate }) {
  const todayDay = getCurrentProgramDay(examDate);
  return (
    <section className="page active">
      <SectionHeading kicker="Plan de révision" title="Programme sur 7 jours" />
      <div className="timeline">
        {program.map((day) => (
          <article key={day.day} ref={(node) => { dayRefs.current[day.day] = node; }} className={`day-card ${todayDay === day.day ? "today" : ""}`} data-day={day.day}>
            <h3>Jour {day.day} ({day.title})</h3>
            {day.theme && <span className="theme-pill arabic" dir="rtl">{day.theme}</span>}
            {day.tasks.map((task, index) => {
              const id = `d${day.day}-t${index}`;
              return (
                <label key={id} className="check-item">
                  <input type="checkbox" checked={Boolean(tasks[id])} onChange={(e) => setTasks({ ...tasks, [id]: e.target.checked })} />
                  <MarkedText text={task} />
                </label>
              );
            })}
          </article>
        ))}
      </div>
    </section>
  );
}

function Courses({ courseChecks, setCourseChecks }) {
  return (
    <section className="page active">
      <SectionHeading kicker="Leçons complètes" title="Cours détaillés" />
      <div className="course-grid">
        {detailedCourses.map((course) => (
          <article className="course-card detailed-course" key={course.id}>
            <div className="course-topline">
              <div>
                <h3 className="arabic" dir="rtl">{course.title}</h3>
                <p>{course.subtitle}</p>
              </div>
              <label className="mini-check">
                <input
                  type="checkbox"
                  checked={Boolean(courseChecks[`${course.id}:studied`])}
                  onChange={(e) => setCourseChecks({ ...courseChecks, [`${course.id}:studied`]: e.target.checked })}
                />
                étudié
              </label>
            </div>
            <h4>À étudier</h4>
            <ul>{course.study.map((item) => <li key={item}><MarkedText text={item} /></li>)}</ul>
            <h4>Pièges fréquents</h4>
            <ul>{course.traps.map((item) => <li key={item}><MarkedText text={item} /></li>)}</ul>
            <h4>Checklist</h4>
            <div className="inline-checklist">
              {course.checklist.map((item, index) => {
                const key = `${course.id}:check:${index}`;
                return (
                  <label key={key} className="check-item">
                    <input
                      type="checkbox"
                      checked={Boolean(courseChecks[key])}
                      onChange={(e) => setCourseChecks({ ...courseChecks, [key]: e.target.checked })}
                    />
                    <MarkedText text={item} />
                  </label>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Videos({ videos, setVideos, videoChecks, setVideoChecks }) {
  const totalVideos = carPlaylists.reduce((sum, [, count]) => sum + count, 0);
  const watchedVideos = carPlaylists.reduce((sum, [name, count]) => {
    return sum + Array.from({ length: count }, (_, index) => Boolean(videoChecks[`${slug(name)}:${index + 1}`])).filter(Boolean).length;
  }, 0);

  return (
    <section className="page active">
      <SectionHeading kicker={`${watchedVideos}/${totalVideos} vidéos cochées`} title="Vidéos voiture à suivre" />
      <div className="video-grid">
        {carPlaylists.map(([name, count, theme], playlistIndex) => (
          <article className="video-card" key={name}>
            <div className="series-top">
              <h3 className="arabic" dir="rtl">{name}</h3>
              <span className="badge">{count} {count > 1 ? "vidéos" : "vidéo"}</span>
            </div>
            <span className="theme-pill arabic" dir="rtl">{theme}</span>
            <label className="playlist-row">
              <span>Lien ou ID YouTube de la playlist</span>
              <input
                type="text"
                placeholder="Coller le vrai lien ou ID YouTube"
                value={videos[slug(name)] || ""}
                onChange={(e) => setVideos({ ...videos, [slug(name)]: e.target.value })}
              />
            </label>
            <div className="video-checkpoints">
              {Array.from({ length: count }, (_, index) => {
                const number = index + 1;
                const key = `${slug(name)}:${number}`;
                return (
                  <label key={key} className="mini-check">
                    <input
                      type="checkbox"
                      checked={Boolean(videoChecks[key])}
                      onChange={(e) => setVideoChecks({ ...videoChecks, [key]: e.target.checked })}
                    />
                    Vidéo {number}
                  </label>
                );
              })}
            </div>
            {playlistIndex === 12 && <p className="hint">À répartir surtout sur les jours 6 et 7 : ce bloc contient beaucoup de questions nouvelles.</p>}
            {playlistIndex === 13 && <p className="hint">À utiliser en condition réelle : chronomètre, correction immédiate, puis ajout des erreurs avec photo.</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

function Series({ series, setSeries, errors, onAddError }) {
  return (
    <section className="page active">
      <SectionHeading kicker="PERMINOU" title="Suivi des 40 séries" />
      <div className="series-grid">
        {buildSeries().map((serie) => {
          const state = series[serie.number] || {};
          const serieErrors = errors.filter((error) => String(error.series) === String(serie.number));
          const pendingSerieErrors = serieErrors.filter((error) => !error.reviewed).length;
          return (
            <article className={`series-card ${state.done ? "done" : ""}`} key={serie.number}>
              <div className="series-top">
                <div>
                  <h3 className="arabic" dir="rtl">{serie.name}</h3>
                  <span className="theme-pill arabic" dir="rtl">{serie.theme}</span>
                </div>
                {serie.advanced && <span className="badge">avancée</span>}
              </div>
              <label className="check-item">
                <input type="checkbox" checked={Boolean(state.done)} onChange={(e) => setSeries({ ...series, [serie.number]: { ...state, done: e.target.checked } })} />
                <span>fait</span>
              </label>
              <label className="score-row">
                <span>Score sur 40</span>
                <input type="number" min="0" max="40" inputMode="numeric" value={state.score || ""} onChange={(e) => setSeries({ ...series, [serie.number]: { ...state, score: e.target.value } })} />
              </label>
              <div className="series-error-summary">
                <span><b>{serieErrors.length}</b> erreurs</span>
                <span><b>{pendingSerieErrors}</b> à revoir</span>
              </div>
              <button className="primary-action icon-button" type="button" onClick={() => onAddError(serie)}>
                <Camera size={18} />
                Ajouter une erreur
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Errors({ errors, setErrors, initialDraft, allState, refreshState }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const [filters, setFilters] = useState({ theme: "all", series: "", status: "all", difficulty: "all" });
  const [lightbox, setLightbox] = useState("");
  const [thumbUrls, setThumbUrls] = useState({});
  const formRef = useRef(null);

  const filtered = useMemo(() => errors.filter((error) => {
    if (filters.theme !== "all" && error.theme !== filters.theme) return false;
    if (filters.series && String(error.series) !== String(filters.series)) return false;
    if (filters.status === "pending" && error.reviewed) return false;
    if (filters.status === "reviewed" && !error.reviewed) return false;
    if (filters.difficulty !== "all" && error.difficulty !== filters.difficulty) return false;
    return true;
  }), [errors, filters]);

  useEffect(() => {
    const onPaste = (event) => {
      const file = [...event.clipboardData.items].find((item) => item.type.startsWith("image/"))?.getAsFile();
      if (file) selectPhoto(file, setSelectedPhoto, setPreview);
    };
    document.addEventListener("paste", onPaste);
    return () => document.removeEventListener("paste", onPaste);
  }, []);

  useEffect(() => {
    if (!initialDraft?.series) return;
    setFilters((current) => ({
      ...current,
      series: String(initialDraft.series),
      theme: initialDraft.theme || "all"
    }));
  }, [initialDraft]);

  useEffect(() => {
    let cancelled = false;
    async function loadThumbs() {
      const next = {};
      for (const error of filtered) {
        if (error.thumbUrl) {
          next[error.id] = error.thumbUrl;
        } else {
          const blob = await getImage(`${error.id}-thumb`);
          if (blob) next[error.id] = URL.createObjectURL(blob);
        }
      }
      if (!cancelled) setThumbUrls(next);
    }
    loadThumbs();
    return () => {
      cancelled = true;
      Object.values(thumbUrls).filter((url) => url.startsWith("blob:")).forEach(URL.revokeObjectURL);
    };
  }, [filtered]);

  async function submit(event) {
    event.preventDefault();
    if (!selectedPhoto) {
      alert("La photo est obligatoire.");
      return;
    }
    const form = new FormData(event.currentTarget);
    const id = crypto.randomUUID();
    const storedImage = await createStoredImage(selectedPhoto);
    const thumb = await createThumbnail(selectedPhoto);
    const metadata = {
      id,
      series: form.get("series"),
      theme: form.get("theme"),
      question: String(form.get("question") || "").trim(),
      answerGiven: String(form.get("answerGiven") || "").trim(),
      correctAnswer: String(form.get("correctAnswer") || "").trim(),
      reason: String(form.get("reason") || "").trim(),
      difficulty: form.get("difficulty") || "moyen",
      note: String(form.get("note") || "").trim(),
      date: new Date().toISOString(),
      reviewed: false
    };
    const serverError = await saveServerError({
      id,
      metadata,
      imageDataUrl: await blobToDataUrl(storedImage),
      thumbDataUrl: await blobToDataUrl(thumb)
    });
    if (serverError) {
      setErrors([serverError, ...errors.filter((error) => error.id !== serverError.id)]);
    } else {
      await putImage(id, storedImage);
      await putImage(`${id}-thumb`, thumb);
      setErrors([metadata, ...errors]);
    }
    event.currentTarget.reset();
    setSelectedPhoto(null);
    setPreview("");
  }

  async function openImage(id) {
    const error = errors.find((item) => item.id === id);
    if (error?.imageUrl) {
      setLightbox(error.imageUrl);
      return;
    }
    const blob = await getImage(id);
    if (blob) setLightbox(URL.createObjectURL(blob));
  }

  async function removeError(id) {
    if (!confirm("Supprimer cette erreur ?")) return;
    setErrors(errors.filter((error) => error.id !== id));
    await fetch(`/api/errors/${encodeURIComponent(id)}`, { method: "DELETE" }).catch(() => {});
    await deleteImage(id);
    await deleteImage(`${id}-thumb`);
  }

  async function exportBackup() {
    const images = {};
    for (const error of errors) {
      const full = error.imageUrl ? await urlToBlob(error.imageUrl) : await getImage(error.id);
      const thumb = error.thumbUrl ? await urlToBlob(error.thumbUrl) : await getImage(`${error.id}-thumb`);
      images[error.id] = full ? await blobToDataUrl(full) : null;
      images[`${error.id}-thumb`] = thumb ? await blobToDataUrl(thumb) : null;
    }
    const backup = { version: 2, exportedAt: new Date().toISOString(), localStorage: { ...allState, errors }, images };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `permisayman-sauvegarde-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
  }

  async function importBackup(event) {
    const file = event.target.files[0];
    if (!file) return;
    const backup = JSON.parse(await file.text());
    if (!backup.localStorage || !backup.images) {
      alert("Fichier de sauvegarde invalide.");
      return;
    }
    refreshState.setExamDate(backup.localStorage.examDate || "2026-06-30");
    refreshState.setTasks(backup.localStorage.tasks || {});
    refreshState.setCourseChecks(backup.localStorage.courseChecks || {});
    refreshState.setSeries(backup.localStorage.series || {});
    refreshState.setVideos(backup.localStorage.videos || {});
    refreshState.setVideoChecks(backup.localStorage.videoChecks || {});
    const importedErrors = backup.localStorage.errors || [];
    const syncedErrors = [];
    for (const error of importedErrors) {
      const imageDataUrl = backup.images[error.id];
      const thumbDataUrl = backup.images[`${error.id}-thumb`];
      const saved = imageDataUrl && thumbDataUrl
        ? await saveServerError({ id: error.id, metadata: error, imageDataUrl, thumbDataUrl })
        : null;
      syncedErrors.push(saved || error);
    }
    setErrors(syncedErrors);
    for (const [id, dataUrl] of Object.entries(backup.images)) {
      if (dataUrl) await putImage(id, dataUrlToBlob(dataUrl));
    }
    event.target.value = "";
  }

  return (
    <section className="page active">
      <SectionHeading kicker="Journal visuel" title="Mes erreurs">
        <div className="backup-actions">
          <button className="icon-button" onClick={exportBackup}><Download size={18} />Exporter ma sauvegarde</button>
          <label className="file-button icon-button"><FileUp size={18} />Importer une sauvegarde<input type="file" accept="application/json" onChange={importBackup} /></label>
        </div>
      </SectionHeading>

      <form className="error-form" ref={formRef} onSubmit={submit}>
        {initialDraft?.series && (
          <div className="linked-series-banner">
            <span>Erreur liée à la série {initialDraft.series}</span>
            <span className="arabic" dir="rtl">{initialDraft.theme}</span>
          </div>
        )}
        <div className="photo-drop" tabIndex="0">
          <input id="photoInput" type="file" accept="image/*" capture="environment" onChange={(e) => selectPhoto(e.target.files[0], setSelectedPhoto, setPreview)} />
          <label htmlFor="photoInput" className="icon-button"><Camera size={18} />Importer une photo</label>
          <p>Photo obligatoire. Collage d'image accepté avec Ctrl+V.</p>
          {preview && <img src={preview} alt="Aperçu de la photo importée" />}
        </div>
        <div className="form-grid">
          <label>Série n°<input name="series" type="number" min="1" max="40" inputMode="numeric" defaultValue={initialDraft?.series || ""} /></label>
          <label>Thème<select name="theme" required defaultValue={themes.includes(initialDraft?.theme) ? initialDraft.theme : themes[0]}>{themes.map((theme) => <option key={theme} value={theme} dir="rtl">{theme}</option>)}</select></label>
          <label>N° de question<input name="question" type="text" /></label>
          <label>Réponse choisie<input name="answerGiven" type="text" /></label>
          <label>Bonne réponse<input name="correctAnswer" type="text" /></label>
          <label>Difficulté<select name="difficulty"><option value="facile">facile</option><option value="moyen">moyen</option><option value="difficile">difficile</option></select></label>
          <label>Pourquoi j'ai fait l'erreur<textarea name="reason" rows="3" /></label>
          <label>Note / règle à retenir<textarea name="note" rows="4" /></label>
        </div>
        <button className="primary-action icon-button" type="submit"><Upload size={18} />Ajouter l'erreur</button>
      </form>

      <div className="filters">
        <label><Filter size={16} /> Thème<select value={filters.theme} onChange={(e) => setFilters({ ...filters, theme: e.target.value })}><option value="all">Tous les thèmes</option>{themes.map((theme) => <option key={theme} value={theme} dir="rtl">{theme}</option>)}</select></label>
        <label>Série<input type="number" min="1" max="40" placeholder="Série" value={filters.series} onChange={(e) => setFilters({ ...filters, series: e.target.value })} /></label>
        <label>Statut<select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}><option value="all">Tous les statuts</option><option value="pending">À revoir</option><option value="reviewed">Revu</option></select></label>
        <label>Difficulté<select value={filters.difficulty} onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}><option value="all">Toutes</option><option value="facile">facile</option><option value="moyen">moyen</option><option value="difficile">difficile</option></select></label>
      </div>

      <div className="error-gallery">
        {!filtered.length && <p className="muted">Aucune erreur pour ces filtres.</p>}
        {filtered.map((error) => (
          <article className="error-card" key={error.id}>
            <button className="thumb-button" onClick={() => openImage(error.id)} aria-label="Ouvrir la photo">
              {thumbUrls[error.id] ? <img src={thumbUrls[error.id]} alt="Miniature de l'erreur" /> : <span>Photo</span>}
              <span className="zoom-hint"><ZoomIn size={18} />Zoom</span>
            </button>
            <div>
              <strong className="arabic" dir="rtl">{error.theme}</strong>
              <p>Série {error.series || "-"} {error.question ? `- Question ${error.question}` : ""}</p>
              {error.answerGiven && <p><b>Ma réponse :</b> {error.answerGiven}</p>}
              {error.correctAnswer && <p><b>Bonne réponse :</b> {error.correctAnswer}</p>}
              {error.reason && <p><b>Pourquoi :</b> {error.reason}</p>}
              <p>{error.note}</p>
              <small>{new Date(error.date).toLocaleDateString("fr-FR")} · {error.difficulty || "moyen"} · <span className={error.reviewed ? "reviewed" : "pending"}>{error.reviewed ? "revu" : "à revoir"}</span></small>
            </div>
            <div className="card-actions">
              <button className="icon-button" onClick={() => setErrors(errors.map((item) => item.id === error.id ? { ...item, reviewed: !item.reviewed } : item))}><CheckCircle2 size={17} />{error.reviewed ? "À revoir" : "Marquer comme revu"}</button>
              <button className="delete-button icon-button" onClick={() => removeError(error.id)}><Trash2 size={17} />Supprimer</button>
            </div>
          </article>
        ))}
      </div>

      {lightbox && (
        <div className="lightbox open" role="dialog" aria-modal="true">
          <button className="close-lightbox" onClick={() => { if (lightbox.startsWith("blob:")) URL.revokeObjectURL(lightbox); setLightbox(""); }} aria-label="Fermer"><X size={22} /></button>
          <img src={lightbox} alt="Photo d'erreur agrandie" />
        </div>
      )}
    </section>
  );
}

function SectionHeading({ kicker, title, children }) {
  return (
    <div className="section-heading">
      <div>
        <p className="kicker">{kicker}</p>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}

function MarkedText({ text }) {
  const parts = String(text).split(/([\u0600-\u06ff][\u0600-\u06ff\s\d#،()°-]*)/g);
  return <span>{parts.map((part, index) => /[\u0600-\u06ff]/.test(part) ? <span key={index} className="arabic" dir="rtl">{part}</span> : part)}</span>;
}

function useLocalJson(key, fallback) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : fallback;
    } catch {
      return fallback;
    }
  });
  useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [key, value]);
  return [value, setValue];
}

function useLocalText(key, fallback) {
  const [value, setValue] = useState(() => localStorage.getItem(key) || fallback);
  useEffect(() => localStorage.setItem(key, value), [key, value]);
  return [value, setValue];
}

async function saveServerState(state) {
  try {
    await fetch("/api/state", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state)
    });
  } catch {
    // LocalStorage remains the offline fallback when the shared server is not running.
  }
}

async function loadServerState() {
  try {
    const response = await fetch("/api/state", { cache: "no-store" });
    return response.ok ? response.json() : null;
  } catch {
    return null;
  }
}

async function saveServerError(payload) {
  try {
    const response = await fetch("/api/errors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) return null;
    const result = await response.json();
    return result.error || null;
  } catch {
    return null;
  }
}

function getDaysLeft(examDate) {
  const target = new Date(`${examDate}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.ceil((target - today) / 86400000);
  return Number.isFinite(days) ? Math.max(0, days) : 0;
}

function getCurrentProgramDay(examDate) {
  const target = new Date(`${examDate}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysUntil = Math.ceil((target - today) / 86400000);
  return Math.min(7, Math.max(1, 7 - daysUntil + 1));
}

function buildSeries() {
  return Array.from({ length: 40 }, (_, index) => {
    const number = index + 1;
    let theme;
    let advanced = false;
    if (number <= 2) theme = "التشوير الطرقي";
    else if (number <= 4) theme = "التجاوز";
    else if (number === 5) theme = "الوقوف و التوقف";
    else if (number <= 7) theme = "حق الاسبقية";
    else if (number === 8) theme = "الأضواء و العربة";
    else if (number === 9) theme = "مفاهيم تطبيقية";
    else if (number <= 11) theme = "السلامة الطرقية";
    else if (number <= 13) theme = "المخالفات والغرامات";
    else if (number <= 22) theme = `الإختبار رقم ${number - 13}`;
    else {
      theme = `سلسلة جديدة ${number - 22}`;
      advanced = true;
    }
    return { number, name: `سلسلة ${number}`, theme, advanced };
  });
}

function selectPhoto(file, setSelectedPhoto, setPreview) {
  if (!file || !file.type.startsWith("image/")) return;
  setSelectedPhoto(file);
  setPreview(URL.createObjectURL(file));
}

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => request.result.createObjectStore(IMAGE_STORE);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function putImage(id, blob) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IMAGE_STORE, "readwrite");
    tx.objectStore(IMAGE_STORE).put(blob, id);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

async function getImage(id) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const request = db.transaction(IMAGE_STORE).objectStore(IMAGE_STORE).get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function deleteImage(id) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IMAGE_STORE, "readwrite");
    tx.objectStore(IMAGE_STORE).delete(id);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

function createThumbnail(file) {
  return resizeImage(file, 720, 0.9);
}

function createStoredImage(file) {
  return resizeImage(file, 1800, 0.9);
}

function resizeImage(file, max, quality) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const scale = Math.min(1, max / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(image.width * scale);
      canvas.height = Math.round(image.height * scale);
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Image impossible")), "image/jpeg", quality);
    };
    image.onerror = reject;
    image.src = URL.createObjectURL(file);
  });
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function urlToBlob(url) {
  const response = await fetch(url);
  return response.ok ? response.blob() : null;
}

function dataUrlToBlob(dataUrl) {
  const [meta, data] = dataUrl.split(",");
  const mime = meta.match(/data:(.*);base64/)?.[1] || "application/octet-stream";
  const bytes = atob(data);
  const buffer = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i += 1) buffer[i] = bytes.charCodeAt(i);
  return new Blob([buffer], { type: mime });
}

function slug(value) {
  return value.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\u0600-\u06ff-]/g, "");
}

function getErrorThemeForSeries(theme) {
  if (themes.includes(theme)) return theme;
  if (theme.includes("التجاوز")) return "التجاوز و التقابل";
  if (theme.includes("الإختبار") || theme.includes("سلسلة جديدة")) return "آخر";
  return "آخر";
}

createRoot(document.getElementById("root")).render(<App />);
