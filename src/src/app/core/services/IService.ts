import { ListResult } from 'app/models/list-result.model';
import { Observable } from 'rxjs';

export interface IService<TDto, TId, TFilter> {
  List(
    firstResult: number,
    maxRegisters: number,
    orderBy: string
  ): Observable<ListResult<TDto[]>>;

  Filter(filter: TFilter): Observable<ListResult<TDto[]>>;

  Read(id: TId): Observable<TDto>;

  Create(dto: TDto): Observable<TId>;

  Update(dto: TDto): Observable<boolean>;

  DeleteMany(ids: TId[]): Observable<boolean>;

  DeleteOne(id: TId): Observable<boolean>;
}
