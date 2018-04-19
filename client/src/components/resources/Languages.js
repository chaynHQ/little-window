// when more languages are added these should be changed to objects
// with key value pairs.

export function typingMessageLang(lang) {
  if (lang === 'en') return 'Typing...';
  else if (lang === 'fr') return 'Un petit moment...';
}

export function buttonMessageLang(lang) {
  if (lang === 'en') return 'Choose a button';
  else if (lang === 'fr') return 'Choisis une option';
}

export function optionsLang(lang) {
  if (lang === 'en') return 'Pick one or more options';
  else if (lang === 'fr') return 'Choisis une ou plusieurs options';
}

export function inputPlaceholderLang(lang) {
  if (lang === 'en') return 'Type here...';
  else if (lang === 'fr') return 'Écris ici';
}

export function submitTextLang(lang) {
  if (lang === 'en') return 'Submit';
  else if (lang === 'fr') return 'Envoyer';
}
