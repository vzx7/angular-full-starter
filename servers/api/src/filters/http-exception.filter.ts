import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

/**
 * Filter for HttpException
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        switch (status) {
            case 404:
                // The business logic of error handling is transferred to the client.
                response

                .status(200)
                .send("index.html");
                break;
        };
    }
}