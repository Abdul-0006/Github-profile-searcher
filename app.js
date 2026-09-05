let searchBar = document.querySelector("#username-input");
let searchBtn = document.querySelector("#search-button");
let profileDate = document.querySelector(".date");
let profileImage = document.querySelector(".avatar");
let profileName = document.querySelector("#profile-name");
let profileLink = document.querySelector(".githubProfile");
let profileBio = document.querySelector(".bio");
let profileRepos = document.querySelector("#repos");
let profileFollowers = document.querySelector("#follower-count");
let followingCount = document.querySelector("#following-count");
let userCompany = document.querySelector("#company");
let userLocation = document.querySelector("#location");
let userPortfolio = document.querySelector("#blog");
let repoContainer = document.querySelector(".repos");

searchBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  let userSearch = searchBar.value;

  if (userSearch === "") {
    alert("Enter a username");
  } else {
    const response = await fetch(`https://api.github.com/users/${userSearch}`);
    const data = await response.json();
    console.log(data);

    let repoResponse = await fetch(
      `https://api.github.com/users/${userSearch}/repos`,
    );
    let info = await repoResponse.json();
    console.log(info);

    let {
      avatar_url,
      bio,
      blog,
      company,
      created_at,
      followers,
      following,
      location,
      login,
      name,
      public_repos,
      html_url,
    } = data;

    info.forEach((repo) => {
      let repoBox = document.createElement("div");
      let repoName = document.createElement("a");
      let repoDesc = document.createElement("p");

      repoBox.classList.add("repo");
      repoName.textContent = repo.name;
      repoName.href = repo.html_url;
      repoName.setAttribute("target", "_blank");
      repoDesc.textContent = repo.description;

      repoBox.append(repoName, repoDesc);
      repoContainer.append(repoBox);
    });

    avatar_url ??= "Not available";
    bio ??= "Not available";
    blog ??= "Not available";
    company ??= "Not available";
    created_at ??= "Not available";
    followers ??= "Not available";
    following ??= "Not available";
    location ??= "Not available";
    login ??= "Not available";
    name ??= "Not available";
    public_repos ??= "Not available";
    html_url ??= "Not available";

    profileImage.src = avatar_url;
    profileLink.href = html_url;
    profileBio.textContent = bio;
    profileDate.textContent = created_at;
    profileFollowers.textContent = followers;
    profileRepos.textContent = public_repos;
    profileName.textContent = name;
    followingCount.textContent = following;
    userLocation.textContent = location;
    userPortfolio.textContent = blog;
    userCompany.textContent = company;
  }
});
