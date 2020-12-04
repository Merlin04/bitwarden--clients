import { LogLevelType } from '../../enums/logLevelType';

import { ConsoleLogService as BaseConsoleLogService } from '../../services/consoleLog.service';

export class ConsoleLogService extends BaseConsoleLogService {
    constructor(isDev: boolean, filter: (level: LogLevelType) => boolean = null) {
        super(isDev, filter);
    }

    write(level: LogLevelType, message: string) {
        if (this.filter != null && this.filter(level)) {
            return;
        }

        if (process.env.BW_RESPONSE) {
            // tslint:disable-next-line
            console.error(message);
            return;
        }

        super.write(level, message);
    }
}