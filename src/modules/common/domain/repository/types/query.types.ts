

import {HydratedDocument,Query, UpdateWriteOpResult } from 'mongoose'

export type QueryResults<Document> = Query<
HydratedDocument<Document, any>[],
HydratedDocument<Document, any>,
  any,
  Document
>

export type QueryResult<Document> = Query<
HydratedDocument<Document, any> | null,
  any
>

export type UpdateWriteQueryResult<Document> = Query<
  UpdateWriteOpResult,
  HydratedDocument<Document, any>,
  any,
  Document
>

export type DeleteQueryResult<Document> = Query<
  { ok?: number | undefined; n?: number | undefined } & {
    deletedCount?: number | undefined
  },
  HydratedDocument<Document, any>,
  any,
  Document
>