import "core-js/stable";
import "regenerator-runtime/runtime";
import jobsData from "./data.js";
import bulletPoint from "url:./images/bullet-point.svg";

// VARIABLES
const jobs = document.querySelector(".jobs");
const filters = [];
const filtersContainer = document.querySelector(".filters");

for (let jobData of jobsData) {
  const jobHTML = `
  <div class="job ${jobData.featured ? "featured" : ""}">
  <div class="job__info">
    <img
      class="job__logo"
      src=${jobData.logo}
      alt="Company Logo"
    />
    <div class="job__description">
      <div class="job__company-new-featured">
        <span class="job__company">${jobData.company}</span>
        <div class="job__new-featured">
          ${jobData.new ? '<span class="job__new">New!</span>' : ""}
          ${
            jobData.featured
              ? '<span class="job__featured">Featured</span>'
              : ""
          }
        </div>
      </div>
      <span class="job__title">${jobData.position}</span>
      <div class="job__time-type-location">
        <span class="job__time-ago">${jobData.postedAt}</span>
        <div class="job__bullet-type">
          <img
            class="job__bullet-point"
            src=${bulletPoint}
            alt="Bullet Point"
          />
          <span class="job__type">${jobData.contract}</span>
        </div>
        <div class="job__bullet-location">
          <img
            class="job__bullet-point"
            src=${bulletPoint}
            alt="Bullet Point"
          />
          <span class="job__location">${jobData.location}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="tags">
    <div class="tag">
      <span class="tag__name">${jobData.role}</span>
    </div>
    <div class="tag">
      <span class="tag__name">${jobData.level}</span>
    </div>
    ${jobData.languages
      .map(
        (language) => `
      <div class="tag">
        <span class="tag__name">${language}</span>
      </div>
    `
      )
      .join("")}
    ${jobData.tools
      .map(
        (tool) => `
      <div class="tag">
        <span class="tag__name">${tool}</span>
      </div>
    `
      )
      .join("")}
  </div>
</div>
  `;

  jobs.insertAdjacentHTML("beforeend", jobHTML);

  // Add event listener to listen when a tag is clicked
  const job = jobs.lastElementChild;

  job.addEventListener("click", function (e) {
    const tag = e.target.closest(".tag");
    if (!tag) return;

    const tagName = tag.querySelector(".tag__name").textContent;
    if (filters.includes(tagName)) return;
    filters.push(tagName);

    // Display the filters container
    filtersContainer.classList.remove("hidden");

    // Insert the tag as a filter inside the 'filtersContainer'
    const filterHTML = `
    
    `;
  });
}
