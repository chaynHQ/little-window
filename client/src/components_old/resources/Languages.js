// when more languages are added these should be changed to objects
// with key value pairs.

export function typingMessageLang(lang) {
  let message;
  if (lang === 'en') message = 'Typing...';
  if (lang === 'fr') message = 'Un petit moment...';
  return message;
}

export function buttonMessageLang(lang) {
  let message;
  if (lang === 'en') message = 'Choose a button';
  if (lang === 'fr') message = 'Choisis une option';
  return message;
}

export function optionsLang(lang) {
  let message;
  if (lang === 'en') message = 'Pick one or more options';
  if (lang === 'fr') message = 'Choisis une ou plusieurs options';
  return message;
}

export function inputPlaceholderLang(lang) {
  let message;
  if (lang === 'en') message = 'Type here...';
  if (lang === 'fr') message = 'Écris ici';
  return message;
}

export function submitTextLang(lang) {
  let message;
  if (lang === 'en') message = 'Submit';
  if (lang === 'fr') message = 'Envoyer';
  return message;
}

export function viewLang(lang) {
  let message;
  if (lang === 'en') message = 'View';
  if (lang === 'fr') message = 'Voir';
  return message;
}
