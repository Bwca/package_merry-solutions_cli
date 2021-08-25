import { messageService } from './message-service';

export function dieOnError(e: Error): void {
    messageService.out({
        text: `Something has gone wrong :( \n\n${e.toString()} \n\n I'll die now :<`,
        type: 'error',
    });
    process.exit(1);
}
