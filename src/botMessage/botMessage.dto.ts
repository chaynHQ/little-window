export class BotMessageDto {
  conversationId: string;
  storyblokId?: string;
  speech: string;
  resources?: Array<RadioButtonOptions>;
  checkBoxOptions?: Array<CheckBoxOptions>;
  radioButtonOptions?: Array<Resources>;
  previousMessageId?: string;
  messageId?: string;
}


class CheckBoxOptions {
  name: string;
  price: number;
  description: string;
}

class RadioButtonOptions {

}

class Resources {

}
