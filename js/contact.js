document.addEventListener("DOMContentLoaded", function () {
  fetch("http://127.0.0.1:5501/data/data.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("contactReachOut");
      const managementCommittee = data.members.filter((member) => member.committees.includes("management"));
      generateCards(container, managementCommittee);
    })
    .catch((error) => console.error("Error fetching staff data:", error));
});

document.addEventListener("DOMContentLoaded", function () {
  fetch("http://127.0.0.1:5501/data/data.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("contactCouncil");
      const councilCommittee = data.members.filter((member) => member.committees.includes("council"));
      generateCards(container, councilCommittee);
    })
    .catch((error) => console.error("Error fetching staff data:", error));
});

function generateCards(container, committee) {
  const cardContainer = document.createElement("div");
  cardContainer.className = "container";

  const row = document.createElement("div");
  row.className = "row row-cols-1 row-cols-md-2 g-4 justify-content-center";

  committee.forEach((member) => {
    const col = document.createElement("div");
    col.className = "col";

    const card = document.createElement("div");
    card.className = "card mb-3 border-0 bg-transparent";

    const img = document.createElement("img");
    img.src = img.src ? `./../images/staff/${member.image}` : "";
    img.className = "img-fluid";
    img.alt = member.name;

    const cardBody = document.createElement("div");
    cardBody.className = "card-body secondary-bg text-white";

    const cardTitle = document.createElement("h3");
    cardTitle.className = "card-title";
    cardTitle.textContent = member.name;

    const cardText = document.createElement("h5");
    cardText.className = "card-text";
    cardText.textContent = member.profession;

    // Add phone number, email, and social media links
    const phoneText = document.createElement("p");
    phoneText.className = "card-text fs-4 mt-3 mb-1";
    phoneText.textContent = `${member.phone}`;

    const emailText = document.createElement("p");
    emailText.className = "card-text fs-4";
    emailText.textContent = `${member.email}`;

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(phoneText);
    // cardBody.appendChild(emailText);

    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);
    row.appendChild(col);
  });

  cardContainer.appendChild(row);
  container.appendChild(cardContainer);
}
