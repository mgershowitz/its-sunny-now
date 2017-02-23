document.addEventListener('DOMContentLoaded', () => {

  //creates the episode div where the info will be stored
  const title = document.createElement('div')
  title.setAttribute('id', 'episode')
  document.querySelector('body').appendChild(title)

  //creates the dropdown menus
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let dayList = document.createElement('select');
  let hour = document.createElement('select');
  let minute = document.createElement('select');
  let amPm = document.createElement('select');
  dayList.setAttribute('id', 'day');
  hour.setAttribute('id', 'hour');
  minute.setAttribute('id', 'minute');
  amPm.setAttribute('id', 'am-pm');

  //adds the days
  days.forEach((day, index) => {
    let dayNode = document.createElement('option');
    dayNode.setAttribute('data-value', index);
    dayNode.innerText = day;
    dayList.appendChild(dayNode)
  })

  //adds the hours
  for(let i = 1; i < 13; i++){
    let hourNode = document.createElement('option');
    hourNode.innerHtml = i.toString().length === 2 ? `value=${i}` : `value=0${i}`;
    hourNode.innerText = i.toString().length === 2 ? `${i}` : `0${i}`;
    hour.appendChild(hourNode);
  }

  //adds the minutes
  for(let i = 0; i < 60; i += 15){
    let minuteNode = document.createElement('option');
    minuteNode.innerHtml = i.toString().length === 2 ? `value=${i}` : `value=${i}`;
    minuteNode.innerText = i.toString().length === 2 ? `${i}` : `${i}0`;
    minute.appendChild(minuteNode);
  }

  //adds the am and pm
  for(let i = 0; i < 2; i++){
    let amPmNode = document.createElement('option');
    amPmNode.innerHtml = i % 2 === 0 ? `value=AM` : `value=PM`;
    amPmNode.innerText = i % 2 === 0 ? 'AM' : 'PM';
    amPm.appendChild(amPmNode);
  }

  //appends it to the DOM
  const body = document.querySelector('body');
  body.appendChild(dayList);
  body.appendChild(hour);
  body.appendChild(minute);
  body.appendChild(amPm);
  body.appendChild(title);


  const renderIDMBData = (ep) => {
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
    epDirector.innerText = `Directed by ${ep.Director}`;
    epWriter.innerText = `Writtem by ${ep.Writer}`;
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
  }

  const renderEpisode = () => {
    console.log('click');
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
    fetch('/api')
    .then(r => r.json())
    .then(episode => renderIDMBData(episode))

  }

  const renderLaterEpisode = () => {
    let children = [];
      //grabs any existing DOM children in the episode array and pushes them into children
      for(let i = 0; i < title.children.length; i++){
        children.push(title.children[i])
      }
      //Clears out all of the children inside of the episodes div to prevent duplicates
      children.forEach(child =>{
        title.removeChild(child)
      })
      //grabs the episode based on the input data
      let time = {
        day: dayList.value,
        hour: hour.value,
        minute: minute.value,
        amPm: amPm.value
      }
      console.log(time);
      console.log(dayList.value);
      fetch(`/apiLater?day=${time.day}&hour=${time.hour}&minute=${time.minute}&ampm=${time.amPm}`)
      .then(r => r.json())
      .then(episode => renderIDMBData(episode))

  }


  //places event listener on the button. The magic making button
  let $button = document.querySelector('#now');
  let $laterButton = document.querySelector('#later');
  $button.addEventListener('click', renderEpisode);
  $button.addEventListener('touchstart', renderEpisode);
  $laterButton.addEventListener('click', renderLaterEpisode);
  $laterButton.addEventListener('touchstart', renderLaterEpisode);

})
















