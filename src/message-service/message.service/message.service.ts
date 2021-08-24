import chalk from 'chalk';

import { environment } from '../../shared/constants';

import { Message } from '../message.model';

class MessageService {
    public out(message: Message): void {
        /** ignore all logging in test and production */
        if (environment.mode !== 'development' && message.type === 'info') {
            return;
        }
        const text = this.messageToColoredString(message);
        console.log(text);
    }

    private messageToColoredString({ text, type }: Message): string {
        switch (type) {
            case 'success':
                return chalk.green.bold(text);

            case 'info':
                return chalk.whiteBright(text);

            case 'error':
                return chalk.red.bold(text);

            case 'prompt':
                return chalk.cyan.bold(text);

            default:
                return text;
        }
    }
}

export const messageService = new MessageService();
