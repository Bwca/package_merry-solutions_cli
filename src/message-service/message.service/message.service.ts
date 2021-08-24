import readline from 'readline';

import chalk from 'chalk';

import { Message } from '../message.model';

class MessageService {
    public out(message: Message): void {
        const text = this.messageToColoredString(message);
        console.log(text);
    }

    public promptUserInput(question: Message): Promise<string> {
        return new Promise((resolve) => {
            const text = this.messageToColoredString(question);
            const rl = this.readlineInterface;
            rl.question(text, (answer: string) => {
                resolve(answer.trim());
                rl.close();
            });
        });
    }

    public async promtUserUntilValidInput(
        question: Message,
        validate: (userInput: string) => boolean,
        errorMessage?: Message
    ): Promise<string> {
        let userInput: string;
        let isValidInput = false;
        do {
            userInput = await this.promptUserInput(question);
            isValidInput = validate(userInput);
            if (!isValidInput && errorMessage) {
                this.out(errorMessage);
            }
        } while (!isValidInput);

        return userInput;
    }

    private get readlineInterface(): readline.Interface {
        return readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
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
