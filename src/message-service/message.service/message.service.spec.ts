import readline from 'readline';

import { Message } from '../message.model';
import { messageService } from './message.service';

describe('MessageService tests', () => {
  it('out method', () => {
    // Arrange
    const consoleSpy = jest.spyOn(global.console, 'log').mockImplementation(jest.fn());
    const message: Message = {
      text: 'This is a text message',
      type: 'info',
    };

    // Act
    messageService.out(message);

    // Assert
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('promptUserInput method', async () => {
    // Arrange
    const userInput = 'The line entered by user';
    jest.spyOn(readline, 'createInterface').mockReturnValue(({
      question: (question: string, cb: (userInput: string) => void) => cb(userInput),
      close: jest.fn(),
    } as unknown) as readline.Interface);
    const message: Message = {
      text: 'Enter something',
      type: 'prompt',
    };

    // Act
    const result = await messageService.promptUserInput(message);

    // Assert
    expect(result).toEqual(userInput);
  });
  it('promtUserUntilValidInput method', async () => {
    // Arrange
    const message: Message = {
      text: 'Please, enter a number: ',
      type: 'prompt',
    };
    const expectedOutput = '17';
    const validate = (input: string) => Number.isInteger(Number.parseInt(input));
    const promptSpy = jest
      .spyOn(messageService, 'promptUserInput')
      .mockResolvedValueOnce('one')
      .mockResolvedValueOnce('two')
      .mockResolvedValueOnce(expectedOutput);

    // Act
    const result = await messageService.promtUserUntilValidInput(message, validate);

    // Assert
    expect(promptSpy).toHaveBeenCalledTimes(3);
    expect(result).toEqual(expectedOutput);
  });
});
