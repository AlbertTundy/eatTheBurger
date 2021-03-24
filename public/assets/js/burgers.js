// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', (event) => {
  if (event) {
    console.info('DOM loaded');
  }

  const changeConsumeBtns = document.querySelectorAll('.change-consumed');

  if (changeConsumeBtns) {
    changeConsumeBtns.forEach((button) => {
      button.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        const newConsume = e.target.getAttribute('data-newconsume');
        let something = parseInt(newConsume)+1
        const newConsumedState= {
          devoured: something,
        };
        fetch(`/api/burgers/${id}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newConsumedState),
        }).then((response) => {
          if (response.ok) {
            console.log(`changed consumed, to: ${newConsume}`);
            location.reload('/');
          } else {
            alert('something went wrong!');
          }
        });
      });
    });
  }

  const createBurgerBtn = document.getElementById('create-form');

  if (createBurgerBtn) {
    createBurgerBtn.addEventListener('submit', (e) => {
      e.preventDefault();
      const newBurger = {
        burger_name: document.getElementById('ca').value.trim(),
        devoured: document.getElementById('devoured').checked,
      };
      fetch('/api/burgers', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(newBurger),
      }).then(() => {
        document.getElementById('ca').value = '';
        console.log('Created a new burger!');
        location.reload();
      });
    });
  }

  const deleteBurgerBtns = document.querySelectorAll('.delete-burger');

  deleteBurgerBtns.forEach((button) => {
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      fetch(`/api/burgers/${id}`, {
        method: 'DELETE',
      }).then((res) => {
        console.log(res);
        console.log(`Deleted burger: ${id}`);
        location.reload();
      });
    });
  });
});
