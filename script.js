document.addEventListener('DOMContentLoaded', () => {
    const testOne = document.querySelector('#test-1')
      .shadowRoot
      .querySelector('button')
      .addEventListener('click', (event) => {
        event.target.innerText = 'Clicked!';
      })
  });