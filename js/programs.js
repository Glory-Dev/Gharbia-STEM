document.addEventListener("DOMContentLoaded", () => {
  // fetch("http://127.0.0.1:5500/data/programs.json")
  fetch("../../data/programs.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("programsContainer");
      generateProgramSections(container, data.programs);
    })
    .catch((error) => console.error("Error fetching the data:", error));
});

function generateProgramSections(container, programs) {
  programs.forEach((program) => {
    // Create section for the program
    const programSection = document.createElement("section");
    programSection.className = "program mb-3";
    programSection.setAttribute("data-aos", "fade-left")

    const programContainer = document.createElement("div");
    programContainer.className = "container rounded-4 secondary-bg overflow-hidden";

    const card = document.createElement("div");
    card.className = "card secondary-bg text-white border-0";

    const headerRow = document.createElement("div");
    headerRow.className = "row no-gutters header";

    // Program Logo
    const logoCol = document.createElement("div");
    logoCol.className = "col-md-4 col-lg-3 col-xl-2";
    const logoImg = document.createElement("img");
    logoImg.src = `./../../images/programs/${program.logo}`;
    logoImg.className = "card-img program-logo";
    logoImg.alt = program.name;

    // Card Content
    const infoCol = document.createElement("div");
    infoCol.className = "col-md-8 col-lg-9 col-xl-10";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body ps-md-0 pe-md-4 py-4";

    const programTitle = document.createElement("h2");
    programTitle.className = "card-title text-center text-md-start";
    programTitle.textContent = program.shorthand ? `${program.name} (${program.shorthand.toUpperCase()})` : program.name;

    const programDescription = document.createElement("p");
    programDescription.className = "card-text fs-5";
    programDescription.textContent = program.description;

    const programOrganization = document.createElement("p");
    programOrganization.className = "card-text fs-5 text-center text-md-start";
    programOrganization.textContent = `${program.organization}`;

    cardBody.appendChild(programTitle);
    cardBody.appendChild(programOrganization);
    cardBody.appendChild(programDescription);

    infoCol.appendChild(cardBody);

    logoCol.appendChild(logoImg);
    headerRow.appendChild(logoCol);
    headerRow.appendChild(infoCol);

    card.appendChild(headerRow);

    const acceptedTitle = document.createElement("h2");
    acceptedTitle.className = "text-center mt-4 mb-3";
    acceptedTitle.textContent = "Accepted Students";

    const acceptedStudentsDiv = document.createElement("div");
    acceptedStudentsDiv.className = "accepted-students";

    const collapseDiv = document.createElement("div");
    collapseDiv.className = "collapse";
    collapseDiv.id = program.shorthand ? program.shorthand : program.name;

    const togglerButton = document.createElement("button");
    togglerButton.className = "btn btn-light toggler";
    togglerButton.type = "button";
    togglerButton.setAttribute("data-bs-toggle", "collapse");
    togglerButton.setAttribute("data-bs-target", `#${program.shorthand ? program.shorthand : program.name}`);
    togglerButton.setAttribute("aria-expanded", "false");
    togglerButton.setAttribute("aria-controls", program.shorthand);

    const studentRow = document.createElement("div");
    studentRow.className = "row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 g-4 p-4";

    program.students.forEach((student) => {
      const col = document.createElement("div");
      col.className = "col";

      const studentCard = document.createElement("div");
      studentCard.className = "card";

      const studentImg = document.createElement("img");
      studentImg.src = `./../../images/students/${student.image}`;

      studentImg.className = "card-img-top";
      studentImg.alt = student.name;

      const studentCardBody = document.createElement("div");
      studentCardBody.className = "card-body";

      const studentName = document.createElement("h5");
      studentName.className = "name";
      studentName.innerHTML = `${student.name} <span class="senior">(S'${student.graduationYear.slice(2)})</span>`;

      const studentCohort = document.createElement("h6");
      studentCohort.className = "cohort";
      studentCohort.textContent = student.cohort;

      const studentAid = document.createElement("h6");
      studentAid.className = "aid";
      studentAid.textContent = student.financialAid;

      studentCardBody.appendChild(studentName);
      studentCardBody.appendChild(studentCohort);
      studentCardBody.appendChild(studentAid);
      studentCard.appendChild(studentImg);
      studentCard.appendChild(studentCardBody);
      col.appendChild(studentCard);
      studentRow.appendChild(col);
    });

    collapseDiv.appendChild(studentRow);
    acceptedStudentsDiv.appendChild(togglerButton);
    acceptedStudentsDiv.appendChild(collapseDiv);

    card.appendChild(acceptedTitle);
    card.appendChild(acceptedStudentsDiv);
    programContainer.appendChild(card);
    programSection.appendChild(programContainer);
    container.appendChild(programSection);
  });
}
