document.addEventListener("DOMContentLoaded", () => {
  fetch("http://127.0.0.1:5500/data/data.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("committeesContainer");

      data.committees.forEach((committee) => {
        // Create heading for the committee
        const heading = document.createElement("h2");
        heading.className = "heading middle-line fs-1 text-center text-capitalize pt-3 pb-5";
        heading.textContent = `${committee.name} Committee`;

        // Create section for the committee
        const committeeSection = document.createElement("section");
        committeeSection.className = "committee";

        const committeeContainer = document.createElement("div");
        committeeContainer.className = "container";

        const row = document.createElement("div");
        row.className = "row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 g-4";

        committee.members.forEach((member) => {
          const col = document.createElement("div");
          col.className = "col";

          const card = document.createElement("div");
          card.className = "card";

          const img = document.createElement("img");
          img.src = `./../../images/staff/${member.image}`;
          img.className = "card-img-top";
          img.alt = member.profession;

          const cardBody = document.createElement("div");
          cardBody.className = "card-body";

          const name = document.createElement("h5");
          name.className = "name";
          name.textContent = member.name;

          const profession = document.createElement("h6");
          profession.className = "profession";
          profession.textContent = member.profession;

          cardBody.appendChild(name);
          cardBody.appendChild(profession);
          card.appendChild(img);
          card.appendChild(cardBody);
          col.appendChild(card);
          row.appendChild(col);
        });

        committeeContainer.appendChild(row);
        committeeSection.appendChild(heading);
        committeeSection.appendChild(committeeContainer);
        container.appendChild(committeeSection);
      });
    })
    .catch((error) => console.error("Error fetching the data:", error));
});
