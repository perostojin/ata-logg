const ataForm = document.getElementById('ata-form');
const datumInput = document.getElementById('datum');
const ataTypSelect = document.getElementById('ata-typ');
const beskrivningInput = document.getElementById('beskrivning');
const timmarInput = document.getElementById('timmar');
const statusSelect = document.getElementById('status');
const projektSelect = document.getElementById('projekt');
const ataListaElement = document.getElementById('ata-lista');
const ataLlista = [];

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
  ataLlista.push(ataData);
  const ataCard = document.createElement('article');
  ataCard.classList.add('ata-card');

  const statusText = document.createElement('p');
  statusText.textContent = `Status: ${statusSelect.options[statusSelect.selectedIndex].textContent}`;
  if (ataData.status === 'godkänd') {
    statusText.classList.add('status-godkand');
  } else {
    statusText.classList.add('status-ej-godkand');
  }
  ataCard.appendChild(statusText);

  const projektRubrik = document.createElement('h3');
  projektRubrik.textContent =
    projektSelect.options[projektSelect.selectedIndex].textContent;
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
    'ATA-typ: ' + ataTypSelect.options[ataTypSelect.selectedIndex].textContent;
  ataCard.appendChild(ataTypParagraf);

  const statusButton = document.createElement('button');
  statusButton.textContent = 'Ändra status';
  statusButton.type = 'button';
  ataCard.appendChild(statusButton);

  ataCard.classList.add('ata-card');
  ataListaElement.appendChild(ataCard);
  ataForm.reset();
});
