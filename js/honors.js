document.addEventListener("DOMContentLoaded", function () {
  fetch("http://127.0.0.1:5500/data/competitions.json")
    // fetch("../../data/competitions.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("honorsContainer");
      generateCompetitions(container, data.competitions);
    })
    .catch((error) => console.error("Error fetching competitions data:", error));
});

function generateCompetitions(container, competitions) {
  competitions.forEach((competition) => {
    const competitionSection = document.createElement("section");
    competitionSection.className = "competition mb-3";
    competitionSection.setAttribute("data-aos", "fade-left")

    const competitionContainer = document.createElement("div");
    competitionContainer.className = "container rounded-4 secondary-bg overflow-hidden";

    const card = document.createElement("div");
    card.className = "card secondary-bg text-white border-0";


    const headerRow = document.createElement("div");
    headerRow.className = "row no-gutters header";

    // Competition Logo
    const logoCol = document.createElement("div");
    logoCol.className = "col-md-2";
    const logoImg = document.createElement("img");
    logoImg.src = `./../../images/honors/${competition.logo}`;
    logoImg.className = "card-img program-logo";
    logoImg.alt = competition.name;

    // Card Content
    const infoCol = document.createElement("div");
    infoCol.className = "col-md-8 col-lg-9 col-xl-10";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body ps-md-0 pe-md-4 py-4";

    const competitionTitle = document.createElement("h2");
    competitionTitle.className = "card-title";
    competitionTitle.textContent = competition.shorthand ? `${competition.name} (${competition.shorthand.toUpperCase()})` : competition.name;

    const competitionDescription = document.createElement("p");
    competitionDescription.className = "card-text fs-5";
    competitionDescription.textContent = competition.description;

    const competitionOrganization = document.createElement("p");
    competitionOrganization.className = "card-text fs-5 text-center text-md-start";
    competitionOrganization.textContent = `${competition.organization}`;

    cardBody.appendChild(competitionTitle);
    cardBody.appendChild(competitionDescription);
    cardBody.appendChild(competitionOrganization);

    infoCol.appendChild(cardBody);

    logoCol.appendChild(logoImg);
    headerRow.appendChild(logoCol);
    headerRow.appendChild(infoCol);

    card.appendChild(headerRow);

    // Awarded Students
    const awardedTitle = document.createElement("h2");
    awardedTitle.className = "text-center mt-4 mb-3";
    awardedTitle.textContent = "Awarded Students";

    // Toggler
    const collapseButton = document.createElement("button");
    collapseButton.className = "btn btn-light toggler";
    collapseButton.type = "button";
    collapseButton.setAttribute("data-bs-toggle", "collapse");
    collapseButton.setAttribute("data-bs-target", `#${competition.shorthand ? competition.shorthand : competition.name}`);
    collapseButton.setAttribute("aria-expanded", "false");
    collapseButton.setAttribute("aria-controls", `${competition.shorthand ? competition.shorthand : competition.name}`);
    collapseButton.textContent = "";

    const awardedStudentsDiv = document.createElement("div");
    awardedStudentsDiv.className = "awarded-students";

    const collapseDiv = document.createElement("div");
    collapseDiv.className = "collapse";
    collapseDiv.id = competition.shorthand ? competition.shorthand : competition.name;

    const studentRow = document.createElement("div");
    studentRow.className = "row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 g-4 p-4";

    if (competition.teams.length > 0) {
      competition.teams.forEach((team) => {
        const col = document.createElement("div");
        col.className = "col-12 col-md-6"; // Make team card span two columns on md and larger screens

        const teamCard = document.createElement("div");
        teamCard.className = "card";

        const teamCardBody = document.createElement("div");
        teamCardBody.className = "card-body";

        const teamName = document.createElement("h5");
        teamName.className = "name";
        teamName.textContent = `${team.teamName} - ${team.rank}`;

        const membersList = document.createElement("ul");
        team.members.forEach((member) => {
          const memberItem = document.createElement("li");
          memberItem.textContent = `${member.name} (S'${member.graduationYear})`;
          membersList.appendChild(memberItem);
        });

        teamCardBody.appendChild(teamName);
        teamCardBody.appendChild(membersList);
        teamCard.appendChild(teamCardBody);
        col.appendChild(teamCard);
        studentRow.appendChild(col);
      });
    } else if (competition.individuals.length > 0) {
      competition.individuals.forEach((individual) => {
        const col = document.createElement("div");
        col.className = "col";

        const individualCard = document.createElement("div");
        individualCard.className = "card";

        const individualImg = document.createElement("img");
        individualImg.src = individual.image;
        individualImg.className = "card-img-top";
        individualImg.alt = individual.name;

        const individualCardBody = document.createElement("div");
        individualCardBody.className = "card-body";

        const individualName = document.createElement("h5");
        individualName.className = "name";
        individualName.innerHTML = `${individual.name} <span class="senior">(S'${individual.graduationYear.slice(2)})</span>`;

        const individualRank = document.createElement("h6");
        individualRank.className = "rank";
        individualRank.textContent = individual.rank;

        individualCardBody.appendChild(individualName);
        individualCardBody.appendChild(individualRank);
        individualCard.appendChild(individualImg);
        individualCard.appendChild(individualCardBody);
        col.appendChild(individualCard);
        studentRow.appendChild(col);
      });
    }

    collapseDiv.appendChild(studentRow);
    awardedStudentsDiv.appendChild(collapseButton);
    awardedStudentsDiv.appendChild(collapseDiv);
    card.appendChild(awardedTitle);
    card.appendChild(awardedStudentsDiv);
    competitionContainer.appendChild(card);
    competitionSection.appendChild(competitionContainer);
    container.appendChild(competitionSection);
  });
}
