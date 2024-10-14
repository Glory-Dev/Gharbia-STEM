document.addEventListener("DOMContentLoaded", function () {
  // fetch("http://127.0.0.1:5501/data/students.json")
  fetch("../../data/students.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("alumniContainer");
      generateAlumni(container, data.batches);
      generateBatchSwitcher(data.batches);
    })
    .catch((error) => console.error("Error fetching alumni data:", error));
});

function generateAlumni(container, batches) {
  batches.forEach((batch) => {
    const batchSection = document.createElement("section");
    batchSection.className = "senior collapse py-1";
    batchSection.id = `senior${batch.year}`;

    const batchContainer = document.createElement("div");
    batchContainer.className = "container-fluid px-4 justify-content-center";

    const row = document.createElement("div");
    row.className = "row row-cols-1 row-cols-md-2 row-cols-xxl-3 g-5 justify-content-center";

    batch.students.forEach((student) => {
      const col = document.createElement("div");
      col.className = "col";

      const cardBox = document.createElement("div");
      cardBox.className = "card-box";

      // Flip button
      const flipButton = document.createElement("a");
      flipButton.href = "#";
      flipButton.className = "rotate position-absolute bg-white text-dark rounded-circle d-block z-3 d-flex justify-content-center align-items-center";
      flipButton.setAttribute("role", "button");
      flipButton.setAttribute("data-bs-toggle", "button");
      flipButton.setAttribute("aria-pressed", "false");
      flipButton.innerHTML = '<i class="fa-solid fa-lg fa-arrow-rotate-right"></i>';

      // Front card
      const frontCard = document.createElement("div");
      frontCard.className = "card front py-3 mx-auto mb-3 secondary-bg";

      const frontRow = document.createElement("div");
      frontRow.className = "row g-0 align-items-center";

      const imageCol = document.createElement("div");
      imageCol.className = "col-md-4 image p-3";

      const image = document.createElement("img");
      image.src = `./../images/students/${student.image}`;
      image.className = "img-fluid rounded-3";
      image.alt = student.name;

      imageCol.appendChild(image);

      const infoCol = document.createElement("div");
      infoCol.className = "col-md-8";

      const cardBody = document.createElement("div");
      cardBody.className = "card-body py-0";

      const studentName = document.createElement("h4");
      studentName.className = "card-title lh-base";
      studentName.textContent = student.name.split(" ").length == 3 ? `${student.name.split(" ")[0]} ${student.name.split(" ")[1][0]}. ${student.name.split(" ")[2]}` : student.name;

      const studentSeniorYear = document.createElement("h5");
      studentSeniorYear.className = "year";
      studentSeniorYear.textContent = `Class of ${batch.year}`;

      const studentClass = document.createElement("h6");
      studentClass.className = "class";
      studentClass.textContent = `${student.class} Section`;

      const classRank = document.createElement("p");
      classRank.className = "card-text rank mt-3 mb-1";
      classRank.textContent = `Class Rank: ${student.classRank}`;

      const nationalRank = document.createElement("p");
      nationalRank.className = "card-text rank";
      nationalRank.textContent = `National Rank: ${student.nationalRank}`;

      const socialLinks = document.createElement("ul");
      socialLinks.className = "social social-links justify-content-center mt-3";

      // Create social media links only if they exist
      if (student.socialMedia.cv) {
        const cvLink = createSocialLink(student.socialMedia.cv, "fa-solid fa-file", "CV");
        socialLinks.appendChild(cvLink);
      }
      if (student.socialMedia.website) {
        const websiteLink = createSocialLink(student.socialMedia.website, "fa-solid fa-globe", "Website");
        socialLinks.appendChild(websiteLink);
      }
      if (student.socialMedia.email) {
        const emailLink = createSocialLink(`mailto:${student.socialMedia.email}`, "fa-solid fa-at", "Email");
        socialLinks.appendChild(emailLink);
      }
      if (student.socialMedia.linkedin) {
        const linkedinLink = createSocialLink(student.socialMedia.linkedin, "fab fa-linkedin-in", "LinkedIn");
        socialLinks.appendChild(linkedinLink);
      }
      if (student.socialMedia.facebook) {
        const facebookLink = createSocialLink(student.socialMedia.facebook, "fab fa-facebook", "Facebook");
        socialLinks.appendChild(facebookLink);
      }
      if (student.socialMedia.instagram) {
        const instagramLink = createSocialLink(student.socialMedia.instagram, "fab fa-instagram", "Instagram");
        socialLinks.appendChild(instagramLink);
      }

      cardBody.appendChild(studentName);
      cardBody.appendChild(studentSeniorYear);
      cardBody.appendChild(studentClass);
      cardBody.appendChild(classRank);
      cardBody.appendChild(nationalRank);
      infoCol.appendChild(cardBody);
      frontRow.appendChild(imageCol);
      frontRow.appendChild(infoCol);
      frontCard.appendChild(frontRow);
      frontCard.appendChild(socialLinks);

      // Back card
      const backCard = document.createElement("div");
      backCard.className = "card back mx-auto mb-3 py-3 primary-bg text-center";

      const universityLogo = document.createElement("img");
      universityLogo.src = `./../images/organizations/${student.university.logo}`;
      universityLogo.className = "img-fluid mx-auto";
      universityLogo.alt = student.university.name;

      const backCardBody = document.createElement("div");
      backCardBody.className = "card-body pb-0";

      const universityName = document.createElement("h5");
      universityName.className = "card-title lh-base";
      universityName.textContent = student.university.name;

      const classYear = document.createElement("h6");
      classYear.className = "year";
      classYear.textContent = `Class of ${student.university.classYear}`;

      const major = document.createElement("p");
      major.className = "major mt-3 mb-1";
      major.textContent = `Major: ${student.university.major}`;

      const financialAid = document.createElement("p");
      financialAid.className = "card-text aid mb-0";
      financialAid.textContent = `Financial Aid: ${student.university.financialAid}`;

      // backCardBody.appendChild(universityName);
      backCardBody.appendChild(classYear);
      backCardBody.appendChild(major);
      backCardBody.appendChild(financialAid);
      backCard.appendChild(universityLogo);
      backCard.appendChild(backCardBody);

      cardBox.appendChild(flipButton);
      cardBox.appendChild(frontCard);
      cardBox.appendChild(backCard);
      col.appendChild(cardBox);
      row.appendChild(col);
    });

    batchContainer.appendChild(row);
    batchSection.appendChild(batchContainer);
    container.appendChild(batchSection);
  });
}

function createSocialLink(url, iconClass, title) {
  const listItem = document.createElement("li");
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.title = title;
  link.rel = "noopener noreferrer";
  console.log(title)
  link.innerHTML = `<i class="fa-xl ${iconClass}"></i>`;
  listItem.appendChild(link);
  return listItem;
}

function generateBatchSwitcher(batches) {
  const switchContainer = document.getElementById("batchSwitcher");
  const pagination = document.createElement("ul");
  pagination.className = "pagination pagination-lg justify-content-center flex-wrap";

  const classOfText = document.createElement("li");
  classOfText.className = "page-item";
  classOfText.innerHTML = '<p class="page-link bg-transparent text-white">Class of</p>';
  pagination.appendChild(classOfText);

  let lastBatchYear = "";

  batches.forEach((batch) => {
    const batchItem = document.createElement("li");
    batchItem.className = "page-item";

    const batchButton = document.createElement("button");
    batchButton.className = "page-link";
    batchButton.type = "button";
    batchButton.setAttribute("data-bs-toggle", "collapse");
    batchButton.setAttribute("data-bs-target", `#senior${batch.year}`);
    batchButton.setAttribute("aria-expanded", "false");
    batchButton.setAttribute("aria-controls", `senior${batch.year}`);
    batchButton.textContent = batch.year;

    batchButton.addEventListener("click", function () {
      // Collapse all batches
      batches.forEach((b) => {
        const section = document.getElementById(`senior${b.year}`);
        if (section) {
          const bsCollapse = new bootstrap.Collapse(section, { toggle: false });
          bsCollapse.hide();
        }
      });

      // Show the selected batch
      const activeSection = document.getElementById(`senior${batch.year}`);
      if (activeSection) {
        const bsCollapse = new bootstrap.Collapse(activeSection, { toggle: true });
        bsCollapse.show();
      }
    });

    batchItem.appendChild(batchButton);
    pagination.appendChild(batchItem);

    // Track the last batch year
    lastBatchYear = batch.year;
  });

  switchContainer.appendChild(pagination);

  // Set the last batch as active by default
  if (lastBatchYear) {
    const defaultSection = document.getElementById(`senior${lastBatchYear}`);
    if (defaultSection) {
      const bsCollapse = new bootstrap.Collapse(defaultSection, { toggle: true });
      bsCollapse.show();
    }
    // Ensure the last batch button is active
    const defaultButton = switchContainer.querySelector(`button[data-bs-target="#senior${lastBatchYear}"]`);
    if (defaultButton) {
      defaultButton.setAttribute("aria-expanded", "true");
    }
  }
}
