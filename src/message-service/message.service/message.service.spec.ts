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
});
