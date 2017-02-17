document.addEventListener('DOMContentLoaded', () => {
  console.log(document.querySelector('div'))
  const title = document.querySelector('#episode');

  const getEpisode = () => {
    let children = [];
    //grabs any existing DOM children in the episode array and pushes them into children
    for(let i = 0; i < title.children.length; i++){
      children.push(title.children[i])
    }
    //Clears out all of the children inside of the episodes div to prevent duplicates
    children.forEach(child =>{
      title.removeChild(child)
    })
    //grabs all the episodes that happen on today's day and appends the title, director, wirter, desc, and code
    //I want to get the time to be a factor so that only one episode returns which is closests to now, but in the future.
    fetch('/api')
    .then(r => r.json())
    .then(ep => {
      let posterDiv = document.createElement('div');
      let imgDiv = document.createElement('div');
      let epTitle = document.createElement('h4');
      let epImg = document.createElement('img');
      let epDirector = document.createElement('p');
      let epWriter = document.createElement('p');
      let epCode = document.createElement('p');
      let epPlot = document.createElement('p');
      epTitle.innerText = ep.Title;
      posterDiv.setAttribute('class', 'poster-container')
      epImg.setAttribute('src', ep.Poster);
      epImg.setAttribute('class', 'ep-img');
      epDirector.innerText = ep.Director;
      epWriter.innerText = ep.Writer;
      epCode.innerText = `Season ${ep.Season}, Episode ${ep.Episode}`;
      epPlot.innerText = ep.Plot;
      title.appendChild(epTitle);
      title.appendChild(posterDiv);
      posterDiv.appendChild(imgDiv);
      imgDiv.appendChild(epImg)
      posterDiv.appendChild(epPlot);
      title.appendChild(epDirector);
      title.appendChild(epWriter);
      title.appendChild(epCode);

    })

    }


  //places event listener on the button. The magic making button
  let $button = document.querySelector('button');
  $button.addEventListener('click', getEpisode);

})
















