fetch('vip-contributors.json')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('contributorList');
    list.innerHTML = '';
    data.forEach(person => {
      const li = document.createElement('li');
      li.textContent = person.name;
      list.appendChild(li);
    });
  })
  .catch(() => {
    const list = document.getElementById('contributorList');
    list.innerHTML = '<li>Contributors coming soon!</li>';
  });

