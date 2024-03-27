export const notify = (title, description) => {
  // Create notify element
  const notifyElem = createNotifyElement(title, description);

  // Add to the DOM
  document.querySelector('#container').appendChild(notifyElem);

  // Make the element transition in
  requestAnimationFrame(() => notifyElem.classList.add('show'));

  // Make dissapear after timeout
  setTimeout(() => {
    notifyElem.remove();
  }, 3000);
};

const createNotifyElement = (title, description) => {
  // Create the container, title, and description elements
  const containerElem = document.createElement('div');
  containerElem.classList.add('notify');

  const titleElem = document.createElement('p');
  titleElem.classList.add('title');
  titleElem.innerText = title;

  const descriptionElem = document.createElement('p');
  descriptionElem.classList.add('description');
  descriptionElem.innerText = description;

  // Add title and description elements to container element (notify element)
  containerElem.appendChild(titleElem);
  containerElem.appendChild(descriptionElem);

  return containerElem;
};
