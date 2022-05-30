import { countries_data } from "./countries_data.js";
const btn1 = document.querySelector(".btn1");
btn1.addEventListener("click", () => {
  const population = getPopulation();
  const subText = document.querySelector(".sub-text");
  subText.innerHTML = "10 Most populated countries in the world";
  const chartContainer = document.querySelector(".chart-container");
  while (chartContainer.hasChildNodes()) {
    console.log("removed");
    chartContainer.removeChild(chartContainer.firstChild);
  }
  let canvas = document.createElement("canvas");
  canvas.id = "myChart1";
  canvas.style.width = "70vw";
  canvas.style.height = "50vw";
  chartContainer.appendChild(canvas);
  const ctx1 = document.getElementById("myChart1").getContext("2d");

  const populationChart = new Chart(ctx1, {
    type: "bar",
    data: {
      labels: [
        population[0][0],
        population[1][0],
        population[2][0],
        population[3][0],
        population[4][0],
        population[5][0],
        population[6][0],
        population[7][0],
        population[8][0],
        population[9][0],
        population[10][0],
      ],
      datasets: [
        {
          label: "",
          data: [
            population[0][1],
            population[1][1],
            population[2][1],
            population[3][1],
            population[4][1],
            population[5][1],
            population[6][1],
            population[7][1],
            population[8][1],
            population[9][1],
            population[10][1],
          ],
          backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      indexAxis: "y",
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});

const btn2 = document.querySelector(".btn2");
btn2.addEventListener("click", () => {
  const languages = getLanguages();
  const subText = document.querySelector(".sub-text");
  subText.innerHTML = "10 Most spoken languages in the world";
  const chartContainer = document.querySelector(".chart-container");
  while (chartContainer.hasChildNodes()) {
    console.log("removed");
    chartContainer.removeChild(chartContainer.firstChild);
  }
  let canvas = document.createElement("canvas");
  canvas.id = "myChart2";
  canvas.style.width = "70vw";
  canvas.style.height = "50vw";
  chartContainer.appendChild(canvas);
  const ctx2 = document.getElementById("myChart2").getContext("2d");

  const languagesChart = new Chart(ctx2, {
    type: "bar",
    data: {
      labels: [languages[0][0], languages[1][0], languages[2][0], languages[3][0], languages[4][0], languages[5][0], languages[6][0], languages[7][0], languages[8][0], languages[9][0]],
      datasets: [
        {
          label: "",
          data: [languages[0][1], languages[1][1], languages[2][1], languages[3][1], languages[4][1], languages[5][1], languages[6][1], languages[7][1], languages[8][1], languages[9][1]],
          backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      indexAxis: "y",
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});

const getPopulation = () => {
  //세계인구
  let worldPopulation = 0;
  for (const country in countries_data) {
    worldPopulation += countries_data[country].population;
  }
  let obj = new Object();
  obj["World"] = worldPopulation;

  //상위 10개 나라의 인구
  const sortedCountries = countries_data.sort((x, y) => y.population - x.population);
  let dictSortedCountries = {};
  dictSortedCountries = obj;
  for (let i = 0; i < 10; i++) {
    dictSortedCountries[sortedCountries[i].name] = sortedCountries[i].population;
  }
  //각 나라를 배열로 나누기
  let result = Object.keys(dictSortedCountries).map((key) => [String(key), dictSortedCountries[key]]);
  //이름 긴 나라들 전처리
  for (let i = 0; i < result.length - 1; i++) {
    if (result[i][0] == "United States of America") {
      result[i][0] = "USA";
    } else if (result[i][0] == "Russian Federation") {
      result[i][0] = "Russia";
    }
  }
  //result data를 사용하여 population을 나타내면 됨.
  //개인적 생각: 객체들의 키들이 각각 다를 때 배열로 치환해서 접근하는게 훨씬 나은듯.
  //키들이 동일한 경우에는 그대로 객체 사용
  return result;
};

const getLanguages = () => {
  const arr = [];
  countries_data.forEach((item) => arr.push(...item.languages));
  function Counter(array) {
    var count = {};
    array.forEach((val) => (count[val] = (count[val] || 0) + 1));
    return count;
  }

  //정렬
  const count = Counter(arr);
  let entries = Object.entries(count);
  let sorted = entries.sort((a, b) => b[1] - a[1]);
  let tenLanguages = [];
  for (let i = 0; i < 10; i++) {
    tenLanguages.push(sorted[i]);
  }
  //언어 10개를 갖는 배열
  return tenLanguages;
};
