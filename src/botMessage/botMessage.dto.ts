export class BotMessageDto {
  conversationId: string;
  storyblokId: string;
  speech: string;
  resources: Array<RadioButtonOptions>;
  checkBoxOptions: Array<CheckBoxOptions>;
  radioButtonOptions: Array<Resources>;
  previousMessageId?: string;
  messageId?: string;
}


class CheckBoxOptions {
  name: String;
  price: Number;
  description: String;
}

class RadioButtonOptions {

}

class Resources {

}
