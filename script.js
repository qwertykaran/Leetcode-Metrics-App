document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("search-btn");
  const usernameInput = document.getElementById("user-input");
  const statsContainer = document.querySelector(".stats-container");
  const easyProgressCircle = document.querySelector(".easy-progress");
  const mediumProgressCircle = document.querySelector(".Medium-progress");
  const hardProgressCircle = document.querySelector(".Hard-progress");
  const easyLabel = document.getElementById("easy-label");
  const mediumLabel = document.getElementById("Medium-label");
  const hardLabel = document.getElementById("Hard-label");
  const cardStatsContainer = document.querySelector(".stats-card");

  function validateUsername(username) {
    username = username.trim();
    if (username === "") {
      alert("Username should not be empty!");
      return false;
    }
    const regex = /^[a-zA-Z0-9_-]{4,20}$/;
    const isMatching = regex.test(username);
    if (!isMatching) {
      alert("Invalid Username!");
    }
    return isMatching;
  }

  async function fetchUserDetails(username) {
    try {
      searchButton.textContent = "Searching...";
      searchButton.disabled = true;
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const targetUrl = "https://leetcode.com/graphql/";
      const requestUrl = proxyUrl + targetUrl;

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Origin", "http://localhost:5500");
      myHeaders.append("X-Requested-With", "XMLHttpRequest");
      const graphql = JSON.stringify({
        query: `
          query userSessionProgress($username: String!) {
            allQuestionsCount {
              difficulty
              count
            }
            matchedUser(username: $username) {
              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                  submissions
                }
                totalSubmissionNum {
                  difficulty
                  count
                  submissions
                }
              }
            }
          }
          `,
        variables: { username: `${username}` },
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: graphql,
        redirect: "follow",
      };
      const response = await fetch(requestUrl, requestOptions);
      if (!response.ok) {
        throw new Error("Unable to fetch the user details!");
      }

      const parseData = await response.json();
      console.log("Login data : ", parseData);

      displayUserData(parseData);
    } catch (error) {
      statsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    } finally {
      searchButton.textContent = "Search";
      searchButton.disabled = false;
    }
  }

  function updateProgress(solved, total, label, circle) {
    const progressDegree = (solved / total) * 100;
    circle.style.setProperty("--progress-degree", `${progressDegree}%`);
    label.textContent = `${solved}/${total}`;
  }
  function displayUserData(parseData) {
    const totalQues = parseData.data.allQuestionsCount[0].count;
    const easyQues = parseData.data.allQuestionsCount[1].count;
    const mediumQes = parseData.data.allQuestionsCount[2].count;
    const hardQues = parseData.data.allQuestionsCount[3].count;

    const solvedTotalQues =
      parseData.data.matchedUser.submitStats.acSubmissionNum[0].count;
    const solvedEasyQues =
      parseData.data.matchedUser.submitStats.acSubmissionNum[1].count;
    const solvedMediumQues =
      parseData.data.matchedUser.submitStats.acSubmissionNum[2].count;
    const solvedHardQues =
      parseData.data.matchedUser.submitStats.acSubmissionNum[3].count;

    updateProgress(solvedEasyQues, easyQues, easyLabel, easyProgressCircle);
    updateProgress(
      solvedMediumQues,
      mediumQes,
      mediumLabel,
      mediumProgressCircle
    );
    updateProgress(solvedHardQues, hardQues, hardLabel, hardProgressCircle);

    const cardsData = [
      {
        label: "Overall Submissions",
        value:
          parseData.data.matchedUser.submitStats.totalSubmissionNum[0]
            .submissions,
      },
      {
        label: "Overall Easy Submissions",
        value:
          parseData.data.matchedUser.submitStats.totalSubmissionNum[1]
            .submissions,
      },
      {
        label: "Overall Medium Submissions",
        value:
          parseData.data.matchedUser.submitStats.totalSubmissionNum[2]
            .submissions,
      },
      {
        label: "Overall Hard Submissions",
        value:
          parseData.data.matchedUser.submitStats.totalSubmissionNum[3]
            .submissions,
      },
    ];
    console.log("card ka data: " + cardsData);

    cardStatsContainer.innerHTML = cardsData
      .map(
        (data) =>
          `<div class="card">
        <h4>${data.label}</h3>
        <p>${data.value}</p>
        </div>`
      )
      .join("");
  }

  searchButton.addEventListener("click", function () {
    const username = usernameInput.value;
    console.log("Login username: " + username);
    if (validateUsername(username)) {
      fetchUserDetails(username);
    }
  });
});
