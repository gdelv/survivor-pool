const checkElimination = (arr) => {
  let count = 0;
  arr.forEach((entry) => {
    if (entry.isCorrect === false) {
      count++;
    }
  });
  return count > 1 ? true : false;
};

export const entries = [
  {
    name: "G",
    isEliminated: false,
    picks: [
      {
        teamChosen: "GB",
        isCorrect: true,
      },
      {
        teamChosen: "CAR",
        isCorrect: true,
      },
      {
        teamChosen: "CIN",
        isCorrect: true,
      },
      {
        teamChosen: "JAX",
        isCorrect: false,
      },
    ],
  },
  {
    name: "Irene",
    isEliminated: false,
    picks: [
      {
        teamChosen: "NYJ",
        isCorrect: true,
      },
      {
        teamChosen: "NO",
        isCorrect: false,
      },
      {
        teamChosen: "PHI",
        isCorrect: true,
      },
      {
        teamChosen: "TEN",
        isCorrect: true,
      },
    ],
  },
  {
    name: "Mikael",
    isEliminated: false,
    picks: [
      {
        teamChosen: "CLE",
        isCorrect: false,
      },
      {
        teamChosen: "LAR",
        isCorrect: true,
      },
      {
        teamChosen: "LAC",
        isCorrect: true,
      },
      {
        teamChosen: "MIN",
        isCorrect: true,
      },
    ],
  },
  {
    name: "Cristian",
    isEliminated: false,
    picks: [
      {
        teamChosen: "CIN",
        isCorrect: false,
      },
      {
        teamChosen: "BAL",
        isCorrect: true,
      },
      {
        teamChosen: "LAC",
        isCorrect: true,
      },
      {
        teamChosen: "MIN",
        isCorrect: true,
      },
    ],
  },
  {
    name: "Daniel",
    isEliminated: false,
    picks: [
      {
        teamChosen: "NYG",
        isCorrect: true,
      },
      {
        teamChosen: "LAC",
        isCorrect: false,
      },
      {
        teamChosen: "PHI",
        isCorrect: true,
      },
      {
        teamChosen: "MIN",
        isCorrect: true,
      },
    ],
  },
  {
    name: "Gabriel",
    isEliminated: true,
    picks: [
      {
        teamChosen: "LAR",
        isCorrect: true,
      },
      {
        teamChosen: "LAC",
        isCorrect: false,
      },
      {
        teamChosen: "PIT",
        isCorrect: false,
      },
    ],
  },
  {
    name: "Juan",
    isEliminated: false,
    picks: [
      {
        teamChosen: "BUF",
        isCorrect: true,
      },
      {
        teamChosen: "CHI",
        isCorrect: true,
      },
      {
        teamChosen: "DEN",
        isCorrect: false,
      },
      {
        teamChosen: "LAR",
        isCorrect: null,
      },
    ],
  },
  {
    name: "Pablo",
    isEliminated: false,
    picks: [
      {
        teamChosen: "SF",
        isCorrect: true,
      },
      {
        teamChosen: "NYJ",
        isCorrect: false,
      },
      {
        teamChosen: "LAR",
        isCorrect: false,
      },
    ],
  },
  {
    name: "Hiran",
    isEliminated: false,
    picks: [
      {
        teamChosen: "NYJ",
        isCorrect: true,
      },
      {
        teamChosen: "KC",
        isCorrect: false,
      },
      {
        teamChosen: "LAR",
        isCorrect: false,
      },
    ],
  },
  {
    name: "Kareem",
    isEliminated: false,
    picks: [
      {
        teamChosen: "MIA",
        isCorrect: true,
      },
      {
        teamChosen: "PHI",
        isCorrect: true,
      },
      {
        teamChosen: "LAR",
        isCorrect: false,
      },
      {
        teamChosen: "KC",
        isCorrect: null,
      },
    ],
  },
  {
    name: "Mike",
    isEliminated: false,
    picks: [
      {
        teamChosen: "",
        isCorrect: null,
      },
      {
        teamChosen: "BAL",
        isCorrect: true,
      },
      {
        teamChosen: "MIA",
        isCorrect: false,
      },
      {
        teamChosen: "KC",
        isCorrect: null,
      },
    ],
  },
  {
    name: "Dana",
    isEliminated: false,
    picks: [
      {
        teamChosen: "",
        isCorrect: null,
      },
      {
        teamChosen: "PHI",
        isCorrect: true,
      },
      {
        teamChosen: "NYG",
        isCorrect: true,
      },
      {
        teamChosen: "MIN",
        isCorrect: true,
      },
    ],
  },
  {
    name: "Ian",
    isEliminated: false,
    picks: [
      {
        teamChosen: "",
        isCorrect: null,
      },
      {
        teamChosen: "LV",
        isCorrect: false,
      },
      {
        teamChosen: "IND",
        isCorrect: false,
      },
    ],
  },
  {
    name: "Josh",
    isEliminated: false,
    picks: [
      {
        teamChosen: "",
        isCorrect: null,
      },
      {
        teamChosen: "BUF",
        isCorrect: false,
      },
      {
        teamChosen: "PIT",
        isCorrect: false,
      },
    ],
  },
  {
    name: "Jack",
    isEliminated: false,
    picks: [
      {
        teamChosen: "",
        isCorrect: null,
      },
      {
        teamChosen: "KC",
        isCorrect: false,
      },
      {
        teamChosen: "PIT",
        isCorrect: false,
      },
    ],
  },
];
export const updatedEntries = () => {
  let finalArr = [];
  for (let i = 0; i < entries.length; i++) {
    const element = entries[i];
    element.isEliminated = checkElimination(element.picks);
    finalArr.push(element);
  }
  return finalArr;
};


//Add startDate and endDate of each NFL Week
export const weekMapping = [
  {
    weekNum: 1,
    startDate: "8/20/22", //Tuesday
    endDate: "9/12/2022", //Monday
  },
  {
    weekNum: 2,
    startDate: "9/13/2022", //Tuesday
    endDate: "9/19/2022", //Monday
  },
  {
    weekNum: 3,
    startDate: "9/20/2022", //Tuesday
    endDate: "9/26/2022", //Monday
  },
  {
    weekNum: 4,
    startDate: "9/27/2022", //Tuesday
    endDate: "10/4/2022", //Tuesday
  },
  {
    weekNum: 5,
    startDate: "10/4/2022", //Tuesday
    endDate: "10/11/2022", //Tuesday
  },
  {
    weekNum: 6,
    startDate: "10/11/2022", //Tuesday
    endDate: "10/18/2022", //Tuesday
  },
  {
    weekNum: 7,
    startDate: "10/18/2022", //Tuesday
    endDate: "10/25/2022", //Tuesday
  },
  {
    weekNum: 8,
    startDate: "10/25/2022", //Tuesday
    endDate: "11/1/2022", //Tuesday
  },
  {
    weekNum: 8,
    startDate: "11/1/2022", //Tuesday
    endDate: "11/8/2022", //Tuesday
  },
  {
    weekNum: 9,
    startDate: "11/8/2022", //Tuesday
    endDate: "11/15/2022", //Tuesday
  },
  {
    weekNum: 10,
    startDate: "11/15/2022", //Tuesday
    endDate: "11/22/2022", //Tuesday
  },
  {
    weekNum: 11,
    startDate: "11/22/2022", //Tuesday
    endDate: "11/29/2022", //Tuesday
  },
  {
    weekNum: 12,
    startDate: "11/29/2022", //Tuesday
    endDate: "12/6/2022", //Tuesday
  },
];
