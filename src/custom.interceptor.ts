// import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
// import { map } from 'rxjs';

// export class CustomInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, handler: CallHandler) {
//     return handler.handle().pipe(
//       map((data) => {
//         const response = [...data].map((item) => {
//           const newitem = { ...item, createdAt: item.created_at };
//           delete newitem.created_at;
//           delete newitem.updated_at;
//           return newitem;
//         });

//         return response;
//       }),
//     );
//   }
// }
