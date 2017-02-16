document.addEventListener('DOMContentLoaded', () => {
  console.log(document.querySelector('div'))
  const title = document.querySelector('#episode');

  const getEpisode = () => {
    fetch('/api')
    .then(r => { r.json() })
    .then(data => {
      let newTitle = document.createElement('div');
      newTitle.innerText = data.title;
      title.appendChild(newTitle);
    })
    }
  }


  let $button = document.querySelector('button');
  $button.addEventListener('click', getEpisode);

})
