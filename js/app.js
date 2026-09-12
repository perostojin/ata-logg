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
  const ataKort = document.createElement('div');
  const projektRubrik = document.createElement('h3');
  projektRubrik.textContent =
    projektSelect.options[projektSelect.selectedIndex].textContent;
  ataKort.appendChild(projektRubrik);
  const beskrivningParagraf = document.createElement('p');
  beskrivningParagraf.textContent = ataData.beskrivning;
  ataKort.appendChild(beskrivningParagraf); 
  const datumParagraf = document.createElement('p');
  datumParagraf.textContent = "Datum: " + ataData.datum;
  ataKort.appendChild(datumParagraf);
  const timmarParagraf = document.createElement('p');
  timmarParagraf.textContent = "Timmar: " + ataData.timmar;
  ataKort.appendChild(timmarParagraf);
  const statusParagraf = document.createElement('p');
  statusParagraf.textContent = "Status: " + statusSelect.options[statusSelect.selectedIndex].textContent;
  ataKort.appendChild(statusParagraf);
  const ataTypParagraf = document.createElement('p');
  ataTypParagraf.textContent = "ATA-typ: " + ataTypSelect.options[ataTypSelect.selectedIndex].textContent;
  ataKort.appendChild(ataTypParagraf);
  ataKort.classList.add('ata-kort');
  ataListaElement.appendChild(ataKort);
  console.log('Aktuell ATA-lista:', ataLlista);
  ataForm.reset();
});
