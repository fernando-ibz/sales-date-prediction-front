import { HttpErrorResponse, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { MessagesService } from '../services/messages.service';

export function errorInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const messagesService = inject(MessagesService);
  
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An error occurred communicating with the service. Try again later';
      let displayMessage = true;

      if (request.headers.has('X-Silent-Error')) {
        displayMessage = false;
      }

      if (error.error && typeof error.error === 'object' && 'message' in error.error) {
        errorMessage = `Client error: ${error.error.message}`;
      } else {
        switch (error.status) {
          case 0:
            errorMessage = 'Could not connect to server. Please check your connection.';
            break;
          case 400:
            errorMessage = 'Bad request. Please check your data.';
            break;
          case 401:
            errorMessage = 'Session expired. Please log in again.';
            break;
          case 403:
            errorMessage = "You don't have permissions to perform this action";
            break;
          case 404:
            errorMessage = 'The requested resource was not found.';
            break;
          case 409:
            errorMessage = 'Conflict: The request conflicts with current state.';
            break;
          case 500:
            errorMessage = 'Internal server error. Please try again later.';
            break;
          default:
            errorMessage = error.error?.message || error.message || errorMessage;
        }
      }

      if (displayMessage) {
        messagesService.error(errorMessage, 'Close');
      }

      return throwError(() => ({
        message: errorMessage,
        originalError: error
      }));
    })
  );
}