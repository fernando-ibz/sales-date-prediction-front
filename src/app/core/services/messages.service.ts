import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class MessagesService {
     constructor(private _snackBar: MatSnackBar) { }

     information(message: string, action: string) {
          this._snackBar.open(message, action, { duration: 5000 });
     }

     error(message: string, action: string) {
          this._snackBar.open(message, action, { duration: 5000 });
     }

     warning(message: string, action: string) {
          this._snackBar.open(message, action, { duration: 5000 });
     }

}
