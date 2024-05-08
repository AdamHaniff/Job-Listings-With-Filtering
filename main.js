import "core-js/stable";
import "regenerator-runtime/runtime";
import jobsData from "./data.js";
import bulletPoint from "url:./images/bullet-point.svg";
import removeIcon from "url:./images/icon-remove.svg";

// VARIABLES
const jobs = document.querySelector(".jobs");
const filters = [];
const filtersParentContainer = document.querySelector(".filters");
const filtersContainer = document.querySelector(".filters__container");

// IIFE FUNCTION
// Insert every job when the page first loads
(function insertEveryJob() {
  for (let jobData of jobsData) {
    insertJob(jobData);
  }
})();

// FUNCTIONS
function insertJob(jobData) {
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

  // Insert job into 'jobs' container
  jobs.insertAdjacentHTML("beforeend", jobHTML);
}

function insertFilter(tagName) {
  const filterHTML = `
  <div class="filter">
    <div class="filter__container">
      <span class="filter__name">${tagName}</span>
    </div>
    <div class="filter__remove-container">
      <img
        class="filter__remove-icon"
        src=${removeIcon}
        alt="Remove icon"
      />
    </div>
  </div>
  `;

  filtersContainer.insertAdjacentHTML("beforeend", filterHTML);
}

function insertFilteredJobs() {
  // Remove all the jobs from the 'jobs' container
  jobs.innerHTML = "";

  // Only display jobs that have the tags in the 'filters' array
  for (let jobData of jobsData) {
    const jobInfo = [
      jobData.role,
      jobData.level,
      ...jobData.languages,
      ...jobData.tools,
    ];

    if (filters.every((filter) => jobInfo.includes(filter))) {
      insertJob(jobData);
    }
  }
}

// EVENT LISTENER CALLBACK FUNCTIONS
function handleTagClick(e) {
  const tag = e.target.closest(".tag");
  if (!tag) return;

  // Only add the tag name to the 'filters' array if it's not in there
  const tagName = tag.querySelector(".tag__name").textContent;
  if (filters.includes(tagName)) return;
  filters.push(tagName);

  // Insert the tag name as a filter inside the 'filtersContainer'
  insertFilter(tagName);

  // Display the filters parent container
  filtersParentContainer.classList.remove("hidden");

  // Clear the inner HTML of the jobs container and only insert the filtered jobs
  insertFilteredJobs();
}

// EVENT LISTENERS
jobs.addEventListener("click", handleTagClick);

filtersContainer.addEventListener("click", function (e) {
  const filterRemoveContainer = e.target.closest(".filter__remove-container");
  if (!filterRemoveContainer) return;
});
