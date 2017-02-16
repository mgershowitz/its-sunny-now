document.addEventListener('DOMContentLoaded', () => {
  console.log(document.querySelector('div'))
  const title = document.querySelector('#episode');

  const getEpisode = () => {
    let children = [];

    for(let i = 0; i < title.children.length; i++){
      console.log(title.children[i]);
      children.push(title.children[i])
    }
    console.log(children)
    children.forEach(child =>{
      title.removeChild(child)
    })

    fetch('/api')
    .then(r => r.json())
    .then(data => {
      data.forEach(ep=>{
        let epTitle = document.createElement('h4');
        let epDirector = document.createElement('p');
        let epWriter = document.createElement('p');
        let epCode = document.createElement('p');
        let epDesc = document.createElement('p');
        epTitle.innerText = ep.title;
        epDirector.innerText = ep.director;
        epWriter.innerText = ep.writer;
        epCode.innerText = `Season ${ep.season}, Episode ${ep.episode}`;
        epDesc.innerText = ep.description;
        title.appendChild(epTitle);
        title.appendChild(epDesc);
        title.appendChild(epDirector);
        title.appendChild(epWriter);
        title.appendChild(epCode);
      })
    })

    }



  let $button = document.querySelector('button');
  $button.addEventListener('click', getEpisode);

})
















