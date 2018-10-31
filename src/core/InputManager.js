import { InputMaker } from './InputMaker';
import uuid4 from 'uuid4';

export class InputManager {
  static generateDefaultVaidationRule(type) {
    return [];
  }

  static constructInput(input) {
    const name = input.properties.name;
    const type = input.type;
    switch (type) {
      case 'multiChoice':
        return InputMaker.makeCheckBoxes(name, input.children);

      case 'dropDown':
        return InputMaker.makeDropDown(name, input.children);

      case 'email':
        return InputMaker.makeTextInput(name, 'email');

      case 'number':
        return InputMaker.makeTextInput(name, 'number');

      case 'date':
        return InputMaker.makeTextInput(name, 'date');

      case 'bvn':
        return InputMaker.makeTextInput(name, 'number');

      case 'title':
        return InputMaker.makeHeaderInput(name);

      case 'shortText':
        return InputMaker.makeTextInput(name);

      case 'pasport':
        return InputMaker.makeFileInput(name);

      case 'signature':
        return InputMaker.makeFileInput(name);

      case 'yesOrNo':
        return InputMaker.makeRadioInput(name);

      case 'longText':
        return InputMaker.makeTextArea(name);

      default:
        return null;
    }
  }
}

const constructMultiValueInput = type => {
  const child = { id: uuid4(), text: '..Option1' };
  const html = `
    Type Your Question Here
    <div id="${child.id}">${child.text}</div>
  `;
  return {
    type,
    id: uuid4(),
    children: [child],
    properties: {
      html
    }
  };
};
