const ataForm = document.getElementById('ata-form');
const datumInput = document.getElementById('datum');
const ataTypSelect = document.getElementById('ata-typ');
const beskrivningInput = document.getElementById('beskrivning');
const timmarInput = document.getElementById('timmar');
const statusSelect = document.getElementById('status');
const projektSelect = document.getElementById('projekt');
const ataListaElement = document.getElementById('ata-lista');
const entryCountElement = document.getElementById('entry-count');
let ataLista = [];

ataLista = JSON.parse(localStorage.getItem('ataEntries') || '[]');

function saveEntries() {
  localStorage.setItem('ataEntries', JSON.stringify(ataLista));
}

function renderEntry (ataData) {
   const ataCard = document.createElement('article');
  ataCard.classList.add('ata-card');

  const statusText = document.createElement('p');
  if (ataData.status === 'godkänd') {
    statusText.classList.add('status-godkand');
    statusText.textContent = 'Status: Godkänd';
  } else {
    statusText.classList.add('status-ej-godkand');
    statusText.textContent = 'Status: Ej godkänd';
  }

  ataCard.appendChild(statusText);

  const projektRubrik = document.createElement('h3');
  projektRubrik.textContent =
    Array.from(projektSelect.options).find(option => option.value === ataData.projekt).textContent;
  ataCard.appendChild(projektRubrik);

  const beskrivningParagraf = document.createElement('p');
  beskrivningParagraf.textContent = ataData.beskrivning;
  ataCard.appendChild(beskrivningParagraf);

  const datumParagraf = document.createElement('p');
  datumParagraf.textContent = 'Datum: ' + ataData.datum;
  ataCard.appendChild(datumParagraf);

  const timmarParagraf = document.createElement('p');
  timmarParagraf.textContent = 'Timmar: ' + ataData.timmar;
  ataCard.appendChild(timmarParagraf);

  const ataTypParagraf = document.createElement('p');
  ataTypParagraf.textContent = 
    'ATA-typ: ' + Array.from(ataTypSelect.options).find(option => option.value === ataData.ataTyp).textContent;
  ataCard.appendChild(ataTypParagraf);

  const statusButton = document.createElement('button');
  statusButton.textContent = 'Ändra status';
  statusButton.type = 'button';
  ataCard.appendChild(statusButton);

  statusButton.addEventListener('click', function () {
    if (ataData.status === 'godkänd') {
      ataData.status = 'ej-godkänd';
      statusText.textContent = 'Status: Ej godkänd';
      statusText.classList.remove('status-godkand');
      statusText.classList.add('status-ej-godkand');
    } else {
      ataData.status = 'godkänd';
      statusText.textContent = 'Status: Godkänd';
      statusText.classList.remove('status-ej-godkand');
      statusText.classList.add('status-godkand');
    }
    saveEntries();
  });

  ataListaElement.appendChild(ataCard);
}

ataForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const ataData = {
    datum: datumInput.value,
    ataTyp: ataTypSelect.value,
    beskrivning: beskrivningInput.value,
    timmar: timmarInput.value,
    status: statusSelect.value,
    projekt: projektSelect.value,
  };
  ataLista.push(ataData);
  saveEntries();
  updateEntryCount()
  renderEntry(ataData)
  ataForm.reset();
});

function updateEntryCount() {
  if (ataLista.length === 0) {
    entryCountElement.textContent = 'Inga registrerade ÄTA ännu';
  } else if (ataLista.length === 1) {
    entryCountElement.textContent = `${ataLista.length} registrerad ÄTA`;
  } else {
    entryCountElement.textContent = `${ataLista.length} registrerade ÄTA`;
  }
}

function countApproved(entries) {
  return entries.filter(entry => entry.status === 'godkänd').length;
}

function calculateTotalHours(entries) {
  return entries.reduce((total, entry) => total + parseFloat(entry.timmar), 0);
}

ataLista.forEach(entry => renderEntry(entry));

updateEntryCount();
