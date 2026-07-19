document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

const menuBtn = document.getElementById('menu-btn');
const primaryNav = document.getElementById('primary-nav');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        primaryNav.classList.toggle('hidden');
    });
}

const url = "../data/members.json";
const container = document.getElementById('members-container');

async function getMembers() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data);
        } else {
            throw Error(await response.text());
        }
      } catch (error) {
        console.error(error);
      }
    }

    function displayMembers(members) {
        container.innerHTML = '';

        members.forEach((member) => {
            let card = document.createElement('section');
            let name = document.createElement('h3');
            let address = document.createElement('p');
            let phone = document.createElement('p');
            let webLink = document.createElement('a');
            let image = document.createElement('img');

            name.textContent = member.name;
            address.textContent = member.address;
            phone.textContent = member.phone;
             
            image.setAttribute('src', member.image);
            image.setAttribute('alt', `Logo of ${member.name}`);
            image.setAttribute('loading', 'lazy');
            image.setAttribute('width', '300');
            image.setAttribute('height', '200');
             
            webLink.setAttribute('href', member.website);
            webLink.setAttribute('target', '_blank');
            webLink.textContent = 'Visit Website';


            card.appendChild(image);
            card.appendChild(name);
            card.appendChild(address);
            card.appendChild(phone);
            card.appendChild(webLink);

            container.appendChild(card);
        });
    }

    const gridBtn = document.getElementById('grid-btn');
    const listBtn = document.getElementById('list-btn');
     
    if (gridBtn) { 
    gridBtn.addEventListener('click', () => {
        if (container) { 
            container.classList.add('grid');
            container.classList.remove('list');
        }
    });
}
   
   if (listBtn) { 
    listBtn.addEventListener('click', () => {
        if (container) { 
            container.classList.add('list');
            container.classList.remove('grid');
        }
    });
}
    
   if (container) { 
      getMembers();
   }