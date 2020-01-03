// when more languages are added these should be changed to objects
// with key value pairs.

export function typingMessageLang(lang) {
  if (lang === 'en') return 'Typing...';
  if (lang === 'fr') return 'Un petit moment...';
}

export function buttonMessageLang(lang) {
  if (lang === 'en') return 'Choose a button';
  if (lang === 'fr') return 'Choisis une option';
}

export function optionsLang(lang) {
  if (lang === 'en') return 'Pick one or more options';
  if (lang === 'fr') return 'Choisis une ou plusieurs options';
}

export function inputPlaceholderLang(lang) {
  if (lang === 'en') return 'Type here...';
  if (lang === 'fr') return 'Écris ici';
}

export function submitTextLang(lang) {
  if (lang === 'en') return 'Submit';
  if (lang === 'fr') return 'Envoyer';
}

export function viewLang(lang) {
  if (lang === 'en') return 'View';
  if (lang === 'fr') return 'Voir';
}
