import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { TelegrammService } from '../services/telegramm.service';
import { StateService } from '../services/state.service';

const HEADER_NAME = 'X-Telegram-Init-Data';

export const initDataInterceptor: HttpInterceptorFn = (req, next) => {
  const tg = inject(TelegrammService);
  const state = inject(StateService);
  const initData = tg.initData;
  // если пусто — не трогаем запрос
  const clonedWithSession = req.clone({
    body: {
      ...(req.body || {}),
      sessionId: state.sessionId,
    }
  });
  if (!initData) return next(clonedWithSession);

  // пример: добавлять всегда
  const cloned = clonedWithSession.clone({
    setHeaders: { [HEADER_NAME]: initData }
  });

  return next(cloned);
};
