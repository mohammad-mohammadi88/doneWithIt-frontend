export interface UserLocationType{
    latitude?:number;
    longitude?:number;
}

export type Success<T> = { ok: true; body: T };
export type Failure = { ok: false; body: { error: string } };
export type TypedResponse<T> = Success<T> | Failure;
