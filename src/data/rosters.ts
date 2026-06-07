export type TeamRoster = {
  source: string;
  fetchedAt: string;
  roster: Record<'Thủ môn' | 'Hậu vệ' | 'Tiền vệ' | 'Tiền đạo', string[]>;
  xi: string[];
};

export const actualRosters: Record<string, TeamRoster> = {
  "mexico": {
    "source": "https://en.wikipedia.org/wiki/Mexico_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Raúl Rangel",
        "Carlos Acevedo",
        "Guillermo Ochoa"
      ],
      "Hậu vệ": [
        "Jorge Sánchez",
        "César Montes",
        "Edson Álvarez",
        "Johan Vásquez",
        "Israel Reyes",
        "Mateo Chávez",
        "Jesús Gallardo"
      ],
      "Tiền vệ": [
        "Érik Lira",
        "Luis Romo",
        "Álvaro Fidalgo",
        "Orbelín Pineda",
        "Obed Vargas",
        "Gilberto Mora",
        "Luis Chávez",
        "Roberto Alvarado",
        "Brian Gutiérrez"
      ],
      "Tiền đạo": [
        "Raúl Jiménez",
        "Alexis Vega",
        "Santiago Giménez",
        "Armando González",
        "Julián Quiñones",
        "César Huerta",
        "Guillermo Martínez"
      ]
    },
    "xi": [
      "Raúl Rangel",
      "Jorge Sánchez",
      "César Montes",
      "Edson Álvarez",
      "Johan Vásquez",
      "Érik Lira",
      "Luis Romo",
      "Álvaro Fidalgo",
      "Raúl Jiménez",
      "Alexis Vega",
      "Santiago Giménez"
    ]
  },
  "south-africa": {
    "source": "https://en.wikipedia.org/wiki/South_Africa_national_soccer_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Ronwen Williams",
        "Sipho Chaine",
        "Ricardo Goss"
      ],
      "Hậu vệ": [
        "Thabang Matuludi",
        "Khulumani Ndamane",
        "Aubrey Modiba",
        "Mbekezeli Mbokazi",
        "Samukele Kabini",
        "Nkosinathi Sibisi",
        "Khuliso Mudau",
        "Ime Okon",
        "Olwethu Makhanya",
        "Kamogelo Sebelebele",
        "Bradley Cross"
      ],
      "Tiền vệ": [
        "Teboho Mokoena",
        "Thalente Mbatha",
        "Yaya Sithole",
        "Jayden Adams"
      ],
      "Tiền đạo": [
        "Oswin Appollis",
        "Tshepang Moremi",
        "Lyle Foster",
        "Relebohile Mofokeng",
        "Themba Zwane",
        "Thapelo Maseko",
        "Iqraam Rayners",
        "Evidence Makgopa"
      ]
    },
    "xi": [
      "Ronwen Williams",
      "Thabang Matuludi",
      "Khulumani Ndamane",
      "Aubrey Modiba",
      "Mbekezeli Mbokazi",
      "Teboho Mokoena",
      "Thalente Mbatha",
      "Yaya Sithole",
      "Oswin Appollis",
      "Tshepang Moremi",
      "Lyle Foster"
    ]
  },
  "korea-republic": {
    "source": "https://en.wikipedia.org/wiki/South_Korea_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Kim Seung-gyu",
        "Song Bum-keun",
        "Jo Hyeon-woo"
      ],
      "Hậu vệ": [
        "Lee Han-beom",
        "Lee Gi-hyuk",
        "Kim Min-jae",
        "Kim Tae-hyeon",
        "Lee Tae-seok",
        "Cho Wi-je",
        "Kim Moon-hwan",
        "Park Jin-seob",
        "Seol Young-woo",
        "Jens Castrop"
      ],
      "Tiền vệ": [
        "Hwang In-beom",
        "Paik Seung-ho",
        "Lee Jae-sung",
        "Hwang Hee-chan",
        "Bae Jun-ho",
        "Lee Kang-in",
        "Yang Hyun-jun",
        "Kim Jin-gyu",
        "Eom Ji-sung",
        "Lee Dong-gyeong"
      ],
      "Tiền đạo": [
        "Son Heung-min",
        "Cho Gue-sung",
        "Oh Hyeon-gyu"
      ]
    },
    "xi": [
      "Kim Seung-gyu",
      "Lee Han-beom",
      "Lee Gi-hyuk",
      "Kim Min-jae",
      "Kim Tae-hyeon",
      "Hwang In-beom",
      "Paik Seung-ho",
      "Lee Jae-sung",
      "Son Heung-min",
      "Cho Gue-sung",
      "Oh Hyeon-gyu"
    ]
  },
  "czechia": {
    "source": "https://en.wikipedia.org/wiki/Czech_Republic_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Matěj Kovář",
        "Jindřich Staněk",
        "Lukáš Horníček"
      ],
      "Hậu vệ": [
        "David Zima",
        "Tomáš Holeš",
        "Robin Hranáč",
        "Vladimír Coufal",
        "Štěpán Chaloupek",
        "Ladislav Krejčí",
        "David Jurásek",
        "Jaroslav Zelený",
        "David Douděra"
      ],
      "Tiền vệ": [
        "Vladimír Darida",
        "Lukáš Červ",
        "Pavel Šulc",
        "Lukáš Provod",
        "Michal Sadílek",
        "Tomáš Souček",
        "Alexandr Sojka",
        "Hugo Sochůrek",
        "Denis Višinský"
      ],
      "Tiền đạo": [
        "Adam Hložek",
        "Patrik Schick",
        "Jan Kuchta",
        "Mojmír Chytil",
        "Tomáš Chorý"
      ]
    },
    "xi": [
      "Matěj Kovář",
      "David Zima",
      "Tomáš Holeš",
      "Robin Hranáč",
      "Vladimír Coufal",
      "Vladimír Darida",
      "Lukáš Červ",
      "Pavel Šulc",
      "Adam Hložek",
      "Patrik Schick",
      "Jan Kuchta"
    ]
  },
  "canada": {
    "source": "https://en.wikipedia.org/wiki/Canada_men's_national_soccer_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Dayne St. Clair",
        "Maxime Crépeau",
        "Owen Goodman"
      ],
      "Hậu vệ": [
        "Alistair Johnston",
        "Alfie Jones",
        "Luc de Fougerolles",
        "Joel Waterman",
        "Derek Cornelius",
        "Moïse Bombito",
        "Alphonso Davies",
        "Richie Laryea",
        "Niko Sigur"
      ],
      "Tiền vệ": [
        "Mathieu Choinière",
        "Stephen Eustáquio",
        "Ismaël Koné",
        "Liam Millar",
        "Jacob Shaffelburg",
        "Tajon Buchanan",
        "Ali Ahmed",
        "Jonathan Osorio",
        "Nathan Saliba"
      ],
      "Tiền đạo": [
        "Cyle Larin",
        "Jonathan David",
        "Tani Oluwaseyi",
        "Promise David"
      ]
    },
    "xi": [
      "Dayne St. Clair",
      "Alistair Johnston",
      "Alfie Jones",
      "Luc de Fougerolles",
      "Joel Waterman",
      "Mathieu Choinière",
      "Stephen Eustáquio",
      "Ismaël Koné",
      "Cyle Larin",
      "Jonathan David",
      "Tani Oluwaseyi"
    ]
  },
  "bosnia": {
    "source": "https://en.wikipedia.org/wiki/Bosnia_and_Herzegovina_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Nikola Vasilj",
        "Mladen Jurkas",
        "Martin Zlomislić"
      ],
      "Hậu vệ": [
        "Nihad Mujakić",
        "Dennis Hadžikadunić",
        "Tarik Muharemović",
        "Sead Kolašinac",
        "Amar Dedić",
        "Nikola Katić",
        "Stjepan Radeljić",
        "Nidal Čelik"
      ],
      "Tiền vệ": [
        "Benjamin Tahirović",
        "Armin Gigović",
        "Ivan Bašić",
        "Ivan Šunjić",
        "Amar Memić",
        "Amir Hadžiahmetović",
        "Dženis Burnić",
        "Kerim Alajbegović",
        "Esmir Bajraktarević",
        "Ermin Mahmić"
      ],
      "Tiền đạo": [
        "Samed Baždar",
        "Ermedin Demirović",
        "Edin Džeko",
        "Haris Tabaković",
        "Jovo Lukić"
      ]
    },
    "xi": [
      "Nikola Vasilj",
      "Nihad Mujakić",
      "Dennis Hadžikadunić",
      "Tarik Muharemović",
      "Sead Kolašinac",
      "Benjamin Tahirović",
      "Armin Gigović",
      "Ivan Bašić",
      "Samed Baždar",
      "Ermedin Demirović",
      "Edin Džeko"
    ]
  },
  "qatar": {
    "source": "https://en.wikipedia.org/wiki/Qatar_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Mahmud Abunada",
        "Salah Zakaria",
        "Meshaal Barsham"
      ],
      "Hậu vệ": [
        "Pedro Miguel",
        "Lucas Mendes",
        "Issa Laye",
        "Ayoub Al-Oui",
        "Homam Ahmed",
        "Boualem Khoukhi",
        "Sultan Al-Brake",
        "Al-Hashmi Al-Hussain"
      ],
      "Tiền vệ": [
        "Jassem Gaber",
        "Abdulaziz Hatem",
        "Karim Boudiaf",
        "Ahmed Fathy",
        "Assim Madibo",
        "Mohamed Manai"
      ],
      "Tiền đạo": [
        "Ahmed Alaaeldin",
        "Edmilson Junior",
        "Mohammed Muntari",
        "Hassan Al-Haydos",
        "Akram Afif",
        "Yusuf Abdurisag",
        "Ahmed Al-Ganehi",
        "Almoez Ali",
        "Tahsin Jamshid"
      ]
    },
    "xi": [
      "Mahmud Abunada",
      "Pedro Miguel",
      "Lucas Mendes",
      "Issa Laye",
      "Ayoub Al-Oui",
      "Jassem Gaber",
      "Abdulaziz Hatem",
      "Karim Boudiaf",
      "Ahmed Alaaeldin",
      "Edmilson Junior",
      "Mohammed Muntari"
    ]
  },
  "switzerland": {
    "source": "https://en.wikipedia.org/wiki/Switzerland_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Gregor Kobel",
        "Yvon Mvogo",
        "Marvin Keller"
      ],
      "Hậu vệ": [
        "Miro Muheim",
        "Silvan Widmer",
        "Nico Elvedi",
        "Manuel Akanji",
        "Ricardo Rodriguez",
        "Eray Cömert",
        "Aurèle Amenda",
        "Luca Jaquez"
      ],
      "Tiền vệ": [
        "Denis Zakaria",
        "Remo Freuler",
        "Johan Manzambi",
        "Granit Xhaka",
        "Ardon Jashari",
        "Djibril Sow",
        "Christian Fassnacht",
        "Michel Aebischer",
        "Fabian Rieder"
      ],
      "Tiền đạo": [
        "Breel Embolo",
        "Dan Ndoye",
        "Rubén Vargas",
        "Noah Okafor",
        "Zeki Amdouni",
        "Cedric Itten"
      ]
    },
    "xi": [
      "Gregor Kobel",
      "Miro Muheim",
      "Silvan Widmer",
      "Nico Elvedi",
      "Manuel Akanji",
      "Denis Zakaria",
      "Remo Freuler",
      "Johan Manzambi",
      "Breel Embolo",
      "Dan Ndoye",
      "Rubén Vargas"
    ]
  },
  "brazil": {
    "source": "https://en.wikipedia.org/wiki/Brazil_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Alisson",
        "Weverton",
        "Ederson"
      ],
      "Hậu vệ": [
        "Gabriel Magalhães",
        "Marquinhos",
        "Alex Sandro",
        "Danilo",
        "Bremer",
        "Léo Pereira",
        "Douglas Santos",
        "Roger Ibañez"
      ],
      "Tiền vệ": [
        "Éderson",
        "Casemiro",
        "Bruno Guimarães",
        "Fabinho",
        "Danilo Santos",
        "Lucas Paquetá"
      ],
      "Tiền đạo": [
        "Vinícius Júnior",
        "Matheus Cunha",
        "Neymar",
        "Raphinha",
        "Endrick",
        "Luiz Henrique",
        "Gabriel Martinelli",
        "Igor Thiago",
        "Rayan"
      ]
    },
    "xi": [
      "Alisson",
      "Gabriel Magalhães",
      "Marquinhos",
      "Alex Sandro",
      "Danilo",
      "Éderson",
      "Casemiro",
      "Bruno Guimarães",
      "Vinícius Júnior",
      "Matheus Cunha",
      "Neymar"
    ]
  },
  "morocco": {
    "source": "https://en.wikipedia.org/wiki/Morocco_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Yassine Bounou",
        "Munir Mohamedi",
        "Ahmed Reda Tagnaouti",
        "El Mehdi Al Harrar"
      ],
      "Hậu vệ": [
        "Achraf Hakimi",
        "Noussair Mazraoui",
        "Nayef Aguerd",
        "Zakaria El Ouahdi",
        "Issa Diop",
        "Chadi Riad",
        "Youssef Belammari",
        "Redouane Halhal",
        "Anass Salah-Eddine",
        "Marwane Saâdane",
        "Ali Maamar"
      ],
      "Tiền vệ": [
        "Sofyan Amrabat",
        "Ayyoub Bouaddi",
        "Chemsdine Talbi",
        "Azzedine Ounahi",
        "Ismael Saibari",
        "Samir El Mourabet",
        "Gessime Yassine",
        "Bilal El Khannouss",
        "Neil El Aynaoui"
      ],
      "Tiền đạo": [
        "Soufiane Rahimi",
        "Brahim Díaz",
        "Abde Ezzalzouli",
        "Ayoub El Kaabi",
        "Ayoube Amaimouni",
        "Amine Sbaï"
      ]
    },
    "xi": [
      "Yassine Bounou",
      "Achraf Hakimi",
      "Noussair Mazraoui",
      "Nayef Aguerd",
      "Zakaria El Ouahdi",
      "Sofyan Amrabat",
      "Ayyoub Bouaddi",
      "Chemsdine Talbi",
      "Soufiane Rahimi",
      "Brahim Díaz",
      "Abde Ezzalzouli"
    ]
  },
  "haiti": {
    "source": "https://en.wikipedia.org/wiki/Haiti_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Johny Placide",
        "Alexandre Pierre",
        "Josué Duverger"
      ],
      "Hậu vệ": [
        "Carlens Arcus",
        "Keeto Thermoncy",
        "Ricardo Adé",
        "Hannes Delcroix",
        "Martin Expérience",
        "Duke Lacroix",
        "Jean-Kévin Duverne",
        "Wilguens Paugain"
      ],
      "Tiền vệ": [
        "Carl Sainté",
        "Jean‐Ricner Bellegarde",
        "Leverton Pierre",
        "Danley Jean Jacques",
        "Dominique Simon",
        "Woodensky Pierre"
      ],
      "Tiền đạo": [
        "Derrick Etienne Jr.",
        "Duckens Nazon",
        "Louicius Deedson",
        "Ruben Providence",
        "Lenny Joseph",
        "Wilson Isidor",
        "Yassin Fortuné",
        "Frantzdy Pierrot",
        "Josué Casimir"
      ]
    },
    "xi": [
      "Johny Placide",
      "Carlens Arcus",
      "Keeto Thermoncy",
      "Ricardo Adé",
      "Hannes Delcroix",
      "Carl Sainté",
      "Jean‐Ricner Bellegarde",
      "Leverton Pierre",
      "Derrick Etienne Jr.",
      "Duckens Nazon",
      "Louicius Deedson"
    ]
  },
  "scotland": {
    "source": "https://en.wikipedia.org/wiki/Scotland_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Angus Gunn",
        "Liam Kelly",
        "Craig Gordon"
      ],
      "Hậu vệ": [
        "Aaron Hickey",
        "Andy Robertson",
        "Grant Hanley",
        "Kieran Tierney",
        "Jack Hendry",
        "John Souttar",
        "Dominic Hyam",
        "Nathan Patterson",
        "Anthony Ralston",
        "Scott McKenna"
      ],
      "Tiền vệ": [
        "Scott McTominay",
        "John McGinn",
        "Tyler Fletcher",
        "Ryan Christie",
        "Ben Gannon-Doak",
        "Lewis Ferguson",
        "Kenny McLean",
        "Findlay Curtis"
      ],
      "Tiền đạo": [
        "Lyndon Dykes",
        "Ché Adams",
        "Ross Stewart",
        "George Hirst",
        "Lawrence Shankland"
      ]
    },
    "xi": [
      "Angus Gunn",
      "Aaron Hickey",
      "Andy Robertson",
      "Grant Hanley",
      "Kieran Tierney",
      "Scott McTominay",
      "John McGinn",
      "Tyler Fletcher",
      "Lyndon Dykes",
      "Ché Adams",
      "Ross Stewart"
    ]
  },
  "usa": {
    "source": "https://en.wikipedia.org/wiki/United_States_men's_national_soccer_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Matt Turner",
        "Matt Freese",
        "Chris Brady"
      ],
      "Hậu vệ": [
        "Sergiño Dest",
        "Chris Richards",
        "Antonee Robinson",
        "Auston Trusty",
        "Miles Robinson",
        "Tim Ream",
        "Alex Freeman",
        "Max Arfsten",
        "Mark McKenzie",
        "Joe Scally"
      ],
      "Tiền vệ": [
        "Tyler Adams",
        "Giovanni Reyna",
        "Weston McKennie",
        "Sebastian Berhalter",
        "Cristian Roldan",
        "Malik Tillman"
      ],
      "Tiền đạo": [
        "Ricardo Pepi",
        "Christian Pulisic",
        "Brenden Aaronson",
        "Haji Wright",
        "Folarin Balogun",
        "Timothy Weah",
        "Alejandro Zendejas"
      ]
    },
    "xi": [
      "Matt Turner",
      "Sergiño Dest",
      "Chris Richards",
      "Antonee Robinson",
      "Auston Trusty",
      "Tyler Adams",
      "Giovanni Reyna",
      "Weston McKennie",
      "Ricardo Pepi",
      "Christian Pulisic",
      "Brenden Aaronson"
    ]
  },
  "paraguay": {
    "source": "https://en.wikipedia.org/wiki/Paraguay_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Gatito Fernández",
        "Orlando Gill",
        "Gastón Olveira"
      ],
      "Hậu vệ": [
        "Gustavo Velázquez",
        "Omar Alderete",
        "Juan José Cáceres",
        "Fabián Balbuena",
        "Júnior Alonso",
        "José Canale",
        "Gustavo Gómez",
        "Alexandro Maidana"
      ],
      "Tiền vệ": [
        "Ramón Sosa",
        "Diego Gómez",
        "Miguel Almirón",
        "Maurício",
        "Andrés Cubas",
        "Damián Bobadilla",
        "Kaku",
        "Braian Ojeda",
        "Matías Galarza",
        "Gustavo Caballero"
      ],
      "Tiền đạo": [
        "Antonio Sanabria",
        "Álex Arce",
        "Julio Enciso",
        "Gabriel Ávalos",
        "Isidro Pitta"
      ]
    },
    "xi": [
      "Gatito Fernández",
      "Gustavo Velázquez",
      "Omar Alderete",
      "Juan José Cáceres",
      "Fabián Balbuena",
      "Ramón Sosa",
      "Diego Gómez",
      "Miguel Almirón",
      "Antonio Sanabria",
      "Álex Arce",
      "Julio Enciso"
    ]
  },
  "australia": {
    "source": "https://en.wikipedia.org/wiki/Australia_men's_national_soccer_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Mathew Ryan",
        "Paul Izzo",
        "Patrick Beach"
      ],
      "Hậu vệ": [
        "Miloš Degenek",
        "Alessandro Circati",
        "Jacob Italiano",
        "Jordan Bos",
        "Jason Geria",
        "Kai Trewin",
        "Aziz Behich",
        "Harry Souttar",
        "Cameron Burgess",
        "Lucas Herrington"
      ],
      "Tiền vệ": [
        "Connor Metcalfe",
        "Ajdin Hrustić",
        "Aiden O'Neill",
        "Cammy Devlin",
        "Jackson Irvine",
        "Paul Okon-Engstler"
      ],
      "Tiền đạo": [
        "Mathew Leckie",
        "Mohamed Touré",
        "Awer Mabil",
        "Nestory Irankunda",
        "Cristian Volpato",
        "Nishan Velupillay",
        "Tete Yengi"
      ]
    },
    "xi": [
      "Mathew Ryan",
      "Miloš Degenek",
      "Alessandro Circati",
      "Jacob Italiano",
      "Jordan Bos",
      "Connor Metcalfe",
      "Ajdin Hrustić",
      "Aiden O'Neill",
      "Mathew Leckie",
      "Mohamed Touré",
      "Awer Mabil"
    ]
  },
  "turkiye": {
    "source": "https://en.wikipedia.org/wiki/Turkey_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Mert Günok",
        "Altay Bayındır",
        "Uğurcan Çakır"
      ],
      "Hậu vệ": [
        "Zeki Çelik",
        "Merih Demiral",
        "Çağlar Söyüncü",
        "Eren Elmalı",
        "Abdülkerim Bardakcı",
        "Ozan Kabak",
        "Mert Müldür",
        "Ferdi Kadıoğlu",
        "Samet Akaydin"
      ],
      "Tiền vệ": [
        "Salih Özcan",
        "Orkun Kökçü",
        "Hakan Çalhanoğlu",
        "İsmail Yüksek",
        "Kaan Ayhan"
      ],
      "Tiền đạo": [
        "Kerem Aktürkoğlu",
        "Arda Güler",
        "Deniz Gül",
        "Kenan Yıldız",
        "İrfan Can Kahveci",
        "Yunus Akgün",
        "Barış Alper Yılmaz",
        "Oğuz Aydın",
        "Can Uzun"
      ]
    },
    "xi": [
      "Mert Günok",
      "Zeki Çelik",
      "Merih Demiral",
      "Çağlar Söyüncü",
      "Eren Elmalı",
      "Salih Özcan",
      "Orkun Kökçü",
      "Hakan Çalhanoğlu",
      "Kerem Aktürkoğlu",
      "Arda Güler",
      "Deniz Gül"
    ]
  },
  "germany": {
    "source": "https://en.wikipedia.org/wiki/Germany_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Manuel Neuer",
        "Oliver Baumann",
        "Alexander Nübel"
      ],
      "Hậu vệ": [
        "Antonio Rüdiger",
        "Waldemar Anton",
        "Jonathan Tah",
        "Pascal Groß",
        "Nico Schlotterbeck",
        "Nathaniel Brown",
        "David Raum",
        "Malick Thiaw"
      ],
      "Tiền vệ": [
        "Aleksandar Pavlović",
        "Joshua Kimmich",
        "Leon Goretzka",
        "Jamie Leweling",
        "Jamal Musiala",
        "Angelo Stiller",
        "Florian Wirtz",
        "Leroy Sané",
        "Nadiem Amiri",
        "Felix Nmecha",
        "Assan Ouédraogo"
      ],
      "Tiền đạo": [
        "Kai Havertz",
        "Nick Woltemade",
        "Maximilian Beier",
        "Deniz Undav"
      ]
    },
    "xi": [
      "Manuel Neuer",
      "Antonio Rüdiger",
      "Waldemar Anton",
      "Jonathan Tah",
      "Pascal Groß",
      "Aleksandar Pavlović",
      "Joshua Kimmich",
      "Leon Goretzka",
      "Kai Havertz",
      "Nick Woltemade",
      "Maximilian Beier"
    ]
  },
  "curacao": {
    "source": "https://en.wikipedia.org/wiki/Curaçao_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Eloy Room",
        "Tyrick Bodak",
        "Trevor Doornbusch"
      ],
      "Hậu vệ": [
        "Shurandy Sambo",
        "Juriën Gaari",
        "Roshon van Eijma",
        "Sherel Floranus",
        "Armando Obispo",
        "Joshua Brenet",
        "Riechedly Bazoer",
        "Deveron Fonville"
      ],
      "Tiền vệ": [
        "Godfried Roemeratoe",
        "Juninho Bacuna",
        "Livano Comenencia",
        "Leandro Bacuna",
        "Tyrese Noslin",
        "Ar'jany Martha",
        "Kevin Felida"
      ],
      "Tiền đạo": [
        "Jürgen Locadia",
        "Jeremy Antonisse",
        "Sontje Hansen",
        "Kenji Gorré",
        "Jearl Margaritha",
        "Brandley Kuwas",
        "Gervane Kastaneer",
        "Tahith Chong"
      ]
    },
    "xi": [
      "Eloy Room",
      "Shurandy Sambo",
      "Juriën Gaari",
      "Roshon van Eijma",
      "Sherel Floranus",
      "Godfried Roemeratoe",
      "Juninho Bacuna",
      "Livano Comenencia",
      "Jürgen Locadia",
      "Jeremy Antonisse",
      "Sontje Hansen"
    ]
  },
  "cote-divoire": {
    "source": "https://en.wikipedia.org/wiki/Ivory_Coast_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Yahia Fofana",
        "Mohamed Koné",
        "Alban Lafont"
      ],
      "Hậu vệ": [
        "Ousmane Diomande",
        "Ghislain Konan",
        "Wilfried Singo",
        "Odilon Kossounou",
        "Christopher Opéri",
        "Guéla Doué",
        "Emmanuel Agbadou",
        "Evan Ndicka"
      ],
      "Tiền vệ": [
        "Jean Michaël Seri",
        "Seko Fofana",
        "Franck Kessié",
        "Ibrahim Sangaré",
        "Parfait Guiagon",
        "Christ Inao Oulaï"
      ],
      "Tiền đạo": [
        "Ange-Yoan Bonny",
        "Simon Adingra",
        "Yan Diomande",
        "Elye Wahi",
        "Oumar Diakité",
        "Amad Diallo",
        "Nicolas Pépé",
        "Evann Guessand",
        "Bazoumana Touré"
      ]
    },
    "xi": [
      "Yahia Fofana",
      "Ousmane Diomande",
      "Ghislain Konan",
      "Wilfried Singo",
      "Odilon Kossounou",
      "Jean Michaël Seri",
      "Seko Fofana",
      "Franck Kessié",
      "Ange-Yoan Bonny",
      "Simon Adingra",
      "Yan Diomande"
    ]
  },
  "ecuador": {
    "source": "https://en.wikipedia.org/wiki/Ecuador_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Hernán Galíndez",
        "Moisés Ramírez",
        "Gonzalo Valle"
      ],
      "Hậu vệ": [
        "Félix Torres",
        "Piero Hincapié",
        "Joel Ordóñez",
        "Willian Pacho",
        "Pervis Estupiñán",
        "Ángelo Preciado",
        "Jackson Porozo"
      ],
      "Tiền vệ": [
        "Jordy Alcívar",
        "Anthony Valencia",
        "John Yeboah",
        "Kendry Páez",
        "Alan Minda",
        "Pedro Vite",
        "Denil Castillo",
        "Gonzalo Plata",
        "Alan Franco",
        "Moisés Caicedo",
        "Yaimar Medina"
      ],
      "Tiền đạo": [
        "Kevin Rodríguez",
        "Enner Valencia",
        "Jordy Caicedo",
        "Nilson Angulo",
        "Jeremy Arévalo"
      ]
    },
    "xi": [
      "Hernán Galíndez",
      "Félix Torres",
      "Piero Hincapié",
      "Joel Ordóñez",
      "Willian Pacho",
      "Jordy Alcívar",
      "Anthony Valencia",
      "John Yeboah",
      "Kevin Rodríguez",
      "Enner Valencia",
      "Jordy Caicedo"
    ]
  },
  "netherlands": {
    "source": "https://en.wikipedia.org/wiki/Netherlands_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Bart Verbruggen",
        "Robin Roefs",
        "Mark Flekken"
      ],
      "Hậu vệ": [
        "Jurriën Timber",
        "Virgil van Dijk",
        "Nathan Aké",
        "Jan Paul van Hecke",
        "Mats Wieffer",
        "Micky van de Ven",
        "Denzel Dumfries",
        "Jorrel Hato"
      ],
      "Tiền vệ": [
        "Marten de Roon",
        "Justin Kluivert",
        "Ryan Gravenberch",
        "Tijjani Reijnders",
        "Guus Til",
        "Teun Koopmeiners",
        "Frenkie de Jong",
        "Quinten Timber"
      ],
      "Tiền đạo": [
        "Wout Weghorst",
        "Memphis Depay",
        "Cody Gakpo",
        "Noa Lang",
        "Donyell Malen",
        "Brian Brobbey",
        "Crysencio Summerville"
      ]
    },
    "xi": [
      "Bart Verbruggen",
      "Jurriën Timber",
      "Virgil van Dijk",
      "Nathan Aké",
      "Jan Paul van Hecke",
      "Marten de Roon",
      "Justin Kluivert",
      "Ryan Gravenberch",
      "Wout Weghorst",
      "Memphis Depay",
      "Cody Gakpo"
    ]
  },
  "japan": {
    "source": "https://en.wikipedia.org/wiki/Japan_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Zion Suzuki",
        "Keisuke Ōsako",
        "Tomoki Hayakawa"
      ],
      "Hậu vệ": [
        "Yukinari Sugawara",
        "Shōgo Taniguchi",
        "Kō Itakura",
        "Yūto Nagatomo",
        "Tsuyoshi Watanabe",
        "Ayumu Seko",
        "Hiroki Itō",
        "Takehiro Tomiyasu",
        "Junnosuke Suzuki"
      ],
      "Tiền vệ": [
        "Wataru Endo",
        "Ao Tanaka",
        "Takefusa Kubo",
        "Ritsu Dōan",
        "Keito Nakamura",
        "Junya Itō",
        "Daichi Kamada",
        "Kaishu Sano"
      ],
      "Tiền đạo": [
        "Keisuke Gotō",
        "Daizen Maeda",
        "Yuito Suzuki",
        "Ayase Ueda",
        "Kōki Ogawa",
        "Kento Shiogai"
      ]
    },
    "xi": [
      "Zion Suzuki",
      "Yukinari Sugawara",
      "Shōgo Taniguchi",
      "Kō Itakura",
      "Yūto Nagatomo",
      "Wataru Endo",
      "Ao Tanaka",
      "Takefusa Kubo",
      "Keisuke Gotō",
      "Daizen Maeda",
      "Yuito Suzuki"
    ]
  },
  "sweden": {
    "source": "https://en.wikipedia.org/wiki/Sweden_men's_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Jacob Widell Zetterström",
        "Viktor Johansson",
        "Kristoffer Nordfeldt"
      ],
      "Hậu vệ": [
        "Gustaf Lagerbielke",
        "Victor Lindelöf",
        "Isak Hien",
        "Gabriel Gudmundsson",
        "Herman Johansson",
        "Daniel Svensson",
        "Hjalmar Ekdal",
        "Carl Starfelt",
        "Eric Smith",
        "Elliot Stroud"
      ],
      "Tiền vệ": [
        "Lucas Bergvall",
        "Benjamin Nygren",
        "Ken Sema",
        "Jesper Karlström",
        "Yasin Ayari",
        "Mattias Svanberg",
        "Alexander Bernhardsson",
        "Besfort Zeneli"
      ],
      "Tiền đạo": [
        "Alexander Isak",
        "Anthony Elanga",
        "Viktor Gyökeres",
        "Gustaf Nilsson",
        "Taha Ali"
      ]
    },
    "xi": [
      "Jacob Widell Zetterström",
      "Gustaf Lagerbielke",
      "Victor Lindelöf",
      "Isak Hien",
      "Gabriel Gudmundsson",
      "Lucas Bergvall",
      "Benjamin Nygren",
      "Ken Sema",
      "Alexander Isak",
      "Anthony Elanga",
      "Viktor Gyökeres"
    ]
  },
  "tunisia": {
    "source": "https://en.wikipedia.org/wiki/Tunisia_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Mouhib Chamakh",
        "Aymen Dahmen",
        "Sabri Ben Hessen"
      ],
      "Hậu vệ": [
        "Ali Abdi",
        "Montassar Talbi",
        "Omar Rekik",
        "Adem Arous",
        "Dylan Bronn",
        "Mortadha Ben Ouanes",
        "Yan Valery",
        "Mohamed Amine Ben Hamida",
        "Moutaz Neffati",
        "Raed Chikhaoui"
      ],
      "Tiền vệ": [
        "Hannibal Mejbri",
        "Ismaël Gharbi",
        "Rani Khedira",
        "Hadj Mahmoud",
        "Ellyes Skhiri",
        "Anis Ben Slimane"
      ],
      "Tiền đạo": [
        "Elias Achouri",
        "Elias Saad",
        "Hazem Mastouri",
        "Khalil Ayari",
        "Rayan Elloumi",
        "Firas Chaouat",
        "Sebastian Tounekti"
      ]
    },
    "xi": [
      "Mouhib Chamakh",
      "Ali Abdi",
      "Montassar Talbi",
      "Omar Rekik",
      "Adem Arous",
      "Hannibal Mejbri",
      "Ismaël Gharbi",
      "Rani Khedira",
      "Elias Achouri",
      "Elias Saad",
      "Hazem Mastouri"
    ]
  },
  "belgium": {
    "source": "https://en.wikipedia.org/wiki/Belgium_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Thibaut Courtois",
        "Senne Lammens",
        "Mike Penders"
      ],
      "Hậu vệ": [
        "Zeno Debast",
        "Arthur Theate",
        "Brandon Mechele",
        "Maxim De Cuyper",
        "Thomas Meunier",
        "Koni De Winter",
        "Joaquin Seys",
        "Timothy Castagne",
        "Nathan Ngoy"
      ],
      "Tiền vệ": [
        "Axel Witsel",
        "Kevin De Bruyne",
        "Youri Tielemans",
        "Hans Vanaken",
        "Nicolas Raskin",
        "Amadou Onana"
      ],
      "Tiền đạo": [
        "Romelu Lukaku",
        "Leandro Trossard",
        "Jérémy Doku",
        "Dodi Lukébakio",
        "Charles De Ketelaere",
        "Alexis Saelemaekers",
        "Matias Fernandez-Pardo"
      ]
    },
    "xi": [
      "Thibaut Courtois",
      "Zeno Debast",
      "Arthur Theate",
      "Brandon Mechele",
      "Maxim De Cuyper",
      "Axel Witsel",
      "Kevin De Bruyne",
      "Youri Tielemans",
      "Romelu Lukaku",
      "Leandro Trossard",
      "Jérémy Doku"
    ]
  },
  "egypt": {
    "source": "https://en.wikipedia.org/wiki/Egypt_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Mohamed El Shenawy",
        "El Mahdy Soliman",
        "Mostafa Shobeir",
        "Mohamed Alaa"
      ],
      "Hậu vệ": [
        "Yasser Ibrahim",
        "Mohamed Hany",
        "Hossam Abdelmaguid",
        "Ramy Rabia",
        "Mohamed Abdelmonem",
        "Ahmed Fatouh",
        "Karim Hafez",
        "Tarek Alaa"
      ],
      "Tiền vệ": [
        "Emam Ashour",
        "Mostafa Ziko",
        "Hamdy Fathy",
        "Mohanad Lasheen",
        "Nabil Emad",
        "Marwan Attia",
        "Mahmoud Saber"
      ],
      "Tiền đạo": [
        "Trézéguet",
        "Hamza Abdelkarim",
        "Mohamed Salah",
        "Haissem Hassan",
        "Ibrahim Adel",
        "Omar Marmoush",
        "Zizo"
      ]
    },
    "xi": [
      "Mohamed El Shenawy",
      "Yasser Ibrahim",
      "Mohamed Hany",
      "Hossam Abdelmaguid",
      "Ramy Rabia",
      "Emam Ashour",
      "Mostafa Ziko",
      "Hamdy Fathy",
      "Trézéguet",
      "Hamza Abdelkarim",
      "Mohamed Salah"
    ]
  },
  "iran": {
    "source": "https://en.wikipedia.org/wiki/Iran_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Alireza Beiranvand",
        "Payam Niazmand",
        "Hossein Hosseini"
      ],
      "Hậu vệ": [
        "Saleh Hardani",
        "Ehsan Hajsafi",
        "Shojae Khalilzadeh",
        "Milad Mohammadi",
        "Hossein Kanaanizadegan",
        "Aria Yousefi",
        "Ali Nemati",
        "Ramin Rezaeian",
        "Danial Eiri"
      ],
      "Tiền vệ": [
        "Saeid Ezatolahi",
        "Alireza Jahanbakhsh",
        "Mohammad Mohebi",
        "Saman Ghoddos",
        "Rouzbeh Cheshmi",
        "Mahdi Torabi",
        "Mohammad Ghorbani",
        "Amirmohammad Razzaghinia"
      ],
      "Tiền đạo": [
        "Mehdi Taremi",
        "Mehdi Ghayedi",
        "Ali Alipour",
        "Amirhossein Hosseinzadeh",
        "Shahriyar Moghanlou",
        "Dennis Eckert"
      ]
    },
    "xi": [
      "Alireza Beiranvand",
      "Saleh Hardani",
      "Ehsan Hajsafi",
      "Shojae Khalilzadeh",
      "Milad Mohammadi",
      "Saeid Ezatolahi",
      "Alireza Jahanbakhsh",
      "Mohammad Mohebi",
      "Mehdi Taremi",
      "Mehdi Ghayedi",
      "Ali Alipour"
    ]
  },
  "new-zealand": {
    "source": "https://en.wikipedia.org/wiki/New_Zealand_men's_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Max Crocombe",
        "Alex Paulsen",
        "Michael Woud"
      ],
      "Hậu vệ": [
        "Tim Payne",
        "Francis de Vries",
        "Tyler Bindon",
        "Michael Boxall",
        "Liberato Cacace",
        "Nando Pijnaker",
        "Finn Surman",
        "Callan Elliot",
        "Tommy Smith"
      ],
      "Tiền vệ": [
        "Joe Bell",
        "Matthew Garbett",
        "Marko Stamenić",
        "Sarpreet Singh",
        "Elijah Just",
        "Alex Rufer",
        "Ben Old",
        "Callum McCowatt",
        "Ryan Thomas",
        "Lachlan Bayliss"
      ],
      "Tiền đạo": [
        "Chris Wood",
        "Kosta Barbarouses",
        "Ben Waine",
        "Jesse Randall"
      ]
    },
    "xi": [
      "Max Crocombe",
      "Tim Payne",
      "Francis de Vries",
      "Tyler Bindon",
      "Michael Boxall",
      "Joe Bell",
      "Matthew Garbett",
      "Marko Stamenić",
      "Chris Wood",
      "Kosta Barbarouses",
      "Ben Waine"
    ]
  },
  "spain": {
    "source": "https://en.wikipedia.org/wiki/Spain_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "David Raya",
        "Joan Garcia",
        "Unai Simón"
      ],
      "Hậu vệ": [
        "Marc Pubill",
        "Álex Grimaldo",
        "Eric García",
        "Marcos Llorente",
        "Pedro Porro",
        "Aymeric Laporte",
        "Pau Cubarsí",
        "Marc Cucurella"
      ],
      "Tiền vệ": [
        "Mikel Merino",
        "Fabián Ruiz",
        "Gavi",
        "Álex Baena",
        "Rodri",
        "Martín Zubimendi",
        "Pedri"
      ],
      "Tiền đạo": [
        "Ferran Torres",
        "Dani Olmo",
        "Yéremy Pino",
        "Nico Williams",
        "Lamine Yamal",
        "Mikel Oyarzabal",
        "Víctor Muñoz",
        "Borja Iglesias"
      ]
    },
    "xi": [
      "David Raya",
      "Marc Pubill",
      "Álex Grimaldo",
      "Eric García",
      "Marcos Llorente",
      "Mikel Merino",
      "Fabián Ruiz",
      "Gavi",
      "Ferran Torres",
      "Dani Olmo",
      "Yéremy Pino"
    ]
  },
  "cabo-verde": {
    "source": "https://en.wikipedia.org/wiki/Cape_Verde_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Vozinha",
        "Márcio Rosa",
        "CJ dos Santos"
      ],
      "Hậu vệ": [
        "Stopira",
        "Diney",
        "Pico",
        "Logan Costa",
        "João Paulo",
        "Sidny Lopes Cabral",
        "Steven Moreira",
        "Wagner Pina",
        "Kelvin Pires"
      ],
      "Tiền vệ": [
        "Kevin Pina",
        "Jamiro Monteiro",
        "Deroy Duarte",
        "Laros Duarte",
        "Yannick Semedo",
        "Telmo Arcanjo"
      ],
      "Tiền đạo": [
        "Jovane Cabral",
        "Benchimol",
        "Garry Rodrigues",
        "Willy Semedo",
        "Dailon Livramento",
        "Ryan Mendes",
        "Nuno da Costa",
        "Hélio Varela"
      ]
    },
    "xi": [
      "Vozinha",
      "Stopira",
      "Diney",
      "Pico",
      "Logan Costa",
      "Kevin Pina",
      "Jamiro Monteiro",
      "Deroy Duarte",
      "Jovane Cabral",
      "Benchimol",
      "Garry Rodrigues"
    ]
  },
  "saudi-arabia": {
    "source": "https://en.wikipedia.org/wiki/Saudi_Arabia_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Nawaf Al-Aqidi",
        "Mohammed Al-Owais",
        "Ahmed Al-Kassar"
      ],
      "Hậu vệ": [
        "Ali Majrashi",
        "Ali Lajami",
        "Abdulelah Al-Amri",
        "Hassan Al-Tambakti",
        "Saud Abdulhamid",
        "Nawaf Boushal",
        "Hassan Kadesh",
        "Moteb Al-Harbi",
        "Jehad Thakri",
        "Mohammed Abu Al-Shamat"
      ],
      "Tiền vệ": [
        "Nasser Al-Dawsari",
        "Musab Al-Juwayr",
        "Ayman Yahya",
        "Salem Al-Dawsari",
        "Abdullah Al-Khaibari",
        "Ziyad Al-Johani",
        "Alaa Al-Hejji",
        "Sultan Mandash",
        "Mohamed Kanno"
      ],
      "Tiền đạo": [
        "Firas Al-Buraikan",
        "Saleh Al-Shehri",
        "Khalid Al-Ghannam",
        "Abdullah Al-Hamdan"
      ]
    },
    "xi": [
      "Nawaf Al-Aqidi",
      "Ali Majrashi",
      "Ali Lajami",
      "Abdulelah Al-Amri",
      "Hassan Al-Tambakti",
      "Nasser Al-Dawsari",
      "Musab Al-Juwayr",
      "Ayman Yahya",
      "Firas Al-Buraikan",
      "Saleh Al-Shehri",
      "Khalid Al-Ghannam"
    ]
  },
  "uruguay": {
    "source": "https://en.wikipedia.org/wiki/Uruguay_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Sergio Rochet",
        "Santiago Mele",
        "Fernando Muslera"
      ],
      "Hậu vệ": [
        "José María Giménez",
        "Sebastián Cáceres",
        "Ronald Araújo",
        "Guillermo Varela",
        "Mathías Olivera",
        "Matías Viña",
        "Joaquín Piquerez",
        "Santiago Bueno"
      ],
      "Tiền vệ": [
        "Manuel Ugarte",
        "Rodrigo Bentancur",
        "Nicolás de la Cruz",
        "Federico Valverde",
        "Giorgian de Arrascaeta",
        "Facundo Pellistri",
        "Agustín Canobbio",
        "Emiliano Martínez",
        "Brian Rodríguez",
        "Maximiliano Araújo",
        "Juan Manuel Sanabria",
        "Rodrigo Zalazar"
      ],
      "Tiền đạo": [
        "Darwin Núñez",
        "Rodrigo Aguirre",
        "Federico Viñas"
      ]
    },
    "xi": [
      "Sergio Rochet",
      "José María Giménez",
      "Sebastián Cáceres",
      "Ronald Araújo",
      "Guillermo Varela",
      "Manuel Ugarte",
      "Rodrigo Bentancur",
      "Nicolás de la Cruz",
      "Darwin Núñez",
      "Rodrigo Aguirre",
      "Federico Viñas"
    ]
  },
  "france": {
    "source": "https://en.wikipedia.org/wiki/France_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Brice Samba",
        "Mike Maignan",
        "Robin Risser"
      ],
      "Hậu vệ": [
        "Malo Gusto",
        "Lucas Digne",
        "Dayot Upamecano",
        "Jules Koundé",
        "Ibrahima Konaté",
        "William Saliba",
        "Théo Hernandez",
        "Lucas Hernandez",
        "Maxence Lacroix"
      ],
      "Tiền vệ": [
        "Manu Koné",
        "Aurélien Tchouaméni",
        "N'Golo Kanté",
        "Adrien Rabiot",
        "Warren Zaïre-Emery",
        "Rayan Cherki",
        "Maghnes Akliouche"
      ],
      "Tiền đạo": [
        "Marcus Thuram",
        "Kylian Mbappé",
        "Michael Olise",
        "Bradley Barcola",
        "Désiré Doué",
        "Jean-Philippe Mateta"
      ]
    },
    "xi": [
      "Brice Samba",
      "Malo Gusto",
      "Lucas Digne",
      "Dayot Upamecano",
      "Jules Koundé",
      "Manu Koné",
      "Aurélien Tchouaméni",
      "N'Golo Kanté",
      "Marcus Thuram",
      "Kylian Mbappé",
      "Michael Olise"
    ]
  },
  "senegal": {
    "source": "https://en.wikipedia.org/wiki/Senegal_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Yehvann Diouf",
        "Édouard Mendy",
        "Mory Diaw"
      ],
      "Hậu vệ": [
        "Mamadou Sarr",
        "Kalidou Koulibaly",
        "Abdoulaye Seck",
        "Ismail Jakobs",
        "Krépin Diatta",
        "Moussa Niakhaté",
        "Antoine Mendy",
        "El Hadji Malick Diouf"
      ],
      "Tiền vệ": [
        "Idrissa Gueye",
        "Pathé Ciss",
        "Lamine Camara",
        "Pape Matar Sarr",
        "Habib Diarra",
        "Bara Sapoko Ndiaye",
        "Pape Gueye"
      ],
      "Tiền đạo": [
        "Assane Diao",
        "Bamba Dieng",
        "Sadio Mané",
        "Nicolas Jackson",
        "Cherif Ndiaye",
        "Iliman Ndiaye",
        "Ismaïla Sarr",
        "Ibrahim Mbaye"
      ]
    },
    "xi": [
      "Yehvann Diouf",
      "Mamadou Sarr",
      "Kalidou Koulibaly",
      "Abdoulaye Seck",
      "Ismail Jakobs",
      "Idrissa Gueye",
      "Pathé Ciss",
      "Lamine Camara",
      "Assane Diao",
      "Bamba Dieng",
      "Sadio Mané"
    ]
  },
  "iraq": {
    "source": "https://en.wikipedia.org/wiki/Iraq_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Fahad Talib",
        "Jalal Hassan",
        "Ahmed Basil"
      ],
      "Hậu vệ": [
        "Rebin Sulaka",
        "Hussein Ali",
        "Zaid Tahseen",
        "Akam Hashim",
        "Manaf Younis",
        "Ahmed Maknzi",
        "Merchas Doski",
        "Mustafa Saadoon",
        "Frans Putros"
      ],
      "Tiền vệ": [
        "Youssef Amyn",
        "Ibrahim Bayesh",
        "Ahmed Qasem",
        "Zidane Iqbal",
        "Amir Al-Ammari",
        "Ali Jasim",
        "Kevin Yakob",
        "Aimar Sher",
        "Marko Farji",
        "Zaid Ismail"
      ],
      "Tiền đạo": [
        "Ali Al-Hamadi",
        "Mohanad Ali",
        "Ali Yousif",
        "Aymen Hussein"
      ]
    },
    "xi": [
      "Fahad Talib",
      "Rebin Sulaka",
      "Hussein Ali",
      "Zaid Tahseen",
      "Akam Hashim",
      "Youssef Amyn",
      "Ibrahim Bayesh",
      "Ahmed Qasem",
      "Ali Al-Hamadi",
      "Mohanad Ali",
      "Ali Yousif"
    ]
  },
  "norway": {
    "source": "https://en.wikipedia.org/wiki/Norway_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Ørjan Nyland",
        "Sander Tangvik",
        "Egil Selvik"
      ],
      "Hậu vệ": [
        "Kristoffer Vassbakk Ajer",
        "Leo Østigård",
        "David Møller Wolfe",
        "Fredrik André Bjørkan",
        "Marcus Holmgren Pedersen",
        "Torbjørn Heggem",
        "Sondre Langås",
        "Henrik Falchener",
        "Julian Ryerson"
      ],
      "Tiền vệ": [
        "Morten Thorsby",
        "Patrick Berg",
        "Sander Berge",
        "Martin Ødegaard",
        "Fredrik Aursnes",
        "Kristian Thorstvedt",
        "Thelo Aasgaard",
        "Antonio Nusa",
        "Andreas Schjelderup",
        "Oscar Bobb",
        "Jens Petter Hauge"
      ],
      "Tiền đạo": [
        "Alexander Sørloth",
        "Erling Haaland",
        "Jørgen Strand Larsen"
      ]
    },
    "xi": [
      "Ørjan Nyland",
      "Kristoffer Vassbakk Ajer",
      "Leo Østigård",
      "David Møller Wolfe",
      "Fredrik André Bjørkan",
      "Morten Thorsby",
      "Patrick Berg",
      "Sander Berge",
      "Alexander Sørloth",
      "Erling Haaland",
      "Jørgen Strand Larsen"
    ]
  },
  "argentina": {
    "source": "https://en.wikipedia.org/wiki/Argentina_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Juan Musso",
        "Gerónimo Rulli",
        "Emiliano Martínez",
        "Santiago Beltrán"
      ],
      "Hậu vệ": [
        "Nicolás Tagliafico",
        "Gonzalo Montiel",
        "Lisandro Martínez",
        "Cristian Romero",
        "Nicolás Otamendi",
        "Facundo Medina",
        "Nahuel Molina",
        "Agustín Giay",
        "Nicolás Capaldo",
        "Ignacio Ovando",
        "Simón Escobar",
        "Valentín Barco"
      ],
      "Tiền vệ": [
        "Leandro Paredes",
        "Rodrigo De Paul",
        "Giovani Lo Celso",
        "Exequiel Palacios",
        "Thiago Almada",
        "Nico Paz",
        "Alexis Mac Allister",
        "Enzo Fernández"
      ],
      "Tiền đạo": [
        "Julián Alvarez",
        "Lionel Messi",
        "Nicolás González",
        "Giuliano Simeone",
        "José Manuel López",
        "Lautaro Martínez",
        "Tomás Aranda",
        "Joaquín Freitas"
      ]
    },
    "xi": [
      "Juan Musso",
      "Nicolás Tagliafico",
      "Gonzalo Montiel",
      "Lisandro Martínez",
      "Cristian Romero",
      "Leandro Paredes",
      "Rodrigo De Paul",
      "Giovani Lo Celso",
      "Julián Alvarez",
      "Lionel Messi",
      "Nicolás González"
    ]
  },
  "algeria": {
    "source": "https://en.wikipedia.org/wiki/Algeria_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Melvin Mastil",
        "Oussama Benbot",
        "Luca Zidane",
        "Abdelatif Ramdane"
      ],
      "Hậu vệ": [
        "Aïssa Mandi",
        "Achref Abada",
        "Mohamed Amine Tougai",
        "Zineddine Belaïd",
        "Jaouen Hadjam",
        "Rayan Aït-Nouri",
        "Rafik Belghali",
        "Ramy Bensebaini",
        "Samir Chergui"
      ],
      "Tiền vệ": [
        "Ramiz Zerrouki",
        "Houssem Aouar",
        "Farès Chaïbi",
        "Hicham Boudaoui",
        "Nabil Bentaleb",
        "Ibrahim Maza",
        "Yacine Titraoui"
      ],
      "Tiền đạo": [
        "Riyad Mahrez",
        "Amine Gouiri",
        "Anis Hadj Moussa",
        "Nadhir Benbouali",
        "Mohamed Amoura",
        "Adil Boulbina",
        "Farès Ghedjemis"
      ]
    },
    "xi": [
      "Melvin Mastil",
      "Aïssa Mandi",
      "Achref Abada",
      "Mohamed Amine Tougai",
      "Zineddine Belaïd",
      "Ramiz Zerrouki",
      "Houssem Aouar",
      "Farès Chaïbi",
      "Riyad Mahrez",
      "Amine Gouiri",
      "Anis Hadj Moussa"
    ]
  },
  "austria": {
    "source": "https://en.wikipedia.org/wiki/Austria_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Alexander Schlager",
        "Florian Wiegele",
        "Patrick Pentz"
      ],
      "Hậu vệ": [
        "David Affengruber",
        "Kevin Danso",
        "Stefan Posch",
        "David Alaba",
        "Philipp Lienhart",
        "Phillipp Mwene",
        "Alexander Prass",
        "Marco Friedl",
        "Michael Svoboda"
      ],
      "Tiền vệ": [
        "Xaver Schlager",
        "Nicolas Seiwald",
        "Marcel Sabitzer",
        "Florian Grillitsch",
        "Carney Chukwuemeka",
        "Romano Schmid",
        "Konrad Laimer",
        "Patrick Wimmer",
        "Paul Wanner",
        "Alessandro Schöpf"
      ],
      "Tiền đạo": [
        "Marko Arnautović",
        "Michael Gregoritsch",
        "Saša Kalajdžić"
      ]
    },
    "xi": [
      "Alexander Schlager",
      "David Affengruber",
      "Kevin Danso",
      "Stefan Posch",
      "David Alaba",
      "Xaver Schlager",
      "Nicolas Seiwald",
      "Marcel Sabitzer",
      "Marko Arnautović",
      "Michael Gregoritsch",
      "Saša Kalajdžić"
    ]
  },
  "jordan": {
    "source": "https://en.wikipedia.org/wiki/Jordan_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Yazeed Abulaila",
        "Nour Bani Attiah",
        "Abdallah Al-Fakhouri"
      ],
      "Hậu vệ": [
        "Abdallah Nasib",
        "Husam Abu Dahab",
        "Yazan Al-Arab",
        "Mohammad Abualnadi",
        "Salim Obaid",
        "Saed Al-Rosan",
        "Ihsan Haddad",
        "Anas Badawi"
      ],
      "Tiền vệ": [
        "Mohammad Abu Hashish",
        "Amer Jamous",
        "Noor Al-Rawabdeh",
        "Rajaei Ayed",
        "Ibrahim Sa'deh",
        "Mohannad Abu Taha",
        "Nizar Al-Rashdan",
        "Mohammad Al-Dawoud"
      ],
      "Tiền đạo": [
        "Mohammad Abu Zrayq",
        "Ali Olwan",
        "Musa Al-Taamari",
        "Odeh Al-Fakhouri",
        "Mahmoud Al-Mardi",
        "Ali Azaizeh"
      ]
    },
    "xi": [
      "Yazeed Abulaila",
      "Abdallah Nasib",
      "Husam Abu Dahab",
      "Yazan Al-Arab",
      "Mohammad Abualnadi",
      "Mohammad Abu Hashish",
      "Amer Jamous",
      "Noor Al-Rawabdeh",
      "Mohammad Abu Zrayq",
      "Ali Olwan",
      "Musa Al-Taamari"
    ]
  },
  "portugal": {
    "source": "https://en.wikipedia.org/wiki/Portugal_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Diogo Costa",
        "José Sá",
        "Rui Silva",
        "Ricardo Velho"
      ],
      "Hậu vệ": [
        "Nélson Semedo",
        "Rúben Dias",
        "Tomás Araújo",
        "Diogo Dalot",
        "Renato Veiga",
        "Gonçalo Inácio",
        "João Cancelo",
        "Nuno Mendes"
      ],
      "Tiền vệ": [
        "Matheus Nunes",
        "Bruno Fernandes",
        "Bernardo Silva",
        "João Neves",
        "Rúben Neves",
        "Vitinha",
        "Samú Costa"
      ],
      "Tiền đạo": [
        "Cristiano Ronaldo",
        "Gonçalo Ramos",
        "João Félix",
        "Francisco Trincão",
        "Rafael Leão",
        "Pedro Neto",
        "Gonçalo Guedes",
        "Francisco Conceição"
      ]
    },
    "xi": [
      "Diogo Costa",
      "Nélson Semedo",
      "Rúben Dias",
      "Tomás Araújo",
      "Diogo Dalot",
      "Matheus Nunes",
      "Bruno Fernandes",
      "Bernardo Silva",
      "Cristiano Ronaldo",
      "Gonçalo Ramos",
      "João Félix"
    ]
  },
  "congo-dr": {
    "source": "https://en.wikipedia.org/wiki/DR_Congo_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Lionel Mpasi",
        "Timothy Fayulu",
        "Matthieu Epolo"
      ],
      "Hậu vệ": [
        "Aaron Wan-Bissaka",
        "Steve Kapuadi",
        "Axel Tuanzebe",
        "Dylan Batubinsika",
        "Joris Kayembe",
        "Chancel Mbemba",
        "Gédéon Kalulu",
        "Arthur Masuaku"
      ],
      "Tiền vệ": [
        "Ngal'ayel Mukau",
        "Nathanaël Mbuku",
        "Samuel Moutoussamy",
        "Brian Cipenga",
        "Théo Bongonda",
        "Gaël Kakuta",
        "Noah Sadiki",
        "Aaron Tshibola",
        "Charles Pickel",
        "Edo Kayembe"
      ],
      "Tiền đạo": [
        "Meschak Elia",
        "Cédric Bakambu",
        "Fiston Mayele",
        "Yoane Wissa",
        "Simon Banza"
      ]
    },
    "xi": [
      "Lionel Mpasi",
      "Aaron Wan-Bissaka",
      "Steve Kapuadi",
      "Axel Tuanzebe",
      "Dylan Batubinsika",
      "Ngal'ayel Mukau",
      "Nathanaël Mbuku",
      "Samuel Moutoussamy",
      "Meschak Elia",
      "Cédric Bakambu",
      "Fiston Mayele"
    ]
  },
  "uzbekistan": {
    "source": "https://en.wikipedia.org/wiki/Uzbekistan_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Utkir Yusupov",
        "Abduvohid Nematov",
        "Botirali Ergashev"
      ],
      "Hậu vệ": [
        "Abdukodir Khusanov",
        "Khojiakbar Alijonov",
        "Farrukh Sayfiev",
        "Rustam Ashurmatov",
        "Sherzod Nasrullaev",
        "Umar Eshmurodov",
        "Abdulla Abdullaev",
        "Bekhruz Karimov",
        "Avazbek Ulmasaliev",
        "Jakhongir Urozov"
      ],
      "Tiền vệ": [
        "Akmal Mozgovoy",
        "Otabek Shukurov",
        "Jamshid Iskanderov",
        "Odiljon Hamrobekov",
        "Jaloliddin Masharipov",
        "Oston Urunov",
        "Dostonbek Khamdamov",
        "Azizjon Ganiev",
        "Abbosbek Fayzullaev",
        "Sherzod Esanov"
      ],
      "Tiền đạo": [
        "Eldor Shomurodov",
        "Azizbek Amonov",
        "Igor Sergeev"
      ]
    },
    "xi": [
      "Utkir Yusupov",
      "Abdukodir Khusanov",
      "Khojiakbar Alijonov",
      "Farrukh Sayfiev",
      "Rustam Ashurmatov",
      "Akmal Mozgovoy",
      "Otabek Shukurov",
      "Jamshid Iskanderov",
      "Eldor Shomurodov",
      "Azizbek Amonov",
      "Igor Sergeev"
    ]
  },
  "colombia": {
    "source": "https://en.wikipedia.org/wiki/Colombia_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "David Ospina",
        "Camilo Vargas",
        "Álvaro Montero"
      ],
      "Hậu vệ": [
        "Daniel Muñoz",
        "Jhon Lucumí",
        "Santiago Arias",
        "Yerry Mina",
        "Johan Mojica",
        "Willer Ditta",
        "Deiver Machado",
        "Davinson Sánchez"
      ],
      "Tiền vệ": [
        "Kevin Castaño",
        "Richard Ríos",
        "Jorge Carrascal",
        "James Rodríguez",
        "Jhon Arias",
        "Gustavo Puerta",
        "Juan Portilla",
        "Jefferson Lerma",
        "Juan Fernando Quintero",
        "Jaminton Campaz"
      ],
      "Tiền đạo": [
        "Luis Díaz",
        "Jhon Córdoba",
        "Cucho Hernández",
        "Luis Suárez",
        "Andrés Gómez"
      ]
    },
    "xi": [
      "David Ospina",
      "Daniel Muñoz",
      "Jhon Lucumí",
      "Santiago Arias",
      "Yerry Mina",
      "Kevin Castaño",
      "Richard Ríos",
      "Jorge Carrascal",
      "Luis Díaz",
      "Jhon Córdoba",
      "Cucho Hernández"
    ]
  },
  "england": {
    "source": "https://en.wikipedia.org/wiki/England_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Jordan Pickford",
        "Dean Henderson",
        "James Trafford",
        "Jason Steele"
      ],
      "Hậu vệ": [
        "Ezri Konsa",
        "Nico O'Reilly",
        "John Stones",
        "Marc Guéhi",
        "Tino Livramento",
        "Dan Burn",
        "Reece James",
        "Djed Spence",
        "Jarell Quansah"
      ],
      "Tiền vệ": [
        "Declan Rice",
        "Elliot Anderson",
        "Jude Bellingham",
        "Jordan Henderson",
        "Kobbie Mainoo",
        "Morgan Rogers",
        "Eberechi Eze",
        "Alex Scott",
        "Josh King",
        "Ethan Nwaneri"
      ],
      "Tiền đạo": [
        "Bukayo Saka",
        "Harry Kane",
        "Marcus Rashford",
        "Anthony Gordon",
        "Ollie Watkins",
        "Noni Madueke",
        "Ivan Toney",
        "Rio Ngumoha"
      ]
    },
    "xi": [
      "Jordan Pickford",
      "Ezri Konsa",
      "Nico O'Reilly",
      "John Stones",
      "Marc Guéhi",
      "Declan Rice",
      "Elliot Anderson",
      "Jude Bellingham",
      "Bukayo Saka",
      "Harry Kane",
      "Marcus Rashford"
    ]
  },
  "croatia": {
    "source": "https://en.wikipedia.org/wiki/Croatia_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Dominik Livaković",
        "Ivor Pandur",
        "Dominik Kotarski"
      ],
      "Hậu vệ": [
        "Josip Stanišić",
        "Marin Pongračić",
        "Joško Gvardiol",
        "Duje Ćaleta-Car",
        "Josip Šutalo",
        "Luka Vušković",
        "Martin Erlić"
      ],
      "Tiền vệ": [
        "Nikola Moro",
        "Mateo Kovačić",
        "Luka Modrić",
        "Nikola Vlašić",
        "Mario Pašalić",
        "Martin Baturina",
        "Petar Sučić",
        "Kristijan Jakić",
        "Toni Fruk",
        "Luka Sučić"
      ],
      "Tiền đạo": [
        "Andrej Kramarić",
        "Ante Budimir",
        "Ivan Perišić",
        "Igor Matanović",
        "Marco Pašalić",
        "Petar Musa"
      ]
    },
    "xi": [
      "Dominik Livaković",
      "Josip Stanišić",
      "Marin Pongračić",
      "Joško Gvardiol",
      "Duje Ćaleta-Car",
      "Nikola Moro",
      "Mateo Kovačić",
      "Luka Modrić",
      "Andrej Kramarić",
      "Ante Budimir",
      "Ivan Perišić"
    ]
  },
  "ghana": {
    "source": "https://en.wikipedia.org/wiki/Ghana_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Lawrence Ati-Zigi",
        "Joseph Anang",
        "Benjamin Asare"
      ],
      "Hậu vệ": [
        "Alidu Seidu",
        "Jonas Adjetey",
        "Abdul Mumin",
        "Gideon Mensah",
        "Abdul Rahman Baba",
        "Jerome Opoku",
        "Kojo Peprah Oppong",
        "Derrick Luckassen",
        "Marvin Senaya"
      ],
      "Tiền vệ": [
        "Caleb Yirenkyi",
        "Thomas Partey",
        "Abdul Fatawu",
        "Kwasi Sibo",
        "Antoine Semenyo",
        "Elisha Owusu",
        "Augustine Boakye",
        "Kamaldeen Sulemana"
      ],
      "Tiền đạo": [
        "Jordan Ayew",
        "Brandon Thomas-Asante",
        "Christopher Bonsu Baah",
        "Iñaki Williams",
        "Ernest Nuamah",
        "Prince Kwabena Adu"
      ]
    },
    "xi": [
      "Lawrence Ati-Zigi",
      "Alidu Seidu",
      "Jonas Adjetey",
      "Abdul Mumin",
      "Gideon Mensah",
      "Caleb Yirenkyi",
      "Thomas Partey",
      "Abdul Fatawu",
      "Jordan Ayew",
      "Brandon Thomas-Asante",
      "Christopher Bonsu Baah"
    ]
  },
  "panama": {
    "source": "https://en.wikipedia.org/wiki/Panama_national_football_team",
    "fetchedAt": "2026-06-08",
    "roster": {
      "Thủ môn": [
        "Luis Mejía",
        "César Samudio",
        "Orlando Mosquera"
      ],
      "Hậu vệ": [
        "César Blackman",
        "José Córdoba",
        "Fidel Escobar",
        "Edgardo Fariña",
        "Jiovany Ramos",
        "Eric Davis",
        "Andrés Andrade",
        "Amir Murillo",
        "Roderick Miller",
        "Jorge Gutiérrez"
      ],
      "Tiền vệ": [
        "Cristian Martínez",
        "José Luis Rodríguez",
        "Adalberto Carrasquilla",
        "Ismael Díaz",
        "Yoel Bárcenas",
        "Carlos Harvey",
        "Alberto Quintero",
        "Aníbal Godoy",
        "César Yanis"
      ],
      "Tiền đạo": [
        "Tomás Rodríguez",
        "José Fajardo",
        "Cecilio Waterman",
        "Azarias Londoño"
      ]
    },
    "xi": [
      "Luis Mejía",
      "César Blackman",
      "José Córdoba",
      "Fidel Escobar",
      "Edgardo Fariña",
      "Cristian Martínez",
      "José Luis Rodríguez",
      "Adalberto Carrasquilla",
      "Tomás Rodríguez",
      "José Fajardo",
      "Cecilio Waterman"
    ]
  }
};
