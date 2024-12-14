import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, tap } from 'rxjs';

import { LoadingService } from '../services/loading.service';
import { Logger } from '../helpers/logger.helper';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
    const loadingService = inject(LoadingService);

    loadingService.show();
    return next(req).pipe(
        tap(() => loadingService.hide()),
        catchError((error) => {
            loadingService.hide();
            Logger.error(error);
            throw error;
        })
    );
};
